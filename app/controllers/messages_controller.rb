class MessagesController < ApplicationController
  def create
    new_message = Message.new(message_params)
    new_message.sender = current_user
    new_message.username = current_user.username
    new_message.chatroom = Chatroom.find(params[:chatroom_id])
    new_message.save
    props = [new_message.chatroom, new_message.chatroom.messages]

    notifications = []
    new_message.body.scan(/@\w*/).each do |mention|
      notifiee = User.find_by(username: mention[1..-1])
      if notifiee
        new_notification = Notification.create(notifier: current_user, notifiee: notifiee, chatroom: new_message.chatroom, category: 'mention', read?: false)
        notifications << [new_notification, new_notification.notifier, new_notification.notifiee, new_notification.chatroom, new_notification.category, new_notification.read?, new_notification.cleared?]
        ActionCable.server.broadcast(
          'notifications',
          notifications
        )
      end
    end

    ActionCable.server.broadcast(
      'messages',
      { id: new_message.id,
        body: new_message.body,
        chatroom_id: Chatroom.find(new_message.chatroom.id).id,
        sender_id: new_message.sender.id,
        username: new_message.username,
        created_at: new_message.created_at,
        updated_at: new_message.updated_at }
    )
    respond_to do |format|
      format.json { render json: props }
    end
  end

  private

  def message_params
    params.require(:message).permit(:body)
  end
end

class MessagesController < ApplicationController
  def create
    new_message = Message.new(message_params)
    new_message.sender = current_user
    new_message.chatroom = Chatroom.find(params[:chatroom_id])
    new_message.save
    props = [new_message.chatroom, new_message.chatroom.messages]
    respond_to do |format|
      format.json { render json: props }
    end
    ActionCable.server.broadcast(
      'messages',
      { id: new_message.id,
        body: new_message.body,
        chatroom_id: Chatroom.find(new_message.chatroom.id).id,
        sender_id: new_message.sender.id,
        created_at: new_message.created_at,
        updated_at: new_message.updated_at }
    )
  end

  private

  def message_params
    params.require(:message).permit(:body)
  end
end

class ChatroomSubscriptionsController < ApplicationController
  def create
    new_chatroom_subscription = ChatroomSubscription.new(chatroom_subscription_params)
    new_chatroom_subscription.save
    active_chatroom = [new_chatroom_subscription.chatroom, new_chatroom_subscription.chatroom.messages, new_chatroom_subscription.chatroom.members, new_chatroom_subscription.chatroom.creator]
    respond_to do |format|
      format.json { render json: active_chatroom }
    end
    props = []
    Chatroom.all.to_a.each do |chatroom|
      props << [chatroom, chatroom.messages, chatroom.members, chatroom.creator]
    end
    ActionCable.server.broadcast(
      'chatroom_subscriptions',
      [props, active_chatroom, current_user.id]
    )
  end

  def destroy
    chatroom_subscription = ChatroomSubscription.where(chatroom_id: params[:chatroom_id], user_id: current_user.id)
    chatroom_subscription.first.destroy
    if current_user.chatrooms.count > 0
      chatroom = current_user.chatrooms.first
      default_active_chatroom = [chatroom, chatroom.messages, chatroom.members, chatroom.creator]
    end
    respond_to do |format|
      format.json { render json: default_active_chatroom }
    end
    props = []
    Chatroom.all.to_a.each do |chatroom|
      props << [chatroom, chatroom.messages, chatroom.members, chatroom.creator]
    end
    if current_user.chatrooms.count > 0
      chatroom = current_user.chatrooms.first
      active_chatroom = [chatroom, chatroom.messages, chatroom.members, chatroom.creator]
    else
      active_chatroom = nil
    end
    ActionCable.server.broadcast(
      'chatroom_subscriptions',
      [props, active_chatroom, current_user.id]
    )
  end

  private

  def chatroom_subscription_params
    params.require(:chatroom_subscription).permit(:user_id, :chatroom_id)
  end
end

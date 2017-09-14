class ChatroomSubscriptionsController < ApplicationController
  def create
    new_chatroom_subscription = ChatroomSubscription.new(chatroom_subscription_params)
    new_chatroom_subscription.save
    props = []
    Chatroom.all.to_a.each do |chatroom|
      props << [chatroom, chatroom.messages, chatroom.members, chatroom.creator]
    end
    respond_to do |format|
      format.json { render json: props }
    end
  end

  private

  def chatroom_subscription_params
    params.require(:chatroom_subscription).permit(:user_id, :chatroom_id)
  end
end

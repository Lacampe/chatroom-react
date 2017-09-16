class ChatroomsController < ApplicationController
  def show
    props = [Chatroom.find(params[:id]), Chatroom.find(params[:id]).messages, Chatroom.find(params[:id]).members, Chatroom.find(params[:id]).creator]
    respond_to do |format|
      format.json { render json: props }
    end
  end

  def create
    new_chatroom = Chatroom.new(chatroom_params)
    new_chatroom.creator = current_user
    new_chatroom.save
    ChatroomSubscription.create(user_id: current_user.id, chatroom_id: new_chatroom.id)
    props = []
    Chatroom.all.to_a.each do |chatroom|
      props << [chatroom, chatroom.messages, chatroom.members, chatroom.creator]
    end
    respond_to do |format|
      format.json { render json: props }
    end
  end

  def destroy
    chatroom = Chatroom.find(params[:id])
    chatroom.destroy
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
    ActionCable.server.broadcast(
      'chatrooms',
      props
    )
  end

  private

  def chatroom_params
    params.require(:chatroom).permit(:name, :description)
  end
end

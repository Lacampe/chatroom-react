class ChatroomsController < ApplicationController
  def create
    new_chatroom = Chatroom.new(chatroom_params)
    new_chatroom.creator = current_user
    new_chatroom.save
    props = []
    Chatroom.all.to_a.each do |chatroom|
      props << [chatroom, chatroom.messages]
    end
    respond_to do |format|
      format.json { render json: props }
    end
  end

  private

  def chatroom_params
    params.require(:chatroom).permit(:name, :description)
  end
end

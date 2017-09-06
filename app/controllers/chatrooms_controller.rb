class ChatroomsController < ApplicationController
  def create
    new_chatroom = Chatroom.new(chatroom_params)
    new_chatroom.creator = current_user
    new_chatroom.save
    respond_to do |format|
      format.json { render json: new_chatroom }
    end
  end

  private

  def chatroom_params
    params.require(:chatroom).permit(:name, :description)
  end
end

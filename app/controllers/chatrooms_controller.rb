class ChatroomsController < ApplicationController
  skip_before_action :authenticate_user!
  def create
    new_chatroom = Chatroom.new(chatroom_params)
    new_chatroom.creator = User.find(params['chatroom']['creator_id'])
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

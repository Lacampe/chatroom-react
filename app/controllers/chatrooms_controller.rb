class ChatroomsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_chatroom, only: [:show, :update]

  def show

  end

  def update
    @chatroom.update(chatroom_params)
    respond_to do |format|
      format.json { render json: @chatroom }
    end
  end

  private

  def set_chatroom
    @chatroom = Chatroom.find(params[:id])
  end

  def chatroom_params
    params.require(:chatroom).permit(:name, :description)
  end

end

class ChatroomsController < ApplicationController
  before_action :set_chatroom, only: [:show]

  def show

  end

  private

  def set_chatroom
    @chatroom = Chatroom.find(params[:id])
  end

end

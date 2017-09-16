class PagesController < ApplicationController
  def home
    @chatrooms = []
    Chatroom.all.each do |chatroom|
      @chatrooms << [chatroom, chatroom.messages, chatroom.members, chatroom.creator]
    end

    if current_user.chatrooms.count > 0
      chatroom = current_user.chatrooms.first
      @default_active_chatroom = [chatroom, chatroom.messages, chatroom.members, chatroom.creator]
    end
  end
end

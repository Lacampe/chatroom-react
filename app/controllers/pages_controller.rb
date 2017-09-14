class PagesController < ApplicationController
  def home
    @chatrooms = []
    Chatroom.all.each do |chatroom|
      @chatrooms << [chatroom, chatroom.messages, chatroom.members, chatroom.creator]
    end
  end
end

class PagesController < ApplicationController
  def home
    @chatrooms = Chatroom.all
  end
end

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

    @notifications = []
    current_user.notifications.each do |notification|
      if notification.cleared? == false
        @notifications << [notification, User.find(notification.notifier_id), current_user, Chatroom.find(notification.chatroom_id), notification.category, notification.read?, notification.cleared?]
      end
    end
  end
end

class NotificationsController < ApplicationController
  def mark_all_as_read
    current_user.notifications.each do |notification|
      notification.update(read?: true)
    end
    notifications = []
    current_user.notifications.each do |notification|
      if notification.cleared? == false
        notifications << [notification, User.find(notification.notifier_id), current_user, Chatroom.find(notification.chatroom_id), notification.category, notification.read?, notification.cleared?]
      end
    end
    respond_to do |format|
      format.json { render json: notifications }
    end
  end

  def clear_all
    current_user.notifications.each do |notification|
      notification.update(cleared?: true)
    end
    notifications = []
    current_user.notifications.each do |notification|
      if notification.cleared? == false
        notifications << [notification, User.find(notification.notifier_id), current_user, Chatroom.find(notification.chatroom_id), notification.category, notification.read?, notification.cleared?]
      end
    end
    respond_to do |format|
      format.json { render json: notifications }
    end
  end
end

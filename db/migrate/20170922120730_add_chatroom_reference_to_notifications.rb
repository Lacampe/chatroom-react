class AddChatroomReferenceToNotifications < ActiveRecord::Migration[5.1]
  def change
    add_reference :notifications, :chatroom, foreign_key: true, index: true
  end
end

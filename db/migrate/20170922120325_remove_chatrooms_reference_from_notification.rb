class RemoveChatroomsReferenceFromNotification < ActiveRecord::Migration[5.1]
  def change
    remove_reference :notifications, :chatrooms, index: true
  end
end

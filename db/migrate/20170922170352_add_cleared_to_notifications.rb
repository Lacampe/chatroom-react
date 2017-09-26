class AddClearedToNotifications < ActiveRecord::Migration[5.1]
  def change
    add_column :notifications, :cleared?, :boolean, default: false
  end
end

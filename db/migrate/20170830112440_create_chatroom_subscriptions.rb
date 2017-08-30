class CreateChatroomSubscriptions < ActiveRecord::Migration[5.1]
  def change
    create_table :chatroom_subscriptions do |t|
      t.references :user, foreign_key: true, index: true
      t.references :chatroom, foreign_key: true, index: true

      t.timestamps
    end
  end
end

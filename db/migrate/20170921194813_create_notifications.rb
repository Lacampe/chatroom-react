class CreateNotifications < ActiveRecord::Migration[5.1]
  def change
    create_table :notifications do |t|
      t.references :notifier, foreign_key: { to_table: :users }, index: true
      t.references :notifiee, foreign_key: { to_table: :users }, index: true
      t.references :chatrooms, foreign_key: true, index: true
      t.string :type
      t.boolean :read?

      t.timestamps
    end
  end
end

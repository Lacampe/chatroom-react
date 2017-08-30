class CreateChatrooms < ActiveRecord::Migration[5.1]
  def change
    create_table :chatrooms do |t|
      t.string :name
      t.text :description
      t.references :creator, foreign_key: { to_table: :users }, index: true

      t.timestamps
    end
  end
end

class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.text :body
      t.references :chatroom, foreign_key: true, index: true
      t.references :sender, foreign_key: { to_table: :users }, index: true

      t.timestamps
    end
  end
end

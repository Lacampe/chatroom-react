class AddUsernameToMessage < ActiveRecord::Migration[5.1]
  def change
    add_column :messages, :username, :string
  end
end

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :chatroom_subscriptions
  has_many :chatrooms, through: :chatroom_subscriptions
  has_many :owned_chatrooms, foreign_key: 'creator_id', class_name: 'Chatroom'

end

class Chatroom < ApplicationRecord
  belongs_to :creator, class_name: 'User', foreign_key: 'creator_id'
  has_many :messages, dependent: :destroy
  has_many :chatroom_subscriptions, dependent: :destroy
  has_many :members, through: :chatroom_subscriptions, source: :user
end

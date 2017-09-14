class ChatroomSubscriptionsChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'chatroom_subscriptions'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

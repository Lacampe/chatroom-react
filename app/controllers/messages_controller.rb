class MessagesController < ApplicationController
  def create
    new_message = Message.new(message_params)
    new_message.sender_id = current_user
    new_message.save
  end

  private

  def message_params
    params.require(:message).permit(:body)
  end
end

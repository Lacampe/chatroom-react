class UsersController < ApplicationController
  def go_online
    user = User.find(params[:user][:user_id])
    user.update(online?: true)
    props = []
    User.all.to_a.each do |user|
      if user.online?
        props << user
      end
    end
    ActionCable.server.broadcast(
      'users',
      props
    )
  end

  def go_offline
    user = User.find(params[:user][:user_id])
    user.update(online?: false)
    props = []
    User.all.to_a.each do |user|
      if user.online?
        props << user
      end
    end
    ActionCable.server.broadcast(
      'users',
      props
    )
  end
end

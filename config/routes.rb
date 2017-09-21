Rails.application.routes.draw do

  root to: 'pages#home'

  devise_for :users,
    controllers: { registrations: 'registrations' }

  resources :chatrooms, only: [ :show, :create ] do
    resources :messages, only: [ :create ]
    resources :chatroom_subscriptions, only: [ :create ]
  end

  resources :chatrooms, only: [ :destroy ]
  delete 'chatroom_subscriptions/unsubscribe', to: 'chatroom_subscriptions#destroy'
  patch 'go_online', to: 'users#go_online'
  patch 'go_offline', to: 'users#go_offline'

  mount ActionCable.server => '/cable'

end

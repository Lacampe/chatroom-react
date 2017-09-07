Rails.application.routes.draw do

  root to: 'pages#home'

  devise_for :users,
    controllers: { registrations: 'registrations' }

  resources :chatrooms, only: [ :create ] do
    resources :messages, only: [ :create ]
  end

end

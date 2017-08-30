Rails.application.routes.draw do

  root to: 'pages#home'

  devise_for :users,
    controllers: { registrations: 'registrations' }

  resources :chatrooms, only: [:show]

end

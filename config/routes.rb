Rails.application.routes.draw do
  namespace :api do
      namespace :v1 do
        resources :characters do
          collection do
            get :search_character
            get :total_pages
          end
        end
        get 'categories', to: 'categories#index'
        match '*unmatched_route', :to => 'errors#routing', via: [:all]
      end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "api/v1/characters#index"
  match '*unmatched_route', :to => 'api/v1/errors#routing', via: [:all]
end

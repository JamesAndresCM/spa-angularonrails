class Category < ApplicationRecord
  has_many :characters, dependent: :destroy
end

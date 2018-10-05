class AddCategoryToCharacters < ActiveRecord::Migration[5.2]
  def change
    add_reference :characters, :category, foreign_key: true
  end
end

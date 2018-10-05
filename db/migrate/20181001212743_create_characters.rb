class CreateCharacters < ActiveRecord::Migration[5.2]
  def change
    create_table :characters do |t|
      t.string :name
      t.text :bio
      t.string :img
      t.date :release

      t.timestamps
    end
  end
end

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
10.times{
  Category.create(name: Faker::Company.name)
}

50.times{ 
  Character.create!(name: Faker::StarWars.unique.character, bio: Faker::StarWars.quote, release: Faker::Date.between_except(1.year.ago, 1.year.from_now, Date.today),category_id: Category.all.sample.id)
}

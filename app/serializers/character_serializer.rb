class CharacterSerializer < ActiveModel::Serializer
  include ActionView::Helpers::DateHelper
  attributes :id, :name, :bio, :img, :updated_at, :release
  belongs_to :category

  def updated_at
    distance_of_time_in_words(object.updated_at, Time.now)
  end

  def release
    object.release.strftime("%Y-%m-%d")
  end
end

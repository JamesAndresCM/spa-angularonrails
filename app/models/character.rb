class Character < ApplicationRecord
  belongs_to :category
  before_validation :capitalize_data
  scope :exclude_params, -> { select(self.attribute_names - ["created_at"]) }

  scope :search_data, -> (data) { where("name ilike (?)", "%#{data}%") }

  mount_base64_uploader :img, ImgUploader, file_name: -> (c) { c.name }

  validates :name, presence: true, uniqueness: true, length:  {in: 3..30}
  validates :bio, presence: true, length:  {in: 3..200}
  validates :img, file_size: { in: 100.bytes..1.megabyte }, file_content_type: { allow: ['image/jpeg', 'image/png', 'image/jpg'], mode: :strict }

  def capitalize_data
    self.name = self.name.capitalize if self.name?
    self.bio = self.bio.capitalize if self.bio?
  end

end

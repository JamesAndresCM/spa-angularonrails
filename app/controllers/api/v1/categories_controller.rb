class Api::V1::CategoriesController < ApplicationController
  def index
    @categories = Category.paginate(page: params[:page], per_page: params[:per_page])
    render json: @categories
  end
end

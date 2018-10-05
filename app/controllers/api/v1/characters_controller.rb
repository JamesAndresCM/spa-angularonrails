class Api::V1::CharactersController < ApplicationController
  before_action :set_character, only: [:show, :update, :destroy]

  # GET /characters
  def index
    #@characters = Character.exclude_params.paginate(page: params[:page], per_page: 10).order(updated_at: :desc)
    @characters = Character.exclude_params.paginate(page: params[:page], per_page: 10).order(Arel.sql('greatest(created_at, updated_at) desc'))
    render json: @characters
  end

  # GET /characters/1
  def show
    render json: @character
  end

  # POST /characters
  def create
    @character = Character.new(character_params)

    if @character.save
      render json: { data: @character, msg: "Character #{@character.name} has been created",status: 201 }
    else
      render json: { msg: @character.errors, status: 422 }
    end
  end

  # PATCH/PUT /characters/1
  def update
    if @character.update(character_params)
      render json: { data: @character, msg: "Character #{@character.id} has been updated", status: 200 }
    else
      render json: @character.errors, status: :unprocessable_entity
    end
  end

  # DELETE /characters/1
  def destroy
    @character.destroy
    render json: { msg: "Character id: #{@character.id} has been destroyed", status: 200 }
  end

  def search_character
    unless params[:q].blank?
      sanitize = params[:q].parameterize
      result = Character.search_data(sanitize)
      if result.blank?
        render json: { msg: "#{params[:q]} not found", status: 201 }
      else
        render json: { msg: result, status: 200 } 
      end
    end
  end

  def total_pages
    @total_pages = Character.exclude_params.paginate(page: 1, per_page: 10).total_pages
    render json: @total_pages
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_character
      @character = Character.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def character_params
      params.require(:character).permit(:name, :bio, :img, :release, :studio, :category_id)
    end
end

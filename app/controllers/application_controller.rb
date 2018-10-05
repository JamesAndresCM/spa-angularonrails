class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, :with => :not_found

  def not_found(exception)
      render json: { status: "404", "#{exception.message}": "page not found"}
  end

  rescue_from ActionController::ParameterMissing do |exception|
    render json: { status: 422, "#{exception.param}":"is required"}
  end
end

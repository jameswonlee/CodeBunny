from ..models import db, Coder, User, Review
from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from ..forms.create_review import CreateReviewForm
from sqlalchemy.orm import joinedload
#REVIEWS
# Create a Review for a Coder					POST- "/reviews"
# Eager Load: Users, Coders
# Error Validations: User cannot leave more than 1 review per Coder
# Status code: 201 created ok, 400 error
# Require Auth:  Logged In , userId == project.coder_id and Project.completed = true
# View all Reviews( filter later to get reviews of a Coder)	GET - "/reviews"
# Eager Load: Users, Coders
# Status Code: 200 OK, 404 Not found
# Delete Review for a Coder				DELETE -"/reviews/:reviewId"
# Error Validations: User cannot delete a review that they did not post
# Status Code: 200 OK, 404 Not found
# Require Auth:  Logged In ,Review.user_id == userId
# _____________________________________________________

# Create a new blueprint with name review_routes set to variable
# Key into instance method (route)
review_bp = Blueprint("review_routes", __name__, url_prefix='/api/reviews')


# ******************************    GET ALL REVIEWS   ************************************

# Get all reviews
@review_bp.route("/")
def get_all_reviews():
    all_reviews = Review.query.all()

    response = {}
    if all_reviews:
        for review in all_reviews:
            print(review.to_dict())
            review_obj = review.to_dict()
            response[review_obj["id"]] = review_obj
        return response, 200
    return { "Error": "404 NOT FOUND" }, 404


# ******************************    GET  REVIEW DETAILS BY REVIEW ID   ************************************

# Get review by id - WORKS!
@review_bp.route("/<int:review_id>", methods=["GET"])
def get_review_details(review_id):
    current_review = Review.query.get(review_id)
    if current_review:
        return current_review.to_dict(), 200
    return { "Error": "404 NOT FOUND" }, 404


# ************************************ DELETE REVIEW ON CODER'S PAGE BY REVIEW ID ************

# Delete a coder's review
@review_bp.route("/<int:review_id>", methods=["DELETE"])
@login_required
def delete_review(review_id):

    current_review = Review.query.filter(Review.id==review_id).first()

    if current_review:
        db.session.delete(current_review)
        db.session.commit()

        return "succesfully deleted"
    return { "Error": "404 review not found" }, 404

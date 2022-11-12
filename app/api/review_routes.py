from ..models import db, Coder, User, Review
from flask import Blueprint, render_template, url_for, redirect, request, jsonify



#REVIEWS
# Create a Review for a Coder					POST- “/reviews”
# Eager Load: Users, Coders	
# Error Validations: User cannot leave more than 1 review per Coder
# Status code: 201 created ok, 400 error
# Require Auth:  Logged In , userId == project.coder_id and Project.completed = true
# View all Reviews( filter later to get reviews of a Coder)	GET - “/reviews”
# Eager Load: Users, Coders
# Status Code: 200 OK, 404 Not found
# Delete Review for a Coder				DELETE -”/reviews/:reviewId”
# Error Validations: User cannot delete a review that they did not post
# Status Code: 200 OK, 404 Not found
# Require Auth:  Logged In ,Review.user_id == userId
# _____________________________________________________

# Create a new blueprint with name review_routes set to variable
# Key into instance method (route)
review_bp = Blueprint("review_routes", __name__, url_prefix='/api/reviews')

@review_bp.route("/")
def get_all_reviews():
    all_reviews = Review.query.all()
    response = {}
    if all_reviews:
        for review in all_reviews:
            review_obj = review.to_dict()
            response[review_obj["id"]] = review_obj
        return response, 200
    return "404 NOT FOUND", 404

@review_bp.route("/new", methods=["POST"])
def create_new_review():
    
    return 



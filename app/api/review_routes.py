from ..models import db, Coder, User, Review
from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from ..forms.create_review import CreateReviewForm

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

#  route to get all reviews
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


# route to create a new review
@review_bp.route("/new", methods=["POST"])
# @login_required
def create_new_review():
    # create a new instance of reviewform
    new_review_form = CreateReviewForm()

    # if the form passes all validations and is submitted succesfully...
    if new_review_form.validate_on_submit:

        #  key into form's response data(user's input) and save all the data to a variable
        review_data = new_review_form.data
        print(new_review_form.data)

        # Create a NEW INSTANCE of a review and populate it with the user's saved review data
        # new_review = Review()
        # new_review.populate_obj(review_data)

        coders = Coder.query.all()
        coder_id = 0
        if coders:
            for coder in coders:
                coder_obj = coder.to_dict()
                if coder_obj["name"] == review_data.coder:
                    coder_id = coder_obj["id"]
                continue
            return coder_id
    else:
        return {"message": "bad data"}



        # another way to do this:
        new_review = Review(rating= review_data["rating"],review=review_data["review"], user_id=1, coder=coder_id)
        
        # add the newly created review and save it to the database
        db.session.add(new_review)
        db.session.commit()

        new_review_obj = new_review.to_dict()
        # response = {
        #    new_review_obj
        # }

        # return new_review
        # redirect to the homepage
        return new_review_obj, 201

    return "Error with submission", 302

from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from ..models import Coder, Project, Skill, User, Review, db
from ..forms.create_coder import CreateCoderForm
from flask_login import current_user, login_user, logout_user, login_required
from ..forms.create_review import CreateReviewForm
coder_bp = Blueprint("coder_routes", __name__, url_prefix="/api/coders")

# Get all coders
@coder_bp.route("/", methods=["GET"])
def get_all_coder():
    # ADD EAGER LOADING OF FIRSTNAME LAST NAME FROM USERS TABLES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    all_coders = Coder.query.all()
    response = {}
    if all_coders:
        for coder in all_coders:
            # print('coder', coder)
            coder_obj = coder.to_dict()
            # print('coder_obj', coder_obj)
            response[coder_obj["id"]] = coder_obj
        return response, 200
    # Needs better error handling
    return "404 NOT FOUND", 404

# Get coder by coder_id
@coder_bp.route("/<int:coder_id>", methods=["GET"])
def get_coder_profile(coder_id):
    # print('coderId', coder_id)
    # ADD EAGER LOADING OF FIRSTNAME LAST NAME FROM USERS TABLES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    coder = Coder.query.filter(Coder.id == coder_id).first()


    coder_user = User.query.filter(User.id == coder_id).first()

    if coder:
        print('coder*********', coder)
        coder_obj = coder.to_dict()
        coder_user_obj = coder_user.to_dict()
        print('coder_user_obj', coder_user_obj)
        result = {**coder_obj, **coder_user_obj}
        response = {}
        response[coder_obj["id"]] = result

        return response
    # Need to redo error handling
    return "Coder not found", 404


# Create new coder
@coder_bp.route("/new", methods = ["POST"])
# @login_required
def create_coder():

    print("did this run 1")
    new_coder_form = CreateCoderForm()
    print("did this run 2")
    #ask what this means
    new_coder_form['csrf_token'].data = request.cookies['csrf_token']

    #why is invocation of validate_onsubmit not working??
    if new_coder_form.validate_on_submit():
        print("did this run")
        coder_data = new_coder_form.data
        print("Coder data is", coder_data)
        new_coder = Coder()
        new_coder_form.populate_obj(new_coder)
        #hardcoded
        new_coder.user_id = 2
        #this will work if we have a user logged in. currently doesn't work on postman
        # new_coder.user_id = current_user.id
        db.session.add(new_coder)
        print("did this run 4")
        db.session.commit() #breaking here
        print("did this run 5")

        new_coder_obj = new_coder.to_dict()
        # ADD EAGER LOADING OF FIRSTNAME LAST NAME FROM USERS TABLES/logged in user session and ADD TO RESPONSE OBJECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return new_coder_obj, 201

    return {"error": "validation error"}, 401






# route to create a new review
@coder_bp.route("/<int:coder_id>/reviews/new", methods=["POST"])
# @login_required
def create_new_review(coder_id):

    # create a new instance of reviewform
    new_review_form = CreateReviewForm()
    new_review_form['csrf_token'].data = request.cookies['csrf_token']
    # if the form passes all validations and is submitted succesfully...
    if new_review_form.validate_on_submit():

        # key into form's response data(user's input) and save all the data to a variable
        review_data = new_review_form.data
        print(new_review_form.data)

        # Create a NEW INSTANCE of a review and populate it with the user's saved review data
        new_review = Review()
        new_review_form.populate_obj(new_review)


        # find the coder from db that matches the id from params
        current_coder = Coder.query.filter(Coder.id == coder_id).first()
        print("current coder",current_coder)


        new_review = Review(rating= review_data["rating"],review=review_data["review"], user_id=1, coder_id=current_coder.id)

        # add the newly created review and save it to the database
        db.session.add(new_review)
        db.session.commit()

    # ADD EAGER LOADING OF FIRSTNAME LAST NAME FROM USERS TABLES and add to response obj!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        new_review_obj = new_review.to_dict()
        return new_review_obj, 201

    return "Error with submission", 302


# @review_bp.route("/reviews/<int:review_id>", methods=["DELETE"])
# def delete_review(review_id):

#     current_review = Review.query.get(Review.id==review_id)

#     if current_review:
#         db.session.delete(current_review)
#         db.session.commit()

#         return "succesfully deleted"
#     return "404 review not found"
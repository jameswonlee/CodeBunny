from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from ..models import Coder, Project, Skill, User, Review, db, coder_skills
from ..forms.create_coder import CreateCoderForm
from flask_login import current_user, login_user, logout_user, login_required
from ..forms.create_review import CreateReviewForm
from sqlalchemy.ext.declarative import declarative_base

Base=declarative_base()



coder_bp = Blueprint("coder_routes", __name__, url_prefix="/api/coders")

# Get all coders
@coder_bp.route("/", methods=["GET"])
def get_all_coder():

    all_coders = Coder.query.all()
    response = {}

    if all_coders:
        for coder in all_coders:
            coder_obj = coder.to_dict()
            response[coder_obj["id"]] = coder_obj

        return response, 200

    return {"error":"404 Not Found"}, 404


# Get coder by coder_id
@coder_bp.route("/<int:coder_id>", methods=["GET"])
def get_coder_profile(coder_id):

    coder = Coder.query.filter(Coder.id == coder_id).first()

    if coder:
        coder_obj = coder.to_dict()
        response = {}
        response[coder_obj["id"]] = coder_obj

        return response

    return {"error":"404 Not Found"}, 404


# Create new coder
@coder_bp.route("/new", methods = ["POST"])
# @login_required
def create_coder():

    create_coder_form = CreateCoderForm()

    create_coder_form['csrf_token'].data = request.cookies['csrf_token']


    if create_coder_form.validate_on_submit:

        coder = Coder()

        create_coder_form.populate_obj(coder)

        coder.user_id = 5
        selected_skills=[Skill.query.filter(Skill.skill_name == skill).first() for skill in create_coder_form.data["skills"]]
        coder.skills = selected_skills

        new_coder_obj = coder.to_dict()
        print("coder obj",new_coder_obj)
        db.session.add(coder)
        db.session.commit()


        return new_coder_obj, 201

    return {"error": "validation error"}, 401



# route to create a new review
@coder_bp.route("/<int:coder_id>/reviews/new", methods=["POST"])
@login_required
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


        new_review = Review(rating= review_data["rating"],review=review_data["review"], user_id=current_user.id, coder_id=current_coder.id)

        # add the newly created review and save it to the database
        db.session.add(new_review)
        db.session.commit()

    # ADD EAGER LOADING OF FIRSTNAME LAST NAME FROM USERS TABLES and add to response obj!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        new_review_obj = new_review.to_dict()
        return new_review_obj, 201

    return "Error with submission", 302


# Delete coder review
@coder_bp.route("/reviews/<int:review_id>", methods=["DELETE"])
@login_required
def delete_review(review_id):

    current_review = Review.query.get(Review.id==review_id)

    if current_review:
        db.session.delete(current_review)
        db.session.commit()

        return "succesfully deleted"
    return "404 review not found"


# Edit coder profile by coder_id
@coder_bp.route("/<int:coder_id>", methods=["PUT"])
@login_required
def edit_coder(coder_id):

    edit_coder_form = CreateCoderForm()
    #ask what this means
    edit_coder_form['csrf_token'].data = request.cookies['csrf_token']

    #why is invocation of validate_onsubmit not working??
    if edit_coder_form.validate_on_submit():
        coder = Coder.query.get(coder_id)
        print('coder', coder)
        edit_coder_form.populate_obj(coder)
        #this will work if we have a user logged in. currently doesn't work on postman
        # coder.user_id = current_user.id
        db.session.add(coder)
        db.session.commit() #breaking here

        new_coder_obj = coder.to_dict()
        # ADD EAGER LOADING OF FIRSTNAME LAST NAME FROM USERS TABLES/logged in user session and ADD TO RESPONSE OBJECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return new_coder_obj, 201
    return {"error": "validation error"}, 401


# Delete coder profile
@coder_bp.route("/<int:coder_id>", methods=["DELETE"])
@login_required
def delete_coder(coder_id):

    coder = Coder.query.get(coder_id)

    if coder:
        db.session.delete(coder)
        db.session.commit()

        return "Coder succesfully deleted", 200

    return "404 coder not found", 404

from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from ..models import Coder, Project, Skill, User, Review, db, coder_skills
from ..forms.create_coder import CreateCoderForm
from flask_login import current_user, login_user, logout_user, login_required
from ..forms.create_review import CreateReviewForm
from sqlalchemy.ext.declarative import declarative_base

# ************************************************************************************************

Base=declarative_base()

coder_bp = Blueprint("coder_routes", __name__, url_prefix="/api/coders")

# ************************************ CODER ROUTES ***********************************************
# *************************************************************************************************



# ************************************ GET ALL CODERS ***********************************************

# Get all coders - WORKING
@coder_bp.route("/", methods=["GET"])
def get_all_coder():
    all_coders = Coder.query.all()
    response = []

    if all_coders:
        for coder in all_coders:
            coder_obj = coder.to_dict()
            response.append(coder_obj)

        return{"Coders": response}, 200

    return {"Error":"404 Not Found"}, 404


# ************************************ GET CODER DETAILS BY CODER ID ***********************************************

# Get coder by coder_id - NOT WORKING
@coder_bp.route("/<int:coder_id>", methods=["GET"])
def get_coder_profile(coder_id):

    coder = Coder.query.filter(Coder.id == coder_id).first()
    coder_user = User.query.filter(User.id == coder.user_id).first()
    # skills = Skill.query.filter.all()
    # projects = Project.query.filter(Project.coder_id == coder_id).all()
    # coder_projects = [project.to_dict() for project in projects]

    if coder:
        coder_obj = coder.to_dict()
        coder_user_obj = coder_user.to_dict()
        result = {**coder_obj, **coder_user_obj}
        response = {}
        response[coder_obj["id"]] = result
        return response

    return { "Error": "Coder not found" }, 404


# # Get coder by coder_id
# @coder_bp.route("/<int:coder_id>", methods=["GET"])
# def get_coder_profile(coder_id):

#     coder = Coder.query.filter(Coder.id == coder_id).first()

#     if coder:
#         coder_obj = coder.to_dict()
#         response = {}
#         response[coder_obj["id"]] = coder_obj

#         return response

#     return {"error":"404 Not Found"}, 404


# ************************************ CREATE NEW CODER ***********************************************

# Create new coder - WORKING
@coder_bp.route("/new", methods = ["POST"])
@login_required
def create_coder():

    create_coder_form = CreateCoderForm()
    create_coder_form['csrf_token'].data = request.cookies['csrf_token']

    if create_coder_form.validate_on_submit():
        coder = Coder()
        data = create_coder_form.data
        coder = Coder(
                        user_id=current_user.id,
                        bio = data["bio"],
                        experience = data["experience"],
                        daily_rate = data["daily_rate"],
                        skills=[Skill.query.filter(Skill.skill_name == skill).first() for skill in data["skills"]],
                        )

        new_coder_obj = coder.to_dict()
        db.session.add(coder)
        db.session.commit()
        return new_coder_obj, 201

    return {"Error": "Validation Error"}, 401


# ************************************ CREATE A REVIEW BY CODER ID ***********************************************

# route to create a new review - WORKING
@coder_bp.route("/<int:coder_id>/reviews/new", methods=["POST"])
@login_required
def create_new_review(coder_id):

    # create a new instance of reviewform
    new_review_form = CreateReviewForm()
    new_review_form['csrf_token'].data = request.cookies['csrf_token']

    if new_review_form.validate_on_submit():

        review_data = new_review_form.data
        print(new_review_form.data)

        new_review = Review()
        new_review_form.populate_obj(new_review)

        current_coder = Coder.query.filter(Coder.id == coder_id).first()
        print("current coder",current_coder)

        new_review = Review(rating= review_data["rating"],review=review_data["review"], user_id=current_user.id, coder_id=current_coder.id)

        db.session.add(new_review)
        db.session.commit()

        new_review_obj = new_review.to_dict()
        return new_review_obj, 201

    return { "Error": "Validation Error" }, 400

# ***************************************   EDIT CODER BY CODER ID  ***************************************************

#Edit Coder details - WORKING
@coder_bp.route("/<int:coder_id>", methods=["PUT"])
@login_required
def edit_coder(coder_id):
    edit_coder_form = CreateCoderForm()

    edit_coder_form['csrf_token'].data = request.cookies['csrf_token']

    if edit_coder_form.validate_on_submit():
        data = edit_coder_form.data
        new_skills_query = [Skill.query.filter(Skill.skill_name == skill).first() for skill in data["skills"]]
        coder = Coder.query.get(coder_id)

        coder_obj = coder.to_dict()

        coder.skills = new_skills_query
        coder.bio = data["bio"]
        coder.experience = data["experience"]
        coder.daily_rate = data["daily_rate"]

        db.session.commit()

        new_coder_obj = coder.to_dict()

        return new_coder_obj, 201

    return {"Error": "Validation Error"}, 401

# ************************************   DELETE CODER BY CODER ID   ******************************************************

# Delete coder profile - WORKING
@coder_bp.route("/<int:coder_id>", methods=["DELETE"])
@login_required
def delete_coder(coder_id):

    coder = Coder.query.get(coder_id)

    if coder:
        db.session.delete(coder)
        db.session.commit()

        return {"message" : "Coder succesfully deleted"}, 200

    return {"Error": "404 Coder Not Found"}, 404

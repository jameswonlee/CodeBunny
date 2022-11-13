from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from ..models import Coder, Project, Skill, User, Review, db
from ..forms.create_coder import CreateCoderForm
from flask_login import current_user, login_user, logout_user, login_required

coder_bp = Blueprint("coder_routes", __name__, url_prefix="/api/coders")

# Get all coders
@coder_bp.route("/", methods=["GET"])
def get_all_coder():
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
        return new_coder_obj, 201

    return {"error": "validation error"}, 401






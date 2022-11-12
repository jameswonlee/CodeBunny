from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from ..models import Coder, Project, Skill, User, Review

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


# Create coder
@coder_bp.route("/")
def new_coder():





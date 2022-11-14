from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from ..models import Coder, Project, Skill, User, Review, db
from flask_login import current_user, login_user, logout_user, login_required


project_bp = Blueprint("project_routes", __name__, url_prefix="/api/projects")

# Get all projects
@project_bp.route("/", methods=["GET"])
def all_projects():
    projects = Project.query.all()
    response = {}
    if projects:
        for project in projects:
            project_obj = project.to_dict()
            response[project_obj["id"]] = project_obj
        return response, 200
    return {"Error": "Project Not Found"}, 404


# Get all of a coder's projects
@project_bp.route("/current", methods=["GET"])
def users_projects():
    projects = Project.query.filter(current_user.id == Project.user_id).all()

    response = {}
    if projects:
        for project in projects:

            project_obj = project.to_dict()

            print("currentuser", current_user)
            user_details = User.query.filter(User.id == current_user.id).first()
            coder_details = Coder.query.filter(Coder.id == project.coder_id).first()

            project_obj["User"]=user_details.to_dict()
            project_obj["Coder"]=coder_details.to_dict()

            response = {
                project_obj["id"]: project_obj,
            }

        return response, 200
    return {"Error": "Your Projects Not Found"}, 404


# # Get project by project_id
@project_bp.route("/<int:project_id>/", methods=["GET"])
def get_project_details(project_id):

    project = Project.query.filter(project_id == Project.id).first()

    if project:
        project_obj = project.to_dict()
        # we get projecT_skills' skills automatically
        return project_obj

    return "404 Project not found", 404


@project_bp.route("/<int:project_id>/", methods=["DELETE"])
def delete_project(project_id):
    current_project = Project.query.get(project_id)
    if current_project:
        # print("IS IT HITTING THIS DELETE")
        db.session.delete(current_project)
        db.session.commit()
        return "succesfully deleted"
    return "404 review not found"

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


# # Get project by project_id
# @project_bp.route("/<int:project_id>", methods=["GET"])
# def get_project_details(project_id):
#     project = Project.query.get(project_id)
#     skills = Skill.query.all(project_id == )

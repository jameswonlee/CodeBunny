from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from ..models import Coder, Project, Skill, User, Review, db
from flask_login import current_user, login_user, logout_user, login_required
from ..forms.create_project import CreateProjectForm
# from app.seeds.users import skills1, skills2, skills3, skills4, skills5, skills6, skills7

project_bp = Blueprint("project_routes", __name__, url_prefix="/api/projects")


skill_options = {
    "Python":{'id':1,'skill_name':'Python'},
    "Javascript":{'id':2, 'skill_name':'Javascript'},
    "C++":{'id':3, 'skill_name':'C++'},
    "Ruby":{'id':4, 'skill_name':'Ruby'},
    "Java":{'id':5, 'skill_name':'Java'},
    "React":{'id':6, 'skill_name':'React'},
    "Camel":{'id':7, 'skill_name':'Camel'}
}

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
# @project_bp.route("/current", methods=["GET"])
# def users_projects():
#     projects = Project.query.filter(current_user.id == Project.user_id).all()

#     response = {}
#     if projects:
#         for project in projects:

#             project_obj = project.to_dict()

#             print("currentuser", current_user)
#             user_details = User.query.filter(User.id == current_user.id).first()
#             coder_details = Coder.query.filter(Coder.id == project.coder_id).first()

#             project_obj["User"]=user_details.to_dict()
#             project_obj["Coder"]=coder_details.to_dict()

#             response = {
#                 project_obj["id"]: project_obj,
#             }

#         return response, 200
#     return {"Error": "Your Projects Not Found"}, 404


# # Get project by project_id
# @project_bp.route("/<int:project_id>/", methods=["GET"])
# def get_project_details(project_id):

#     project = Project.query.filter(project_id == Project.id).first()

#     if project:
#         project_obj = project.to_dict()
#         # we get projecT_skills' skills automatically
#         return project_obj

#     return "404 Project not found", 404


@project_bp.route("/<int:project_id>/", methods=["DELETE"])
def delete_project(project_id):
    current_project = Project.query.get(project_id)
    if current_project:
        # print("IS IT HITTING THIS DELETE")
        db.session.delete(current_project)
        db.session.commit()
        return "succesfully deleted"
    return "404 review not found"

#function to convert datetime obj to integer value so we can compare
def to_integer(dt_time):
    return 10000*dt_time.year + 100*dt_time.month + dt_time.day

# Create project
@project_bp.route("/new/", methods=["POST"])
# @login_required
def create_project():

    create_project_form = CreateProjectForm()
    #ask what this means
    create_project_form['csrf_token'].data = request.cookies['csrf_token']

    #why is invocation of validate_onsubmit not working??
    if create_project_form.validate_on_submit:
        new_project = Project()
        data = create_project_form.data

        new_project = Project(name=data["name"],
                              description=data["description"],
                            #   skills=[skill_options[data["skills"]]],
                            skills=[Skill.query.filter(Skill.skill_name == skill).first() for skill in data["skills"]],
                              start_date=data["start_date"],
                              end_date=data["end_date"])

        #hardcoded
        new_project.user_id = 1
        new_project.coder_id = 2

        all_projects = Project.query.filter(Project.coder_id == new_project.coder_id).all()
        print("all projects is!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", all_projects)
        print("is it of type", type(all_projects))
        startDate = to_integer(data["start_date"])
        # print("THIS IS START DATE", startDate)
        endDate = to_integer(data["end_date"])
        for project in all_projects:
            if((to_integer(project.start_date) >= startDate and to_integer(project.end_date) <= endDate)
                or (to_integer(project.start_date) <= startDate and to_integer(project.end_date) >= endDate)
                # or (to_integer(project.start_date) >= startDate and to_integer(project.end_date) >= endDate)
                or (to_integer(project.start_date)<= startDate and to_integer(project.end_date) <= endDate)):

                return {"error": "The coder is booked for these dates"}, 401
                # print("THIS IS INPUTED START DATE", to_integer(project.start_date))
               
                
        
            else:
                db.session.add(new_project)
                db.session.commit()

                new_project_obj = new_project.to_dict()
                return new_project_obj, 201
        # ADD EAGER LOADING OF FIRSTNAME LAST NAME FROM USERS TABLES/logged in user session and ADD TO RESPONSE OBJECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                


    return {"error": "validation error"}, 401


# Edit project by project_id
@project_bp.route("/<int:project_id>/", methods=["PUT"])
# @login_required
def edit_project(project_id):

    edit_project_form = CreateProjectForm()
    #ask what this means
    edit_project_form['csrf_token'].data = request.cookies['csrf_token']

    #why is invocation of validate_onsubmit not working??
    if edit_project_form.validate_on_submit:
        project = Project.query.get(project_id)
        print("this is project!!!!!!!!!!!!!!!!!!!@#$!#$!", project)
        data = edit_project_form.data

        project = Project(name=data["name"],
                              description=data["description"],
                            #   skills=[skill_options[data["skills"]]],
                            skills=[Skill.query.filter(Skill.skill_name == skill).first() for skill in data["skills"]],
                              start_date=data["start_date"],
                              end_date=data["end_date"])

        #hardcoded
        project.user_id = 2
        project.coder_id = 3
        db.session.add(project)
        db.session.commit()

        new_project_obj = project.to_dict()
        # ADD EAGER LOADING OF FIRSTNAME LAST NAME FROM USERS TABLES/logged in user session and ADD TO RESPONSE OBJECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return new_project_obj, 201
    return {"error": "validation error"}, 401

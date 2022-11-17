from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from ..models import Coder, Project, Skill, User, Review, db
from flask_login import current_user, login_user, logout_user, login_required
from ..forms.create_project import CreateProjectForm
# from app.seeds.users import skills1, skills2, skills3, skills4, skills5, skills6, skills7

project_bp = Blueprint("project_routes", __name__, url_prefix="/api/projects")


skill_options = {
    "Python": {'id': 1, 'skill_name': 'Python'},
    "Javascript": {'id': 2, 'skill_name': 'Javascript'},
    "C++": {'id': 3, 'skill_name': 'C++'},
    "Ruby": {'id': 4, 'skill_name': 'Ruby'},
    "Java": {'id': 5, 'skill_name': 'Java'},
    "React": {'id': 6, 'skill_name': 'React'},
    "Camel": {'id': 7, 'skill_name': 'Camel'}
}

# Get all projects


@project_bp.route("/", methods=["GET"])
def all_projects():
    projects = Project.query.all()
    response = []
    if projects:
        for project in projects:
            project_obj = project.to_dict()
            response.append(project_obj)
        print("THIS IS PROJECTS FROM BACKEND",response )
        return {
            "Projects":response
        }, 200
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

# function to convert datetime obj to integer value so we can compare


def to_integer(date_time):
    return 10000*date_time.year + 100*date_time.month + date_time.day


#Create project part 1 - only description, skills, start date, end date

@project_bp.route("/new-1/", methods = ["POST"]) # CODER ID = NONE
@login_required
def create_project_part1():
    create_project_form = CreateProjectForm()
    create_project_form['csrf_token'].data = request.cookies['csrf_token']
    print("current user is !!!!!", current_user)
    if create_project_form.validate_on_submit:
        data = create_project_form.data
        new_project = Project(name=data["name"],
                              description=data["description"],
                              skills=[Skill.query.filter(
                                  Skill.skill_name == skill).first() for skill in data["skills"]],
                              start_date=data["start_date"],
                              end_date=data["end_date"],
                              user_id = current_user.id,
                              coder_id = 1) #changed this to 1 from 0


        db.session.add(new_project)
        db.session.commit()

        new_project_obj = new_project.to_dict_without_coder()
        return new_project_obj, 201

@project_bp.route("/new-2/<int:project_id>/<int:coder_id>/", methods = ["POST"]) # HAS CODER ID NOW
#@login_required
def create_project_part2(project_id, coder_id):
    current_project = Project.query.get(project_id)
    current_project.coder_id = coder_id

    db.session.commit()
    current_project_obj = current_project.to_dict()
    return current_project_obj, 201







# Create project

# @project_bp.route("/new/", methods=["POST"])
# # @login_required
# def create_project():

#     create_project_form = CreateProjectForm()
#     # ask what this means
#     create_project_form['csrf_token'].data = request.cookies['csrf_token']

#     # why is invocation of validate_onsubmit not working??
#     if create_project_form.validate_on_submit:

#         data = create_project_form.data

#         all_projects = Project.query.filter(
#             Project.coder_id == new_project.coder_id).all() #hardcoded
#         print("all projects is!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", all_projects)
#         print("is it of type", type(all_projects))
#         startDate = to_integer(data["start_date"])
#         print("THIS IS START DATE", startDate)
#         print("This is other start date",
#               to_integer(all_projects[0].start_date))
#         endDate = to_integer(data["end_date"])
#         for one_project in all_projects:
#             print("this is a start date in db",
#                   to_integer(one_project.start_date))
#             if ((to_integer(one_project.start_date) == startDate)
#                     or (to_integer(one_project.end_date) == endDate)
#                     or (startDate >= to_integer(one_project.start_date) and endDate <= to_integer(one_project.end_date))
#                     or (startDate <= to_integer(one_project.start_date) and endDate >= to_integer(one_project.end_date))
#                     or (startDate >= to_integer(one_project.start_date) and startDate <= to_integer(one_project.end_date) and endDate >= to_integer(one_project.end_date))
#                     or (startDate <= to_integer(one_project.start_date) and endDate >= to_integer(one_project.start_date) and endDate <= to_integer(one_project.end_date))
#                     ):
#                 print("IS THIS HITTING")
#                 return {"error": "The coder is booked for these dates"}, 401
#                 # print("THIS IS INPUTED START DATE", to_integer(project.start_date))
#             else:
#                 new_project = Project(name=data["name"],
#                                       description=data["description"],
#                                       #   skills=[skill_options[data["skills"]]],
#                                       skills=[Skill.query.filter(
#                                           Skill.skill_name == skill).first() for skill in data["skills"]],
#                                       start_date=data["start_date"],
#                                       end_date=data["end_date"])

#                 # hardcoded
#                 new_project.user_id = 1
#                 # new_project.coder_id = 2

#                 db.session.add(new_project)
#                 db.session.commit()

#                 new_project_obj = new_project.to_dict()
#                 return new_project_obj, 201
#         # ADD EAGER LOADING OF FIRSTNAME LAST NAME FROM USERS TABLES/logged in user session and ADD TO RESPONSE OBJECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

#     return {"error": "validation error"}, 401


# Edit project by project_id
@project_bp.route("/<int:project_id>/", methods=["PUT"])
# @login_required
def edit_project(project_id):

    edit_project_form = CreateProjectForm()
    # ask what this means
    edit_project_form['csrf_token'].data = request.cookies['csrf_token']

    # why is invocation of validate_onsubmit not working??
    if edit_project_form.validate_on_submit:


        data = edit_project_form.data
        new_skills_query = [Skill.query.filter(
            Skill.skill_name == skill).first() for skill in data["skills"]]


        project = Project.query.get(project_id)

        #availability logic
        all_projects = Project.query.filter(Project.coder_id == project.coder_id).all()
        print("all projects is!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", all_projects)
        # print("is it of type", type(all_projects))
        startDate = to_integer(data["start_date"])
        # print("THIS IS START DATE", startDate)
        endDate = to_integer(data["end_date"])
        for one_project in all_projects:
            print("this is a start date in db",
                  to_integer(one_project.start_date))
            if ((to_integer(one_project.start_date) == startDate)
                    or (to_integer(one_project.end_date) == endDate)
                    or (startDate >= to_integer(one_project.start_date) and endDate <= to_integer(one_project.end_date))
                    or (startDate <= to_integer(one_project.start_date) and endDate >= to_integer(one_project.end_date))
                    or (startDate >= to_integer(one_project.start_date) and startDate <= to_integer(one_project.end_date) and endDate >= to_integer(one_project.end_date))
                    or (startDate <= to_integer(one_project.start_date) and endDate >= to_integer(one_project.start_date) and endDate <= to_integer(one_project.end_date))
                    ):
                print("IS THIS HITTING")
                return {"error": "The coder is booked for these dates"}, 401

            else:
                # db.session.add(project)
                project.name = data["name"]
                project.description = data["description"]
                project.skills = new_skills_query
                project.start_date = data["start_date"]
                project.end_date = data["end_date"]
                db.session.commit()

                new_project_obj = project.to_dict()
                return new_project_obj, 201
        # ADD EAGER LOADING OF FIRSTNAME LAST NAME FROM USERS TABLES/logged in user session and ADD TO RESPONSE OBJECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    return {"error": "validation error"}, 401

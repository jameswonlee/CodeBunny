from flask_wtf import FlaskForm
from app.models import db, User, Review, Coder, Skill
from wtforms import StringField, SelectField, SubmitField, IntegerField, FloatField, DateField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user, login_user, logout_user, login_required
# from seeds.users import *
skills1 = Skill(skill_name = "Python")
skills2 = Skill(skill_name = "Javascript")
skills3 = Skill(skill_name = "C++" )
skills4 = Skill(skill_name = "Ruby")
skills5 = Skill(skill_name = "Java")
skills6 = Skill(skill_name = "React")
skills7 = Skill(skill_name = "Camel")

skill_options = {
    "Python":skills1,
    "Javascript":skills2,
    "C++":skills3,
    "Ruby":skills4,
    "Java":skills5,
    "React":skills6,
    "Camel":skills7
}

class CreateProjectForm(FlaskForm):
    name = StringField("Name of Project", validators = [DataRequired()])
    description = StringField("Describe the Project", validators = [DataRequired()])
    skills = SelectField("Skills required", choices=[('skills1', 'Python'), ('skills2', 'Javascript'), ('skills3', 'C++'), ('skills4', 'Ruby'), ('skills5', 'Java'), ('skills6', 'React'), ('skills7', 'Camel')], validators = [DataRequired()])
    start_date = DateField('Start Date', validators = [DataRequired()])
    end_date  = DateField('End Date', validators = [DataRequired()])
    submit = SubmitField('Create your Project')

from flask_wtf import FlaskForm
from app.models import db, User, Review, Coder, Skill
from wtforms import StringField, SelectMultipleField, SubmitField, IntegerField, FloatField, DateField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user, login_user, logout_user, login_required
# from app.seeds.users import skills1, skills2, skills3, skills4, skills5, skills6, skills7


skill_options = {
    "Python":{'id':1,'skill_name':'Python'},
    "Javascript":{'id':2, 'skill_name':'Javascript'},
    "C++":{'id':3, 'skill_name':'C++'},
    "Ruby":{'id':4, 'skill_name':'Ruby'},
    "Java":{'id':5, 'skill_name':'Java'},
    "React":{'id':6, 'skill_name':'React'},
    "Camel":{'id':7, 'skill_name':'Camel'}
}

class CreateProjectForm(FlaskForm):
    name = StringField("Name of Project", validators = [DataRequired()])
    description = StringField("Describe the Project", validators = [DataRequired()])
    # skills = SelectMultipleField("Skills required", choices=[('skills1', 'Python'), ('skills2', 'Javascript'), ('skills3', 'C++'), ('skills4', 'Ruby'), ('skills5', 'Java'), ('skills6', 'React'), ('skills7', 'Camel')], validators = [DataRequired()])
    skills = SelectMultipleField("Skills required", choices=["Python", "Javascript"], validators = [DataRequired()])
    start_date = DateField('Start Date', validators = [DataRequired()])
    end_date  = DateField('End Date', validators = [DataRequired()])
    submit = SubmitField('Create your Project')

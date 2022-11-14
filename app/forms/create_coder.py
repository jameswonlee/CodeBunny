from flask_wtf import FlaskForm
from app.models import db, User, Review, Coder
from wtforms import StringField, SelectField, SubmitField, SelectMultipleField,IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user, login_user, logout_user, login_required


# skill_options = {
#     "Python":{'id':1,'skill_name':'Python'},
#     "Javascript":{'id':2, 'skill_name':'Javascript'},
#     "C++":{'id':3, 'skill_name':'C++'},
#     "Ruby":{'id':4, 'skill_name':'Ruby'},
#     "Java":{'id':5, 'skill_name':'Java'},
#     "React":{'id':6, 'skill_name':'React'},
#     "Camel":{'id':7, 'skill_name':'Camel'}
# }

# skill_options = [("skill1", "Python"), ("skill2", "Javascript"), ("skill3", "C++")]

class CreateCoderForm(FlaskForm):
    bio = StringField("About Me", validators = [DataRequired()])
    experience = StringField("Prior Experience", validators = [DataRequired()])
    daily_rate = IntegerField("Daily Rate", validators= [DataRequired()])
    submit = SubmitField('Create your Profile'),
    skills = SelectMultipleField('Select Skills', validators=[DataRequired()], choices=["Python", "Javacript"])

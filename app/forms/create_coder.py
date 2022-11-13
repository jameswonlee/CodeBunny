from flask_wtf import FlaskForm
from app.models import db, User, Review, Coder
from wtforms import StringField, SelectField, SubmitField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user, login_user, logout_user, login_required

class CreateCoderForm(FlaskForm):
    bio = StringField("About Me", validators = [DataRequired()])
    experience = StringField("Prior Experience", validators = [DataRequired()])
    daily_rate = IntegerField("Daily Rate", validators= [DataRequired()])
    submit = SubmitField('Create your Profile')


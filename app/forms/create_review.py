from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import User, Review
from flask_login import current_user, login_user, logout_user, login_required


class ReviewForm(FlaskForm):
    review = StringField("Your Review", validators=[DataRequired()])


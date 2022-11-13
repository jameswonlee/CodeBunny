from flask_wtf import FlaskForm
from app.models import db, User, Review, Coder
from wtforms import StringField, SelectField, SubmitField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user, login_user, logout_user, login_required


ratings = [1,2,3,4,5,6,7,8,9,10]


class CreateReviewForm(FlaskForm):
    review = StringField("Your Review", validators=[DataRequired()])
    rating = IntegerField("Choose a rating", validators=[DataRequired()])
    submit = SubmitField('Submit Your Review')

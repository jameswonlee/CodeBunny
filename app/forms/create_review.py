from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import User, Review
from flask_login import current_user, login_user, logout_user, login_required


ratings = [1,2,3,4,5,6,7,8,9,10]

class CreateReviewForm(FlaskForm):
    review = StringField("Your Review", validators=[DataRequired()])
    rating = SelectField("Choose a rating", validators=[DataRequired()], choices=ratings)
    submit = SubmitField('Submit Your Review')

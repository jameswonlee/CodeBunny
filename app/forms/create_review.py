from flask_wtf import FlaskForm
from app.models import db, User, Review, Coder
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user, login_user, logout_user, login_required


ratings = [1,2,3,4,5,6,7,8,9,10]


# def select_coders():
#     coders = Coder.query.all()
#     coder_names = []
#     if coders:
#         for coder in coders:
#             coder_obj = coder.to_dict()
#             coder_names.append(coder_obj["name"])
#         return coder_names
#     return ["No Coders Yet"]



class CreateReviewForm(FlaskForm):
    review = StringField("Your Review", validators=[DataRequired()])
    rating = SelectField("Choose a rating", validators=[DataRequired()], choices=ratings)
    coder = SelectField("Coder", validators=[DataRequired()])
    submit = SubmitField('Submit Your Review')

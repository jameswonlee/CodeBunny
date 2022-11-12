# from .db import db, environment, SCHEMA, add_prefix_for_prod
# # from .user import User


# class Coder(db.Model):
#     __tablename__ = "coders"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
#     daily_rate = db.Column(db.Float, nullable=False)
#     bio = db.Columm(db.String(2000), nullable=False)
#     experience = db.Column(db.String(2000), nullable=False)

#     # db.relationship("Class_Name", back_populates="attribute from adjacent table")
#     user = db.relationship("User", back_populates="coder")
#     reviews = db.relationship("Review", back_populates="coder")
#     projects = db.relationship("Project", back_populates="coder")
#     skills = db.relationship("Skill", secondary=Coder_Skills, back_populates="coders")



# class Review(db.Model):
#     __tablename__ = "reviews"

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
#     coder_id = db.Column(db.Integer, db.ForeignKey("coders.id"), nullable=False)
#     rating = db.Column(db.Integer, nullable=False)
#     review = db.Column(db.String(2000), nullable=False)

#     coder = db.relationship("Coder", back_populates="reviews")
#     user = db.relationship("User", back_populates="reviews")
    


# class Project(db.Model):
#     __tablename__ = "projects"

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
#     coder_id = db.Column(db.Integer, db.ForeignKey("coders.id"), nullable=False)
#     start_date = db.Column(db.Date, nullable=False)
#     end_date = db.Column(db.Date, nullable=False)
#     completed = db.Column(db.Boolean, nullable=False, default=False)

#     coder = db.relationship("Coder", back_populates="projects")
#     user = db.relationship("User", back_populates="projects")
#     skills = db.relationship("Skill", secondary=Project_Skills, back_populates="projects")



# class Skill(db.Model):
#     __tablename__ = "skills"

#     id = db.Column(db.Integer, primary_key=True)
#     skill_name = db.Column(db.String(2000), nullable=False, unique=True)
    
#     coders = db.relationship("Coder", secondary=Coder_Skills, back_populates="skills")
#     projects = db.relationship("Project", secondary=Project_Skills, back_populates="skills")



# class Coder_Skills(db.Model):
#     __tablename__ = "coder_skills"

#     id = db.Column(db.Integer, primary_key=True)
#     coder_id = db.Column(db.Integer, db.ForeignKey("coders.id"), nullable=False)
#     skills_id = db.Column(db.Integer, db.ForeignKey("skills.id"), nullable=False)



# class Project_Skills(db.Model):
#     __tablename__ = "project_skills"

#     id = db.Column(db.Integer, primary_key=True)
#     project_id = db.Columm(db.Integer, db.ForeignKey("projects.id"), nullable=False)
#     skills_id = db.Column(db.Integer, db.ForeignKey("skills.id"), nullable=False)


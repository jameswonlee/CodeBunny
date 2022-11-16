from .db import db, environment, SCHEMA
from .user import User
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship


Base=declarative_base()


# join table from projects and skills
project_skills = db.Table(
    "project_skills",
    db.Model.metadata,
    db.Column(
        "project_id",
        db.Integer,
        db.ForeignKey("projects.id"),
        primary_key=True
    ),
    db.Column(
        "skill_id",
        db.Integer,
        db.ForeignKey("skills.id"),
        primary_key=True
    )
)


#  join table for coders and skills
coder_skills = db.Table(
    "coder_skills",
    db.Model.metadata,
    db.Column(
        "coder_id",
        db.Integer,
        db.ForeignKey("coders.id"),
        primary_key=True
    ),
    db.Column(
        "skill_id",
        db.Integer,
        db.ForeignKey("skills.id"),
        primary_key=True
    )
)



class Coder(db.Model):
    __tablename__ = "coders"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    daily_rate = db.Column(db.Integer, nullable=False)
    bio = db.Column(db.String(2000), nullable=False)
    experience = db.Column(db.String(2000), nullable=False)

    # db.relationship("Class_Name", back_populates="attribute from adjacent table")
    user = db.relationship("User", back_populates="coder")
    reviews = db.relationship("Review", back_populates="coder", cascade="all, delete-orphan")
    projects = db.relationship("Project", back_populates="coder", cascade="all, delete-orphan")

    skills = db.relationship("Skill", secondary=coder_skills, back_populates = 'coders')



    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'daily_rate': self.daily_rate,
            'bio': self.bio,
            'experience': self.experience,
            'skills': [skill.to_dict() for skill in self.skills] if self.skills else None,
            'user': self.user.to_dict() if self.user else None
        }

    def __repr__(self):
        return f'<Coder, id={self.id}, user_id={self.user_id}, daily_rate={self.daily_rate}, bio={self.bio}, experience={self.experience}>'


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    coder_id = db.Column(db.Integer, db.ForeignKey("coders.id"), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String(2000), nullable=False)

    coder = db.relationship("Coder", back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")



    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'coder_id': self.coder_id,
            'rating': self.rating,
            'review': self.review,
            'user': self.user.to_dict() #added
        }

    def __repr__(self):
        return f'<Review, id={self.id}, user_id={self.user_id}, coder={self.coder_id},rating={self.rating}, review={self.review}, user={self.user}>'


class Project(db.Model):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    coder_id = db.Column(db.Integer, db.ForeignKey("coders.id"), nullable=True)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    completed = db.Column(db.Boolean, nullable=False, default=False)

    coder = db.relationship("Coder", back_populates="projects")
    user = db.relationship("User", back_populates="projects")
    skills = db.relationship("Skill", secondary=project_skills, back_populates="projects")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            "description": self.description,
            'user_id': self.user_id,
            'coder_id': self.coder_id,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'completed': self.completed,
            'skills': [skill.to_dict() for skill in self.skills] if self.skills else None,
            'owner': self.user.to_dict(),
            'coder': self.coder.to_dict() #added
        }

    def to_dict_without_coder(self):
        return {
            'id': self.id,
            'name': self.name,
            "description": self.description,
            'user_id': self.user_id,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'completed': self.completed,
            'skills': [skill.to_dict() for skill in self.skills] if self.skills else None,
            'owner': self.user.to_dict(),
        }


    def __repr__(self):
        return f'<Project, id={self.id}, name={self.name}, user_id={self.user_id}, coder_id={self.coder_id},start_date={self.start_date}, end_date={self.end_date}, completed={self.completed}, owner={self.user}>'



class Skill(db.Model):
    __tablename__ = "skills"

    id = db.Column(db.Integer, primary_key=True)
    skill_name = db.Column(db.String(2000), nullable=False, unique=True)

    coders = db.relationship("Coder", secondary=coder_skills, back_populates="skills")
    projects = db.relationship("Project", secondary=project_skills, back_populates="skills")

    def to_dict(self):
        return {
            'id': self.id,
            'skill_name': self.skill_name
        }

    def __repr__(self):
        return f'<Skill, id={self.id}, skill_name={self.skill_name}'

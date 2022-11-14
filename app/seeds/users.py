from app.models import db, User, Coder, Skill, Project, Review, environment, SCHEMA
import datetime

skills1 = Skill(skill_name = "Python")
skills2 = Skill(skill_name = "Javascript")
skills3 = Skill(skill_name = "C++" )
skills4 = Skill(skill_name = "Ruby")
skills5 = Skill(skill_name = "Java")
skills6 = Skill(skill_name = "React")
skills7 = Skill(skill_name = "Camel")



# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='DemoUser', email='demo@aa.io', password='password', first_name="Demo", last_name="User")
    marnie = User(
        username='marnie', email='marniemills@aa.io', password='password', first_name="Marnie", last_name="Mills")
    bobbie = User(
        username='bobbie', email='bobbiemills@aa.io', password='password', first_name="Bobbie", last_name="Mills")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()



def seed_coders():

    # skills1 = Skill(skill_name = "Python")
    # skills2 = Skill(skill_name = "Javascript")
    # skills3 = Skill(skill_name = "C++" )
    # skills4 = Skill(skill_name = "Ruby")
    # skills5 = Skill(skill_name = "Java")
    # skills6 = Skill(skill_name = "React")
    # skills7 = Skill(skill_name = "Camel")

    coder1 = Coder(
    user_id=2,
    daily_rate=35.00,
    bio="Hi! I love coding especially in Python. I have been coding for about 6 years now and love learning new languages!",
    experience="I have worked at Amazon and Apple.",

    )

    coder2 = Coder(
    user_id=3,
    daily_rate=40.00,
    bio="Hello there! I enjoy coding in Javascript and specialize in front-end development. Reach out to me if you are looking for creative assistance!",
    experience="I have worked at Google and Facebook."
    )

    coder3 = Coder(
    user_id=1,
    daily_rate=50.00,
    bio="Hello there! I enjoy coding in Javascript, Python, and C++ and specialize in back-end development. Reach out to me if you are looking for precise and efficient help!",
    experience="I have worked at Amazon and Facebook."
    )

    coder1.skills.append(skills1)
    coder1.skills.append(skills2)
    coder2.skills.append(skills2)
    coder3.skills.append(skills3)

    db.session.add(coder1)
    db.session.add(coder2)
    db.session.add(coder3)
    db.session.commit()


def undo_coders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.coders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM coders")

    db.session.commit()



def seed_skills():
# Create instances of Skill class/model
    # skills1 = Skill(skill_name = "Python")

    # skills2 = Skill(skill_name = "Javascript")
    # skills3 = Skill(skill_name = "C++" )
    # skills4 = Skill(skill_name = "Ruby")
    # skills5 = Skill(skill_name = "Java")
    # skills6 = Skill(skill_name = "React")
    # skills7 = Skill(skill_name = "Camel")

    db.session.add_all([skills1,skills2,skills3,skills4,skills5,skills6,skills7])
    db.session.commit()


def undo_skills():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.skills RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM skills")

    db.session.commit()


def seed_projects():
    # datetime.date(year, month, day)
    # skills1 = Skill(skill_name = "Python")
    # skills2 = Skill(skill_name = "Javascript")
    # skills3 = Skill(skill_name = "C++" )
    # skills4 = Skill(skill_name = "Ruby")
    # skills5 = Skill(skill_name = "Java")
    # skills6 = Skill(skill_name = "React")
    # skills7 = Skill(skill_name = "Camel")

    project1 = Project(
        user_id=1,
        coder_id=2,
        name="Facebook clone",
        description="This is a clone of Facebook",
        start_date = datetime.date(2022,12,10),
        end_date=datetime.date(2022,12,20),
        completed=False,

    )

    project2 = Project(
        user_id=2,
        coder_id=3,
        name="Airbnb clone",
        description="This is a clone of Airbnb",
        start_date=datetime.date(2021,4,10),
        end_date=datetime.date(2022,5,20),
        completed=True,

    )
    project3 = Project(
        user_id=3,
        coder_id=1,
        name="Youtube Clone & Debug",
        description="This is a YouTube clone",
        start_date=datetime.date(2023,2,10),
        end_date=datetime.date(2023,3,15),
        completed=False,

    )

    project1.skills.append(skills1)
    project1.skills.append(skills2)
    project2.skills.append(skills3)
    project3.skills.append(skills5)

    db.session.add_all(
        [project1,project2,project3])
    db.session.commit()

def undo_projects():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM projects")

    db.session.commit()


def seed_reviews():
    review1 = Review(
        user_id=2,
        coder_id=1,
        rating=9,
        review="This coder was incredible and efficient! Highly recommend"
    )


    review2 = Review(
        user_id=3,
        coder_id=2,
        rating=9,
        review="I had a great experience working with this coder. Don't hesitate to book their services!"
    )

    review3 = Review(
        user_id=1,
        coder_id=3,
        rating=9,
        review="Efficient, Respectful, Creative, and precise! Had a great experience. Would book this service again!"
    )

    db.session.add_all(
        [review1,review2,review3])
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()

from app.models import db, User, Coder, Skill, environment, SCHEMA


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
    skills1 = Skill(skill_name = "Python")

    skills2 = Skill(skill_name = "Javascript")
    skills3 = Skill(skill_name = "C++" )
    skills4 = Skill(skill_name = "Ruby")
    skills5 = Skill(skill_name = "Java")
    skills6 = Skill(skill_name = "React")
    skills7 = Skill(skill_name = "Camel")

    db.session.add_all([skills1,skills2,skills3,skills4,skills5,skills6,skills7])
    db.session.commit()

def undo_skills():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.skills RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM skills")

    db.session.commit()

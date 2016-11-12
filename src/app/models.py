from datetime import datetime
from app import db


class Report(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)
    location = db.Column(db.Text)
    name = db.Column(db.Text)
    race = db.Column(db.Text)
    religion = db.Column(db.Text)
    ethnicity = db.Column(db.Text)
    sexual_orientation = db.Column(db.Text)
    disability = db.Column(db.Text)
    gender = db.Column(db.Text)
    gender_identity = db.Column(db.Text)
    url = db.Column(db.Text)
    description = db.Column(db.Text)

    def __init__(self, date, location, name, race, religion, ethnicity,
        sexual_orientation, disability, gender, gender_identity, url, description):
        self.date = date
        self.location = location
        self.name = name
        self.race = race
        self.religion = religion
        self.ethnicity = ethnicity
        self.sexual_orientation = sexual_orientation
        self.disability = disability
        self.gender = gender
        self.gender_identity = gender_identity
        self.url = url
        self.description = description

    def to_dict(self):
        d = {}
        for column in db.Model.metadata.tables['report'].columns:
            d[column.name] = self.__dict__[column.name]
        d['date'] = d['date'].strftime('%Y-%m-%d')
        return d

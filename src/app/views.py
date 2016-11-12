from flask import render_template, request
from app import app, db
from datetime import datetime
from .models import Report
import json

@app.route('/reports', methods=['GET'])
def reports():
    return json.dumps(map(lambda x: x.to_dict(), Report.query.all()))


@app.route('/', methods=['POST', 'GET'])
def index():
    try:
        if request.method == 'GET':
            return render_template('index.html')
        elif request.method == 'POST':
            try:
                #is_verified = request.form['verified']
                is_verified = True
                date = datetime.strptime(request.form['date'], '%Y-%m-%d')
                location = request.form['location']
                name = request.form['name']
                race = request.form['race']
                religion = request.form['religion']
                ethnicity = request.form['ethnicity']
                sexual_orientation = request.form['sexual_orientation']
                disability = request.form['disability']
                gender = request.form['gender']
                gender_identity = request.form['gender_identity']

                if is_verified:
                    url = request.form['url']
                    description = ''
                else:
                    description = request.form['description']
                    url = ''

            #TODO: url validation

            #TODO: make sure that fields match autocomplete types

            except Exception as e:
                return render_template('index.html', error=str(e))


            if not (date and location):
                error = "The location or date you specified did not match the required format"
                return render_template('index.html', error=error)
            if not (race or religion or ethnicity or sexual_orientation or disability
                or gender or gender_identity):
                error = "A type of hate crime must be specified"
                return render_template('index.html', error=error)

            new_report = Report(date, location, name, race, religion, ethnicity,
                                sexual_orientation, disability, gender,
                                gender_identity, url, description)
            try:
                db.session.add(new_report)
                db.session.commit()
            except Exception as e:
                print str(e)
                error = "Whoops we got ourselves a database error"
                return render_template('index.html', error=error)
    except Exception as e:
        print str(e)

    return render_template('index.html')


@app.route("/stats")
def get_statistics():
    #TODO: add correct html file
    return render_template("index.html")


@app.route("/contact")
def get_contact_info():
    #TODO: add correct html file
    return render_template("index.html")

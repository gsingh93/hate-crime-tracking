#!/usr/bin/env python2

from flask import Flask, render_template, request
app = Flask(__name__)

@app.route("/", methods=['POST', 'GET'])
def index():
    if request.method == 'GET':

        return render_template('index.html')

    elif request.method == 'POST':

        for key, value in request.form.items():

            print(key, value)





if __name__ == "__main__":
    app.run()

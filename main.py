from flask import Flask, render_template, request


app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/beneficiary', methods=["GET", "POST"])
def beneficiary_login():
    return render_template('login_beneficiary.html')


@app.route('/donor_details', methods=["GET", "POST"])
def donor_details():
    return render_template('ngo.html')


@app.route('/donor', methods=["GET", "POST"])
def donor_login():
    return render_template("login_donor.html")


if __name__ == "__main__":
    app.run(debug=True)
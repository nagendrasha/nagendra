from flask import Flask, render_template

app = Flask(__name__)
@app.route('/')
def index():
    name = "Flask Application"
    return render_template('index.html',name=name)

@app.route('/about')
def about():
   return "<h1>About Page</h1><p>This is the about page of our Flask application.</p>"


if __name__ == '__main__':
    app.run(debug=True)
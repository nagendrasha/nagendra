from flask import Flask, render_template, request, redirect, url_for, flash
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'your_secret_key')  # Required for flash messages

@app.route('/')
def index():
    name = "Nagendra Sharma"
    return render_template('index.html', name=name)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/projects')
def projects():
    # You could load project data from a database or define it here
    projects_list = [
        {
            'id': 1,
            'title': 'Portfolio Website',
            'description': 'A personal portfolio website built with Flask and Bootstrap.',
            'technologies': ['Python', 'Flask', 'HTML', 'CSS', 'Bootstrap'],
            'image': 'project1.jpg',
            'github': 'https://github.com/yourusername/portfolio',
            'live_demo': '#'
        },
        {
            'id': 2,
            'title': 'E-commerce Platform',
            'description': 'A full-featured e-commerce platform with user authentication and payment processing.',
            'technologies': ['Python', 'Django', 'JavaScript', 'PostgreSQL'],
            'image': 'project2.jpg',
            'github': 'https://github.com/yourusername/ecommerce',
            'live_demo': '#'
        },
        {
            'id': 3,
            'title': 'Task Management App',
            'description': 'A task management application with features like task creation, assignment, and tracking.',
            'technologies': ['React', 'Node.js', 'Express', 'MongoDB'],
            'image': 'project3.jpg',
            'github': 'https://github.com/yourusername/taskmanager',
            'live_demo': '#'
        }
    ]
    return render_template('projects.html', projects=projects_list)

@app.route('/skills')
def skills():
    skills_data = {
        'programming_languages': ['Python', 'JavaScript', 'Java', 'C++'],
        'web_technologies': ['HTML5', 'CSS3', 'React', 'Angular', 'Vue.js'],
        'backend': ['Flask', 'Django', 'Node.js', 'Express'],
        'databases': ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
        'tools': ['Git', 'Docker', 'AWS', 'Heroku', 'VS Code']
    }
    return render_template('skills.html', skills=skills_data)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        
        # Here you would typically send an email or save to database
        # For now, we'll just flash a message
        flash(f'Thank you {name}, your message has been received!', 'success')
        return redirect(url_for('contact'))
        
    return render_template('contact.html')

@app.route('/resume')
def resume():
    return render_template('resume.html')

# This is for local development
if __name__ == '__main__':
    app.run(debug=True)
    
# This is for Vercel
app
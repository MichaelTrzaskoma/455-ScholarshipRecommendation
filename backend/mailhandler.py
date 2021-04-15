from flask import Flask
from flask_mail import Mail, Message
from app import app

app.config['MAIL_SERVER'] = "smtp-relay.sendinblue.com"
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = "gsalvesen165@gmail.com"
app.config['MAIL_PASSWORD'] = "Od4s1Pg8fApny3tX"
app.config['MAIL_SUPPRESS_SEND'] = False
mail = Mail(app)

def sendWelcomeEmail(email, activationCode):
    message = "<h1>Welcome!</h1>"\
              "<br>"\
              "<p>Welcome to Scholar Seek! We're excited that you've decided to take the first step in taking charge "\
              "of your college career. With our app you can make finding scholarships easier than ever before, choose "\
              "the best college for your needs, and decide on a major that will keep you interested your whole college "\
              "career.</p>"\
              "<p>In order to login and get started you'll have to activate your account. You can do this by clicking "\
              "the link below.</p>"\
              "<p>http://localhost:5000/activate?code=" + activationCode + "</p>"\
              "<p>We hope that our app will be able to satisfy all your university needs!</p>"\
              "<p>Good Luck!</p>"\
              "<p>The Scholar Seek Team</p>"

                    
    msg = Message("Welcome to Scholar Seek!",
                  sender="invite@scholarseek.com",
                  recipients=[email])

    msg.body = ""
    msg.html = message
    with app.app_context():
        mail.send(msg)

def sendResetPasswordEmail(email):
    #Generate reset password code
    passCode = ''.join(random.choices(string.ascii_uppercase + string.digits, k=N))
    #Update database to include password code and timestamp
     
    message = "<h1>Reset Password!</h1>"\
                "<br>"

    msg = Message("Reset Scholar Seek Password",
                 sender="reset@scholarseek.com",
                 recipients = [email])
    msg.body = ""
    msg.html = message
    with app.app_context():
        mail.send(msg)


from flask import Flask
from flask_mail import Mail, Message
from app import app

mail = Mail(app)

def sendWelcomeEmail(email, activationCode):
    message = "<h1>Welcome!</h1>"\
              "<p>Welcome to Scholar Seek! We're excited that you've decided to take the first step in taking charge "\
              "of your college career. With our app you can make finding scholarships easier than ever before, choose "\
              "the best college for your needs, and decide on a major that will keep you interested your whole college "\
              "career.</p>"\
              "<p>In order to login and get started you'll have to activate your account. You can do this by clicking "\
              "the link below.</p>"\
              "<p>http://http://820293c0661c.ngrok.io/activate?code=" + activationCode + "</p>"\
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

def sendResetPasswordEmail(email, resetCode):
    #Update database to include password code and timestamp
     
    message = "<h1>Reset Password!</h1>"\
              "<p>Don't worry, sometimes we forget our passwords too!</p>"\
              "<p>Click the link below and we'll get you started on resetting your password</p>"\
              "<p>http://http://820293c0661c.ngrok.io/resetpassword?code=" + resetCode + "</p>"


    msg = Message("Reset Scholar Seek Password",
                 sender="reset@scholarseek.com",
                 recipients = [email])
    msg.body = ""
    msg.html = message
    with app.app_context():
        mail.send(msg)


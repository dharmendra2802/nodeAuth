
# NodeAuth Backend App
NodeAuth is a backend application built on Express and Node.js that enables users to create accounts, verify their email through OTP, 
sign up and sign in using Google and Facebook, and reset their passwords. This README file provides an overview of the app's functionalities and
instructions on how to set it up and use it.

# Installation
Clone the repository:
Copy code
  - git clone https://github.com/your-username/nodeAuth.git
  - cd nodeAuth
# Install dependencies:
  - npm install

# Set up environment variables:
Create a .env file in the root directory of the project and add the following variables:

asset_path=./assets
db_name= -database name
session_key= -session key
session_name= -session name

### SMTP Configuration
SMTP_USER = -email id
SMTP_PASSWORD= -password

### Google OAuth Configuration
GOOGLE_CLIENT_ID= -your google client id
GOOGLE_CLIENT_SECRET= - google CS
GOOGLE_CALLBACK_URL= -google-callback-url

### Facebook OAuth Configuration
FACEBOOK_CLIENT_ID= -your facebook-client id
FACEBOOK_CLIENT_SECRET= -your facebook CS
FACEBOOK_CALLBACK_URL= -facebook-callback-url

# Run the application:
npm start
The app should now be running on http://localhost:5000.

# Usage
Once the application is running you can try out its features and make change to the code to either add or to fix issues

# Authentication Strategies
NodeAuth uses the following authentication strategies:

 Local Strategy: Users can sign in using their email and password.
 Google OAuth2: Users can sign in and sign up using their Google accounts.
 Facebook OAuth2: Users can sign in and sign up using their Facebook accounts.

# Features
1 - User can signin/signup with facebook and google
2 - On signup user have to first verify its email by entering the otp which will be valid for 1 minutes and then user can generate a new one
    if it expires
3 - Also on signin user can use forgot password option to get the link to reset password on his/her email
    which will be valid for 5 minutes and can be used just once
4 - On successfull login user can reset password by entering its current password
5 - User can also add profile picture
6 - User will get a mail for 
    - email verification
    - forgot password link
    - informing password is changed
    


# Contributing
You are welcome to contributions to improve NodeAuth. Feel free to fork the repository, make changes, and submit pull requests.

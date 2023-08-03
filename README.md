
# NodeAuth Backend App
NodeAuth is a backend application built on Express and Node.js that enables users to create accounts, verify their email through OTP, 
sign up and sign in using Google and Facebook, and reset their passwords. This README file provides an overview of the app's functionalities and
instructions on how to set it up and use it.

# Installation
Clone the repository:
Copy code
  - **git clone**: https://github.com/dharmendra2802/nodeAuth
  - **cd nodeAuth**
# Install dependencies:
  - npm install

# Set up environment variables:
Create a .env file in the root directory of the project and add the following variables:

### Session and db
asset_path=./assets <br>
db_name= -database name <br>
session_key= -session key <br>
session_name= -session name <br>

### SMTP Configuration
SMTP_USER = -email id <br>
SMTP_PASSWORD= -password

### Google OAuth Configuration
GOOGLE_CLIENT_ID= -your Google client id <br>
GOOGLE_CLIENT_SECRET= - google CS <br>
GOOGLE_CALLBACK_URL= -google-callback-url <br>

### Facebook OAuth Configuration
FACEBOOK_CLIENT_ID= -your facebook-client id <br>
FACEBOOK_CLIENT_SECRET= -your Facebook CS <br>
FACEBOOK_CALLBACK_URL= -Facebook-callback-url <br>

# Run the application:
npm start
The app should now be running on http://localhost:5000.

# Usage
Once the application is running you can try out its features and make changes to the code to either add or fix issues

# Authentication Strategies
NodeAuth uses the following authentication strategies:

 **Local Strategy**: Users can sign in using their email and password.  <br>
 **Google OAuth2**: Users can sign in and sign up using their Google accounts. <br>
 **Facebook OAuth2**: Users can sign in and sign up using their Facebook accounts. <br>

# Features
1. - User can sign in/signup with Facebook and Google  <br>
2. - On signup users have to first verify their email by entering the OTP which will be valid for 1 minute and then the user can generate a new one
    if it expires  <br>
3. - Also on the sign in users can use forgot password option to get the link to reset the password on his/her email <br>
    which will be valid for 5 minutes and can be used just once <br>
4. - On successful login user can reset the password by entering its current password <br>
5. - The user can also add a profile picture <br>
6. - User will get a mail for  <br>
    - email verification <br>
    - forgot password link <br>
    - informing password is changed <br>
    


# Contributing
You are welcome to contribute to improving NodeAuth. Feel free to fork the repository, make changes, and submit pull requests.

# OIBSIP-Login-Page

# Login and Registration System

This project is a simple web application that implements a user login and registration system with change password functionality. It uses HTML and CSS for the frontend, Node.js and Express for the backend, MongoDB for the database, and JSON Web Tokens (JWT) for authentication.

## Features

- User registration
- User login
- Password change functionality
- Authentication using JWT
- Secure password storage with bcrypt

## Tech Stack

- **Frontend**: HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Installation

### Prerequisites

- Node.js (https://nodejs.org/)
- MongoDB (https://www.mongodb.com/)

### Setup

1. **Clone the repository**:

    ```sh
    git clone https://github.com/Shyam-Prasath/OIBSIP-Login-Page
    cd your-repo-name
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and add the following:

    ```env
    PORT=3000
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
    JWT_SECRET=your_jwt_secret
    ```

    Replace `<username>`, `<password>`, and `<dbname>` with your MongoDB credentials and desired database name. Set `JWT_SECRET` to a secure secret key for signing JWT tokens.

4. **Run the application**:

    ```sh
    npm start
    ```

    The server will start on the port specified in the `.env` file (default is 3000).


## Usage

### Endpoints

- **POST /register**: Register a new user
- **POST /login**: Login a user and return a JWT
- **POST /change-password**: Change the password of an authenticated user

### Frontend

- **profile.html**: Homepage
- **index.html**: Login form
- **register.html**: Registration form
- **change-password.html**: Change password form

## Dependencies

- **Express**: Fast, unopinionated, minimalist web framework for Node.js
- **Mongoose**: Elegant MongoDB object modeling for Node.js
- **Bcrypt**: A library to help hash passwords
- **JWT (jsonwebtoken)**: JSON Web Token implementation (symmetric and asymmetric)
- **Dotenv**: Loads environment variables from a .env file

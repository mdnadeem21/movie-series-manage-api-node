

---

# Movie Series Management Application

The Movie Series Management Application is a robust Node.js API that provides functionality for managing a collection of movies and series. The API supports user authentication, CRUD operations on movie series, file upload for movie posters, and additional features such as search, filtering, pagination, and sorting.

## Table of Contents

1. [Features](#features)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Documentation](#api-documentation)
6. [Environment Variables](#environment-variables)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

## <a name="features"></a>Features

The Movie Series Management Application offers the following features:
- User Authentication: Supports user registration, login, password resetting, and email verification.
- Role-based Authorization: Define access control for different user roles, allowing certain operations only for administrators.
- Movie Management: Supports CRUD operations for movies, including fields such as title, genre, release year, director, duration, plot, and added by (administrator).
- File Upload: Supports uploading movie posters or cover images.
- Search and Filtering: Users can search for movies and series by title, genre, or plot.
- Pagination and Sorting: The API lists movies with pagination and sorting options.

## <a name="requirements"></a>Requirements

The following are required to run the Movie Series Management Application:

- Node.js
- MongoDB database

## <a name="installation"></a>Installation

1. Clone the repository:

```bash
git clone 
cd movie-catalog-api
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables: Create a .env file in the root directory with the following content:

```bash
# Server configurations
PORT=3000
JWT_SECRET=your_jwt_secret_key

# MongoDB connection URI
MONGODB_URI=mongodb://localhost:27017/movie_series_db

# Nodemailer configurations for email service
EMAIL_SERVICE=your_email_service_provider
EMAIL_USER=your_email_address
EMAIL_PASSWORD=your_email_password
```

Remember to replace the placeholders in the `.env` variables with your actual configurations.

4. Start the application:

```bash
node app.js
```

## <a name="usage"></a>Usage

The Movie Series Management API can be accessed using tools like Postman or curl. Ensure you have set up the environment variables correctly and the server is running.

## <a name="api-documentation"></a>API Documentation

The Movie Series Management API provides the following endpoints:

### User Authentication and Authorization
- POST /api/auth/register: Register a new user. Required fields: email, username, password, role.
- POST /api/auth/login: Login as a user. Required fields: email, password.
- POST /api/auth/verify-email: Verify the user's email address. Required fields: token.
- POST /api/auth/forgot-password: Send a password reset email. Required fields: email.
- POST /api/auth/reset-password: Reset user's password. Required fields: token, password.

### Movie Management
- POST /api/movies: Create a new movie. Required fields: title, genre, plot, addedBy (user's id).
- PUT /api/movies/:id: Update an existing movie by ID. Required fields: title, genre, plot.
- DELETE /api/movies/:id: Delete a movie by ID.
- GET /api/movies/:id: Get a movie by ID.
- GET /api/movies: Get all movies with pagination and sorting. Query parameters: page, limit, sort.
- GET /api/movies/search: Search movies by title, genre, or plot. Query parameters: title, genre, plot.
- POST /api/movies/:id/upload-poster: Upload a movie poster image. File field: poster.

## <a name="contact"></a>Contact

For any issues, questions, or suggestions, 

## <a name="license"></a>License

This project is licensed under the MIT License. 

---


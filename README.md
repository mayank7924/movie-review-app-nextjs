# Backend Overview

## Database Schemas

- User
- Movie
- Actor
- Review

## APIs needed

- POST - /api/auth/signup --> to add a new user with credentials
- GET/DELETE - /api/user/:email --> to fetch/delete a user document
- PATCH - /api/user/:email --> to update user (change password flow)
- /api/auth/[...nextauth] --> handles signIn, signUp, callback routes
- GET - /api/movies --> fetches list of all movies
- POST/GET/PUT/DELETE - /api/movie/:movieId --> CRUD for a movie document
- GET - /api/movie/:movieId/reviews --> fetch all of the reviews for a movie
- POST - /api/movie/:movieId/review --> add a new movie review

## Utilities

- to securely hash passwords
- to cache connection pool

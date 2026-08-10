MealCraft is a full-stack MERN recipe and pantry management app. 
This is the backend service: a Node.js/Express + MongoDB API that handles authentication, recipe data (system + user-submitted), pantry tracking, saved recipes, 
and a pantry-based reverse recipe matching algorithm (find recipes you can cook from what's already in your pantry).

Live API: deployed on Railway (Docker)

Frontend: https://meal-craft-frontend.vercel.app/

Features

-> JWT-based authentication with httpOnly cookies

-> System recipes (seeded, 100+ Pakistani/desi recipes) + user-submitted recipes

-> Pantry management (add/update/remove pantry items)

-> Reverse recipe matching — suggests recipes based on what's in your pantry

-> Saved recipes, with support for saving both system and user recipes via refPath

-> CORS configured for a separate frontend origin (Vercel)


Tech Stack

Runtime: Node.js, Express

Database: MongoDB Atlas, Mongoose

Auth: JWT + httpOnly cookies, cookie-parser

Deployment: Docker container on Railway

Other: dotenv, bcrypt (password hashing), CORS


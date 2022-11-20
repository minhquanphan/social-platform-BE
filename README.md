# social-platform-BE

## Description

A social platform web application built with MERN stack. This is the codebase for the MongoDB NodeJS and Express RESTful backend API.

## Features

This include all common features of a Social Platform.

### User authentication and managing account (UserFlow)

1. User can create account with email and password ✅
2. User can login with email and password ✅
3. User can see a list of all users ✅
4. User can see other user's information by id ✅
5. Owner can see own user's information ✅
6. Owner can update own account profile ✅
7. Owner can deactivate own account ✅
8. Rocket Search user by name ✅

### Managing friend relationship (FriendFlow)

1. Authenticated user can make friend request to other ✅
2. Authenticated user can see list of friend ✅
3. Authenticated user can accept or reject a friend request ✅
4. Authenticated user can see a list of all request receive ✅
5. Author can see a list of all request sent ✅
6. Author of Request can cancel the request✅
7. Friend can unfriend✅

### CRUD post with friend only access (PostFlow)

1. Authenticated user can make a post (POST a post) ✅
2. Author can update post by post's id ✅
3. Author can delete post by post's id ✅
4. Friend can see list of friend's post ✅

### CRUD comment & reaction for friend (InteractionFlow)

1. Friend can make a comment (POST a comment) to other friend's post ✅
2. Friend can see a list of all comment belong to friend's post ✅ (Post api)
3. Author of Comment can update that comment ✅
4. Author of Comment can delete that comment ✅
5. Friend can make a reaction (like, dislike) to each other post ✅
6. Friend can make a reaction (like, dislike) to each other comment ✅

## Project setup

1. Generate express boiler plate

   ```console
   npx express-generator --no-view
   npm install
   touch .gitignore .env
   ```

2. Install project dependencies

   ```console
   npm install nodemon cors bcryptjs dotenv
   npm install jsonwebtoken mongoose
   npm install express-validator
   ```

3. Add dev script

   ```json
   {
       "scripts":{
           ...
           "dev":"nodemon ./bin/www"
       }
   }
   ```

4. Environment variable config (JSK, MURI)
   In `.env`

   ```txt
    JWT_SECRET_KEY=someKey
    MONGO_DEV_URI=mongodb://locahost:27017/
    MONGO_PRO_URI=mongodb_srv://atlas.com/
   ```

   In `.gitignore`

   ```txt
    node_modules
   .env
   ```

   NODE_OPTIONS=--experimental-vm-modules

## The end

by CoderSchool

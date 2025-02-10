# Blogger's Stop App

Welcome to Blogger's Stop, your one-stop shop for sharing your thoughts and ideas with the world!  Craft compelling narratives, insightful articles, or just random musings on a platform designed for simplicity and security.

Blogger's Stop offers a seamless blogging experience.  Dive right in and explore a diverse range of public posts without even needing to log in.  Found something you love? Share it!

For aspiring writers and seasoned bloggers alike, our user-friendly dashboard awaits.  Securely access your personal space with our passwordless Google authentication – no more remembering complex passwords!  Once inside, you're in complete control.  Create new posts with ease, refine existing ones to perfection, or delete anything you no longer wish to share.  Blogger's Stop empowers you to manage your content effortlessly, all tied to your Google account for a secure and personalized experience.  Start sharing your unique perspective today!

( Blogger's Stop is a TypeScript-based application aimed at providing a seamless blogging experience.
The repository consists of both the frontend and backend of the application. )

## Table of Contents

- [Features](#features)
- [Technologies used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

## Features
- Attractive UI Design
- User Authentication and Authorization
- Post Creation, Retrieval, Modification and Deletion
- Post Categories
- Filtered Posts
- Passwordless, hassle-free login using Google Auth
- User Dashboard

## Technologies used

1. **Frontend:**
   - NextJS with Typescript
   - Tailwind CSS
   - shadcn/ui
3. **Backend:**
   - Typescript
   - NodeJS
5. **Database:**
   - MySQL

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MySQL installed locally
- Git

## Installation

1. **Node.js Installation:**
   - Ensure that your computer or codespace uses Node.js version 14 or greater. You can download Node.js from the official [Node.js](https://nodejs.org) website.

2. **Cloning the Repository:**
   - Clone the repository using the following command in your terminal:
     ```bash
     git clone https://github.com/ShadowTrail/bloggersstop-app.git
     ```
   - Navigate to the directory where the repository is cloned:
     ```bash
     cd bloggersstop-app
     ```

3. **Installing Dependencies:**
   - Run the following command to install the dependencies:
     ```bash
     npm install
     ```

4. **Viewing Dependecies(if curious):**
   - Navigate to package.json or package-lock.json and refer to the dependencies section.
  
5. **Ensure that you create .env and .env.local files with necessary data to ensure code works smoothly:**
   - In backend, .env should include:
   ```.env
   PORT= port
   DB_HOST= db_hostname
   DB_PORT= db_port
   DB_USERNAME= db_username
   DB_PASSWORD= db_password
   DB_DATABASE= db_name
   JWT_SECRET= your_JWT_secret_key
   GOOGLE_CLIENT_ID= your_google_client_id
   GOOGLE_CLIENT_SECRET= your_client_secret_key
   GOOGLE_CALLBACK_URL= callback_url
   API_BASE_URL= your_api_base_url
   FRONTEND_URL= your_frontend_url
   ```
   - In frontend, .env.local should include
   ```.env
   NEXT_PUBLIC_API_BASE_URL= your_api_base_url
   NEXT_PUBLIC_EMAILJS_SERVICE_ID= your_emailjs_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID= your_emailjs_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY= your_emailjs_public_key
   ```

For more detailed information, you can refer to the [Quickstart for building GitHub Apps](https://docs.github.com/en/apps/creating-github-apps/writing-code-for-a-github-app/quickstart).


## Usage
To start the application, use the following command in both frontend and backend directories:

```bash
npm run dev or npm start
This will run the application and you can access it via http://localhost:3000
```

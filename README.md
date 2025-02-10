# Blogger's Stop App

Blogger's Stop is a TypeScript-based application aimed at providing a seamless blogging experience. The repository consists of both the frontend and backend of the application.

## Table of Contents

- [Technologies used](#technologies-used)
- [Installation and Prerequisites](#installation-and-prerequisites)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Technologies used

1. **Frontend framework:** NextJS
2. **Backend:** Typescript
3. **Database:** MySQL

## Installation and Prerequisites

To get the prerequisites and get started with Blogger's Stop, clone the repository and install the necessary dependencies:

1. **Node.js Installation:**
   - Ensure that your computer or codespace uses Node.js version 12 or greater. You can download Node.js from the official [Node.js](https://nodejs.org) website.

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
  
5. Ensure that you create .env and .env.local files with necessary data to ensure code works smoothly.
   - In backend, .env should include:
   ```.env
   PORT
   DB_HOST
   DB_PORT
   DB_USERNAME
   DB_PASSWORD
   DB_DATABASE
   JWT_SECRET
   GOOGLE_CLIENT_ID
   GOOGLE_CLIENT_SECRET
   GOOGLE_CALLBACK_URL
   API_BASE_URL
   FRONTEND_URL
   ```
   - In frontend, .env.local should include
   ```
   NEXT_PUBLIC_API_BASE_URL
   NEXT_PUBLIC_EMAILJS_SERVICE_ID
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

For more detailed information, you can refer to the [Quickstart for building GitHub Apps](https://docs.github.com/en/apps/creating-github-apps/writing-code-for-a-github-app/quickstart).


## Usage
To start the application, use the following command:

```bash
npm start or npm run dev
This will run the application and you can access it via http://localhost:3000.
```

## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Make your changes.
4. Commit your changes (git commit -am 'Add new feature').
5. Push to the branch (git push origin feature/your-feature).
6. Create a new Pull Request.

## License
This project is open source and available under the MIT License.

```
You can also view the repository on GitHub: [bloggersstop-app](https://github.com/ShadowTrail/bloggersstop-app).
```

# Employee Review System

<h1 align="center">Employee Review System  📝</h1>

This project is an Employee Review System application that allows employees to submit their feedback on each other’s performance

## Tech Stack

**Client:** `HTML`, `CSS`, `JAVASCRIPT`

**Server:** `Node.js`, `Express.js`, `Mongoose`, `EJS`,

## 🔗 Links

Github Link:- https://github.com/k1chandrasekhar/Employee-Review-System-Project

## 🔗 Live Demo

Render Link:- https://ers-m8rq.onrender.com

## Folder Structure

```
Employee-Review-System-Project/

├── assets/
├         ├── CSS/
│             ├── .css
│
├── routes/
│   ├── employeeSection.js
│   ├── review.js
│   ├── users.js
│   ├── index.js
|   |
├── controllers/
│   ├── employeeSection.js
│   ├── home.js
│   ├── review.js
│   ├── user.js
|   |
├── models/
│   ├── user.js
│   ├── myReviews.js
│   ├── assignedReview.js
|   |
├── views/
│   ├── signupPage.ejs
│   ├── signinPage.ejs
│   ├── layout.ejs
│   ├── home.ejs
│   ├── header.ejs
│   ├── employeeSection.ejs
|   ├── assignwork.ejs
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
├── README.md
```

### Step 2: install

Install the required Node.js packages by running the following command.

`npm install`

Set up the MongoDB database using Mongoose. Modify the config.js file in the config directory with your MongoDB connection URL.
Create necessary models for the placement cell app in the models directory using Mongoose schema.
Implement the required routes and logic in the routes directory to handle placement cell functionalities like adding, updating, and deleting placements.

### Step 3: EJS Templating

In the server directory, navigate to the views folder.
Customize the EJS templates to render dynamic content and data from the server.
Ensure that the templates are correctly integrated with the routes to display the data as intended.

### Step 4: Start the Application

Run the following command to start the server.

`node install.js`

### Step 6: Access the Application

Open your web browser and visit http://localhost:8000 to access the Employee Review System web app.

## Features:

Admin view

Add/remove/update/view employees

Add/update/view performance reviews

Assign employees to participate in another employee's performance review

Employee view

List of performance review requiring feedback

Submit feedback

An employee can register, only admin can make an employee an admin

# **Palette Picker**


Palette Picker is a fullstack application built with Node.js, Express and jQuery that allows the user to randomly generate and save color palettes and assign them to projects. This project was designed as a Module 4 solo project at Turing School of Software & Design. My goals were to learn how to recreate the functionality of a popular color picker app, [Coolors](https://coolors.co/) while utilizing a backend database and connecting it to a jQuery frontend. 

 
### Installation and Setup Instructions
This app is deployed to Heroku and can be viewed live
[here](https://tmcmeans-palette-picker.herokuapp.com/)!

You can also clone down this repo and follow these steps to get it running locally on your machine.

You are going to need to install dependencies and start your server before you can use the app. Type these commands in your local palette-picker repo:

```
Install and Start the Server

$ cd palette-picker   
$ npm install     
$ npm start  
```

You are also going to need to create the psql database the app will use by typing the following in your terminal:

```
Create a PostgreSQL Database and Run Migrations

$ psql     
$ CREATE DATABASE saved_projects         
$ knex migrate:latest      
$ knex seed:run      
```

In order to see tests, you must stop runnning the server. Type these commands in your local BYOB repo:

```
Start Running Tests

$ cmd C      
$ npm test      
```

### Lead Developer

Tanj McMeans- [Github](https://github.com/TMcMeans)

### Technologies and Resources

- Node.js
- jQuery
- Express
- Knex
- PostgreSQL
- HTML5
- CSS
- Git 
- Github

### Original Wireframe

![Desktop-wireframe](assets/palettepicker_wireframe.png)

### Implementation

![Desktop-view](/assets/palette-picker-screenshot.png)

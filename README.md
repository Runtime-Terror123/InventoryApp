![logo](https://user-images.githubusercontent.com/44912347/202296600-c5f247d6-9616-49db-88f0-38433429d781.jpg)

# Welcome To Our Inventory App

![workflow](https://github.com/Runtime-Terror123/InventoryApp/actions/workflows/build-lint-test.yaml/badge.svg?branch=main)

## Backstory
We are a team of developers for an e-commerce company. The Engineering team is rebuilding their inventory tracking app from the ground up. Your team has been tasked with creating a Full-Sack (front and back end) RESTful CRUD application to track the items.

## WireFrame 
https://github.com/Runtime-Terror123/InventoryApp/blob/main/wireframe.png?raw=true

### Getting Started
Prerequistes:
- Node.js
- NPM
- Sequelize CLI
- Jest
## Features 
### View All Items
- Sequelize Model: A comprehensive Sequelize model for Item, including fields for Name, Description, Price, Category, and Image.
- Express Route: A functional GET route to retrieve all items from the inventory.
- Front-end View: A dynamic front-end display for viewing all items in real-time.
### View Individual Item
- Express Route: A functional GET route to fetch data of a specific item based on user selection.
- Front-end View: Users can click to view detailed information about a single item.
### Add Item
- Front-end Form: A user-friendly form to add new items to the inventory database.
- Express Route: A functional POST route to add new items from submitted form data.
- Database Interaction: Form submission triggers a fetch request to add the item to the database.
### Remove Item
- Front-end Interaction: A delete button is available in the individual item view.
- Express Route: A DELETE route to remove items from the inventory database.
- Database Interaction: Item deletion is initiated through a fetch request upon button click.
### Edit Item
- Front-end Form: An edit form is available in the individual item view for users to update item details.
- Express Route: A functional PUT route to update item information.
- Database Interaction: Form submission triggers a fetch request to update the item in the database.

## Bonus Stuff

- Provided Models, Routes for Users and Orders
- Gave the Inventory site a more visual appeal
- To be able to search through data based on search criteria
- Gives the function to add items to a cart and purchase
- As a User, you can use the application on a mobile browser


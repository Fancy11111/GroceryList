# GroceryList

Just a quick little grocery list app in Angular, done for a school assignement

## Task

This school assignement has to be done with angular.
The elements and functionalities were assigned and can not be changed.
We have to use deployd as a 'backend' with specific configs that could not be changed either.

## Requirements for running this web application

For anyone wanting to try this on their own PC, you have to either:
* Run deployd with a collection called 'einkaufsliste'
* Or switch the url making the calls in the service to another API that stores and provides data.

If you are running deployd with these required fields you can also run the project [here](https://stackblitz.com/github/Fancy11111/GroceryList) without downloading and compiling.

The fields of either of those two things have to be:

### Fields

| name | type
| ---- | ---
| id | string
| produkt | string
| kosten | number
| erledigt | number 


If you want to change the name of those fields, you'll have to do a lot of refactoring.

## Technologies used
We have to use Angular, so obviously this project is based on Angular
I also added in  [Materialize](http://materializecss.com), a [Material Design](https://material.io/guidelines/) based front-end framework

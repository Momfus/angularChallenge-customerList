# <<< ChallengeCustomerList >>>

# The Challenge:

Create a customer list with the following columns:

* ID: auto generated guid
* First name (required)
* Last name (required)
* Status (active, pending, inactive) (required)
* Email (required)
* Phone

## Requirements

* List should be auto generated the first time the app launches with at least 20 records
* List component should be using NGRX (effects, reducers, selectors, actions)
* Simulate records persistency using any mechanism such as local storage, you can use anything as well as data is kept persisted but just initial data should be in code, anything after that should be fetched from the persistency mechanism you used.
* Sorting should be enabled by first name, last name, status.
* Filtering should be based on last name. A simple input box will suffice.
* The project should be ready to run after downloading, executing "npm install"​ & "npm start".
* You may use any styling library (e.g. bootstrap).
* Implement unit tests using karma/jasmine test framework, coverage needs to be at least 45%.
* Create a reactive form to add/edit a customer, validate fields, for example make sure email input is validated, think of other good validations.
* Responsive, should look good on mobile as well as desktop.
* Push your code to a repository and share the link, please don’t share the final version, we’d like to know the process behind the development so commit frequently to show us the process.
* Min acceptable angular version is 11 but 14 is desirable.

## Extra:

* Host the solution and send us the demo link


# Indication to run the project:

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

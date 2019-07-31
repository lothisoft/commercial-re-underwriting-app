#Introduction
This project was developed based on the following requirements specification: 

You’re going to build a loan underwriting web app! A user of your app will be able to input their property’s information and receive live loan terms.

We’ll help you out on some of the underwriting formulas.

Technical Stack
FE: Please write the app in React. You can decide whether you would like to leverage a fuller framework, such as Redux. 

Inputs
1.	Real U.S. address 
2.	Rent Roll (an array of every units’ monthly rent and unit details):  monthly rent, unit number, vacancy, bedrooms, bathrooms, annual total.
3.	Expense items: Marketing, Taxes, Insurance, Repairs, Administration, Payroll, Utility, Management
4.	A capitalization rate
a.	https://www.investopedia.com/terms/c/capitalizationrate.asp 

Outputs
Formated top 3 loan results (Option to view more).

Tip: Focus on user experience, clean coding style and accuracy.
Bonus: Use of modern CSS properties, geolocation integration (map, typeahead), data visualization.

Make an post API call to the following url with the below data object format to retrieve the loan amount and debt rate.
```
{
    income  : 300023, // Annual collected rent (Sum of all rents * 12)
    expenses: 22123,  // Total expenses value
    rate    : 3.22,   // cap rate
    noi     : 20000,  // Net Operating Income (income - expenses)
    address : {
               street: '1 Bacon Street',
               city  : 'Brooklyn',
               state : 'NY',
               county: 'Kings County',
               zip   : '11216'
    }
}
```

API URL: https://script.google.com/macros/s/AKfycbwPGz6uQQS9IW33ASPYlcWaEtRMD8eDAK1ONg7lT2dREXpaSUYh/exec

End of Specification
                  
The API endpoint is not configured to be used by a browser-based front-end.  It's not possible to use a browser based
unless the frontend runs on Google's domain.  The feature that precludes HTTP call to fail is called Cross-Origin Resource Sharing (CORS).
I work around this problem by catching the error when my HTTP POST call fails and simulate the success by assigning
the result from a call made to the endpoint using a tool called POSTMAN to a variable which is used to show the results.   
                  
##Implementation Philosophy
I decided to use as few third-party React libraries as possible.  That's why I decided not to utilize Redux.  It would
have been overkill for a project of this size.  Instead, I'm decided to use React's built in component state.

I used the following libraries:
######classnames: A library that simplifies concatenating CSS classnames
######node-sass: A library that allowed me to use SASS instead of regular CSS
######numeral: A library that helps in formatting numbers.  This project relies heavily on numbers and it was useful to have a straightforward way to format them properly.

I think it was the right decision to rely on as few third party libraries as possible because this was built as part of a coding challenge.  
In a professional software development project, it would have be prudent to utilize Redux for application state management.
I would also have used Redux-Form because state management for form components and form component validation hooks are provided by the 
library.

The project used modern javascript and css.  It used es6 by utilizing Babel to transpile the code and utilizes Flexbox and Grid as modern 
css features.  High code qualiy is maintained my using es-lint. 
The address search uses the Google Maps Places API to make the address entry as painless as possible.
Once the address has been selected, a Google Map is displayed to the right of the Address Editor to show the location on a map.

Every component source code is documented and describes implementation details.

##Look and Feel
The color scheme and font family tries to mimic that of the  Greystone Commercial Lending landing page. 


##Component Design Philosophy
I decided to organise the React components I built around the Atomic Design Methodolgy (as described by Brad Frost here: http://atomicdesign.bradfrost.com/). 
I organised my components around the concepts of atoms (single purpose components), molecules which consist of two or more atoms 
and organisms which consist of several atoms, molecules or other organisms.

##Atoms
###Label
The Label component represents an HTML label tag in particular as a text display method if the text belongs to another HTML form element

##Input 
The Input component represents the HTML input tag.

##Button
The Button component represents the HTML button tag.

##FormattedNumberInput
The FormattedNumberInput component implements a specialized input component which is used to allow the user to input a number 
and the component formats the number according to a format string which is passed as a parameter when the component loses the cursor focus.
This application relies a lot on entering and displaying numbers in different formats. This component is used both for 
input as well as the display of formatted numbers (with it's readonly mode)

##Molecules

###GoogleApiLoader
The GoogleApiLoader component does not have a visual representation.  It's only function is the single place where the Google
Maps Places API is loaded.  If each component loads its own copy of the Google Maps API, the dreaded "google maps api loaded multiple times on this page"
and the components relying on the javascript API won't work properly anymore.

###InputWithLabels
The InputWithLabels component implements a text or formatted number input box with an optional label describing the input box and an optional 
error message which is returned by a validation function when the input does not pass the validation test.

###GooglePlacesAutoComplete
The GooglePlacesAutoComplete implements a text input field which utilized the Google Places Autocomplete API to suggest
addresses in the US based on the first characters entered into the text field.

###GoogleMap
The GoogleMap component displays the location of the selected address.  When the address is edited, the Google Map does not update.

##Organisms
The ReUnderwritingApp app implements the User Interface for a Mortgage Underwriting application with the following elements:

###Address Input Field
- A Google Place API enhanced address search text input fields which proposes valid addresses in the US.  The user selects one
address to proceed.

###Address Editor
- The AddressEditor component displays the five elements of an address in the US: street address, city, state, zip code and county name.
The user can edit the values once the Edit Address button has been clicked. 

###Rent Roll
- The rent roll allows the user to enter 1 or more units at this address.  
The user can enter the following information for each unit: 
Unit Number - a free text field
Monthly Rent - the monthly rent amount in US-$
Vacancy rate - the vacancy rate in %
Number of bedrooms - the number of bedrooms for the unit
Number of bathrooms - the number of bathrooms for the unit
Annual Rent - this field is calculated (monthly rent * 12 - ((monthly rent * 12) * vacancy rate)) and is displayed but cannot be edited

###Expenses
- The user can enter a US-$ amount for the annual expenses for Marketing, Taxes, Insurance,
Repairs, Administration, Payroll, Utility, Management.  The annual total for expenses is calculated by adding all expense amounts and
the total is display, but cannot be editied by the user.

###NOI and Cap Rate
The amount for NOI is calculated by substracting the annual expenses from the annual rental income.  The value is displayed and
cannot be edited.  The capitalization rate in % can be entered by the user.

###Submit Button
Once the user has entered values for address, rental income, expenses and capitalization rate, the Submit button will be activated and the user can
submit the data.

### Mortgage Terms
Once the mortgage terms data has been returned from the server,  the first three mortgage terms are displayed.  All mortgage terms are shown after the user clicks on the "Show All" button.
  
###Each source code file contains comments to document implementation details.  
       
#Installation
To install the application, you can run: 
### `npm install`
to download all libraries required to run the application


#Usage
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To start the application, you can run:
### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To see the Storybook for the components, you can run:
### `npm run storybook`

Runs the app in the storybook mode<br>
The storybook mode will open a new browser and display the storybook  For more information about Storybook, please see: https://storybook.js.org/
 



#Boilerplate Instructions provided by create-react-app
The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

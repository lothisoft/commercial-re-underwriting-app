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

API URL: https://script.google.com/macros/s/AKfycbwPGz6uQQS9IW33ASPYlcWaEtRMD8eDAK1ONg7lT2dREXpaSUYh/exec

End of Specification

##Implementation Philosophy
I decided to use as few third-party React libraries as possible.  That's why I decided not to utilize Redux.  It would
have been overkill for a project of this size.  Instead, I'm decided to use React's built in component state.

I used the following libraries:
######classnames: A library that simplifies concatenating CSS classnames
######node-sass: A library that allowed me to use SASS instead of regular CSS
######numeral: A library that helps in formatting numbers.  This project relies heavily on numbers and it was useful to have a straightforward way to format them properly.


#Usage

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To start the application, you can run:
### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.












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

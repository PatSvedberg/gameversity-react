

# Deployment
## Github
### Create Repository
* I created a repository using this [template](https://github.com/Code-Institute-Org/react-ci-template/generate)
* After that I opened it in Gitpod using the green Github button.

<hr />

## React
* The template created the app for me
* To make it work correctly, I had to use these two commands.
```
nvm install 16
```
```
nvm use 16
```
* To make sure it worked correctly I used the command
```
npm start
```

<hr />

### React Bootstrap
* I used React Bootstrap version 4.6.0 and installed it using the steps from [here](https://react-bootstrap-v4.netlify.app/getting-started/introduction)
* In the terminal enter:
```
npm install react-bootstrap bootstrap@4.6.0
```
* In index.html. Inside the `<head>` add:
```
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
  integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
  crossorigin="anonymous"
/>
```

<hr />

### Install ESLint
* I followed this [guide](https://gist.github.com/ianmeigh/8e603b91a38d7829d959402bfcf29d3d)
* Installing eslint:
```
npm install eslint --save-dev
```
* Generate and configure your eslint configuration file (.eslintrc.json)
```
npx eslint --init
```
Answer the questions in the terminal:

1. Q: How would you like to use ESLint?
    * A: To check syntax and find problems
2. Q: What type of modules does your project use?
    * A: JavaScript modules (import/export)
3. Q: Which framework does your project use?
    * A: React
4. Q: Does your project use TypeScript?
    * A: No
5. Q: Where does your code run?
    * A: Browser (Use space bar to set selection)
6. Q: What format do you want your config file to be in?
    * A: JSON
7. Q: ou will then be prompted to install `eslint-plugin-react`
    * A: select "Yes"
8. Q: If prompted to select a package manager:
    * A: use `npm`


<hr />

## Heroku
### First Deployment
* To deploy to Heroku, create and login to your Heroku account.
* Click the "New" dropdown button and click "Create new app"
* Give your app a unique name and pick a region (Europe in my case)
* Inside the Deploy tab use the deployment method Github.
* Search for the Github repository you created and click connect.
* When connected, scroll down to Manual deploy and click "Deploy"
* Wait for it to build. When it's done you can open the app


<hr />

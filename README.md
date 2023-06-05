

# Deployment
## Github
### Create Repository
* I created a repository using this [template](https://github.com/Code-Institute-Org/react-ci-template/generate)
* After that I opened it in Gitpod using the green Github button.
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

## Heroku
### First Deployment
* To deploy to Heroku, create and login to your Heroku account.
* Click the "New" dropdown button and click "Create new app"
* Give your app a unique name and pick a region (Europe in my case)
* Inside the Deploy tab use the deployment method Github.
* Search for the Github repository you created and click connect.
* When connected, scroll down to Manual deploy and click "Deploy"
* Wait for it to build. When it's done you can open the app
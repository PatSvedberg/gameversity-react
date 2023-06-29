# Gameversity - React

# Project Goals
The primary goal of this project is to create a website where game developers can upload their own game development tutorials in text form. There are a lot of video tutorials for game development, but sometimes a smaller tutorial with text and pictures can be easier. This website aims to become a comprehensive hub for game development knowledge, enabling developers from all around the world to share their wisdom and learn from each other. Whether you're an experienced developer with a lot of knowledge to share or a newbie looking for guidance, this site is for you.

# User Stories
## Navigation & Authentication
* **Navigation** - As a User I can I can view a navbar from every page so that recived I can navigate easily between pages
* **Navigation - Conditional Rendering** - As a User I can view the appropriate buttons for sign-in and sign-out so that convenient to log in and out whenever necessary or desired.
* **User - Sign Up** - As a User I can I can create my own account so that create tutorials, like, dislike and comment on tutorials and subscribe to other users
* **User - Sign In** - As a User I can sign in to the app so that create tutorials, like, dislike and comment on tutorials and subscribe to other users
* **User - Logged In Status** - As a User I can I can tell if I am logged in or not so that can log in if I need/want to
* **User - Refreshing access tokens** - As a User I can maintain my logged-in status until I choose to log out so that I'm not logged out when I don't want to and my user experience is not compromised
* **Profile Picture** - As a User I can see mine and other users profile picture so that easily identify users of the application
* **Forgot password** - As a user I want to be able to reset my password if I forget it so that ** I can regain access to my account
* **Goolge or social media account creation and login** - As a user I want to be able to log in to the application using my Google or social media accounts so that I can quickly access the application without creating a separate account

## Tutorial Interaction
* **Create Tutorials** - As a logged in User I can I can create my own tutorials so that others can use them to create their own video games
* **View a tutorial** - As a user I can view the details of a tutorial so that I can learn how to make my own video games
* **Edit tutorial** - As a tutorial owner I can edit the information of the tutorial so that I can update it and correct any error I might have made
* **Delete tutorial** - As a logged in tutorial user I can delete my own tutorials so that have control over my tutorials
* **Like a tutorial** - As a user I can like a tutorial so that others can see if the tutorial is good or not
* **Dislike a tutorial** - As a user I can dislike a tutorial so that others can see if the tutorial is good or not
* **Post Comment** - As a logged in user I can create a comment in a tutorial so that to share my thoughts or ask for help if I'm stuck during my work
* **Comment on a comment** - As a logged in user I can comment of someone elses comment in a tutorial so that share my thoughts on it or help them out if needed
* **Delete comment** - As a owner of a comment I can delete my comment so that I have control over my own comments

## The Tutorial Feed
* **See latest tutorials** - As a user I can view the lastest tutorials that has been uploaded so that see if there is something new and interesting I want to try to do
* **Search tutorial** - As a user I can search for tutorials using keywords so that I can try to find the help I need in my development
* **View subscription feed** - As a logged in user I can choose to only view the post of those I'm subscribed to so that I easily can find content of my favorite creators
* **Tutorial page** - As a user I can view the tutorial page so that I can read the content and comments in the tutorial
* **Infinite scroll** - As a user I can keep scrolling through the posted tutorials on the site, that are loaded for me automaticlly so that I don't have to click on "next page"
* **Subscribe/Unsubscribe** - As a logged in user I can subscribe to other users so that I add and remove their posts to my subscriber feed

## The Profile page Page
* **User profile page** - As a user I can view my own and other users profile pages so that learn more about them and find their posts
* **View liked tutorial** - As a user I can see the tutorials I liked so that I easily can come back and view them again
* **Most subscribed profile** - As a user I can see a list of the most subscribed users so that find the most popular users
* **User information** - As a user I can see information of users so that I can see their picture, name, bio ect
* **See user's posted tutorials** - As a user I can view the tutorials posted by a user so that I can find more posts that I might like and decide if I want to follow them
* **Update username and password** - As a logged in user I can update my username and password so that I can change my username and keep my profile secure

<hr />


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

1. Q: **How would you like to use ESLint?**
    * A: To check syntax and find problems
2. Q: **What type of modules does your project use?**
    * A: JavaScript modules (import/export)
3. Q: **Which framework does your project use?**
    * A: React
4. Q: **Does your project use TypeScript?**
    * A: No
5. Q: **Where does your code run?**
    * A: Browser (Use space bar to set selection)
6. Q: **What format do you want your config file to be in?**
    * A: JSON
7. Q: **You will then be prompted to install `eslint-plugin-react`**
    * A: select "Yes"
8. Q: **If prompted to select a package manager:**
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

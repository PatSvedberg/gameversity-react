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

# Agile Development Methodology

GitHub issues and projects were utilized to document and track an agile development approach. Each user story was represented by a GitHub issue, with labels indicating whether they were necessary for the Minimum Viable Product (MVP). The product backlog was symbolized by a GitHub milestone, and initially, all user stories were added to it.

The development work was organized into iterations, each spanning one week.
For every iteration, a dedicated GitHub project board was created. User stories were moved from the product backlog to the relevant iteration as each work cycle commenced. In the iteration-specific project boards, user stories were categorized as 'must have,' 'could have,' or 'should have' goals. Some iterations also included 'tasks' that were not represented as user stories, such as setup/configuration and design/styling.

To monitor progress, a project kanban board was employed. User stories were moved across columns labeled 'Todo,' 'In Progress,' and 'Done' based on their status.

**Iteration 1**

![Iteration 1](../gameversity-react/readme/iteration1-readme.PNG)

**Iteration 2**

![Iteration 2](../gameversity-react/readme/iteration2-readme.PNG)

**Iteration 3**

![Iteration 3](../gameversity-react/readme/iteration3-readme.PNG)

# Design
## Colors
## Fonts
# Planning
## Mockups

# Features
## Unregistered users
A user who does not have an account or is not logged in is still able to read the tutorials and visit profiles. However, they are not able to create their own tutorials, comment on tutorials, like tutorials, or subscribe to other users.

## Sign up page
The sign up page enables a user to open a new account. As well as entering a user name and password for the account.

## Sign in page
The sign-in page allows a registered user to sign in to their account. A signed-in user is able to do things that a logged-out user cannot, such as creating their own tutorials, commenting on tutorials, liking tutorials, and subscribing to other users.

## Navbar
The navbar is a important component of the website, designed to provide easy navigation, user authentication controls, and direct access to the user's profile. It's designed to be intuitive and user-friendly, providing a seamless experience whether you're browsing tutorials or managing your profile.

## Logo
The logo serves as an anchor, always bringing you back home. When clicked, it navigates the user back to the start page, providing a fast way to get back to the homepage regardless of where you are on the site.
## Home link
Functionally similar to the logo, the Home link also navigates to the start page. However, it offers a bit of visual feedback - when you're on the home page, the Home link changes color. This color change also applies to other links when you're on their respective pages, providing a clear visual cue of your current location on the site.
## Subscription Feed
The Subscription Feed link takes you to a feed of newly posted tutorials from users you're subscribed to. This feature allows you to stay updated with your favorite content creators, ensuring you never miss out on their latest tutorials.
## Liked Tutorials Feed Link
The Liked Tutorials Feed link is your personal collection of tutorials that you've liked. It's a great way to bookmark tutorials for later viewing or to keep track of your favorite tutorials.
## Sign In/Sign Out Buttons
The navbar dynamically adjusts based on your authentication state. If you're logged out, you'll see Sign In and Sign Up buttons. If you're logged in, you'll instead see a Sign Out button. This provides a clear, intuitive interface for managing your user session.
## Profile Link
The Profile link is your gateway to your user profile. It includes your profile picture and takes you directly to your profile page where you can manage your account and view your uploaded tutorials.

## Create Tutorial
The Create Tutorial Page is a dedicated space for users to share their knowledge and expertise by creating new tutorials. This page is accessible only to logged-in users, ensuring that the content created is from authenticated sources. The button to access this page is conveniently located in the navbar and is only visible to logged-in users.
### Page Layout
Upon navigating to the Create Tutorial Page, users are presented with an easy-to-use form to create their tutorial. The form is designed to collect all the necessary details to create a comprehensive tutorial.
### Title
The first field is for the tutorial title. This is where users can provide a concise and informative title for their tutorial.
### Description
Next, users can provide a description of their tutorial. This field should contain a brief summary of what the tutorial is about and what it aims to teach.
### Image
Users can also upload an image that best represents their tutorial. This could be a screenshot from the tutorial itself or any image that gives a snapshot of what the tutorial is about.
### Coding Language, Game Engine, Game Engine Version
These fields allow users to specify the technical specifications of their tutorial. Users can select the coding language, game engine, and the version of the game engine used in their tutorial. This information helps other users understand the technical requirements of the tutorial.
### Theme
The tutorial theme field allows users to categorize their tutorial under a specific theme or topic. This helps in better indexing of the tutorial and makes it easier for other users to find tutorials of a specific theme.
### Instructions
Finally, users can provide the step-by-step instructions of their tutorial in the Tutorial Instructions field. This is the main content of the tutorial where users detail the procedure to achieve what the tutorial is teaching.

## Search bar
Finally, users can provide the step-by-step instructions of their tutorial in the Tutorial Instructions field. This is the main content of the tutorial where users detail the procedure to achieve what the tutorial is teaching.
<br />
<br />
The search bar operates by matching the entered keyword to various fields in the tutorial data. When a user enters a keyword, the search function scans through all tutorials and returns those that have the keyword in their title, engine, coding language, theme, or the username of the tutorial creator. This functionality ensures a comprehensive search mechanism that can help users find exactly what they are looking for.

## Edit Tutorial Page
The Edit Tutorial Page allows users to modify the details of an existing tutorial. This page is accessible only to the creator of the tutorial from inside the tutorial view by clicking the three dots in the top-right corner of it, ensuring that only the owner has the rights to make changes.
<br />
<br />
When users access the Edit Tutorial Page, they are presented with a form identical to the Create Tutorial Form. However, this form is pre-populated with the existing details of the tutorial. The pre-populated fields include the tutorial title, description, image, coding language, game engine, game engine version, theme, and tutorial instructions. Users can then make changes or updates to any of these fields as needed before saving the modified tutorial.

## Profile Page
The profile page is a personalized space for users to showcase their identity and tutorials. It is designed to provide a snapshot of a user's activities and contributions to the platform.
<br />
<br />
At the top of the profile page, users can see their profile picture and username. The profile picture helps to personalize the page, while the username provides a unique identifier for the user within the platform.
<br />
<br />
Just below the username, users can see the count of their created tutorials, the number of subscribers they have, and the number of other users they are subscribing to. These numbers provide a quick overview of the user's engagement with the platform.
<br />
<br />
The bio section allows users to write a few lines about themselves. This could include their interests, expertise, or anything else they'd like to share with the community.
<br />
<br />
The bottom section of the profile page presents a feed of the user's created tutorials. This gives others a quick way to access and browse through the tutorials created by the user.
<br />
<br />
The dropdown menu, accessible via a three-dot icon at the top right of the profile page, provides a quick and easy way for users to access key account-related actions. These actions include changing their username, password, and editing their profile with a new bio or profile picture.

### Change Username
By clicking on this option, users are presented with a form field where they can input a new username. After confirming their choice, the username on the account is updated.
### Change Password
This option allows users to change their password. It will present users with a form where they can input their new password, and then enter a new password again for verification.
### Edit Profile
The 'Edit Profile' option takes users to a separate page where they can update their bio and profile picture. This page contains a textfield for the bio and an uploader for the profile picture.

### Subscribe
When you visit another user's profile, you will see a 'Subscribe' button. Clicking this button subscribes you to the user, meaning their tutorials will now appear in your tutorial feed. The 'Subscribe' button then changes to an 'Unsubscribe' button.
### Unsubscribe
If you're already subscribed to a user, the 'Subscribe' button will be replaced with an 'Unsubscribe' button. Clicking this button will unsubscribe you from the user, and their tutorials will no longer appear in your tutorial feed.

# Re-used components
A number of reusable React components were created with the intention of reducing code duplication.
### **Avatar.js**
I've got a reusable component called Avatar.js. A profile picture that is shown in the profile page, on posted tutorials on comments and in the feed of popular users
<hr>

### **Asset.js**
The Asset component is a versatile component in our React application. It's designed to display a spinner, an image, and a message based on the passed props.
<br />
**Spinner**
<br />
The Asset component can display a spinner, which is a circular loading indicator from the React-Bootstrap library. The spinner is rendered when the spinner prop is passed with a truthy value. This can be useful to indicate a loading state in the application.
<br />

**Image**
<br />
The Asset component can display an image. The image is rendered when the src prop is passed with a string representing the image source.

**Message**
<br />
The Asset component can display a custom message. The message is rendered when the message prop is passed with a string. This can be used to provide additional information to the user, such as error messages or instructions.

<hr>

### **MoreDropdown.js**
The MoreDropdown.js component is integrated into the Gameversity application to provide users with additional options pertaining to their user profiles, tutorials, and comments. Identified by an icon consisting of three dots, users can interact with this component to access various editing and deleting functions.
<br />
<br />
**Edit and Delete Options**
<br />
The MoreDropdown.js component provides users with the capability to edit and delete their tutorials and comments. It is designed to offer a user-friendly interface where users can easily manage their content.

Profile Management
In addition to managing tutorials and comments, users can also use the MoreDropdown.js component to modify their profile details. This includes editing their profile bio, changing their avatar, updating their username, or changing their password.

Iconic Representation
The component is represented by an icon of three dots, a universal symbol for more options. This makes it intuitive for users to locate and utilize this component.

<hr>

### **NavBar.js**
The NavBar component is offering a navigation bar to guide users through the application. It can be found from evey page of the site.

<hr>

### **NotFound.js**
The NotFound component renders a message indicating that the page the user is looking for does not exist.

# CRUD Functionality
Gameversity provides full Create, Read, Update, and Delete functionality through a user interface developed using React along with the Django Rest Framework API.

* **Create**
<br />

Users have the ability to register new accounts. Following registration, they can create their own tutorials and post comments on their own or others' tutorials.
* **Read**
<br />

Both authenticated and unauthenticated users can view and read tutorials as well as user profiles.

* **Update**
<br />

Users, while logging in, can modify tutorials they've created, edit their comments, and update their bio, avatar, username, and password.

* **Delete**

<br />
Authenticated users have the option to delete their own tutorials and comments.

# Future Features

* Initially, I had an idea to add a feature to the tutorial creation form. Instead of having an "instructions" section, I wanted to include a section called "steps" at the bottom of the page. In this section, users could provide information using a text field and upload images for each step. They would be able to add as many steps as they wanted. I managed to implement this feature in the backend, but I encountered difficulties while working on it in React. I asked my mentor and reached out to tutor support twice, but unfortunately, I couldn't find a solution. I believe the problem was that each step needed its own model with a connection to the tutorial. However, since the tutorial wasn't technically created until the user clicked the submit button, I struggled to find a way around it. Since I had already spent a lot of time on it, I decided to opt for a simpler solution for now. However, I have kept the step model for future implementation.

# Testing
## Manual testing
## Automatic testing
## Valicator test
### ESLint JavaScript validator
### W3C CSS validator
### Lighthouse testing

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
* I used React Bootstrap version 4.6.0 and installed it using the steps from 
[here](https://react-bootstrap-v4.netlify.app/getting-started/introduction)

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

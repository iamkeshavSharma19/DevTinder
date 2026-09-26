## Dev Tinder

# EP-15

- Created a vite + React application
- Remove unnecessary code and create a Hello World App
- Install Tailwind CSS
- Install Daisy UI
- Add Navbar component to App.jsx
- Create a Navbar separate Component File
- Install react-router-dom
- Create BrowserRouter > Routes > Route=/Body > RouteChildren
- Create an Outlet in your Body Component.
- Create a footer.

# EP-16

- Create a login Component
- Install axios
- CORS - install cors in backend => add middleware with configuration: origin, credentials: true
- Whenever you're makking API call so pass axios => {withCredentials: true}
- Install Redux Toolkit
- Install react-redux + @reduxjs/toolkit => configureStore => Provider => createSlice => add reducer to store
- Add redux devTools in Chrome.
- Login and see if your data is coming properly in the store
- Navbar should update as soon as the user Logs In
- Refactor our code to add constants file + create a components folder.

# EP-17

- You should not be able to access other routes without login
- If token is not present, redirect user to login page
- Logout Feature
- Get the feed and add the feed in the store
- Profile
- EditProfile Feature.
- Show Toast Message on the save of profile.

# EP-18

- New Page - See all my Connections.
- New Page - See all my Connection Requests.
- Feature - Accept/Reject Connection Request.

# EP-19

Remaining:

- Send/ignore the user card from feed
- Signup New User
- E2E Testing

# Season 3

# Deployment

# Episode 01

- Signup on AWS
- Launch instance
- chmod 400 <secret>.pem
- Install Node version 24.11.1
- Git clone into Ubantu System
- Frontend
  - npm install -> dependencies install
  - npm run build
  - sudo apt update
  - sudo apt install nginx
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - Copy code from dist(build files) to /var/www/html/
  - sudo scp -r dist/\* /var/www/html/
  - Enable port 80 of your instance

# Episode 02
# Deploying The Backend

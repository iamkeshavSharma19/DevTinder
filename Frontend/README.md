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

- allowed ec2 instance public IP on Mongodb server
- installed pm2 package
- npm install pm2 -g
- pm2 start npm -- start
- pm2 logs
- pm2 flush npm
- pm2 list
- pm2 stop npm
- pm2 delete npm
- pm2 start npm --name "devtinder-backend" -- start

- config nginx - /etc/nginx/sites-available/default

nginx config :

     server_name 51.20.56.78;
     location /api/ {
            proxy_pass http://localhost:7777/;
            proxy_http_version 1.1;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
          }

- restart nginx => sudo systemctl restart nginx
- Modify the BASEURL in frontend project to "/api"

# Episode 03

# Adding a custom domain name

- Purchased domain name from godaddy
- signup on cloudfare & add a new domain name
- change the nameservers on godaddy and point it to cloudfare
- wait for some time till your nameservers are updated

# Episode 07

# Razorpay Payment Gateway Integration.

    - Sign up on Razorpay & complete KYC
    - Created a UI for premium page
    - Creating an API for createOrder In backend
    - added my key And secret in env file.
    - Initialised Razorpay in utils
    - creating order on razorpay
    - create Schema and Model
    - saved the order in payments collection
    - make the API dynamic
    - Setup Razorpay webhook for your dynamic api
    - Setup RRazorpay webhook on your live APi

- Ref - https://github.com/razorpay/razorpay-node/tree/master/documents
- Ref - https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/#integrate-with-razorpay-payment-gateway
- Ref - https://razorpay.com/docs/webhooks/validate-test/
- Ref - https://razorpay.com/docs/webhooks/payloads/payments/

# Episode 08

# Real Time Chat using Web Socket (Socket.io)

- Build the UI for a chat window on /chat/:targetUserId
- Setup socket.io in backend
- npm i socket.io

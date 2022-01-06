# You will need to change all of the AJAX http method uri's from birdsuphotels.com:3001/* to localhost:3001/*, otherwise you will just poll what's active on the live web server

# Project Technology Stack

> HTML, with AJAX and Jquery for data hydration/insertion client-side. MySQL database on back-end, with Node.js running our REST API server and express handling back-end-MC (Model and Control).

> Stack Acronym: HMEN?
>                HMENAJ?

# Hotel Reservation System

**TO-DO**  

> ~~1). Booking Feature for client reservations, not updating booking properly on search page~~<br /><br />
> 2). Server responses are incorrect for admin-page, namely when there is an SQL error due to no entries, server needs to respond to client with
> the appropriate response<br /><br />
> 3). Need to fully implement the client's reservation page, where they can view, edit, or delete their reservations<br /><br />
> 4). Implement Stripe API, or stripe-like payment system<br /><br />
> 5). Implement a Chat Bot, possibly utilizing Dialogflow<br /><br />
> ~~6). Hook up the Contact form on the admin-page, to the server admin's email~~<br /><br />
> 7). Add a few admin accounts; only admin accounts should be able to alter a person's reservation<br /><br />
> 8). From the Sign-In page, route the client or admin to their appropriate pages and remove the admin_page from the navigation bar

# **PROJECT-SET-UP**

_**THE FOLLOWING ASSUMES YOU HAVE NODE and NPM INSTALLED ON YOUR MACHINE**_  

> make sure you're in the root directory (Group-6-Soft-Eng/soft-project)  

> "**index.js is where our node server is instantiated**"
  
> run npm install "**this will install all node_module dependencies**"    
  
> run "node index.js" "**this will start up our node server on local host, port 3001**"

> An alternative to this for development purposes is running npm run start-dev, which will restart the server upon changes to the server's files.
> It utilizes another node package to kill the process on 3001, were it to hang and disallow you to re-use it
  
> We are utilizing ejs as our view engine, so navigating to localhost:3001 will route you to the "home-page," which happens to be our hotel-search page

# Live Website

> Features of our website can be tested by navigating to the URL: birdsuphotels.com<br />
  
> The following cities can be used as test data on the hotel search page: Orlando, Corpus Christi, Philadelphia, San Antonio, and Denver.<br />
> You must enter any one of these cities in the "Location" field

> When results are returned from a search, if you click the "Book Now" button and you do not have an active login session, you will be redirected to the sign-up/login page<br />

> If you do have an active login session, the alert window will notify you that you have successfully booked your reservation. However, this can be proven to not work by searching for the same hotel again<br />

> The search functionality only shows rooms that are available, so the results returned from a search shouldn't show the hotel that you just booked

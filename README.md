# Live Website

> Features of our website can be tested by navigating to the URL: birdsuphotels.com<br />
  
> The following cities can be used as test data on the hotel search page: Orlando, Corpus Christi, Philadelphia, San Antonio, and Denver.
> You must enter any one of these cities in the "Location" field.<br />

> For testing the admin_panel (now hidden from the navigation bar) use the accounts: 1). account = admin1@gmail.com password = admin1 2). account = admin2@gmail.com
> password = admin2 3). account = admin3@gmail.com password = admin3<br />

> An admin account can now add properties, as well as add rooms for properties. You can test that this works successfully by querying the hotel search page with the city of
> the property that you've added.<br />

> The contact form is hooked up on the admin-page, you can fill out the form and submit it to the server admin's email<br />

> The customer reservations page will show you what reservations you have if you click on the "delete reservation" button. You're able to delete your reservations as well.<br />

> If you have an active login session with a regular user account, clicking "Book Now" on the hotel search page will add your reservation. You can test that your booking was made by navigating to the "my reservations" page and clicking the button "delete reservation".

> All of the input fields on the hotel search page, the admin page, and the sign-up / sign-in page have extensive error checking to make sure you didn't leave a field
> blank. The sign-up / sign-in page now features the sign-up form as a hidden form, so you must click "click to create account" to show the hidden sign-up form<br />

> The login form directs you to the page that's associated with the account you sign in with, i.e. admin accounts are directed to the admin page, while regular users are directed to the hotel search page. You can create regular accounts, but you need to utilize one of the admin accounts listed above to be able to use the admin page<br />

> Our website now features a chatbot utilizing the technlogies of Diagflow and Kommunicate. For this project, Kommunicate is set-up to have live interaction from a human. The chat bot doesn't currently feature any responses, however, I'm able to respond to queries made by users.

# Project Technology Stack

> HTML, with AJAX and Jquery for data hydration/insertion client-side. MySQL database on back-end, with Node.js running our REST API server and express handling back-end-MC (Model and Control).

> Stack Acronym: HMEN?
>                HMENAJ?

# Hotel Reservation System

**TO-DO**  

> ~~1). Booking Feature for client reservations, not updating booking properly on search page~~<br /><br />
> ~~2). Server responses are incorrect for admin-page, namely when there is an SQL error due to no entries, server needs to respond to client with
> the appropriate response~~<br /><br />
> 3). Need to fully implement the client's reservation page, where they can view, edit, or delete their reservations<br /><br />
> 4). Implement Stripe API, or stripe-like payment system<br /><br />
> ~~5). Implement a Chat Bot, possibly utilizing Dialogflow~~<br /><br />
> ~~6). Hook up the Contact form on the admin-page, to the server admin's email~~<br /><br />
> ~~7). Add a few admin accounts; only admin accounts should be able to alter a person's reservation~~<br /><br />
> ~~8). From the Sign-In page, route the client or admin to their appropriate pages and remove the admin_page from the navigation bar~~<br /><br />
> ~~9). On the signup-sign in page, add a form that is hidden by default, and opens by click button. Do this for the sign-up form~~<br /><br />
> 10). Need to figure out how to implement security on back-end so that if a user's cookie is hijacked, a malicious user can't use their session<br /><br />
> 11). Lower life-time of cookie on live-website and create a prod branch with proper http URI's; will need to add helper files where routes are defined
> to localhost and the live web-server appropriately, and configure .gitignore, so when updating prod via main, we don't defeat the purpose of having a prod branch<br /><br />
> 12). Clean up all the console.logs on the client<br /><br />
> ~~13). reduce admin_page fields; make deleting or adding a reservation more user-friendly (need to add startDT and endDt fields)~~<br /><br />
> ~~14). Need to disallow duplicate rentals for the same property for reservations made by the client on hotel search page and admin on admin_panel~~<br /><br />
> 15). Need to invalidate old rentals with the same roomID and propertyID, startDT and endDT might affect this?<br /><br />
> 16). Need to handle all edge cases for admin_page add and remove booking (SQL Logic)<br /><br />
> 17). Need to handle all edge cases for hotel-search page CLIENT-MADE booking (SQL Logic)<br /><br />
> 18). Need to trim data returned from server, right now sensitive data isn't filtered out<br /><br />
> 19). Add ability for admin to add or remove properties<br /><br />
> 20). Need to train chat bot intents, so the chat bot has appropriate responses<br/><br/>
> 21). Ensure that all HTML TEMPLATE ID's are unique; AJAX requests are much less code and more concise when we target input fields by ID rather than
> targetting the form and extracting the values from it. It does ensure that we target the correct form and field though!<br/><br/>
> 22). Need to add input validation to front-facing add property and add room features<br/><br/>
> 23). We have the ability to add images to our server, as well as serve images to our client. We need to find a way to store the image's path in our database,
> so that we can reference that path; this gives admins the ability to upload images, and for those images to be displayed on the hotel search page for
> customers<br/><br/>
> 24). Need to utilize prepared statements for SQL logic across all models

# **PROJECT-SET-UP**

# You will need to change all of the AJAX http method uri's from birdsuphotels.com:3001/* to localhost:3001/*, otherwise you will just poll what's active on the live web server

_**THE FOLLOWING ASSUMES YOU HAVE NODE and NPM INSTALLED ON YOUR MACHINE**_  

> make sure you're in the root directory (birdsuphotels/soft-project)  

> "**index.js is where our node server is instantiated**"
  
> run npm install "**this will install all node_module dependencies**"    
  
> run "node index.js" "**this will start up our node server on local host, port 3001**"

> alternatively you can use the command **nodemon** to restart the server when changes are saved

> An alternative to this for development purposes is running npm run start-dev, which will restart the server upon changes to the server's files.
> It utilizes another node package to kill the process on 3001, were it to hang and disallow you to re-use it
  
> We are utilizing ejs as our view engine, so navigating to localhost:3001 will route you to the "home-page," which is our hotel-search page

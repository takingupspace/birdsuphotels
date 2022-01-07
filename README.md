# You will need to change all of the AJAX http method uri's from birdsuphotels.com:3001/* to localhost:3001/*, otherwise you will just poll what's active on the live web server

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
> 5). Implement a Chat Bot, possibly utilizing Dialogflow<br /><br />
> ~~6). Hook up the Contact form on the admin-page, to the server admin's email~~<br /><br />
> ~~7). Add a few admin accounts; only admin accounts should be able to alter a person's reservation~~<br /><br />
> ~~8). From the Sign-In page, route the client or admin to their appropriate pages and remove the admin_page from the navigation bar~~<br /><br />
> ~~9). On the signup-sign in page, add a form that is hidden by default, and opens by click button. Do this for the sign-up form~~<br /><br />
> 10). need to figure out how to implement security on back-end so that if a user's cookie is hijacked, a malicious user can't use their session<br /><br />
> 11). lower life-time of cookie on live-website and create a prod branch with proper http URI's; will need to add helper files where routes are defined
> to localhost and the live web-server appropriately, and configure .gitignore, so when updating prod via main, we don't defeat the purpose of having a prod branch<br /><br />
> 12). clean up all the console.logs on the client<br /><br />
> ~~13). reduce admin_page fields; make deleting or adding a reservation more user-friendly (need to add startDT and endDt fields)~~<br /><br />
> 14). Need to disallow duplicate rentals for the same property for reservations made by the client on hotel search page and admin on admin_panel<br /><br />
> 15). Need to invalidate old rentals with the same roomID and propertyID, startDT and endDT might affect this?<br /><br />
> 16). Need to handle all edge cases for admin_page add and remove booking (SQL Logic)<br /><br />
> 17). Need to handle all edge cases for hotel-search page CLIENT-MADE booking (SQL Logic)<br /><br />
> 18). Need to trim data returned from server, right now sensitive data isn't filtered out<br /><br />
> 19). Add ability for admin to add or remove properties<br /><br />

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
  
> The following cities can be used as test data on the hotel search page: Orlando, Corpus Christi, Philadelphia, San Antonio, and Denver
> You must enter any one of these cities in the "Location" field. It is best to use Orlando for testing data on both the hotel search page and the admin-page<br />

> For testing the admin_panel (now hidden from the navigation bar) use the accounts: 1). account = admin1@gmail.com password = admin1 2). account = admin2@gmail.com
> password = admin2 3). account = admin3@gmail.com password = admin3<br />

> The contact form is hooked up on the admin-page, you can fill out the form and submit it to the server admin's email<br />

> List Booked properties on the admin-page reservation tab isn't fully finished, but you can use the propId and roomId values to book and unbook reservations
> If you unbook reservation, it will not be shown in the list when you click the button again<br />

> The customer reservations page will show you what reservations you have if you click on the "delete reservation" button. Clicking the button will open the form,
> press submit and it will populate with the reservations you have made (as long as you have logged in with an account). A lot needs to be done with this page, but
> you can also see that depending on which account you're in the "Here are your reservations *enter customer's name that is logged in*" at the top will populate
> accordingly, as well as the delete reservation form<br />

> If you use a regular account to book a property, searching for it again will not display the property you have booked. You will need to utilize one of the admin
> accounts to remove the booking and test out the search page once again. It is easiest to test functionality for the hotel search with the city of Orlando. You will
> then need to remove the booking with an admin account to be able to search for the hotel in Orlando once again<br />

> On the admin-page when you click on the reservations tab, a pop-up form is displayed, use the following information to be able to test out the hotel search page
> and admin-page functionality for the city of Orlando. Follow the information provided in the fields, and utilize the room ID of 18 and the property ID of 15.<br />

> When results are returned from a search, if you click the "Book Now" button and you do not have an active login session, you will be redirected to the sign-up/login page<br />

> If you do have an active login session, the alert window will notify you that you have successfully booked your reservation. You can test that your booking was made by navigating to the "my reservations" page, where you can click the delete reservation button, where a form will pop up, hit submit and it will populate with the properties you have booked<br />

> All of the input fields on the hotel search page, the admin page, and the sign-up / sign-in page have extensive error checking to make sure you didn't leave a field
> blank. The sign-up / sign-in page now features the sign-up form as a hidden form, so you must click "click to create account" to show the hidden sign-up form<br />

> The login form directs you to the page that's associated with the account you sign in with, i.e. admin accounts are directed to the admin page, while regular users are directed to the hotel search page. You can create regular accounts, but you need to utilize one of the admin accounts to be able to use the admin page<br />

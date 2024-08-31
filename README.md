##Farm Management System

#How to Run the Project
This is a simple farm management system built using HTML, CSS, and JavaScript. To run the project:
#Using VS Code with Live Server Extension:
•	Open the project folder in Visual Studio Code.
•	Find the index.html file.
•	Right-click on index.html and select "Open with Live Server." This will run the project in your default web browser.
#Running Directly in a Web Browser:
•	Locate the index.html file in your project folder.
•	Double-click the index.html file, or right-click and choose "Open with" and select your preferred web browser.
•	Now, you will be redirected to the login page. This system uses the browser's localStorage for authentication.
#To log in, use one of the following predefined username and password combinations:
Username: admin
Password: admin123
Or
Username: user
Password: user123
These credentials are set in the auth.js file.

#Application Overview
#Dashboard
This is a simple dashboard with five data cards:
#Navigation Bars:
•	Side Nav Bar: Used for navigation.
•	Top Nav Bar: Includes the logo, search bar, and a dropdown button for the profile. Currently, this button only has a "Log Out" option, which allows you to log out from the website.
#Data Cards:
•	Four of these cards dynamically display data based on user inputs from forms located in the management pages.
•	The last card shows weather information using an API key (note: the API may not always respond correctly).
•	Crop Names Synchronization: After adding crops in the Crops Management page, the first card on the dashboard will update to display the crop names you've added.
#Crops Management
•	Here, you can manage crops. This section has three parts:
#Form to Enter Data:
•	When you enter data in the form, it will appear in the data table below.
•	The table allows you to manage the entered data with two buttons: Update and Delete.
•	Update Button: When clicked, the data will repopulate in the form, allowing you to make changes and submit again.
•	Delete Button: When clicked, it deletes the entire row.
#Crop Stages:
•	This section includes a dropdown list and a date selector.
•	The dropdown list is populated based on the data entered in the table. After adding data, you can select the crop name from the dropdown and choose a date.
•	The system will then count the days from the planted date you entered to the selected date.
•	When you click the "Show Stages" button, the current crop stage, stage details, and other recommendations will be displayed. These recommendations are predefined in the JavaScript file.
•	Validations: Some validations are implemented to ensure correct data entry.
#Workers Management
•	This page has similar functions as the Crops Management page:
•	Data Input Form: Users can input worker data using the form.
•	Data Table: The entered data will appear in a table below, with options to Update and Delete.
•	Data Cards: There are three main cards to display the total number of workers, as well as the counts for male and female workers.
•	Dashboard Synchronization: When you add workers on this page, the dashboard is updated accordingly. The dashboard includes a pie chart that displays the total number of workers and the breakdown of male and female workers.

#Fields Management
•	This page follows the same layout and functionality as the Crops and Workers Management pages. 
•	It also updates the dashboard when data is added or modified.

#Task Management
•	This page has three components:
•	Data Entry Form: Used to input task data.
•	Data Display Layout: Shows the details of a selected task.
•	Data Table: Displays a list of entered tasks.
•	Task Selection: When you add data to the table and click on a task, the details will be displayed in the data view layout.

#Inventory Management
•	This page is a simple inventory management system:
•	Data Form: Used to add inventory data.
•	Data Table: Displays the added data with options to Update and Delete.
•	Data Cards: There are four cards to display total inventory statistics.

#Footer
•	This is a simple footer that appears on all pages.

## Contents:book:
### UX:superhero_man:	
  * **Project Goals** :jigsaw:	
  * **Target Audience Goals** 	:dart:
  * **Site Owner Goals**  	:dart:
  * **User Requirements and Expectations** 	:dart:
  * **Design Choices** :framed_picture:		
    * Fonts
    * Icons
    * Colours
    * Sounds
  * **Wireframes** :straight_ruler:		
  * **Features** :abacus:	
    * Features that have been developed
    * Features that will be implemented in the future
  * **Technologies Used** :computer:	
    * Languages
    * Tools & Libraries
  * **Testing** :magnet:
  * **Bugs** :mosquito:
  * **Deployment** :surfer:
  * **Acknowledgements** :clap:
  
## UX ( User Experience)
### Project Goals :jigsaw:	
The goal of this project is to provide the users with a fun and interactive quiz game. The website needs to be visually appealing whilst providing a great User Experience to encourage users to visit it and play the game

### User Goals :jigsaw: 
* Ability to input your name
* Ability to see the best score
* Ability to see the final score
* ability to choose amount of question
* Visual feedback when correct answer is chosen
* Visual feedback when incorrect answer is chosen
* Visual interaction and feedback
* Interact with the website on both Desktop tablet and mobile

## User stories 	:dart:
* As a user I expect to type my name before starting the game
* As a user I want to be able to select amount of my questions
* As a user I want to be able to change from light to dark mode
* As a user I want to be able to see when I choose the correct answer
* As a user I expect to check my final score and my best score in the game session

## Site Owner Goals	:dart:

* Create a fun experience for the users


## User Requirements and Expectations 	:dart:

* **Requirements**
  * Navigate the website using the menu buttons and drop down selector
  * Ability to play the game on desktop and mobile devices
  * Contnent displayed in a visually appealing manor
  
* **Expectations**
  * Content is visually satisfying and informative on all screen sizes
  * No information overload
  * Navigation takes user to specific parts of the website
  
## Design choices :framed_picture:	
The theme of this project is *game*, therefore my design choices are heavily influenced by positive colours and motifs. Using the resources in [this blog](https://www.crazyegg.com/blog/colors-proven-to-boost-sales/) I was able to pick out a colour scheme that has been proven to boost sales/interaction with a web page. By using [this webpage](https://coolors.co/) I was able to macth colors for this projcet.
  
**Fonts**

I chose to use the font **Open Sans** as it was designed with a neutral, yet friendly appearance which compliments the general attitude of this project's design and it's desired function. it can be found [here](https://fonts.google.com/specimen/Open+Sans?sidebar.open=true&selection.family=Open+Sans:ital@1)

**Colours**

Using learned knowledge from prior research, bright and vibrant colours have a higher influence in terms of positivity and therefore more potential interactions. [Link to the colour palette](https://coolors.co/fafafa-000000-ff7f11-ef2d56-2fbf71). Screenshot of the colour palette has been added to the wireframes folder [here](https://github.com/bartosz-makowski/Quizzero/blob/master/assets/wireframes/colorpalette.png).

**Colours used**
* #FAFAFA - Cultured - used for the background
* #000000 - Black - used for text to achieve a good contrast
* #FF7F11 - Amber SAE ECE - used to highlight buttons
* #EF2D56 - Red Crayola - used to highlight wrong answer
* #2FBF71 - Emerald - used to highlight correct answer

**Sounds**

## Wireframes :straight_ruler:
I built the wireframes for this project using <a href="https://balsamiq.com/">Balsamiq</a>. Started by doing a very basic wireframe for Mobile/Tablet/Desktop - these were to get a basic understanding of how structurally elements would appear on the page. You can view this wireframe in a wireframe folder [here](https://github.com/bartosz-makowski/Quizzero/tree/master/assets/wireframes).

## Features :abacus:
**Features that have been developed:**
* Visible feedback when hover over buttons
* Total score counter
* Best score counter


**Features to be implemented in the future**
* Sound feedback when buttons are pressed
* option to choose question category

## Technologies Used :computer:

### Languages
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [JavaScript](https://www.w3schools.com/js/)

### Tools & Libraries
* [PopperJS](https://popper.js.org/)
* [jQuery](https://jquery.com/)
* [Git](https://git-scm.com/)
* [Bootstrap](https://getbootstrap.com/)
* [Font-Awesome](https://fontawesome.com/icons?d=gallery)
* [Google Fonts](https://fonts.google.com/)
* [Balsamiq](https://balsamiq.com/)
* [Picresize](https://picresize.com/)
* [Favicon generator](https://realfavicongenerator.net/)
* [AmIresponsive](http://ami.responsivedesign.is/) - used to generate multi screen view of the webiste on different devices


### Testing :magnet:

#### Plan


#### Tests
##### Using W3C Markup Validator
###### Test 1
* **Error:** Bad value Questions amount for attribute for on element label: An ID must not contain whitespace.
* **Solution:** Changing ``<label for="Questions amount">``to ``<label for="Questions-amount">`` fixed this issue
###### Test 2
* **Warning:**  Empty heading. From line 90, column 17; to line 90, column 39
* **Solution:** Adding  ``<h1 id="question-text">Loading question...</h1>`` fixed this issue
###### Test 3
* **Error:** background-color none is not a background-color value : none 
* **Solution** Changing ``background-color: none`` to ``background-color: #FF7F11`` fixed this issue

### Bugs :mosquito:

### Deployment :surfer:

Quizzero was developed on GitPod, using git and GitHub to host the repository.

When deploying Quizzero using GitHub Pages the following steps were made:

* Opened up GitHub in the browser.
* Signed in using username and password.
* Selected my repositories.
* Navigated to ``bartosz-makowski/Quizzero``.
* In the top navigation clicked **'settings'**.
* Scrolled down to the GitHub Pages area.
* Selected **'Master Branch'** from the **'Source'** dropdown menu.
* Clicked to confirm my selection.
* Quizzero now live on GitHub Pages. :rocket: 

#### Running Quizzero Locally

Cloning Quizzero from GitHub:

* Navigate to ``/bartosz-makowski/Quizzero``.
* Click the green **'Clone or Download'** button.
* Copy the url in the dropdown box.
* Using your favourite IDE open up your preferred terminal.
* Navigate to your desired file location.
* Copy the following code and input it into your terminal to clone Quizzero.
```
https://github.com/bartosz-makowski/Quizzero.git
```
### Acknowledgements :clap:

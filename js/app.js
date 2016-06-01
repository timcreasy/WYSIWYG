// ======================================= PAGE ELEMENTS and GLOBAL VARS ========================================== //

// Text Input
var input = document.querySelector("textarea");
// Card Container
var container = document.getElementById("container");
// New card button
var newCardButton = document.getElementById("newCard");
// Delete card button
var deleteCardButton = document.getElementById("deleteCard");
// Global highlightedCard variable
var highlightedCard = null;

// ======================================= DATASET ========================================== //

// Constructor to build person objects
function Person (name, title, bio, image, birth, death) {
  
  // Set object properties
  this.name = name;
  this.title = title;
  this.bio = bio;
  this.image = image;
  this.birth = birth;
  this.death = death;

}

// Create people array
var people = [];

// Create each default Person instance, and add to people array

// Samurai
var samurai = new Person("Tomoe Gozen", "Samurai", "Serving under Minamoto Yoshinaka, Tomoe was one of his finest soldiers, and her skills in battle dwarfed many of those held by even the strongest men in her unit.", "https://upload.wikimedia.org/wikipedia/commons/4/48/Tomoe-Gozen.jpg", 1747, 1797);
people.push(samurai);

// Abraham Lincoln
var abe = new Person("Abraham Lincoln", "President", "Abraham Lincoln was the 16th President of the United States, serving from March 1861 until his assassination in April 1865.", "http://a4.files.biography.com/image/upload/c_fit,cs_srgb,dpr_1.0,h_1200,q_80,w_1200/MTIwNjA4NjMzODg2NTc0MDky.jpg", 1809, 1865);
people.push(abe);

// David Bowie
var davidBowie = new Person("David Bowie", "Musician", "An English singer, songwriter, actor and record producer.", "https://static01.nyt.com/images/2016/01/12/arts/music/20160112_BOWIE_HP-slide-DMXR/20160112_BOWIE_HP-slide-DMXR-superJumbo.jpg", 1947, 2016);
people.push(davidBowie);

var pabloPicasso = new Person("Pablo Picasso", "Artist", "A Spanish painter, sculptor, printmaker, ceramicist, stage designer, poet and playwright who spent most of his adult life in France.", "http://a5.files.biography.com/image/upload/c_fit,cs_srgb,dpr_1.0,h_1200,q_80,w_1200/MTE1ODA0OTcxNzU0MDk2MTQx.jpg", 1881, 1973);
people.push(pabloPicasso);

var charlesLindbergh = new Person("Charles Lindbergh", "Aviator", "Charles Augustus Lindbergh, nicknamed Slim, Lucky Lindy, and The Lone Eagle, was an American aviator, author, inventor, military officer, explorer, and social activist.", "https://upload.wikimedia.org/wikipedia/commons/7/75/Col_Charles_Lindbergh.jpg", 1902, 1974);
people.push(charlesLindbergh);

// ======================================= WRITE DATA TO DOM ========================================== //

// Call showCards to write initial cards in people array to DOM
showCards();

// ======================================= INITIAL PAGE SETUP ========================================== //

// Call formatCard to format default cards
formatCards();

// ======================================= FUNCTIONS ========================================== //

// showCards function to print cards in people array to DOM
function showCards() {

    // Loop through each person object in array
    for (var i = 0; i < people.length; i++) {

    // Set currentPerson to current index of array
    var currentPerson = people[i];

    // Format HTML for each person
    var personCard = `<person class="card">
                        <header>
                          <h2 class="personName">${currentPerson.name}</h2>
                          <h3>${currentPerson.title}</h3>
                        </header>
                        <section>
                          <div class="imageContainer">
                            <img src="${currentPerson.image}">
                          </div>
                          <p>${currentPerson.bio}</p>
                        </section>
                        <footer>
                          <h4>${currentPerson.birth} - ${currentPerson.death}</h4}
                        </footer>
                      </person>`;
    // Write person card to DOM
    container.innerHTML += personCard;
  }
}

// formatCard function called on initial page load and after each new card is added
function formatCards() {
  
  // Add each person card to NodeList
  var list = container.childNodes;

  // Loop through NodeList, to add relevant classes for formatting
  for(var i = 1; i <= list.length; i++) {
    // Get current person card in list
    var currentElement = list[i - 1];
    // If card is odd, add class .blue
    if (i % 2 !== 0) {
      currentElement.classList.add("blue");
    // If card is even add class .yellow 
    } else {
      currentElement.classList.add("yellow");
    }
  }
}

function deleteCard() {

  // If no card is selected
  if (highlightedCard === null) {
    alert("Please select a card to delete");
  // Otherwise, if card is selected
  } else {

    //Create highlightedCardName to store name of person on currently selected card
    var highlightedCardName = highlightedCard.querySelector(".personName").innerHTML;

    // Search for highlighted card in people array
    for (var i = 0; i < people.length; i++) {

    // Set currentPersonName equal to current array index
      var currentPersonName = people[i].name;
      // if currentPersonName matches highlightedCard name
      if (currentPersonName === highlightedCardName) {
        console.log("Match found at index ", i);
        people.splice(i, 1);
        // Reset innerHTML of container to clear old list of people
        container.innerHTML = "";
        // Call showCards to show updated list of people
        showCards();
        // Call formatCards to format new list of people
        formatCards();
        // Set highlightedCard to null
        highlightedCard = null;
        // Break out of for loop
        break;
      }
    }
  }
}

// cardClicked function called when person card is clicked
function cardClicked(event) {
  
  // Get target of click event
  var element = event.target;

  // Ensure a card was clicked, and not container
  if (element.id !== "container") {
    // Loop up heirarchy until <person> element is found
    while(element.tagName !== "PERSON") {
      element = element.parentElement;
    }
  }

  // Ensure element is of type <person>
  if (element.tagName === "PERSON") {

    // Check to make sure another card isn't highlighted
    if (highlightedCard === null) {
      // Toggle border class
      element.classList.toggle("border");
      // Bring focus to input box
      input.focus();
      
      // Set highlighted card
      highlightedCard = element;

    // If another card is selected
    } else {
      // Remove border from other card
      highlightedCard.classList.toggle("border");
      // Select new card
      highlightedCard = element;
      // Toggle border on new card
      highlightedCard.classList.toggle("border");
    }

  }
    
}

// bioEdit function called when text area is receiving input
function bioEdit(event) {

  // If no card is selected
  if (highlightedCard === null) {
    // Alert user a card must be selected to edit
    alert("You must select a card to edit");
    // Remove any input user entered
    input.value = "";

  // If card is selected
  } else {
    // Get children elements of card, to search for paragraph bio
    var children = highlightedCard.children;
    // Create paragraph variable to store element
    var paragraph = null;

    // Loop through children, to search for paragraph
    for (var x = 0; x < children.length; x++) {
      // Set current element to current index of array
      var current = children[x];
      // When current element is of type <section>
      if (current.tagName === "SECTION") {
        // Set paragraph variable equal to <p> found in <section>
        paragraph = current.querySelector("p");
        // No need to continue search, break out of loop
        break;
      }
    }

    // When enter key is pressed
    if (event.keyCode === 13) {
      // Clear current text in input
      input.value = "";
      // Remove focus from input
      input.blur();
      // Remove border from currently selected card
      highlightedCard.classList.toggle("border");
      // Reset highlightedCard to no value
      highlightedCard = null;

    // When input other than enter key is entered
    } else {
      // Set bio paragraph to be equal to text input
      paragraph.innerHTML = input.value;
    }
  }

}

// createNewCard function, processing and outputting new card to DOM
function createNewCard() {

  // Create new person instance
  var object = new Person();
  // Add properties
  object.name = prompt("Enter the person's name:");
  object.title = prompt("Enter the person's title:");
  object.image = prompt("Enter a URL linking to a picutre of the person:");
  object.bio = prompt("Enter the person's biography:");
  object.birth = prompt("Enter the person's birth year:");
  object.death = prompt("Enter the person's year of death:");
  // Add new object to people array
  people.push(object);
  // Clear DOM
  container.innerHTML = "";
  // Call showCards to add new cards in array to DOM
  showCards();
  // Format cards on page, accounting for new card added
  formatCards();

}

// ======================================= EVENT LISTENERS ========================================== //

// Add click eventListener to container, looking for person card to be clicked
container.addEventListener("click", cardClicked);
// Add keyup eventListener to input, looking for key presses
input.addEventListener("keyup", bioEdit);
// Add click eventListener to newCardButton, and process new card data
newCardButton.addEventListener("click", createNewCard);
// Add click eventListener to deleteCardButton, and proccess card deletion
deleteCardButton.addEventListener("click", deleteCard);


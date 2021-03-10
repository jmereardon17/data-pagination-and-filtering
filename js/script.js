/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/*
Global variables
*/
const pageAmount = 9; // Amount of students per page
const studentList = document.querySelector('.student-list'); // Student list ul
const linkList = document.querySelector('.link-list'); // Page numbers ul

/*
`showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const showPage = (data, page) => {
  // Variables to find the start and end position indexes in the data array
  let startIndex = (page * pageAmount) - pageAmount;
  let endIndex = (page * pageAmount); 
  // Set the ul's content to an empty string to remove any previous list items
  studentList.innerHTML = '';
  // Loop over the student data
  data.forEach((student, i) => {
    // If the current index is greater than or equal to the startIndex variable and less than the endIndex variable
    if (i >= startIndex && i < endIndex) {
      // Add a list item to the html content of the ul with data
      studentList.innerHTML +=
        `<li class="student-item cf">
            <div class="student-details">
              <img class="avatar" src=${student.picture.thumbnail} alt="Profile Picture">
              <h3>${student.name.first} ${student.name.last}</h3>
              <span class="email">${student.email}</span>
            </div>
            <div class="joined-details">
              <span class="date">Joined ${student.registered.date}</span>
            </div>
        </li>`;
    }
  });
}



/*
`addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const addPagination = data => {
  // Calculate the amount of pages based on the data and the amount to show per page
  const pageNumbers = Math.ceil(data.length / pageAmount);
  // Remove any previous page numbers
  linkList.innerHTML = '';
  // Loop over the page numbers length starting from 1
  for (let i = 1; i <= pageNumbers; i += 1) {
    // Print out a number with the current index value
    linkList.innerHTML +=
      `<li>
        <button class=${i === 1 ? 'active' : null} type="button">${i}</button>
      </li>`
  }
  // Add a click event handler to the ul
  linkList.addEventListener('click', e => {
    // If the event target's tag name is a button
    if (e.target.tagName === 'BUTTON') {
      // Reference all page number elements
      const pageLinks = document.querySelectorAll('.link-list button');
      // Loop over each one and set the class name to an empty string
      pageLinks.forEach(link => link.className = '');
      // Reference the page number that was clicked
      const selectedLink = e.target;
      // Set it's class name to active
      selectedLink.className = 'active';
      // Show the new page with the chosen page number
      showPage(data, selectedLink.textContent);
    }
  })
}



/*
`addSearchBar` function
This function will create and insert/append the elements needed for the search component
*/
const addSearchBar = () => {
  // Reference the header element
  const header = document.querySelector('.header');
  // Add the search bar element to it's content
  header.innerHTML +=
    `<label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
    </label>`;
  // Reference the new search bar element
  const searchBar = document.getElementById('search');
  // Add a key up event handler
  searchBar.addEventListener('keyup', () => {
    // Declare an array literal for the results based on the search value
    const results = [];
    // Reference the input's value
    const input = searchBar.value.toLowerCase();
    // Loop over the student data
    data.forEach(student => {
      // Reference the current iterated student's first name and convert the string to lower case
      const firstName = student.name.first.toLowerCase();
      // Reference the current iterated student's last name and convert the string to lower case
      const lastName = student.name.last.toLowerCase();
      // Declare a variable that holds the value for the current iterated student's full name
      const fullName = `${firstName} ${lastName}`;
      // If the first name or last name or the full name includes the user's search value
      if (firstName.includes(input) || lastName.includes(input) || fullName.includes(input)) {
        // Add the student data to the results array
        results.push(student);
      }
    });
    // If there are no results
    if (results.length === 0) {
      // Set the student list content to show a message for no results found
      studentList.innerHTML =
      `<li>
        <div class="no-results"><p>No results found.</p></div>
      </li>`;
      // Remove any page numbers
      linkList.querySelectorAll('li').forEach(link => linkList.removeChild(link))
      // Otherwise show the data from the first page and add in new page numbers based on the new search results
    } else {
      showPage(results, 1);
      addPagination(results);
    }
  });
}



// Call functions
showPage(data, 1);
addSearchBar();
addPagination(data);
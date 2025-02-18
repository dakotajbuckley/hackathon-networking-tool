// Import from CDN Appwrite Module
import { Client, Databases, ID } from "https://cdn.jsdelivr.net/npm/appwrite@11.0.0/+esm";

// GLOBAL VARIABLES
const form = document.querySelector('form');

const deleteButton = document.querySelector('#deleteButton');

const projectID = "67b0ac94001177c2d5ae";

const databaseID = "67b0eb6a0034010a86fd";

const collectionID = "67b0eb9b0009cb5d5443";

const client = new Client().setEndpoint("https://cloud.appwrite.io/v1").setProject(projectID);

const databases = new Databases(client);




// Event listeners added on page load
form.addEventListener('submit', addJob)
deleteButton.addEventListener('click', deleteDocuments)

// Functions to run on page load
listDocuments()

// FUNCTIONS

// Upon submitting the form. It takes the form fields and passes them into a createDocument method. That method talks to appwrite and creates a document with those fields. Then it console logs the response.
function addJob(e){
  // prevent form from resubmitting on page refresh
  e.preventDefault()
  const job = databases.createDocument(
    databaseID, //database id,
    collectionID, //collection id,
    ID.unique(),
    { "name": e.target.name.value,
      "email": e.target.email.value,
      "jobtitle": e.target.jobtitle.value,
      "date": e.target.date.value,
      "company": e.target.company.value,
      "spark": e.target.spark.value,
     "coffeechat": e.target.coffeechat.value
     }
);

  job.then(
    function (response) {
    console.log(response)
    window.location.reload()
      // addJobsToDom();
    },
    function (error) {
      console.log(error);
    }
  );
  // form.reset()
  
}

// Reaches out to Appwrite and gets a list of all documents in our database. Then loops through each key in each object to check if it is a field we want to display. If so, it adds that data to a <td> element. Then it appends that <td> to a <tr>. Then adds the <tr> to the DOM at the end
async function listDocuments() {
  let response = await databases.listDocuments(databaseID, collectionID);
  response.documents.forEach(element => {
    const newTR = document.createElement('tr')
    const checkboxTD = document.createElement('td')
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.id = element.$id
    checkboxTD.appendChild(checkbox)
    newTR.appendChild(checkboxTD)
    
    for (const key in element) {
      const newTD = document.createElement('td')
      switch (key) {
        case 'date':
          newTD.innerText = `${element[key].slice(0,10)}`
          newTR.appendChild(newTD)
          break;
        case 'name':
        case 'email':
        case 'jobtitle':
        case 'company':
        case 'spark':
        case 'coffeechat':
          newTD.innerText = `${element[key]}`
          newTR.appendChild(newTD)
          break;
      }
      
    }
  document.querySelector('tbody').appendChild(newTR)
  })

}

async function deleteDocuments() {
  const selectedRows = document.querySelectorAll('tr td input[type="checkbox"]:checked')
  
  selectedRows.forEach( checkbox => {
    checkbox.parentElement.parentElement.remove()
    let promise = databases.deleteDocument(databaseID, collectionID, checkbox.id)
    
  })
  
  
}


// &&&&&&&&&&&&&&&&&&&&
// Category Filter
// &&&&&&&&&&&&&&&&&&&&

// function hoverSortReveal(categoryElements) {
//   const thisCatArr = Array.from(categoryElements)
//   // console.log(categoryElements)
//   // console.log(thisCatArr)
  
//   thisCatArr.forEach( e => e.classList.add('sort-show') )
// }

// function hoverSortHide(categoryElements) {
//   const thisCatArr = Array.from(categoryElements)
  
//   thisCatArr.forEach( e => e.classList.remove('sort-show') )
// }




// &&&&&&& current work in progress
// &&&&&&&&&
// function showAsc(categoryElements) {
//     const thisCatArr = Array.from(categoryElements)
//   // console.log(categoryElements)
//   // console.log(thisCatArr)
    
  
  
//   thisCatArr.forEach( e => {
//     e.classList[0].add('sort-show')
//     // e.classList.contains('sort-show') ? e.classList
//   })
// }


const jobTitleCategory = document.querySelector('#job-title-category')
const jobTitleSortElements = document.querySelectorAll('.job-title-sort')

// jobTitleCategory.addEventListener('mouseenter', () => {
//   hoverSortReveal(jobTitleSortElements) 
// })
// jobTitleCategory.addEventListener('mouseleave', () => {
//   hoverSortHide(jobTitleSortElements)
// })
jobTitleCategory.addEventListener('click', () => {
  sortTable(1)
  // showAsc(jobTitleSortElements)
  
})

const nameCategory = document.querySelector('#name-category')
const nameSortElements = document.querySelectorAll('.name-sort')

// nameCategory.addEventListener('mouseenter', () => {
//   hoverSortReveal(nameSortElements)  
// })
// nameCategory.addEventListener('mouseleave', () => {
//  hoverSortHide(nameSortElements) 
// })
nameCategory.addEventListener('click', () => {
  sortTable(2)
})

const emailCategory = document.querySelector('#email-category')
const emailSortElements = document.querySelectorAll('.email-sort')

// emailCategory.addEventListener('mouseenter', () => {
//   hoverSortReveal(emailSortElements) 
// })
// emailCategory.addEventListener('mouseleave', () => {
//   hoverSortHide(emailSortElements)
// })
emailCategory.addEventListener('click', () => {
  sortTable(3)
})

const dateCategory = document.querySelector('#date-category')
const dateSortElements = document.querySelectorAll('.date-sort')

// dateCategory.addEventListener('mouseenter', () => {
//   hoverSortReveal(dateSortElements) 
// })
// dateCategory.addEventListener('mouseleave', () => {
//   hoverSortHide(dateSortElements)
// })
dateCategory.addEventListener('click', () => {
  sortTable(4)
})

const companyCategory = document.querySelector('#company-category')
const companySortElements = document.querySelectorAll('.company-sort')

// companyCategory.addEventListener('mouseenter', () => {
//   hoverSortReveal(companySortElements) 
// })
// companyCategory.addEventListener('mouseleave', () => {
//   hoverSortHide(companySortElements)
// })
companyCategory.addEventListener('click', () => {
  sortTable(5)
})

const sparkCategory = document.querySelector('#spark-category')
const sparkSortElements = document.querySelectorAll('.spark-sort')

// sparkCategory.addEventListener('mouseenter', () => {
//   hoverSortReveal(sparkSortElements) 
// })
// sparkCategory.addEventListener('mouseleave', () => {
//   hoverSortHide(sparkSortElements)
// })
sparkCategory.addEventListener('click', () => {
  sortTable(6)
})

const coffeeChatCategory = document.querySelector('#coffee-chat-category')
const coffeeChatSortElements = document.querySelectorAll('.coffee-chat-sort')

// coffeeChatCategory.addEventListener('mouseenter', () => {
//   hoverSortReveal(coffeeChatSortElements) 
// })
// coffeeChatCategory.addEventListener('mouseleave', () => {
//   hoverSortHide(coffeeChatSortElements)
// })
coffeeChatCategory.addEventListener('click', () => {
  sortTable(7)
})

// A A CHIARA D CHRIS >


function sortTable(n) {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  
  table = document.querySelector("#profiles-table");
  switching = true;
  
  // Set the sorting direction to ascending:
  dir = "asc";
  
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    console.log('rows: ', rows)
    /* Loop through all table rows (except the
    first, which contains table headers): */
    
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      console.log('x: ', x)
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}



/*
async function addJobsToDom(){
  document.querySelector("ul").innerHTML = ""
  let response = await databases.listDocuments(
    "databaseID",
    "collectionsID",
  );

  // console.log(response.documents[0])
  response.documents.forEach((job) => {
    const li = document.createElement("li")
    // test content, use bracket notation cause of name
    li.textContent = `${job['company-name']} ${job['date-added']} ${job['role']} ${job['location']} ${job['position-type']} ${job['source']} coffee chat? ${job["chat"]}`
    
    li.id = job.$id

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "aye"
    deleteBtn.onclick = () => removeJob(job.$id)
    li.appendChild(deleteBtn)

    const coffeeBtn = document.createElement("button")
    coffeeBtn.textContent = "updateo"
    coffeeBtn.onclick = () => updateChat(job.$id)

    li.appendChild(coffeeBtn)
    li.appendChild(deleteBtn)

    // append to ul
    document.querySelector('ul').appendChild(li)
  })

*/




// Dark Mode Logic

const iconID = document.getElementById("iconic")
const iconClass = document.querySelector("i")
const body = document.querySelector("body")
const h2 = document.getElementById("test")
const navBut = document.querySelector("nav-right")

function darkToggle(){
  
  
  iconID.classList.toggle("fa-rotate-180")
  body.classList.toggle("dark-mode")
  h2.classList.toggle("dark-font")
  navBut.classList.toggle()
  

}

iconClass.addEventListener('click', darkToggle)




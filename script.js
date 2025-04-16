// get html elements 
const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const idInput = document.getElementById("studentId");
const emailInput = document.getElementById("email");
const contactInput = document.getElementById("contact");
const tableBody = document.getElementById("studentTableBody");


// array to store students details
let students = JSON.parse(localStorage.getItem("students")) || [];

// event listner to handle form submission
form.addEventListener('submit', function(e){
  // Prevents page from refreshing when form is submitted
    e.preventDefault();

    // get values from input
    const name = nameInput.value;
    const id = idInput.value;
    const email = emailInput.value;
    const contact = contactInput.value;

    // console.log(name)

    if(!validation(name, id, email, contact)) return;

    // store data in an array
    const student = [name, id, email, contact];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
   
    // reset form fields
    form.reset();

    // refresh table display 
  showStudents();

})

function validation(name, id, email, contact){


  const nameAlph = /^[A-Za-z\s]+$/;
  const numberA = /^[0-9]+$/; 
  const emailA = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if(name === "" || id === "" || email === "" || contact === ""){
        alert("All fields are required");
        return false;
    }

    if(!nameAlph.test(name)){
      alert("Name must contain only letters and spaces.");
      return;
    }
    if(!numberA.test(id)){
      alert("Student ID must be a number.");
        return false;
    }
    if(!emailA.test(email)){
      alert("Please enter a valid email address.");
        return false;
    }
    if(isNaN(contact)){
        alert("Contact must be a number");
        return false;
    }
    return true;
}

function showStudents(){
    tableBody.innerHTML = "";

    // loop through the students array and create a row for each student 
    for(let i=0; i< students.length; i++){
        const student = students[i];

        const row = document.createElement("tr");
        row.innerHTML = 
        `<td>${student[0]}</td>
      <td>${student[1]}</td>
      <td>${student[2]}</td>
      <td>${student[3]}</td>
      <td>
        <button onclick="editStudent(${i})">Edit</button>
        <button onclick="deleteStudent(${i})">Delete</button>
      </td>
      `;
      // add row to the table
      tableBody.appendChild(row);
    }
}

showStudents();

// Function to delete a student
function deleteStudent(index) {

  // Remove student at the specified index
    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));
    showStudents();
  }
  
  // Function to edit a student
  function editStudent(index) {
    const student = students[index];
    nameInput.value = student[0];
    idInput.value = student[1];
    emailInput.value = student[2];
    contactInput.value = student[3];
  
    // remove the current index
    students.splice(index, 1);

    //  Update localStorage and refresh the table
    localStorage.setItem("students", JSON.stringify(students));
    showStudents();
  }
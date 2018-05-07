/* JS for WATS 3020 Roster Project */

//Person constructor

class Person {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.username = email.split('@')[0];
  }
}

//Student constructor

class Student extends Person {
  constructor(name, email) {
    super(name, email);
    this.attendance = [];
  }
 
//Method in Student constructor for calculating attendance rate
  
  calculateAttendance() {
    if (this.attendance.length > 0) {
    let counter = 0;
    for (let mark of this.attendance) {
      counter = counter + mark;      
    }
    let attendancePercentage = parseInt(counter / this.attendance.length * 100);
    return `${attendancePercentage}%`;
    } else {
      return "0%";
    }
  }
}

//Teacher constructor

class Teacher extends Person {
  constructor(name, email, honorific) {
    super(name, email);
    this.honorific = honorific;
  }
 }

//Class constructor

class Course {
    constructor(courseCode, courseTitle, courseDescription){
        this.code = courseCode;
        this.title = courseTitle;
        this.description = courseDescription;
        this.teacher = null;
        this.students = [];
    }

 
  //addStudent method 
 
  addStudent() {
    let name = prompt('Student Full Name:'); // prompts students's full name and saves to name variable
    let email = prompt('Student Email:'); // prompts students's email address and saves to email variable
    let newStudent = new Student(name, email); // calls Student class and saves attributes to newStudent
    this.students.push(newStudent); //pushes newStudent into this.students array
    updateRoster(this); // calls update roster to initialize content on page
  }

 
setTeacher (){
  let name = prompt('Teacher Full Name:'); //prompts teacher's full name
  let email = prompt('Teacher Email:'); // prompts teachers email address
  let honorific = prompt('Honorific (e.g. Dr., Prof., Mr., Ms.):'); //prompts for honorific 
  
  this.teacher = new Teacher(name, email, honorific); //creates object passing all 3 of the above parameters
  updateRoster(this); //calls update roster to initialize content on page
}
 
  
  //markAttendance method (button for attendance and absent)
  
  markAttendance(username, status='present') {
    let student = this.findStudent(username); 
    if (status == 'present'){
      student.attendance.push(1); //marks the student present
    } else {
      student.attendance.push(0); //marks the student absent
    }
    updateRoster(this); //calls update roster to initialize content on page
  }


   // This method takes in a username and looks for that username on student objects
   //contained in the `this.students`Array.
 

    findStudent(username){
     
        let foundStudent = this.students.find(function(student, index){
            return student.username == username;
        });
        return foundStudent;
    }
}



let courseCode = prompt('Enter course code or number (i.e. WATS 3000):'); //prompts user course code/number

let courseTitle = prompt('Enter the name of the course'); //prompts user for name of course

let courseDescription = prompt('Enter a description for the course'); //prompts user for description for course

 let myCourse = new Course(courseCode, courseTitle, courseDescription); //call Course constructor to create new myCourse object from above prompts 

///////////////////////////////////////////////////
//////// Main Script /////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// This script runs the page.                                                 //
////////////////////////////////////////////////////////////////////////////////

let rosterTitle = document.querySelector('#course-title');
rosterTitle.innerHTML = `${myCourse.code}: ${myCourse.title}`;

let rosterDescription = document.querySelector('#course-description');
rosterDescription.innerHTML = myCourse.description;

if (myCourse.teacher){
    let rosterTeacher = document.querySelector('#course-teacher');
    rosterTeacher.innerHTML = `${myCourse.teacher.honorific} ${myCourse.teacher.name}`;
} else {
    let rosterTeacher = document.querySelector('#course-teacher');
    rosterTeacher.innerHTML = "Not Set";
}

let rosterTbody = document.querySelector('#roster tbody');
// Clear Roster Content
rosterTbody.innerHTML = '';

// Create event listener for adding a student.
let addStudentButton = document.querySelector('#add-student');
addStudentButton.addEventListener('click', function(e){
    console.log('Calling addStudent() method.');
    myCourse.addStudent();
})

// Create event listener for adding a teacher.
let addTeacherButton = document.querySelector('#add-teacher');
addTeacherButton.addEventListener('click', function(e){
    console.log('Calling setTeacher() method.');
    myCourse.setTeacher();
})

// Call Update Roster to initialize the content of the page.
updateRoster(myCourse);

function updateRoster(course){
    let rosterTbody = document.querySelector('#roster tbody');
    // Clear Roster Content
    rosterTbody.innerHTML = '';
    if (course.teacher){
        let rosterTeacher = document.querySelector('#course-teacher');
        rosterTeacher.innerHTML = `${course.teacher.honorific} ${course.teacher.name}`;
    } else {
        let rosterTeacher = document.querySelector('#course-teacher');
        rosterTeacher.innerHTML = "Not Set";
    }
    // Populate Roster Content
    for (student of course.students){
        // Create a new row for the table.
        let newTR = document.createElement('tr');

        // Create table cells for each data point and append them to the new row.
        let nameTD = document.createElement('td');
        nameTD.innerHTML = student.name;
        newTR.appendChild(nameTD);

        let emailTD = document.createElement('td');
        emailTD.innerHTML = student.email;
        newTR.appendChild(emailTD);

        let attendanceTD = document.createElement('td');
        attendanceTD.innerHTML = student.calculateAttendance();
        newTR.appendChild(attendanceTD);

        let actionsTD = document.createElement('td');
        let presentButton = document.createElement('button');
        presentButton.innerHTML = "Present";
        presentButton.setAttribute('data-username', student.username);
        presentButton.setAttribute('class', 'present');
        actionsTD.appendChild(presentButton);

        let absentButton = document.createElement('button');
        absentButton.innerHTML = "Absent";
        absentButton.setAttribute('data-username', student.username);
        absentButton.setAttribute('class', 'absent');
        actionsTD.appendChild(absentButton);

        newTR.appendChild(actionsTD);

        // Append the new row to the roster table.
        rosterTbody.appendChild(newTR);
    }
    // Call function to set event listeners on attendance buttons.
    setupAttendanceButtons();
}

function setupAttendanceButtons(){
    // Set up the event listeners for buttons to mark attendance.
    let presentButtons = document.querySelectorAll('.present');
    for (button of presentButtons){
        button.addEventListener('click', function(e){
            console.log(`Marking ${e.target.dataset.username} present.`);
            myCourse.markAttendance(e.target.dataset.username);
            updateRoster(myCourse);
        });
    }
    let absentButtons = document.querySelectorAll('.absent');
    for (button of absentButtons){
        button.addEventListener('click', function(e){
            console.log(`Marking ${e.target.dataset.username} absent.`);
            myCourse.markAttendance(e.target.dataset.username, 'absent');
            updateRoster(myCourse);
        });
    }
}


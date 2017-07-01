/* JS for WATS 3020 Roster Project */

let myCourse = null;

///////////////////////////////////////////////////
//////// TODOs ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Fill in the blanks below to complete each TODO task.                       //
////////////////////////////////////////////////////////////////////////////////

// TODO: Create a base class called `Person` that takes the parameters `name`
// and `email` and makes those available as attributes. The `constructor()`
// method should also break the username from before the `@` symbol in the
// `email` value and use that to store on a `this.username` property.

// TODO: Create another class that extends the `Person` class called `Student`.
// The `Student` class should add a line to the `constructor()` method that sets
// the property `this.attendance` to an empty Array (`[ ]`). The `attendance`
// property will be used to record and track attendance. (NOTE: You will need to
// use the `super()` command so you don't lose the functionality of the
// `constructor()` method from the `Person` class.)
//
// TODO: Create another method on the `Student` class called `calculateAttendance`.
// This method should give a percentage of how many days the student was present.
// It should return a string like "90%" or "84.732%".

// TODO: Create another class that extends the `Person` class called `Teacher`.
// The `Teacher` class should add a property called `this.honorific` (supplied
// when an instance of `Teacher` is created).

// TODO: Set up our Course class so we can run the whole roster from it.
class Course {
    constructor(courseCode, courseTitle, courseDescription){
        this.code = courseCode;
        this.title = courseTitle;
        this.description = courseDescription;
        this.teacher = null;
        this.students = [];
    }

    /////////////////////////////////////////
    // TODO: ADD the `setTeacher()` method /////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    //
    // Create a method called `setTeacher()` that prompts the user for the
    // information required to create a `Teacher` object (`name`, `email`) and
    // does so, then sets the `this.teacher` property equal to the new `Teacher` object.

    /////////////////////////////////////////
    // TODO: ADD the `addStudent()` method /////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    //
    // Create a method called `addStudent()` that prompts the user for
    // information required to create a new `Student` object (`name`, `email`)
    // and does so, then adds the student to the `this.students` Array. Be sure
    // to update the roster display by calling `updateRoster()`. You will need
    // to reference the Class instance using `this` as a parameter for
    // `updateRoster()`, so it might look like this: `updateRoster(this)`.

    /////////////////////////////////////////
    // TODO: ADD `markAttendance()` method /////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    //
    // TODO: Create a method to mark a student's attendance called `markAttendance()`.
    // This method should accept a parameter called `username` containing the
    // `username` that will match the `username` property on the `Student` object.

    // TODO: The FIRST step to create a functioning `markAttendance()` method is
    // to retreive the `Student` object out of the `this.students` Array. You
    // can use the `this.findStudent()` method (provided below) to accomplish
    // that goal. Note that you will also have to handle two cases: The default
    // behavior should be to mark the student present. The alternate behavior
    // should be to mark the student absent.

    // TODO: Now that we have retrieved the specific `Student` object we want
    // to work with, we can use the appropriate method on the `Student` object
    // to record the attendance.


    //////////////////////////////////////////////
    // Methods provided for you ////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    findStudent(username){
        // This method provided for convenience. It takes in a username and looks
        // for that username on student objects contained in the `this.students`
        // Array.
        let foundStudent = this.students.find(function(student, index){
            return student.username == username;
        });
        return foundStudent;
    }


}

/////////////////////////////////////////
// TODO: Prompt User for Course Info  //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//
// Prompt the user for information to create the Course. In order to create a
// `Course` object, you must gather the following information:
//
// TODO: Prompt the user for the `courseCode` (the number/code of the course, like "WATS 3000").

// TODO: Prompt the user for the `courseTitle` (the name of the course, like "Introduction to JavaScript").

// TODO: Prompt the user for the  `courseDescription` (the descriptive summary of the course).

// Create a new `Course` object instance called `myCourse` using the three data points just collected from the user.
// TODO: Add in the values for the information supplied by the user above.
let myCourse = new Course();


///////////////////////////////////////////////////
//////// Main Script /////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// This script runs the page. You should only edit it if you are attempting a //
// stretch goal. Otherwise, this script calls the functions that you have     //
// created above.                                                             //
////////////////////////////////////////////////////////////////////////////////

let rosterTitle = document.querySelector('#course-title');
rosterTitle.innerHTML = `${myCourse.code}: ${myCourse.title}`;

let rosterDescription = document.querySelector('#course-description');
rosterDescription.innerHTML = myCourse.description;

let rosterTeacher = document.querySelector('#course-teacher');
rosterTeacher.innerHTML = myCourse.teacher.name;

let rosterTbody = document.querySelector('#roster tbody');
// Clear Roster Content
roster.Tbody.innerHTML = '';

function updateRoster(course){
    let rosterTbody = document.querySelector('#roster tbody');
    // Clear Roster Content
    roster.Tbody.innerHTML = '';
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
        let presentButton = document.createElement('buton');
        presentButton.setAttribute('data-username', student.username);
        presentButton.setAttribute('class', 'present');
        let absentButton = document.createElement('buton');
        absentButton.setAttribute('data-username', student.username);
        absentButton.setAttribute('class', 'absent');

        // Append the new row to the roster table.
        rosterTbody.appendChild(newTR);
    }
    // Set up the event listeners for buttons to mark attendance.
    let presentButtons = document.querySelectorAll('.present');
    for (button of presentButtons){
        button.addEventListener('click', function(e){
            myCourse.markAttendance(e.target.dataset.username);
        });
    }
    let absentButtons = document.querySelectorAll('.absent');
    for (button of absentButtons){
        button.addEventListener('click', function(e){
            myCourse.markAttendance(e.target.dataset.username, 'absent');
        });
    }
}

let addStudentButton = document.querySelector('#add-student');
addStudentButton.addEventListener('click', function(e){
    console.log('Calling addStudent() method.');
    myCourse.addStudent();
})

let addTeaherButton = document.querySelector('#add-teacher');
addTeacherButton.addEventListener('click', function(e){
    console.log('Calling setTeacher() method.');
    myCourse.setTeacher();
})


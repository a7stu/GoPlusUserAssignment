// declarations
const form = document.getElementById('form');
const fname = document.getElementById('name');
const email = document.getElementById('email');
const dob = document.getElementById('birthday');
const gender = document.getElementById('gender');
const hobby = document.getElementById('hobby');
const country = document.getElementById('country');
const state = document.getElementById('state');
const city = document.getElementById('city');
const table = document.getElementById('table');

// if err is 1, it means that one or more of the input fields isnt valid
let err = 0;

// function that deals with error messages
function showError(input, message) {
    err = 1;
    const formControl = input.parentElement;
    formControl.className = 'form-subdiv error';
    const small = formControl.querySelector('small');
    small.innerText = message;
    console.log(message);
}

// function that deals with success messages
function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-subdiv success';
}

// function that checks if all the input fields have been filled and are valid
function checkRequired(form) {

    if(fname.value.trim() === ''){
        showError(fname,`${getFieldName(fname)} is required`);
    }
    else {
        if(fname.value.length < 6) {
            showError(fname, `${getFieldName(fname)} needs more than 6 chars`);
        }
        else if(fname.value.length > 35) {
            showError(fname, `${getFieldName(fname)} must be less than 35 chars`);
        }
        else {
            var regName = /^[a-zA-Z]+\s[a-zA-Z]+(\s[a-zA-Z]+)*$/;
            if(!regName.test(fname.value)) {
                showError(fname, 'Invalid input');
            }
            else {
                showSucces(fname);
            }
        }
    }

    if(email.value.trim() === ''){
        showError(email,`${getFieldName(email)} is required`);
    }
    else {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email.value.trim())) {
            showSucces(email);
        }else {
            showError(email,'Email is not invalid');
        }
    }

    if(birthday.value.trim() === ''){
        showError(birthday,`${getFieldName(birthday)} is required`);
    }
    else {
        birthday.max = new Date().toISOString().split("T")[0];;
        if(birthday.value > birthday.max) {
            showError(birthday, 'Birthday cannot be a future date');
        }
        else {
            showSucces(birthday);
        }
    }

    if ( ( form.gender[0].checked == false ) && ( form.gender[1].checked == false ) ) {
        showError(gender, 'Gender is required');
    }
    else {
        showSucces(gender);
    }

    if(hobby.value.trim() === ''){
        showError(hobby,`${getFieldName(hobby)} is required`);
    }
    else {
        if(hobby.value.length < 6) {
            showError(hobby, `${getFieldName(hobby)} needs more than 6 chars`);
        }else if(hobby.value.length > 35) {
            showError(hobby, `${getFieldName(hobby)} must be les than 35 chars`);
        }else {
            showSucces(hobby);
        }
    }

}

// function that checks if the email format is valid
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// function that lets you edit a table entry. when complete, press the Finish button to update it in the table
function editUser(user) {

    let selector = user.parentElement.parentElement.parentElement;

    document.querySelector("#name").value = selector.cells[0].innerHTML;
    document.querySelector("#email").value = selector.cells[1].innerHTML;
    document.querySelector("#birthday").value = selector.cells[2].innerHTML;

    if(selector.cells[3].innerHTML == "Male") { form.gender[0].checked = true; }
    else { form.gender[1].checked = true; }

    document.querySelector("#hobby").value = selector.cells[4].innerHTML;
    document.querySelector("#country").value = selector.cells[5].innerHTML;
    document.querySelector("#state").value = selector.cells[6].innerHTML;
    document.querySelector("#city").value = selector.cells[7].innerHTML;

    selector.cells[8].innerHTML = "<div class='btngroup'><button onClick='finishEdit(this)'>Finish</button><button onClick='deleteUser(this)'>Delete</button></div>";

}

// function that is called when the user completes editing an entry
function finishEdit(user) {

    err = 0;

    checkRequired([fname, email, dob, hobby, country, state, city], form);

    let selector = user.parentElement.parentElement.parentElement;

    if(!err ) {
        selector.cells[0].innerText = fname.value;
        selector.cells[1].innerText = email.value;
        selector.cells[2].innerText = dob.value;
        selector.cells[3].innerText = document.querySelector('input[name="gender"]:checked').value;
        selector.cells[4].innerText = hobby.value;
        selector.cells[5].innerText = country.value;
        selector.cells[6].innerText = state.value;
        selector.cells[7].innerText = city.value;
        selector.cells[8].innerHTML = "<div class='btngroup'><button onClick='editUser(this)'>Edit</button><button onClick='deleteUser(this)'>Delete</button></div>";
    }

}

// function that removes an entry from the table
function deleteUser(user) {
    user.parentElement.parentElement.parentElement.remove();
}

// function that adds an entry to the table based on the input fields filled in the form
function addUser() {

    let row = document.createElement("tr");
      
    let c1 = document.createElement("td"); let c2 = document.createElement("td"); let c3 = document.createElement("td"); let c4 = document.createElement("td"); let c5 = document.createElement("td"); let c6 = document.createElement("td"); let c7 = document.createElement("td"); let c8 = document.createElement("td"); let c9 = document.createElement("td");

    c1.innerText = fname.value;
    c2.innerText = email.value;
    c3.innerText = dob.value;
    c4.innerText = document.querySelector('input[name="gender"]:checked').value;
    c5.innerText = hobby.value;
    c6.innerText = country.value;
    c7.innerText = state.value;
    c8.innerText = city.value;
    c9.innerHTML = "<div class='btngroup'><button onClick='editUser(this)'>Edit</button><button onClick='deleteUser(this)'>Delete</button></div>";
    
    row.appendChild(c1); row.appendChild(c2); row.appendChild(c3); row.appendChild(c4); row.appendChild(c5); row.appendChild(c6); row.appendChild(c7); row.appendChild(c8); row.appendChild(c9);
    
    table.appendChild(row);

}

/*

API token for getting the list of countries, states and cities: ek3IrQzvwS-JqgA8ycbcrBsmfaWBwVCJFGNUiORPaw1XCnnOYwSz5jfyod0CGDB8UB4

IMPORTANT: token expires after 24 hours for security reasons. if that happens, visit https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city
and type in your email to get a fresh new token. then follow these steps to get the authorization token*/
fetch('https://www.universal-tutorial.com/api/getaccesstoken', {
  method: "GET",
  headers: {
    "Accept": "application/json",
    "api-token": "ek3IrQzvwS-JqgA8ycbcrBsmfaWBwVCJFGNUiORPaw1XCnnOYwSz5jfyod0CGDB8UB4",
    "user-email": "tehsin.sherasiya@gmail.com"
  }
})
.then(response => response.json()) 
.then(json => console.log(json))
.catch(err => console.log(err));


// fetches all the countries and adds them as options in the Country dropdown menu
fetch('https://www.universal-tutorial.com/api/countries/', {
  method: "GET",
  headers: {
    // NOTE: the authorization token needs to be replaced after 24 hours for security reasons
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJ0ZWhzaW4uc2hlcmFzaXlhQGdtYWlsLmNvbSIsImFwaV90b2tlbiI6ImVrM0lyUXp2d1MtSnFnQTh5Y2JjckJzbWZhV0J3VkNKRkdOVWlPUlBhdzFYQ25uT1l3U3o1amZ5b2QwQ0dEQjhVQjQifSwiZXhwIjoxNjc3MTgzODk2fQ.SGng3_dXllL-vhwSepPgqXaldB54DmiPYwoC2gP7dio",
    "Accept": "application/json"
  }
})
.then(response => response.json()) 
.then(json => json.forEach(data => {
    var option = document.createElement("option");
    option.text = data.country_name;
    country.appendChild(option);
}))
.catch(err => console.log(err));

// fetches all the states within a country that the user selects and adds them as options in the States dropdown menu
country.onchange = function() {
    state.length = 1;
    fetch(`https://www.universal-tutorial.com/api/states/${country.value}`, {
    method: "GET",
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJ0ZWhzaW4uc2hlcmFzaXlhQGdtYWlsLmNvbSIsImFwaV90b2tlbiI6ImVrM0lyUXp2d1MtSnFnQTh5Y2JjckJzbWZhV0J3VkNKRkdOVWlPUlBhdzFYQ25uT1l3U3o1amZ5b2QwQ0dEQjhVQjQifSwiZXhwIjoxNjc3MTgzODk2fQ.SGng3_dXllL-vhwSepPgqXaldB54DmiPYwoC2gP7dio",
        "Accept": "application/json"
    }
    })
    .then(response => response.json()) 
    .then(json => json.forEach(data => {
        var option = document.createElement("option");
        option.text = data.state_name;
        state.appendChild(option);
    }))
    .catch(err => console.log(err));
}

// fetches all the cities within a state that the user selects and adds them as options in the Cities dropdown menu
state.onchange = function() {
    city.length = 1;
    fetch(`https://www.universal-tutorial.com/api/cities/${state.value}`, {
    method: "GET",
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJ0ZWhzaW4uc2hlcmFzaXlhQGdtYWlsLmNvbSIsImFwaV90b2tlbiI6ImVrM0lyUXp2d1MtSnFnQTh5Y2JjckJzbWZhV0J3VkNKRkdOVWlPUlBhdzFYQ25uT1l3U3o1amZ5b2QwQ0dEQjhVQjQifSwiZXhwIjoxNjc3MTgzODk2fQ.SGng3_dXllL-vhwSepPgqXaldB54DmiPYwoC2gP7dio",
        "Accept": "application/json"
    }
    })
    .then(response => response.json()) 
    .then(json => json.forEach(data => {
        var option = document.createElement("option");
        option.text = data.city_name;
        city.appendChild(option);
    }))
    .catch(err => console.log(err));
}

// if all input fields are correct, add them to the table and refresh the form. if not, show the error messages
form.addEventListener('submit', function(e) {
    e.preventDefault();

    err = 0;

    checkRequired(form);

    if(!err) {
        addUser();
        fname.value = '';
        email.value = '';
        dob.value = '';
        form.gender[0].checked = false;
        form.gender[1].checked = false;
        hobby.value = '';
        country.value = '';
        state.value = '';
        city.value = '';
    }
});
// call api for random user
const randomUser = 'https://randomuser.me/api/';
// or for multiple users
const employeesUrl = 'https://randomuser.me/api/?results=12&nat=us,gb,au,nz';
const galleryDiv = document.getElementById('gallery');
const body = document.querySelector('body');

getJSONResponse(employeesUrl)
    .then(json => {
        displayEmployees(json.results);
    })
    .catch(error => {
        // if fetch fails display error message to gallery
        const message = document.createElement('h3');
        message.textContent = 'Uh oh! There was an error retrieving the list of employees.';
        message.style.color = 'red';
        document.getElementById('gallery').appendChild(message);
        console.log(error);
    });

// takes a list of user objects and displays them to gallery
function displayEmployees(employees) {
    employees.forEach((employee, index) => {
        // append modal to body and get modal element back to add to event listener
        const modal = addUserModal(employee, index, employees.length - 1);
        // new employee cards intialized each iteration through loop
        const cardDiv = document.createElement('div');
        const imgDiv = document.createElement('div');
        const infoDiv = document.createElement('div');
        const img = document.createElement('img');
        const name = document.createElement('h3');
        const email = document.createElement('p');
        const location = document.createElement('p');

        cardDiv.classList.add('card');
        imgDiv.classList.add('card-img-container');
        infoDiv.classList.add('card-info-container');
        img.classList.add('card-img');
        name.id = `${employee.name.first}-${employee.name.last}`;
        name.classList.add('card-name');
        name.classList.add('cap');
        email.classList.add('card-text');
        location.classList.add('card-text');
        location.classList.add('cap');

        img.src = employee.picture.medium;
        img.alt = 'profile picture';
        name.textContent = `${employee.name.first} ${employee.name.last}`;
        email.textContent = employee.email;
        location.textContent = `${employee.location.city}, ${employee.location.state}`;

        cardDiv.addEventListener('click', () => {
            modal.style.display = 'inline';
        });

        imgDiv.appendChild(img);
        infoDiv.appendChild(name);
        infoDiv.appendChild(email);
        infoDiv.appendChild(location);
        cardDiv.appendChild(imgDiv);
        cardDiv.appendChild(infoDiv);
        galleryDiv.appendChild(cardDiv);
    });
}
    // maxPos tracks the total length of the employee list
    // pos is the index of the current employee object
function addUserModal(employee, pos, maxPos) {
    // initialize all modal elements
    const container = document.createElement('div');
    const modalDiv = document.createElement('div');
    const button = document.createElement('button');
    const strong = document.createElement('strong');
    const modalInfo = document.createElement('div');
    const img = document.createElement('img');
    const name = document.createElement('h3');
    const email = document.createElement('p');
    const city = document.createElement('p');

    const hr = document.createElement('hr');
    const phone = document.createElement('p');
    const address = document.createElement('p');
    const birthday = document.createElement('p');
    const buttonDiv = document.createElement('div');
    const nextButton = document.createElement('button');
    const prevButton = document.createElement('button');

    container.classList.add('modal-container');
    modalDiv.classList.add('modal');
    button.id = 'modal-close-btn';
    button.classList.add('modal-close-btn');
    nextButton.id = 'modal-next';
    prevButton.id = 'modal-prev';
    modalInfo.classList.add('modal-info-container');
    img.classList.add('modal-img');
    name.classList.add('modal-name');
    name.classList.add('cap');
    email.classList.add('modal-text');
    city.classList.add('modal-text');
    city.classList.add('cap');
    phone.classList.add('modal-text');
    address.classList.add('modal-text');
    birthday.classList.add('modal-text');
    buttonDiv.classList.add('modal-btn-container');
    nextButton.classList.add('modal-next');
    prevButton.classList.add('modal-prev');
    
    // provide formatted employee data to modal elements
    strong.textContent = 'X';
    container.style.display = 'none';
    img.src = employee.picture.large;
    img.alt = 'profile picture';
    name.textContent = `${employee.name.first} ${employee.name.last}`;
    email.textContent = employee.email;
    city.textContent = employee.location.city;
    phone.textContent = employee.cell;
    address.textContent = `${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}`;
    birthday.textContent = `Birthday: ${formatDOB(employee.dob.date)}`;
    nextButton.textContent = 'Next';
    prevButton.textContent = 'Prev';

    // close modal when clicked
    button.addEventListener('click', () => {
        container.style.display = 'none';
    });
    nextButton.addEventListener('click', () => {
        container.style.display = 'none';
        container.nextSibling.style.display = 'inline';
    });
    prevButton.addEventListener('click', () => {
        container.style.display = 'none';
        container.previousSibling.style.display = 'inline';
    });
    
    // disable prev or next button on first and last employee modal
    if (pos > 0 && pos < maxPos) {
        nextButton.classList.add('btn');
        prevButton.classList.add('btn');
    }  else if (pos === maxPos) {
        nextButton.disabled = true;
        nextButton.classList.add('disabled');
        prevButton.classList.add('btn');
    } else if (pos === 0){
        prevButton.disabled = true;
        prevButton.classList.add('disabled');
        nextButton.classList.add('btn');
    }

    modalInfo.appendChild(img);
    modalInfo.appendChild(name);
    modalInfo.appendChild(email);
    modalInfo.appendChild(city);
    modalInfo.appendChild(hr);
    modalInfo.appendChild(phone);
    modalInfo.appendChild(address);
    modalInfo.appendChild(birthday);
    button.appendChild(strong);
    modalDiv.appendChild(button);
    modalDiv.appendChild(modalInfo);
    buttonDiv.appendChild(prevButton);
    buttonDiv.appendChild(nextButton);
    modalDiv.appendChild(buttonDiv);
    container.appendChild(modalDiv);
    body.appendChild(container);

    return container;
}

// show a helpful message if search returns no results
const message = document.createElement('p');
message.textContent = 'Uh oh! Couldn\'t find anyone by that name.';
message.classList.add('hide');
galleryDiv.appendChild(message);

// search function displays any/all matches to input string on submit
const form = document.querySelector('form');
const searchField = document.getElementById('search-input');
form.addEventListener('submit', event => {
    event.preventDefault();
    const gallery = document.getElementById('gallery');
    const employees = gallery.querySelectorAll('h3');
    const val = searchField.value.toLowerCase();
    let noResults = true;
    for(let i = 0; i < employees.length; i++){
        const name = employees[i].textContent.toLowerCase();
        const card = employees[i].parentElement.parentElement;
        if (!name.includes(val)) {
            card.style.display = 'none';
        } else if (name.includes(val)) {
            noResults = false;
        } else if (val === '') {
            card.style.display = 'flex';
        }
    }
    if(noResults) {
        message.classList.remove('hide');
        message.classList.add('show');
    }
});
// display all employees when input field cleared
searchField.addEventListener('keyup', event => {
    const employees = galleryDiv.querySelectorAll('h3');
    if (!searchField.value) {
        if(message.classList.contains('show')) {
            message.classList.remove('show');
            message.classList.add('hide');
        }
        for(let i = 0; i < employees.length; i++){
            const card = employees[i].parentElement.parentElement;
            card.style.display = 'flex';
        }
    }
});
// returns promise object in json format
function getJSONResponse(url) { 
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json());
}
// reformats employee date of birth string
function formatDOB(dob) {
    const match = /^(\d{4})-(\d{2})-(\d{2})?/.exec(dob);
    return `${match[2]}-${match[3]}-${match[1]}`;
}

// const res = new XMLHttpRequest();
// res.onreadystatechange = function() {
//     if (this.readyState === 4 && this.status === 200) {
//         const json = JSON.parse(res.responseText);
//         console.log(json.results[0].name.first);
//     }
// }
// res.open('GET', 'https://randomuser.me/api/', true);
// res.send();
// call api for random user
const randomUser = 'https://randomuser.me/api/';
// or for multiple users
const usersUrl = 'https://randomuser.me/api/?results=12&nat=us,gb,au,nz';
const galleryDiv = document.getElementById('gallery');
const body = document.querySelector('body');

getJSONResponse(usersUrl)
    .then(json => {
        displayUsers(json.results);
    })
    .catch(error => {
        // display html message
        console.error(error);
    });

// takes a list of user objects and displays them to page
function displayUsers(employees) {
    employees.forEach((employee, index) => {
        // append modal to body and get modal element back to add to event listener
        const modal = addUserModal(employee, index, employees.length - 1);
        // new elements intialized each iteration through loop
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

function addUserModal(employee, pos, maxPos) {
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
    strong.textContent = 'X';
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
    
    container.style.display = 'none';
    img.src = employee.picture.large;
    img.alt = 'profile picture';
    name.textContent = `${employee.name.first} ${employee.name.last}`;
    email.textContent = employee.email;
    city.textContent = employee.location.city;
    phone.textContent = employee.cell;
    address.textContent = `${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}`;
    birthday.textContent = `Birthday: ${formatDOB(employee.dob.date)}`;
    // close the modal when clicked
    button.addEventListener('click', () => {
        container.style.display = 'none';
    });
    nextButton.textContent = 'Next';
    prevButton.textContent = 'Prev';
    nextButton.addEventListener('click', () => {
        container.style.display = 'none';
        container.nextSibling.style.display = 'inline';
    });
    prevButton.addEventListener('click', () => {
        container.style.display = 'none';
        container.previousSibling.style.display = 'inline';
    });
    
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

const form = document.querySelector('form');
const searchField = document.getElementById('search-input');
form.addEventListener('click', event => {
    event.preventDefault();
    const gallery = document.getElementById('gallery');
    const employees = gallery.querySelectorAll('h3');
    const val = searchField.value.toLowerCase();
    for(let i = 0; i < employees.length; i++){
        const name = employees[i].textContent.toLowerCase();
        const card = employees[i].parentElement.parentElement;
        if (!name.includes(val)) {
            card.style.display = 'none';
        } else if (val === '') {
            card.style.display = 'flex';
        }
    }
});

function getJSONResponse(url) { 
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .catch(error => {
        console.log(error);
    });
}

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
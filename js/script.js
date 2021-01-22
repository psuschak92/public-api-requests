// call api for random user
const randomUser = 'https://randomuser.me/api/';
// or for multiple users
const usersUrl = 'https://randomuser.me/api/?results=12';
const galleryDiv = document.getElementById('gallery');
const body = document.querySelector('body');

function getJSONResponse(url) { 
    return fetch(url)
            .then(response => response.json());
}

// getJSONResponse(randomUser);

getJSONResponse(usersUrl)
    .then(json => {
        displayUsers(json.results);
    });

// takes a list of user objects and displays them to page
function displayUsers(users) {
    users.forEach(user => {
        // append modal to body and get modal element back to add to event listener
        const modal = addUserModal(user);
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
        name.id = 'name';
        name.classList.add('card-name');
        name.classList.add('cap');
        email.classList.add('card-text');
        location.classList.add('card-text');
        location.classList.add('cap');

        img.src = user.picture.medium;
        img.alt = 'profile picture';
        name.textContent = `${user.name.first} ${user.name.last}`;
        email.textContent = user.email;
        location.textContent = `${user.location.city}, ${user.location.state}`;

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

function addUserModal(user) {
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

    container.classList.add('modal-container');
    modalDiv.classList.add('modal');
    button.id = 'modal-close-btn';
    button.classList.add('modal-close-btn');
    strong.textContent = 'X';

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
    
    container.style.display = 'none';
    img.src = user.picture.large;
    img.alt = 'profile picture';
    name.textContent = `${user.name.first} ${user.name.last}`;
    email.textContent = user.email;
    city.textContent = user.location.city;
    phone.textContent = user.cell;
    address.textContent = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}`;
    birthday.textContent = `Birthday: ${user.dob.date}`;
    // close the modal when clicked
    button.addEventListener('click', () => {
        container.style.display = 'none';
    });

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
    container.appendChild(modalDiv);
    body.appendChild(container);

    return container;
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
const dom = {
    usersList: document.getElementById('users'),
    create: document.getElementById('create'),
    
}

let users = []
getUsers()

//open edit field
dom.usersList.addEventListener('click', (e) => {
    const btnEdit = e.target.closest('.user__btn');
    const userBlock = e.target.closest('.user-data');
    const btnSave = e.target.closest('.btn--save')
    if(btnEdit) {
        userBlock.classList.add('edit-data')
    }
    if(btnSave) {
        userBlock.classList.remove('edit-data')
    }
})

//toggle create block
dom.create.addEventListener('click', (e) => {
    const btnCreate = e.target.closest('.btn--create');
    const createBlock = dom.create.querySelector('.create');

    if(btnCreate) {
        if(dom.create.classList.contains('open-create')) {
            dom.create.classList.remove('open-create')
            createBlock.removeAttribute('style')
        } else {
            dom.create.classList.add('open-create')
            createBlock.style.height = createBlock.scrollHeight + 'px'
        }
    }
})

//submit form of create users
dom.create.addEventListener('submit', (e) => {
    console.log(e.target)
})

function createUserHTMl(user) { 
    return  `
            <div class="page__user user" id="${user.id}">
                <div class="user-block">
                    <div class="user-data">
                        <p class="user-title">Name:</p>
                        <div class="user-right">
                            <p class="user-text">${user.name}</p>
                            <button class="btn user__btn">
                                <img src="./img/edit.svg" class="btn__edit" alt="Edit" width="1" height="1" decoding="async">
                            </button>
                        </div>
                        <form class="user__edit form">
                        <input type="text" placeholder="Enter your name" class="input" required> 
                        <button class="btn btn--save" type="submit">Save</button>
                        </form>
                    </div>
                    <div class="user-data">
                        <p class="user-title">Username:</p>
                        <div class="user-right">
                            <p class="user-text">${user.username}</p>
                            <button class="btn user__btn">
                                <img src="./img/edit.svg" class="btn__edit" alt="Edit" width="1" height="1" decoding="async">
                            </button>
                        </div>
                        <form class="user__edit edit">
                            <input type="text" placeholder="Enter your name" class="edit__input" required> 
                            <button class="btn btn--save" type="submit">Save</button>
                        </form>
                    </div>
                    <div class="user-data">
                        <p class="user-title">Email:</p>
                        <div class="user-right">
                            <a href="mailto:Sincere@april.biz" class="user-text">${user.email}</a>
                            <button class="btn user__btn">
                                <img src="./img/edit.svg" class="btn__edit" alt="Edit" width="1" height="1" decoding="async">
                            </button>
                        </div>
                        <form class="user__edit edit">
                            <input type="email" placeholder="Enter your name" class="edit__input" required> 
                            <button class="btn btn--save" type="submit">Save</button>
                        </form>
                    </div>
                    <div class="user-data">
                        <p class="user-title">Phone:</p>
                        <div class="user-right">
                            <a href="tel:1770736803156442" class="user-text">${user.phone}</a>
                            <button class="btn user__btn">
                                <img src="./img/edit.svg" class="btn__edit" alt="Edit" width="1" height="1" decoding="async">
                            </button>
                        </div>
                        <form class="user__edit edit">
                            <input type="tel" placeholder="Enter your name" class="edit__input" required> 
                            <button class="btn btn--save" type="submit">Save</button>
                        </form>
                    </div>
                </div>
                <div class="user-block">
                    <div class="user-data">
                        <p class="user-title">Address:</p>
                        <div class="user-right">
                            <p class="user-text"> <span>${user.address.street},</span> <span>${user.address.suite},</span> <span>${user.address.city},</span> <span>${user.address.zipcode}</span></p>
                            <button class="btn user__btn">
                                <img src="./img/edit.svg" class="btn__edit" alt="Edit" width="1" height="1" decoding="async">
                            </button>
                        </div>
                        <form class="user__edit edit">
                            <input type="text" placeholder="Enter your name" class="edit__input" required> 
                            <button class="btn btn--save" type="submit">Save</button>
                        </form>
                    </div>
                    <div class="user-data">
                        <p class="user-title">Website:</p>
                        <div class="user-right">
                            <a href="/hildegard.org" class="user-text">${user.website}</a>
                            <button class="btn user__btn">
                                <img src="./img/edit.svg" class="btn__edit" alt="Edit" width="1" height="1" decoding="async">
                            </button>
                        </div>
                        <form class="user__edit edit">
                            <input type="text" placeholder="Enter your name" class="edit__input" required> 
                            <button class="btn btn--save" type="submit">Save</button>
                        </form>
                    </div>
                    <button class="btn btn--cancel user__cancel">Delete User</button>
                </div>
            </div>
        `
}

function createUser(users) {
    return users.map((user) => createUserHTMl(user)).join('')
}

function renderUsers(users, usersList) {
    usersList.innerHTML = createUser(users)
}

async function getUsers() {
    const response = await axios('http://localhost:1234/users');
    users = response.data;
    renderUsers(users, dom.usersList)
}




// async function getUsers(url, method = 'GET', data) {
//     try {
//         const response = await fetch(url, {
//             method,
//             body: data && JSON.stringify(data),
//             headers: {
//                 'content-type': 'application/json; charset=utf-8'
//             }
//         })
//         if(response.ok) {
//             const users = await response.json();
//             renderUsers(users, dom.usersList)
//         } else {
//             throw new Error
//         }
//     } catch (error) {
//         console.warn(error)
//     }
// }
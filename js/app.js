const dom = {
    usersList: document.getElementById('users'),
    create: document.getElementById('create'),
    createForm: document.getElementById('form-create'),
    modal: document.getElementById('modal'),
    formEdit: document.querySelector('.user__edit')
}

let users = []
getUsers()

dom.usersList.addEventListener('click', (e) => {
    const userId = Number(e.target.closest('.page__user').dataset.id);
    const btnEdit = e.target.closest('.user__btn');
    const btnCancel = e.target.closest('.user__cancel');
    if(btnEdit) {
        dom.modal.classList.add('open-edit')
    }
    if(btnCancel) {
        deleteUser(userId)
    }
})

//save update data
dom.modal.addEventListener('click', (e) => {
    const btnSave = e.target.closest('.btn--save');
    const overlay = e.target.closest('.overlay');
    if(btnSave || overlay) {
        dom.modal.classList.remove('open-edit');
        editDate()
    }
})

//submit update 
function editDate() {
    dom.formEdit.addEventListener('submit', (e) => {
        e.preventDefault();
        const updateName = e.target.name.value;
    })
}


// toggle create block
dom.create.addEventListener('click', (e) => {
    const btnCreate = e.target.closest('.page__create-btn');
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
dom.createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameValue = e.target.name.value;
    const usernameValue = e.target.username.value;
    const emailValue = e.target.email.value;
    const phoneValue = e.target.phone.value;
    const websiteValue = e.target.website.value;
    const streetValue = e.target.street.value;
    const suiteValue = e.target.suite.value;
    const cityValue = e.target.city.value;
    const zipcodeValue = e.target.zipcode.value;
    const newUser = {
        name: nameValue,
        username: usernameValue,
        email: emailValue,
        phone: phoneValue,
        website: websiteValue,
        address: {
            street: streetValue,
            suite: suiteValue,
            city: cityValue,
            zipcode: zipcodeValue
        }
    }
    postUser(newUser)
    e.target.reset()
})

function createUserHTMl(user) { 
    return  `
            <div class="page__user user" data-id="${user.id}">
                <div class="user-block">
                    <div class="user-data">
                        <p class="user-title">Name:</p>
                        <div class="user-right">
                            <p class="user-text">${user.name}</p>
                            <button class="btn user__btn">
                                <img src="./img/edit.svg" class="btn__edit" alt="Edit" width="1" height="1" decoding="async">
                            </button>
                        </div>
                    </div>
                    <div class="user-data">
                        <p class="user-title">Username:</p>
                        <div class="user-right">
                            <p class="user-text">${user.username}</p>
                            <button class="btn user__btn">
                                <img src="./img/edit.svg" class="btn__edit" alt="Edit" width="1" height="1" decoding="async">
                            </button>
                        </div>
                    </div>
                    <div class="user-data">
                        <p class="user-title">Email:</p>
                        <div class="user-right">
                            <a href="mailto:Sincere@april.biz" class="user-text">${user.email}</a>
                            <button class="btn user__btn">
                                <img src="./img/edit.svg" class="btn__edit" alt="Edit" width="1" height="1" decoding="async">
                            </button>
                        </div>
                    </div>
                    <div class="user-data">
                        <p class="user-title">Phone:</p>
                        <div class="user-right">
                            <a href="tel:1770736803156442" class="user-text">${user.phone}</a>
                            <button class="btn user__btn">
                                <img src="./img/edit.svg" class="btn__edit" alt="Edit" width="1" height="1" decoding="async">
                            </button>
                        </div>
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
                    </div>
                    <div class="user-data">
                        <p class="user-title">Website:</p>
                        <div class="user-right">
                            <a href="/hildegard.org" class="user-text">${user.website}</a>
                            <button class="btn user__btn">
                                <img src="./img/edit.svg" class="btn__edit" alt="Edit" width="1" height="1" decoding="async">
                            </button>
                        </div>
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
    const response = await axios.get('http://localhost:1234/users');
    users = response.data;
    renderUsers(users, dom.usersList)
}

async function postUser(newUser) {
    try {
        const response = await axios.post('http://localhost:1234/users', newUser)
        users.push(response.data)
        renderUsers(users, dom.usersList)
    } catch (error) {
        console.warn(error)
    }
}

async function deleteUser(userId) {
    try {
        await axios.delete(`http://localhost:1234/users/${userId}`)
        users = users.filter((user) => user.id !== userId)
        renderUsers(users, dom.usersList)
    } catch (error) {
        console.warn(error)
    }
}
const dom = {
    usersList: document.getElementById('users'),
    create: document.getElementById('create'),
    createForm: document.getElementById('form-create'),
    modal: document.getElementById('modal'),
    formEdit: document.getElementById('form-modal')
}

let users = []
getUsers()

dom.usersList.addEventListener('click', (e) => {
    const userId = Number(e.target.closest('.page__user').dataset.id);
    const btnEdit = e.target.closest('.user__btn');
    const btnCancel = e.target.closest('.user__cancel');
    const btnAddress = btnEdit?.dataset.btn;
    if(btnEdit) {
        const inputValue = btnEdit.previousElementSibling.textContent;
        const inputKey = btnEdit.previousElementSibling.dataset.key;
        dom.modal.classList.add('open-edit');
        dom.formEdit.userid.value = userId;
        dom.formEdit.input.value = inputValue;
        dom.formEdit.key.value = inputKey;
    }
    if(btnCancel) {
        deleteUser(userId)
    }
    if(btnAddress) {
        dom.modal.classList.add('show-address');
    } else {
        dom.modal.classList.remove('show-address');
    }
})

//save update data
dom.modal.addEventListener('click', (e) => {
    const overlay = e.target.closest('.overlay');
    if(overlay) {
        dom.modal.classList.remove('open-edit');
    }
})

// submit update 
dom.formEdit.addEventListener('submit', (e) => {
    e.preventDefault();
    let updateValue = e.target.input.value;
    const modalUserId = Number(e.target.userid.value);
    const updateKey = e.target.key.value;
    if(updateKey === 'address') {
        const {street, suite, city, zipcode} = getData(e.target);
        updateValue = { street, suite, city, zipcode };
    }
    patchUser(modalUserId, { [updateKey]: updateValue });
    dom.modal.classList.remove('open-edit');
})

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
    const {name, username, email, phone, website, street, suite, city, zipcode} =  getData(e.target)
    const newUser = {
        name,
        username,
        email,
        phone,
        website,
        address: {
            street,
            suite,
            city,
            zipcode
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
                            <p class="user-text" data-key="name">${user.name}</p>
                            <button class="btn user__btn">
                                <img src="./img/edit.svg" class="btn__edit" alt="Edit" width="1" height="1" decoding="async">
                            </button>
                        </div>
                    </div>
                    <div class="user-data">
                        <p class="user-title">Username:</p>
                        <div class="user-right">
                            <p class="user-text" data-key="username">${user.username}</p>
                            <button class="btn user__btn">
                                <img src="./img/edit.svg" class="btn__edit" alt="Edit" width="1" height="1" decoding="async">
                            </button>
                        </div>
                    </div>
                    <div class="user-data">
                        <p class="user-title">Email:</p>
                        <div class="user-right">
                            <a href="mailto:${user.email}" class="user-text" data-key="email">${user.email}</a>
                            <button class="btn user__btn">
                                <img src="./img/edit.svg" class="btn__edit" alt="Edit" width="1" height="1" decoding="async">
                            </button>
                        </div>
                    </div>
                    <div class="user-data">
                        <p class="user-title">Phone:</p>
                        <div class="user-right">
                            <a href="tel:${user.phone}" class="user-text" data-key="phone">${user.phone}</a>
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
                            <p class="user-text"  data-key="address"> <span>${user.address.street},</span> <span>${user.address.suite},</span> <span>${user.address.city},</span> <span>${user.address.zipcode}</span></p>
                            <button class="btn user__btn" data-btn="address">
                                <img src="./img/edit.svg" class="btn__edit" alt="Edit" width="1" height="1" decoding="async">
                            </button>
                        </div>
                    </div>
                    <div class="user-data">
                        <p class="user-title">Website:</p>
                        <div class="user-right">
                            <a href="/hildegard.org" class="user-text" data-key="website">${user.website}</a>
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
    const response = await axios.get('https://app-json3.herokuapp.com/users');
    users = response.data;
    renderUsers(users, dom.usersList)
}

async function postUser(newUser) {
    try {
        const response = await axios.post('https://app-json3.herokuapp.com/users', newUser)
        users.push(response.data)
        renderUsers(users, dom.usersList)
    } catch (error) {
        console.warn(error)
    }
}

async function patchUser(userId, updatingData) {
    try {
        const response = await axios.patch(`https://app-json3.herokuapp.com/${userId}`, updatingData);
        const userIdx = users.findIndex(user => user.id === userId);
        users.splice(userIdx, 1, response.data)
        renderUsers(users, dom.usersList)
    } catch (error) {
        console.warn(error)
    }
}

async function deleteUser(userId) {
    try {
        await axios.delete(`https://app-json3.herokuapp.com/${userId}`);
        users = users.filter((user) => user.id !== userId);
        renderUsers(users, dom.usersList)
    } catch (error) {
        console.warn(error)
    }
}

function getData(form) {
    let objData = {};
	const formData = new FormData(form);
	for (var key of formData.keys()) {
		objData[key] = formData.get(key);
	}
	return objData
}
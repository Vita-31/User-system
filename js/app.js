const dom = {
    users: document.getElementById('users')
}

//open edit field
dom.users.addEventListener('click', (e) => {
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
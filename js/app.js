const dom = {
    users: document.getElementById('users'),
    create: document.getElementById('create')
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

//toggle create block
dom.create.addEventListener('click', (e) => {
    const btnCreate = e.target.closest('.btn--create');
    const createBlock = dom.create.querySelector('.create');
    console.log(createBlock)
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
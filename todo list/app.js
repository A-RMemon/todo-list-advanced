let formEl = document.querySelector('.form');
let inputEl = document.querySelector('.list');
let ulEl = document.querySelector('ul');
let clearbtn = document.querySelector('.btn');

let list = JSON.parse(localStorage.getItem('list'));

if (list) {
    list.forEach(element => {
        todoArray(element);
    });
}

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    todoArray();
})

function todoArray(task) {
    let newtask = inputEl.value;
    if (task) {
        newtask = task.name;
    }
    let liEl = document.createElement('li');
    if (task && task.checked) {
        liEl.classList.add('checked');
    }
    liEl.innerText = newtask;
    ulEl.appendChild(liEl);
    inputEl.value = ""

    const deletebtn = document.createElement('div');
    deletebtn.innerHTML = `<i class="fa-solid fa-trash"></i>`
    liEl.appendChild(deletebtn);

    const checkbtn = document.createElement('div');
    checkbtn.innerHTML = `<i class="fa-solid fa-square-check"></i>`;
    liEl.appendChild(checkbtn);

    deletebtn.addEventListener('click', () => {
        liEl.remove();
        updateStorage();
    })
    checkbtn.addEventListener('click', () => {
        liEl.classList.toggle('checked');
        updateStorage();
    })

    updateStorage()
}

function updateStorage() {
    let li = document.querySelectorAll('li');
    list = [];
    li.forEach(liEl => {
        list.push({
            name: liEl.innerText,
            checked: liEl.classList.contains('checked')
        })
    })
    localStorage.setItem('list', JSON.stringify(list));
}

clearbtn.addEventListener('click', () => {
    while (ulEl.firstChild) {
        ulEl.removeChild(ulEl.firstChild);
        localStorage.clear();
    }
})
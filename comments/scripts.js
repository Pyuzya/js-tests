let commentArea = document.getElementById('comment')
let nameInput = document.getElementById('name')
let dateInput = document.getElementById('date')
let imgLike = document.getElementById('heart')
let imgTrash = document.getElementById('emptyTrash')
let form = document.getElementById('commentForm')
let commentValue, nameValue, dateValue, imgValueLike, imgValueTrash;

nameInput.addEventListener('invalid', function (e) {
    e.target.setCustomValidity('')
    if (!e.target.validity.valid) {
        e.target.setCustomValidity("Введите имя")
    }
});

commentArea.addEventListener('invalid', function (e) {
    e.target.setCustomValidity('')
    if (!e.target.validity.valid) {
        e.target.setCustomValidity("Введите текст")
    }
});

if (/^\s*$/g.test(commentArea.value) || commentArea.value.indexOf('\n') != -1) {
    commentArea.addEventListener('invalid', function (e) {
        e.target.setCustomValidity('')
        if (!e.target.validity.valid) {
            e.target.setCustomValidity("Введите текст")
        }
    });
}
commentArea.addEventListener('input', function (e) {
    e.target.setCustomValidity("")
});

let date = new Date

let day = date.getDate()

let hour = date.getHours()

function dateFormat(inputDate, format) {
    const date = new Date(inputDate);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    format = format.replace("MM", month.toString().padStart(2, "0"));

    if (format.indexOf("yyyy") > -1) {
        format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
        format = format.replace("yy", year.toString().substr(2, 2));
    }

    format = format.replace("dd", day.toString().padStart(2, "0"));

    return format;
}

let hours = () => {
    let hours = ''
    if (date.getHours() <= 9) {
        hours = '0' + date.getHours()
    } else {
        hours = date.getHours()
    }
    return hours
}


let minutes = () => {
    let minutes = ''
    if (date.getMinutes() <= 9) {
        minutes = '0' + date.getMinutes()
    } else {
        minutes = date.getMinutes()
    }
    return minutes
}

let fullTime = `${hours()}:${minutes()}`

let imgTrashClass = document.getElementsByClassName('emptyTrash')

function remove(self) {
    console.log(self);
    self.closest('.commentElem').remove()
}

function like(self) {
    let arrayClass = imgLike.classList
    if (arrayClass.contains('red')) {
        imgLike.classList.remove('red')
    } else {
        imgLike.classList.add('red')
    }

    if (window.FormData) {
        let appendComment = function (nameValue, commentValue, dateValue) {

            let comment = document.createElement('li')
            comment.setAttribute('class', 'commentElem')
            let commentName = document.createElement('h4')
            let commentComment = document.createElement('p')
            let commentDate = document.createElement('p')
            let heart = document.createElement('img')
            heart.setAttribute('src', 'heart.svg')
            heart.setAttribute('class', 'heart')
            heart.setAttribute('onclick', 'like(this')
            let emptyTrash = document.createElement('img')
            emptyTrash.setAttribute('src', 'empty-trash.svg')
            emptyTrash.setAttribute('class', 'emptyTrash')
            emptyTrash.setAttribute('onclick', 'remove(this)')
            let commentWrapper = document.querySelector('.comments')
            commentName.innerText = nameValue
            commentComment.innerText = commentValue
            heart.innerText = imgValueLike
            emptyTrash.innerText = imgValueTrash
            nameValue ? comment.appendChild(commentName) : ''
            comment.appendChild(commentComment)
            if (commentDate) {
                commentDate.innerText = dateValue
                comment.appendChild(commentDate)
            } else {
                commentDate.innerText = fullTime
                comment.appendChild(fullTime)
            }
            comment.appendChild(heart)
            comment.appendChild(emptyTrash)
            commentWrapper.appendChild(comment)
        };

        let today = new Date()

        yesterday = new Date()

        yesterday = yesterday.setDate(today.getDate() - 1);

        yesterday = dateFormat(yesterday, 'yyyy-MM-dd')

        today = dateFormat(new Date, 'yyyy-MM-dd')

        form.addEventListener('submit', function (e) {

            let formData = new FormData(form)
            commentValue = commentArea.value

            nameValue = nameInput.value
            if (dateInput.value == '' || dateInput.value == today) {
                dateValue = 'Сегодня' + ' ' + fullTime
            } else {
                if (dateInput.value == yesterday) {
                    dateValue = 'Вчера' + ' ' + fullTime
                } else {
                    dateValue = dateFormat(dateInput.value, 'dd.MM.yyyy')
                }
            }
            let xhr = new XMLHttpRequest()
            xhr.open('POST', './save', true)
            xhr.onload = function () {
                appendComment(nameValue, commentValue, dateValue)
            }
            xhr.send(formData)
            e.preventDefault();
        });
    }
}

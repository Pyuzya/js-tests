let form = document.getElementById('search')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let results = document.querySelector('.result')
    results.innerHTML = ''
    console.log(results);
    let input = document.getElementById('text')
    let trim = input.value.trim()
    if (trim == ' ' || trim.length == 0) {
        alert('Пустая строка')
        return null
    }
    let inputValue = input.value
    fetch(`https://api.github.com/search/repositories?q=${inputValue}&per_page=10`)
        .then(response => response.json())
        .then((result) => {
            let jsonArr = result.items
            if (jsonArr.length == 0) {
                let template = '<div class="soryan"> Ничего не найдено </div>'
                console.log('123123');
                results.insertAdjacentHTML('beforeend', template)
            } else {
                jsonArr.forEach((elem, i) => {
                    let name = elem.name
                    let fullName = elem.full_name
                    let url = elem.clone_url
                    let e = () => {
                        if (elem.topics[i] == undefined) {
                            return ''
                        } else {
                            return elem.topics[i]
                        }
                    }
                    let template = `<div class="results">
                    <div class="name"><a target='_blank' href='${url}'>${name}</a></div>
                    <div class="full_name"><a target='_blank' href='${url}'>${fullName}</a></div>
                    <div class='topic'>${e()}</div>
                    </div>`

                    results.insertAdjacentHTML("beforeend", template)
                })
            }
        })
})



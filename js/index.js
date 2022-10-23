document.addEventListener("DOMContentLoaded", function() {

const list = document.querySelector("#list")
const bookPanel = document.querySelector("#show-panel")

fetch ("http://localhost:3000/books")
.then (r => r.json())
.then (books => {

    books.forEach(bookObj=> {
        renderBooks(bookObj)
    })
})

function  renderBooks(bookObj){

    const bookList = document.createElement("li")

    bookList.textContent = bookObj.title
    list.append(bookList)

    bookList.addEventListener("click", ()=> {

        bookPanel.innerHTML = " "

        const bookDiv = document.createElement ("div")
        const bookImg = document.createElement ("img")
        const bookTitle = document.createElement ("h2")
        const bookSubtitle = document.createElement ("h3")
        const pAuthor = document.createElement("p")
        const bookDescription = document.createElement ("h5")
        const likeBtn = document.createElement("button")
        const userList = document.createElement("ul")


        bookTitle.textContent = bookObj.title
        bookSubtitle.textContent = bookObj.subtitle
        bookDescription.textContent = bookObj.description
        pAuthor.textContent = bookObj.author
        bookImg.src = bookObj.img_url
        likeBtn.textContent = "LIKE"


        bookDiv.append(bookImg, bookTitle, bookSubtitle,pAuthor, bookDescription, userList,likeBtn)
        bookPanel.append(bookDiv)

        Array.from(bookObj.users).forEach( (users) =>{
            const user = document.createElement("li")
            user.textContent = users.username
            userList.append(user)
        })

        likeBtn.addEventListener ("click", ()=>{
            if (likeBtn.textContent = 'LIKE'){
                fetch(' http://localhost:3000/users')
                .then(res=>res.json())
                .then(data=>{

                    let newLike = data [Math.floor(Math.random() * 10)]
                    let li = document.createElement('li')
                    li.textContent += newLike.username
                    userList.appendChild(li)
                    bookObj.users = [...bookObj.users, newLike]
                    addUser(bookObj)
                })

            }
        })
    })


    const addUser = (user)=>{
        fetch(`http://localhost:3000/books/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json"
            },
            body:JSON.stringify(user)
        })
        .then (r => r.json())

    }

} // renderBooks





});

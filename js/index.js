document.addEventListener("DOMContentLoaded", function() {

const list = document.querySelector("#list")


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

    const bookPanel = document.querySelector("#show-panel")
    bookList.addEventListener("click", ()=> {

        const bookImg = document.createElement ("img")
        const bookTitle = document.createElement ("h2")
        const bookSubtitle = document.createElement ("h3")
        const pAuthor = document.createElement("p")
        const bookDescription = document.createElement ("h5")
        const likeBtn = document.createElement("button")


        bookTitle.textContent = bookObj.title
        bookSubtitle.textContent = bookObj.subtitle
        bookDescription.textContent = bookObj.description
        pAuthor.textContent = bookObj.author
        bookImg.src = bookObj.img_url
        likeBtn.textContent = "LIKE"

        bookPanel.append(bookImg, bookTitle, bookSubtitle,pAuthor, bookDescription,likeBtn)
    })
}




});

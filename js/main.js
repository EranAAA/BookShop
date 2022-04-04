'use strict'

function onInit() {
    renderBooks()
    elNumPages(1)
}

function renderBooks() {
    const books = getBooksFromStorage()
    const elBooks = document.querySelector('.books-container')
    var strHTML = books.map(book => `<tr>
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.price}</td>
        <td>${book.rate}</td>
        <td><button onclick="onModalView('${book.title}', '${book.id}')" class="readBtn">Read</button></td>
        <td><button onclick="onUpdateBook('${book.id}')" class="updateBtn">Update</button></td>
        <td><button onclick="onRemoveBook('${book.id}')" class="deleteBtn">Delete</button></td> </tr>`)

    elBooks.innerHTML = strHTML.join('')
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onUpdateBook(bookId) {
    var newPrice = +prompt(`Enter the new price`)
    if (!newPrice) return
    updateBook(bookId, newPrice)
    renderBooks()

}

function onAddBook(ev) {
    ev.preventDefault();
    const elBookName = ev.target[0]
    const elPrice = ev.target[1]
    if (!elBookName) return

    addBook(elBookName.value, +elPrice.value)
    sortTitle()

    elBookName.value = '';
    elPrice.value = '';

    renderBooks()
}

function onModalView(title, id) {
    var elModal = document.querySelector('.book-details')
    var elRateDisplay = document.querySelector('.rate-display')

    elModal.hidden = false

    //makeLorem()
    elModal.querySelector('h3').innerText = title
    elModal.querySelector('h6').innerText = id
    elModal.querySelector('p').innerText = makeLorem(30)
    elRateDisplay.innerText = getCurrRate(id)
}

function onRateBook(num, ev) {
    ev.preventDefault();

    var elRateDisplay = document.querySelector('.rate-display')
    var elRatePlus = document.querySelector('.rate-button-plus')
    var elRateMinus = document.querySelector('.rate-button-minus')
    var elIdInModal = document.querySelector('h6')

    if ((+elRateDisplay.innerText) === 0 && num === -1) {
        elRatePlus.disabled = false
        return elRateMinus.disabled = true
    } else if ((+elRateDisplay.innerText) > 0 && num === -1) {
        elRateMinus.disabled = elRatePlus.disabled = false
        elRateDisplay.innerText = +elRateDisplay.innerText + num
    }

    if ((+elRateDisplay.innerText) === 10 && num === 1) {
        elRateMinus.disabled = false
        return elRatePlus.disabled = true
    } else if ((+elRateDisplay.innerText) < 10 && num === 1) {
        elRateMinus.disabled = elRatePlus.disabled = false
        elRateDisplay.innerText = +elRateDisplay.innerText + num
    }

    rateBook(+elRateDisplay.innerText, elIdInModal.innerText)
    renderBooks()
}

function onExitModal(ev) {
    ev.preventDefault();

    var elModal = document.querySelector('.book-details')
    var elRatePlus = document.querySelector('.rate-button-plus')
    var elRateMinus = document.querySelector('.rate-button-minus')

    elRateMinus.disabled = elRatePlus.disabled = false
    elModal.hidden = true
}

function onSortId() {
    console.log('here');
}

function onSortTitle() {
    sortTitle()
    renderBooks()

}

function onSortPrice() {
    sortPrice()
    renderBooks()

}

function onPrevPage(ev) {
    ev.preventDefault();
    elNumPages(-1)
    prevPage()
    renderBooks()

}

function onNextPage(ev) {
    ev.preventDefault();
    elNumPages(1)
    nextPage()
    renderBooks()

}

function elNumPages(num) {
    var elNumpages = document.querySelector('.pages')
    elNumpages.innerText = getNumberOfPages(num)

}
'use strict'

var gBooks;
var gToggleSortTitle = false
var gToggleSortPrice = false
const MAX_BOOK_PER_PAGES = 5
var gCountToNextPage = 0
var gCountingPages = 0


function _createBook(title, price, rate = 0, imgUrl) {
    return {
        id: _makeId(2),
        title,
        price,
        rate,
        imgUrl
    }
}

function _createBooks() {
    gBooks = [
        _createBook('First Book', 19),
        _createBook('Second Book', 10),
        _createBook('Third Book', 25)
    ]
    saveBooks('bookDB', gBooks)
}

function saveBooks(key, val) {
    _saveBooks(key, val)
}

function getBooksFromStorage() {
    gBooks = loadFromStorage('bookDB')
    if (!gBooks) _createBooks()
    return gBooks.slice(gCountToNextPage, gCountToNextPage + MAX_BOOK_PER_PAGES)
}

function getBookIndex(bookId) {
    return gBooks.findIndex(book => book.id === bookId)
}

function removeBook(bookId) {
    var deleteBookIdx = getBookIndex(bookId)
    gBooks.splice(deleteBookIdx, 1)
    saveBooks('bookDB', gBooks)
}

function updateBook(bookId, bookPrice) {
    var updateBookIdx = getBookIndex(bookId)
    gBooks[updateBookIdx].price = bookPrice
    saveBooks('bookDB', gBooks)
}

function addBook(name, price) {
    //debugger
    gBooks.push(_createBook(name, price))
    saveBooks('bookDB', gBooks)
}

function rateBook(newRate, bookId) {
    var updateBookIdx = getBookIndex(bookId)
    gBooks[updateBookIdx].rate = newRate
    saveBooks('bookDB', gBooks)
}

function getCurrRate(bookId) {
    var updateBookIdx = getBookIndex(bookId)
    return gBooks[updateBookIdx].rate

}

function sortTitle() {
    if (gToggleSortTitle) {
        gBooks.sort((a, b) => a.title !== b.title ? a.title < b.title ? -1 : 1 : 0)
        gToggleSortTitle = false
    } else {
        gBooks.sort((a, b) => a.title !== b.title ? a.title < b.title ? 1 : -1 : 0)
        gToggleSortTitle = true
    }
    saveBooks('bookDB', gBooks)
}

function sortPrice() {
    if (gToggleSortPrice) {
        gBooks.sort((a, b) => a.price !== b.price ? a.price < b.price ? -1 : 1 : 0)
        gToggleSortPrice = false
    } else {
        gBooks.sort((a, b) => a.price !== b.price ? a.price < b.price ? 1 : -1 : 0)
        gToggleSortPrice = true
    }
    saveBooks('bookDB', gBooks)
}

function nextPage() {
    if ((gCountToNextPage + MAX_BOOK_PER_PAGES) >= gBooks.length) return
    gCountToNextPage += 5
}

function prevPage() {
    if (gCountToNextPage <= 0) return
    gCountToNextPage -= 5
}

function getNumberOfPages(num) {
    var totalPages = Math.ceil(gBooks.length / MAX_BOOK_PER_PAGES)
    gCountingPages += num
    if (gCountingPages < 1) return `${gCountingPages = 1} / ${totalPages}`
    if (gCountingPages > totalPages) return `${gCountingPages = totalPages} / ${totalPages}`
    return `${gCountingPages} / ${totalPages}`
}
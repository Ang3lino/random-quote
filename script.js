let quotes = []

const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')


function loading() {
    loader.hidden = false
    quoteContainer.hidden = true
}

function complete() {
    loader.hidden = true
    quoteContainer.hidden = false
}

function newQuote() {
    loading();
    const quote = quotes[Math.floor(Math.random() * quotes.length)]
    // console.log(quoteText)
    if (quote.text.length > 40) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove("long-quote")
    }
    quoteText.textContent = quote.text
    let author = quote.author
    if (!author) author = 'Angel Lopez Manriquez'
    authorText.textContent = author
    complete();
}

async function getQuotes() {
    loading();
    const API_URL = "https://type.fit/api/quotes"
    try {
        const res = await fetch(API_URL)
        quotes = await res.json() 
        newQuote()
    } catch (err) {
        console.log(err); 
    }
}

function tweetQuote() {
    const quote = quoteText.textContent
    const author = authorText.textContent
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank')
}


// listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

getQuotes()
// loading( )
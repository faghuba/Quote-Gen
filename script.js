const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')



// / Get quote from API
async function getQuote() {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {

        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        // if Author is Blank - > add Unknown 
        if(data.quoteAuthor === '') {
            authorText.innerText = 'Unknown'
        } else {
            authorText.innerText = data.quoteAuthor
        }

        // Reduce font-size for long quote 
        if(data.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
       
        quoteText.innerText = data.quoteText
    } catch (error) {
            getQuote();
        }
  }

//   tweetQuote 
  function tweetQuote() {
    const quote = quoteText.innerText;
    const author  = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    
    window.open(twitterUrl, '_blank')
  }

//   Event Listeners 
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuote();
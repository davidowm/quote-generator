'use strict';
import { API_URL, TWITTER_URL } from '/config.js';
//todo: Create constant file
//todo: modify functions
//todo: modify if statements
//todo: add facebook button
//todo: add linked in button (maybe)

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}
//Show new Quote
function newQuote() {
  showLoadingSpinner();
  //Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //Check if author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }

  //check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  //set Quote, hide loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Get Quotes from API using async request
async function getQuotes() {
  showLoadingSpinner();
  //const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(API_URL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.error(error);
    getQuotes();
  }
}

//Tweet Quote
function tweetQuote() {
  // const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  const twitterUrl = `${TWITTER_URL}${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
//On Load
getQuotes();

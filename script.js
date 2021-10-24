'use strict';
import { API_URL, TWITTER_URL } from '/config.js';
//todo: modify functions
//todo: modify if statements
//todo: add facebook button
//todo: add linked in button (maybe)

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const facebookBtn = document.getElementById('facebook');
const linkedinBtn = document.getElementById('linkedin');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

const toggleSpinner = function (showSpinner = false) {
  loader.hidden = !showSpinner;
  quoteContainer.hidden = showSpinner;
};
//Show new Quote
const newQuote = function () {
  try {
    toggleSpinner(true);

    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //Check if author field is blank and replace it with 'Unknown'
    !quote.author
      ? (authorText.textContent = 'Unknown')
      : (authorText.textContent = quote.author);

    //check Quote length to determine styling
    quote.text.length > 120
      ? quoteText.classList.add('long-quote')
      : quoteText.classList.remove('long-quote');

    //set Quote, hide loader
    quoteText.textContent = quote.text;
  } catch (error) {
  } finally {
    toggleSpinner(false);
  }
};

// Get Quotes from API using async request
const getQuotes = async function () {
  try {
    toggleSpinner(true);
    const response = await fetch(API_URL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.error(error);
    getQuotes();
  }
};

//Tweet Quote
const tweetQuote = function () {
  const twitterUrl = `${TWITTER_URL}${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
};

// Share the quote on Facebook!
const facebookShare = function () {
  const quote = quoteText.textContent;
  const author = authorText.textContent;
  const title = 'Modern Quote Generator';
  const personalLink = 'davidowm/quote-generator';
  const facebookUrl = `http://www.facebook.com/sharer.php?s=100&p[title]=${title}&p[url]=${encodeURIComponent(
    personalLink
  )}&p[quote]=${quote} ~${author}`;

  window.open(facebookUrl, '_blank');
};

// Share the quote on Linkedin!
const linkedinShare = function () {
  const personalLink = 'davidowm/quote-generator';
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    personalLink
  )}`;

  window.open(linkedinUrl, '_blank');
};

const init = function () {
  //Event Listeners
  newQuoteBtn.addEventListener('click', newQuote);
  twitterBtn.addEventListener('click', tweetQuote);
  facebookBtn.addEventListener('click', facebookShare);
  linkedinBtn.addEventListener('click', linkedinShare);
};
//On Load
init();
getQuotes();

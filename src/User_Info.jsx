import React from 'react';

function User_Info() {
  return (
    <div>
      <h1>Top Trading Pairs</h1>
      <ul>
        <li>EUR/USD</li>
        <li>USD/JPY</li>
        <li>XAU/USD</li>
        <li>GBP/USD</li>
      </ul>
      <p>
        This is a sentiment analysis search based on NLTK. It scrapes macroeconomic data from the web, analyzes it using NLTK, and provides sentiment analysis results indicating whether the currency pair will be bullish or bearish.
      </p>
    </div>
  );
}

export default User_Info;

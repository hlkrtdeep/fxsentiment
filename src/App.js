import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User_Info from './User_Info'; // Ensure this is the correct path

function App() {
    const [currencyPairs, setCurrencyPairs] = useState('');
    const [results, setResults] = useState([]);
    const [news, setNews] = useState([]);
    const api_url = 'https://7b7d-103-51-22-137.ngrok-free.app'

    useEffect(() => {
        axios.get(`${api_url}/news`)
            .then(response => {
                console.log('News data:', response.data); // Debugging log
                setNews(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching news', error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const currencyPairsList = currencyPairs.split(',').map(pair => pair.trim().toUpperCase());

        axios.post(`${api_url}/analyze`, { currency_pairs: currencyPairsList })
            .then(response => {
                setResults(response.data);
                setCurrencyPairs('');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div className="App">
            <div><User_Info /></div>
            <div className='row'>
                <div className='column'>
                    <h1>Sentiment Analysis for Currency Pairs</h1>

                    <form onSubmit={handleSubmit}>
                        <label>
                            Enter currency pairs (comma-separated):
                            <input
                                className="inputbar"
                                type="text"
                                value={currencyPairs}
                                onChange={(e) => setCurrencyPairs(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Analyze</button>
                    </form>
                    <h2>Results:</h2>
                    <ul>
                        {Array.isArray(results) && results.map((result, index) => (
                            <li key={index}>
                                {result.currency_pair}: The sentiment for the upcoming days is likely {result.sentiment} (Total Sentiment Score: {result.total_sentiment})
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='column'>
                    <h3>News Feed</h3>
                    <ul>
                        {Array.isArray(news) && news.map((article, index) => (
                            <li key={index}>
                                <a href={article.Link} target="_blank" rel="noopener noreferrer">{article.ID}. {article.Heading}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;

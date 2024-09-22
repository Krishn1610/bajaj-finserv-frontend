import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const jsonData = JSON.parse(input);
      console.log("Sending data:", { data: jsonData }); // Logging data being sent for debugging
      const res = await axios.post('https://krishn1610.github.io/bajaj-finserv-backend/', { data: jsonData });
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError(`Invalid JSON format or API error: ${err.response ? err.response.data.message : err.message}`);
      setResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    return (
      <div>
        {selectedOptions.includes('Numbers') && response.numbers && (
          <div>
            <h3>Numbers:</h3>
            <p>{response.numbers.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Alphabets') && response.alphabets && (
          <div>
            <h3>Alphabets:</h3>
            <p>{response.alphabets.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && response.highest_lowercase_alphabet && (
          <div>
            <h3>Highest Lowercase Alphabet:</h3>
            <p>{response.highest_lowercase_alphabet}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL Challenge</h1>
      <form onSubmit={handleFormSubmit}>
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder='Enter JSON input here'
          rows={5}
          cols={50}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      <select multiple size="3" onChange={handleOptionChange}>
        <option value="Numbers">Numbers</option>
        <option value="Alphabets">Alphabets</option>
        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
      </select>
      {renderFilteredResponse()}
    </div>
  );
}

export default App;

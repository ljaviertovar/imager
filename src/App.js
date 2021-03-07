import React, { useState, useEffect } from 'react';
import Form from './components/Form';

function App() {

  const [searching, setSearching] = useState('');

  useEffect(() => {

    const consultAPI = async () => {

      if (searching === '') return;

      const imagesPerPage = 30;
      const key = '13621168-beadcffc52eef5942186bd60a';
      const url = `https://pixabay.com/api/?key=${key}&q=${searching}&per_page=${imagesPerPage}`;

      const resp = await fetch(url);
      const result = await resp.json();

      setSearching(result.hits);

    }

    consultAPI();

  }, [searching])

  return (
    <div className="container">
      <div className="jumbotron">
        <h1 className="lead text-center text-info">Finder of images</h1>
        <Form
          setSearching={setSearching}
        />
      </div>
    </div>

  );
}

export default App;

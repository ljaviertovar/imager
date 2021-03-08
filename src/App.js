import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import ListImages from './components/ListImages';

function App() {

  const [searching, setSearching] = useState('');
  const [images, setImages] = useState([]);
  const [pageActual, setPagActual] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {

    const consultAPI = async () => {

      if (searching === '') return;

      const imagesPerPage = 30;
      const key = '13621168-beadcffc52eef5942186bd60a';
      const url = `https://pixabay.com/api/?key=${key}&q=${searching}&per_page=${imagesPerPage}&page=${pageActual}`;

      const resp = await fetch(url);
      const result = await resp.json();

      setImages(result.hits);

      const calcTotalPages = Math.ceil(result.totalHits / imagesPerPage);
      setTotalPages(calcTotalPages);

      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'});

    }

    consultAPI();

  }, [searching, pageActual]);

  const previewPage = () => {

    const newPageActual = pageActual - 1;

    if(newPageActual === 0 ) return;

    setPagActual(newPageActual);
  }

  const nextPage = () => {

    const newPageActual = pageActual + 1;

    if (newPageActual > totalPages) return;

    setPagActual(newPageActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <h1 className="lead text-center text-info">Finder of images</h1>
        <Form
          setSearching={setSearching}
        />
      </div>
      <div className="row justify-content-center">
        <ListImages
          images={images}
        />
        {(pageActual === 1)
          ? null : <button
            type="button"
            className="btn btn-info mr-1"
            onClick={previewPage}
          >&laquo; Preview</button>}

        {(pageActual === totalPages)
          ? null
          : <button
            type="button"
            className="btn btn-info"
            onClick={nextPage}
          >Next &raquo;</button>}
      </div>

    </div>

  );
}

export default App;

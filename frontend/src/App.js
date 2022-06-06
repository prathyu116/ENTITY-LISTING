import { useEffect, useState } from 'react';
import { Link, useSearchParams } from "react-router-dom";

import { useDispatch } from 'react-redux';
import './App.css';
import Navbar from './components/Navbar';
import Table from './components/Table.jsx';
import { getData } from './Redux/TableFeature/Action';

function App() {
  const [currentId, setCurrentId] = useState(0);
    let [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
      const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData(page));
  }, [page]);
    useEffect(() => {
      setSearchParams({ page });
    }, [page, setSearchParams]);

  return (
    <div className="App">
      <Navbar currentId={currentId} setCurrentId={setCurrentId} />
      <Table currentId={currentId} setCurrentId={setCurrentId} page={page} />

      <div className="">
        <p className="text-center h6 my-3">Page: {page} </p>
        <button disabled={page === 1 ? true : false} onClick={() => setPage(page - 1)} className="btn btn-outline-success mx-2 px-3">
          Prev
        </button>
        <button onClick={() => setPage(page + 1)} className="btn btn-outline-success mx-2 px-3" >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;

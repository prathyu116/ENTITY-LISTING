import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar";
import Table from "./components/Table.jsx";
import { addData, getData } from "./Redux/TableFeature/Action";

function App() {
  // const state = useSelector((store) => store.TableData);
  // console.log("APP>JS",state);

  const [currentId, setCurrentId] = useState(0);
  let [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const [sort, setSort] = useState(searchParams.get("id") || null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData(page));
  }, [page,sort]);
  useEffect(() => {
    setSearchParams({ page });
  }, [page, sort, setSearchParams]);
  const sortLH = async () => {
    setSort("id_desc");
    setSearchParams({ id: "id_desc" });
    const data = await fetch(`http://localhost:5000/population?page=${page}&pagesize=5&sort=${sort}`).then((d) => d.json());
    dispatch(addData(data.datas));
  };
  const sortHL = async () => {
    setSearchParams({ id: "id_asc" });
        setSort("id_asc");

    const data = await fetch(`http://localhost:5000/population?page=${page}&pagesize=5&sort=${sort}`).then((d) => d.json());
    dispatch(addData(data.datas));
  };

  return (
    <div className="App">
      {/* <Navbar currentId={currentId} setCurrentId={setCurrentId} /> */}
      <Table currentId={currentId} setCurrentId={setCurrentId} page={page} sortLH={sortLH} sortHL={sortHL} />

      <div className="">
        <p className="text-center h6 my-3">Page: {page} </p>
        <button disabled={page === 1 ? true : false} onClick={() => setPage(page - 1)} className="btn btn-outline-success mx-2 px-3">
          Prev
        </button>
        {/* disabled={page === data?.total_pages} */}
        <button onClick={() => setPage(page + 1)} className="btn btn-outline-success mx-2 px-3">
          Next
        </button>
      </div>
    </div>
  );
}

export default App;

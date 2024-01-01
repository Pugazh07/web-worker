import React, { useEffect, useRef, useState } from "react";
import { fetchUsers } from "./service/sortService";
import worker from "./app.worker";
import WorkerFactory from "./WorkerFactory";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [isSorting, setIsSorting] = useState(false);
  const webWorker = useRef(null);

  useEffect(() => {
    webWorker.current = new WorkerFactory(worker);
    webWorker.current.onmessage = (e) => {
      console.log("App", e);
      setUsers(e.data);
      setIsSorting(false);
    };
    fetchUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch(console.error);
    return () => {
      webWorker.current.terminate();
    };
  }, []);

  const onClickSort = (order) => {
    if (sortOrder !== order) {
      setSortOrder(order);
      setIsSorting(true);
      webWorker.current.postMessage({ users, sortOrder: order });
    }
  };

  return (
    <div className="App">
      <header>
        <button onClick={() => onClickSort("asc")}>Sort ascending</button>
        <button onClick={() => onClickSort("desc")}>Sort descending</button>
      </header>
      {isSorting && <span>Sorting...</span>}
      {users.map(({ id, name, email, commentCount }) => (
        <div key={id}>
          <h2>{name}</h2>
          <p>{commentCount}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

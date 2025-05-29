import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using JSONPlaceholder API for example data
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="container my-3 bg-light">
      <form>
        <input
          type="search"
          className="form-control"
          placeholder="Search by Name"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(search.toLowerCase());
            })
            .map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.website}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

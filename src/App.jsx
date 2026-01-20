import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using JSONPlaceholder API for example data
        const response = await fetch(
          // "https://jsonplaceholder.typicode.com/users"
          "https://dummyjson.com/users?limit=10"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        // console.log(jsonData.users);

        setData(jsonData.users);
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

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="container my-3 bg-light">
      <form>
        <input
          type="search"
          className="form-control"
          placeholder="Search by First Name"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            {/* <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th> */}
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.firstName.toLowerCase().includes(search.toLowerCase());
            })
            .map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

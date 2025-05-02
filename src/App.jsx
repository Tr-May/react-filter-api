import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      // You can await here
      // const response = await axios.get("https://fakestoreapi.com/products");
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      // console.log(response.data);
      setData(response.data);
    }
    fetchData();
  }, []);

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

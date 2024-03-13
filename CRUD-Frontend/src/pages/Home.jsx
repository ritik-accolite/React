import { useState } from 'react';
import FetchData from '../allitems';
import { Link } from 'react-router-dom';
function Home() {
  const [data, setData] = useState([]);

  // now fetch data from the api and store it in data , useEffect

  return (
    <div className="App">
<table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Product Name</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
      <th scope="col">Description</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <FetchData/>
  </tbody>
</table>
    <div className='container'>
    <Link type="button" to= '/create' className="btn btn-primary">Add New Item</Link>
    </div>
    </div>
  );
}

export default Home;

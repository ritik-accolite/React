import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function FetchData() {
  const API_URL = 'http://localhost:8000/';

  const [myData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleDelete = async (id) => {
    try {
      const responseDel = await axios.delete('http://localhost:8000/products/'+id); // api call

      
      const newData = myData.filter(item=>{
        return item._id !== responseDel.data._id;
      })

      setData(newData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Unable to fetch data from the server.');
      setLoading(false);
    }
    navigate('/')
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/products'); // api call
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Unable to fetch data from the server.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  return (
    <>
    {
      myData.map((list, index) => (
        <tr key={list._id}>
          <th scope="col">{list._id}</th>
          <th scope="col">{list.name}</th>
          <th scope="col">{list.quantity}</th>
          <th scope="col">{`$${list.price}`}</th>
          <th scope="col">{list.desc}</th>
          <th scope="col">
            <Link type="button" to= {`/update/${list._id}`} className="btn btn-success mx-2">Edit</Link>
            <Link type="button" onClick={() => handleDelete(list._id)} className="btn btn-danger">Delete</Link>
          </th>
        </tr>
      ))
    }
    </>

  );

}
export default FetchData;
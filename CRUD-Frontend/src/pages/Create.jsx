import { useState, useEffect } from 'react';
import FetchData from '../allitems';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Create() {
    const {id} = useParams();
    const [values, setValues] = useState({
        id: id,
        name: "",
        quantity: "",
        price: "",
        desc: ""
    });
  // now fetch data from the api and store it in data , useEffect
    // useEffect(()=> {
    //     axios.get('http://localhost:8000/products/'+id)
    //     .then(res => {
    //         setValues({...values, 
    //             name:res.data.name,
    //             quantity:res.data.quantity,
    //             price:res.data.price,
    //             desc:res.data.desc
    //         })
    //     }).catch(err=> console.log(err))
    // })
    const navigate = useNavigate();
    const handleSubmit=(e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/products', values)
        .then(res => {
            setValues({...values, 
                name:res.data.name,
                quantity:res.data.quantity,
                price:res.data.price,
                desc:res.data.desc
            })
            navigate('/');
        }).catch(err=> console.log(err))
    }
  return (
<div className=' d-flex w-200 vh-100 justify-content-center align-items-center' >
<div className='w-50 border bg-secondary text-white p-5 '>   
<form onSubmit={handleSubmit}>
  <div className="form-group row">
    <label htmlFor="inputName3" className="col-sm-2 col-form-label">Product Name</label>
    <div className="col-sm-10">
      <input type="text" value ={values.name} onChange={e=> setValues({...values, name: e.target.value})} className="form-control" id="inputName3" placeholder="Product Name"/>
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="inputQuantity3" className="col-sm-2 col-form-label">Quantity</label>
    <div className="col-sm-10">
      <input type="number" value ={values.quantity} onChange={e=> setValues({...values, quantity: e.target.value})} className="form-control" id="inputQuantity3" placeholder="Quantity"/>
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="inputPrice3" className="col-sm-2 col-form-label">Price</label>
    <div className="col-sm-10">
      <input type="number" value ={values.price} onChange={e=> setValues({...values, price: e.target.value})} className="form-control" id="inputPrice3" placeholder="Price"/>
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="inputDesc3" className="col-sm-2 col-form-label">Product Description</label>
    <div className="col-sm-10">
      <input type="text" value ={values.desc} onChange={e=> setValues({...values, desc: e.target.value})} className="form-control" id="inputDesc3" placeholder="Product Description"/>
    
    </div>
  </div>
  <div className="form-group row">
    <div className="col-sm-10">
      <button type="submit" className="btn btn-primary">Add Item</button>
    </div>
  </div>
</form>
</div>
</div>
  );
}

export default Create;

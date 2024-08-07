import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/utils";
import { ToastContainer } from 'react-toastify'
function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() =>{
    setLoggedInUser(localStorage.getItem('loggedInUser')
    )
  }, [])

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess("User Loggedout")
    setTimeout( ()=> {
      navigate('/login')
    },1000)
  }

  const fetchProducts = async () => {
    try {
      const url = 'https://deploy-mern-app-api.vercel.app/products';
      const token = localStorage.getItem('token');
      const headers = {
        headers : {
          'Authorization': `Bearer ${token}`
        }
      }
      // console.log(headers)
      const response = await fetch(url, headers);
      const result = await response.json();
      // console.log(result);
      setProducts(result);
    } catch (error) {
      handleError(error)
    }
  }

    const [date, setDate] = useState();
    const now = new Date();
    const time = now.toLocaleTimeString()
    
    
    // console.log(time);
    setInterval(() => {
        setDate(time);
    }, 1000);


  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>

      <button style={{color : 'yellow', marginLeft : '20px'}}> <h3> {time} </h3></button>

      <br />

      {
        products.map((item, index) => (
          <li key={index}> {item.name} : {item.price }  <h4>{item.description}  :) </h4> </li>
        ))
      } 
      <button onClick={handleLogout} style={{marginLeft : '52px'}}> Logout </button>


      <ToastContainer />
    </div>
  )
}

export default Home

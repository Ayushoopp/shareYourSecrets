"use client"

import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [secrets, setSecrets] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    secret: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to the backend
    fetch('http://localhost:4001/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    fetch('http://localhost:4001/')
      .then((response) => response.json())
      .then((data) => {
        const userSecrets = data.users.map((user) => user.secret);
        setSecrets(userSecrets);
      });
  }, []);

  return (
  
    <div className="vh-100 vw-100 bg-primary pt-5 bg-light">

      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
        <div className="vh-50 vw-50 bg-primary ">
        <form onClick={handleSubmit}>
        <input onChange={handleChange} value={formData.name} name="name" type="text" className="form-control" placeholder="Name" />
        <input onChange={handleChange} value={formData.secret} name="secret" type="text" className="form-control" placeholder="Enter your Message" />
        <button onClick={()=>{
          location.reload()
        }} type="submit" className="btn btn-primary btn-lg" >Add More Messages </button>
        </form>
        </div>
        <h1 className="text-center text-black">Secrets</h1>

          
                {secrets.map((secret, index) => (
                  <h2 key={index} className="text-center text-black">{secret}</h2>
                ))}
         
  
        
      </div>
    </div>
    </div>
  );
};

export default MyComponent;

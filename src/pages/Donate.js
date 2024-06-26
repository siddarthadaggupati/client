import React, { useState } from 'react';
import '../App.css';
import './Donate.css';
import Navbar from '../components/Navbar';
import axios from 'axios';

function Donate() {
  const [amount, setAmount] = useState(0);

  const handleAmountChange = (event) => {
    setAmount(parseInt(event.target.value, 10));
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "https://pc-server-chi.vercel.app/api/payment/orders";
      const { data } = await axios.post(orderUrl, { amount: amount });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
      // Handle errors here, e.g., display an error message to the user
    }
  };

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_06GeKary0jkcOO",
      amount: data.amount,
      currency: data.currency,
      name: "Pet Link",
      description: "Test Transaction",
      image: data.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyurl = "https://pc-server-chi.vercel.app/api/payment/verify";
          const { data } = await axios.post(verifyurl, response);
          console.log(data);
          // Show success message to the user
        } catch (error) {
          console.log(error);
          // Handle errors here, e.g., display an error message to the user
        }
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className='page'>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="remaining">
        <h1 style={{backgroundColor:'#F07328', color:'white'}}>From Hunger to Hope <br />How Donations Fuel Our Mission</h1>
        <div className="text">
          <div className="line">
            <h2>Donate & Support</h2>
          </div>
          <p>Every day, animals in our community suffer from neglect, abuse, and homelessness. <br />
          Pet connect is dedicated to providing the care and support these animals need to thrive. <br />
          By donating to our cause, you can help make a difference in the lives of these innocent creatures. Your generosity will enable us to continue our work rescuing and rehoming animals, as well as educating the public on the importance of pet adoption. <br />
          Please consider making a donation today and join us in our mission to create a better world for all dogs and cats.</p>
        </div>
        <div className="donatecontainer">
          <br /><br />
          <form>
            <label htmlFor="name">Enter Your Name:</label> 
            <input type="text" id="name" /><br /><br />
            <div className="input-container"> 
              <label htmlFor="amount">Enter Amount</label> 
              <input type="number" id="amount" min="0" onChange={handleAmountChange} /><br /><br />
            </div> 
            <button className="calculate-btn" onClick={handlePayment}>Donate</button> 
          </form>
        </div>
      </div>
    </div>
  );
}

export default Donate;

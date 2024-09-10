import React from 'react'
import NavLog from '../components/AdminNav'
import { useState } from 'react';
import './Accessories.css'
import axios from 'axios';
function AAccessories() {

    const [products] = useState([
        { id: 1, name: "Pet bowl", price: 15, category: "collars", image: "https://i.etsystatic.com/8205066/r/il/fe8fe8/851326968/il_570xN.851326968_bo2a.jpg" },
        { id: 2, name: "radium collars", price: 25, category: "", image: "data:image/jpeg;base64,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" },
        { id: 3, name: "toys", price: 20, category: "catfood", image: "https://citypet.in/cdn/shop/files/legpiece_1_512x512.jpg?v=1683627006" },
        { id: 4, name: "chain", price: 10, category: "birdfood", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK3NL-AEOvYp4IaAKTi2f_JcLsky-ptJYp8A&usqp=CAU" }
    ]);

    // Initialize cart and total amount
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    // Function to add product to cart
    const addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            setCart([...cart, product]);
            setTotalAmount(totalAmount + product.price);
        }
    }

    // Function to remove product from cart
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(product => product.id !== productId);
        const removedProduct = cart.find(product => product.id === productId);
        if (removedProduct) {
            setCart(updatedCart);
            setTotalAmount(totalAmount - removedProduct.price);
        }
    }


  const initPayment = (data) => {
    const options = {
      key: "rzp_test_06GeKary0jkcOO",
      amount: data.totalAmount,
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
        } catch (error) {
          console.log(error)
        }
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "https://pc-server-chi.vercel.app/api/payment/orders";
      const { data } = await axios.post(orderUrl, { amount: totalAmount });
      console.log(data);
      initPayment(data.data)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div className="navbar">
        <NavLog/>
      </div>
      <div className="remaining">
      <div className="container">
            <div className="product-list">
                {products.map(product => (
                    <div className="product" key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <div className="product-details">
                            <span className="product-name">{product.name}</span>
                            <span className="product-price">${product.price}</span>
                            <button className="add-to-cart-btn" onClick={() => addToCart(product.id)}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart">
                <h2>Cart</h2>
                <ul>
                    {cart.map(product => (
                        <li key={product.id}>
                            <span>{product.name}</span>
                            <span>${product.price}</span>
                            <button className="remove-btn" onClick={() => removeFromCart(product.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <p>Total Amount: ${totalAmount}</p>
                <button type = 'submit' onClick={handlePayment}>Pay</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AAccessories

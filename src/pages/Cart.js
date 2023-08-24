import React, { useState, useEffect } from "react";
import service from "../services/data-service";
import AuthService from "../services/auth-service";
//import { url } from "../slices/api";
import axios from "axios";
import "../Styles/Cart.css";
import { useHistory } from 'react-router-dom';

function Cart() {
  const { getInvestedTressByAnInvestor, updateInvestorID, updateInvestmentValue } = service();
  const { getID } = AuthService();
  const [cart, setCart] = useState([]);
  const id = getID();
  const history = useHistory();

  // //after investing updating investorID 
  async function updateInvestorIDForTree(treeID, investorID) {
    try {
      const formData = {


        investorID: investorID
      };
      const updatedData = await updateInvestorID(treeID, formData);
      console.log('InvestorID updated successfully:', updatedData);
    } catch (error) {
      console.error('Failed to update InvestorID:', error);
    }
  }

  async function updateInvestmentForTree(treeID, investmentValue) {
    try {
      const formData = {
        investment: investmentValue, // Make sure the property name matches the expected parameter in updateInvestmentValue()
      };
      const updatedData = await updateInvestmentValue(treeID, formData);
      console.log('investment value updated successfully to 1', updatedData);
    } catch (error) {
      console.error('Failed to update investmentValue:', error);
    }
  }

  

  const displayCountOfCart = async (id) => {
    try {
      const res = await getInvestedTressByAnInvestor(id);
      console.log("logged in user invested trees", res.data.Result);
      setCart(res.data.Result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    displayCountOfCart(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);




  const constantPrice = 900;

  const handleContinueShopping = () => {
    history.push('/blockView');
  };

  const handleRemoveFromCart = async (itemId) => {
    setCart((cart) => cart.filter((item) => item.treeID !== itemId));

    const updatedInvestmentValue = 0;
    await updateInvestmentForTree(itemId, updatedInvestmentValue);

    const updatedInvestorIDRemoving = "NULL";
    await updateInvestorIDForTree(itemId, updatedInvestorIDRemoving);
    console.log("logged in user invested trees", cart);
  };

  const handleCheckout = () => {
    console.log("cart Items", cart);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/stripe/create-checkout-session`, {
        cart,
        userId: id,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
          setCart([]);
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <article>

      <button className="continue_shopping_button" onClick={handleContinueShopping}>
        Continue Shopping
      </button>

      {cart.map((item) => (
        <div className="cart_box" key={item.treeID}>
          <div className="cart_img">
            <img src={item.imageUrl} alt="" />
            <p>{item.treeSpecies}</p>
          </div>

          <div>
            <span>Rs.900.00</span>
            <button className="remove_button" onClick={() => handleRemoveFromCart(item.treeID)}>Remove</button>
          </div>
        </div>
      ))}

      <div className="total-checkout-container">
        <div className="total">
          <span>Total Price of your Cart</span>
          <span>Rs. {constantPrice * cart.length}.00</span>
        </div>
        <button className="check_now_button" onClick={handleCheckout}>Check Now</button>
      </div>
    </article>


  );


}

export default Cart;

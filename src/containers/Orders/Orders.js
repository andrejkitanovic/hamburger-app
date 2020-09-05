import React, { useState, useEffect } from "react";

import Order from "../../components/Order/Order";

import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/orders.json")
      .then((response) => {
        const fetchOrders = [];
        for (let key in response.data) {
          fetchOrders.push({
            ...response.data[key],
            id: key,
          });
        }
        setLoading(true);
        setOrders(fetchOrders);
        // console.log(fetchOrders)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  },[]);

  if(loading){
    return null
  }

  return (
    <div>
      {orders.map(order => (
      <Order 
      key={order.id}
      ingredients={order.ingredients}
      price={order.totalPrice}
      />
      ))}
    </div>
  );
};

export default withErrorHandler(Orders, axios);

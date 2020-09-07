import React, {  useEffect } from "react";

import Order from "../../components/Order/Order";

import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import {connect} from 'react-redux'
import {fetchOrders} from '../../store/actions/index'

import Spinner from '../../components/UI/Spinner/Spinner'

const Orders = (props) => {

  useEffect(() => {
    const method = props.fetchOrders

    method(props.token,props.userId)

    // props.fetchOrders(props.token,props.userId)
  },[ props.fetchOrders,props.token,props.userId]);

  if(props.loading){
    return <Spinner />
  }

  return (
    <div>
      {props.orders.map(order => (
      <Order 
      key={order.id}
      ingredients={order.ingredients}
      price={order.totalPrice}
      />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading:state.order.loading,
    orders:state.order.orders,
    token:state.auth.token,
    userId:state.auth.userId
  }
}

const mapDispatchToProps = {fetchOrders}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));

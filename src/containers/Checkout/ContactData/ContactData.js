import React, { useState } from "react";
import classes from "./ContactData.module.scss";

import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";

const ContactData = (props) => {
  const [information, setInformation] = useState({
    name: "",
    email: "",
    adress: {
      street: "",
      postalCode: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const orderHandler = (e) => {
    e.preventDefault();
    console.log(props.ingredients);

    setLoading(true);

    const order = {
      ingredients: props.ingredients,
      totalPrice: props.price,
      customer: {
        name: "Andrej Kitanovic",
        address: {
          street: "Ulica 12",
          zipCode: "18000",
          country: "Serbia",
        },
        email: "kitanovicandrej213@gmail.com",
      },
      deilveryMethod: "fastest",
    };

    axios
      .post("/orders.json", order)
      .then((response) => {
          setLoading(false)
            props.history.push('/orders')
        })
      .catch((error) => setLoading(false));
  };

  let form = (
    <form>
      <input type="text" name="name" placeholder="Your name" />
      <input type="email" name="email" placeholder="Your email" />
      <input type="text" name="street" placeholder="Street" />
      <input type="text" name="postal" placeholder="Postal Code" />
      <Button btnType="Success" clicked={orderHandler}>
        ORDER
      </Button>
    </form>
  );

  if(loading){
      form = <Spinner />
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter yor Contact Data</h4>
      {form}
    </div>
  );
};

export default ContactData;

import React, { useState } from "react";
import classes from "./ContactData.module.scss";

import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import axios from "../../../axios-orders";

import {connect} from 'react-redux'
const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    // customer: {
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true
      },
      valid:false,
      touched:false
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        required: true
      },
      valid:false,
      touched:false
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code",
      },
      value: "",
      validation: {
        required: true,
        minLength:5,
        maxLength:5
      },
      valid:false,
      touched:false
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        required: true
      },
      valid:false,
      touched:false
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-Mail",
      },
      value: "",
      validation: {
        required: true
      },
      valid:false,
      touched:false
    },
    deilveryMethod: {
      elementType: "select",
      elementConfig: {
        option: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      validation:{},
      valid:true
    }
  });
  const [formIsValid,setFormIsValid] = useState(false)
  const [loading, setLoading] = useState(false);

  const orderHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {};
    for (let formElement in orderForm){
      formData[formElement] = orderForm[formElement].value
    }

    const order = {
      ingredients: props.ings,
      totalPrice: props.price,
      orderData: formData,
    };

    axios
      .post("/orders.json", order)
      .then((response) => {
        setLoading(false);
        props.history.push("/orders");
      })
      .catch((error) => setLoading(false));
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    // console.log(orderForm[key]);
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  const checkValidity = (value,rules) => {
    let isValid = true;


      if(rules.required){
        isValid = value.trim() !== '' && isValid;
      }
  
      if(rules.minLength) {
        isValid = value.length >= rules.minLength  && isValid;
      }
  
      if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
      }
  

    return isValid
  }

  const inputChangedHandler = (e, inputIndentifer) => {
    const updatedOrderForm = { ...orderForm };
    const updatedFormElement = {...updatedOrderForm[inputIndentifer]}
    updatedFormElement.value = e.target.value
    updatedFormElement.valid = checkValidity(updatedFormElement.value,updatedFormElement.validation)
    updatedFormElement.touched = true;
    console.log(updatedFormElement)
    updatedOrderForm[inputIndentifer] = updatedFormElement
    setOrderForm({...updatedOrderForm}) 

    let formIsValid = true;
    for(let inputIdentifier in updatedOrderForm) {
      // if(updatedOrderForm[inputIdentifier].valid !== undefined){
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
      // }
     
    }
    setFormIsValid(formIsValid)
  };

  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={(event) => inputChangedHandler(event, formElement.id)}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
        />
      ))}
      <Button btnType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );

  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter yor Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ings:state.ingredients,
    price:state.totalPrice
  }
}

export default connect(mapStateToProps,null)(ContactData);

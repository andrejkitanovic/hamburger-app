import React, { useState, useEffect } from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import { connect } from "react-redux";
import {Redirect} from 'react-router-dom'
import classes from "./Auth.module.scss";

import { auth , setAuthRedirectPath } from "../../store/actions/index";

const Auth = (props) => {
  const [orderForm, setOrderForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Mail Adress",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [isSignUp, setSignUp] = useState(false);

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  useEffect(() => {
    if(!props.buildingBurger && props.authRedirectPath !== "/"){
      props.setAuthRedirectPath("/")
    }
  })

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /\S+@\S+\.\S+/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  const inputChangedHandler = (e, inputIndentifer) => {
    const updatedOrderForm = { ...orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIndentifer] };
    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIndentifer] = updatedFormElement;
    setOrderForm({ ...updatedOrderForm });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    setFormIsValid(formIsValid);
  };

  const form = formElementsArray.map((formElement) => {
    return (
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
    );
  });

  const submitHandler = (e) => {
    e.preventDefault();
    props.auth(orderForm.email.value, orderForm.password.value, isSignUp);
  };

  const switchAuthModeHandler = () => {
    setSignUp((p) => !p);
  };

  if(props.isAuthenticated){
    return <Redirect to={props.redirectPath}/>
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  let formDisplay = (
    <React.Fragment>
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success" disabled={!formIsValid}>
          SUBMIT
        </Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType="Danger">
        SWITCH TO {isSignUp ? "SIGN UP" : "SIGN IN"}
      </Button>
    </React.Fragment>
  );

  if (props.loading) {
    formDisplay = <Spinner />;
  }

  return <div className={classes.Auth}>{formDisplay}</div>;
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger:state.burgerBuilder.building,
    redirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = { auth , setAuthRedirectPath};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

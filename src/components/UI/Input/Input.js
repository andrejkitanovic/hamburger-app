import React from "react";
import classes from "./Input.module.scss";

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  let valdiationError = null;

  if(props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid)
    valdiationError = <p className={classes.ValidationError}>Please enter a valid {props.elementConfig.type}!</p>
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
      case 'select':
        inputElement =(
          <select className={inputClasses.join(' ')} value={props.value}    onChange={props.changed}>
            {props.elementConfig.option.map(option => <option key={option.value} value={option.value}>{option.displayValue}</option>)}
          </select>
        )
        break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label>{props.label}</label>
      {inputElement}
      {valdiationError}
    </div>
  );
};

export default input;

import React from "react";
import classes from "./Order.module.scss";

const order = (props) => {
  const ingredients = [];

  for (let IngredientName in props.ingredients) {
    ingredients.push({
      name: IngredientName,
      amount: props.ingredients[IngredientName],
    });
  }

  const ingredientOutput = ingredients.map((ig) => (
    <span key={ig.name}>
      {ig.name}({ig.amount})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;

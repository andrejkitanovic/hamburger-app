import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
// import { purchaseInit } from "../../store/actions/index";
import { connect } from "react-redux";

class Checkout extends Component {
  // componentDidMount () {
  //   this.props.purchaseInit()
  // }

  checkoutCancelled = () => {
    this.props.history.goBack();
  };

  checkoutContinue = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const purchasedRedirect = this.props.pruchased ? <Redirect to="/" /> : null
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelled}
            checkoutContinue={this.checkoutContinue}
          />{" "}
          <Route
            path={this.props.match.path + "/contact-data"}
            render={(props) => (
              <ContactData
                ingredients={this.props.ings}
                price={this.props.totalPrice}
                {...props}
              />
            )}
          />
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    // price: state.burgerBuilder.totalPrice,
    pruchased:state.order.purchased
  };
};

// const mapDispatchToProps = { purchaseInit };

export default connect(mapStateToProps)(Checkout);

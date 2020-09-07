import React from "react";
import classes from "./SideDrawer.module.css";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliry/Auxiliry";

import {connect} from 'react-redux'
const sideDrawer = (props) => {
  const attachedClasses = [classes.SideDrawer, classes.Close];

  if(props.open){
      attachedClasses[1] = classes.Open
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth}/>
        </nav>
      </div>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    isAuth:state.auth.token !== null
  }
}

export default connect(mapStateToProps)(sideDrawer);

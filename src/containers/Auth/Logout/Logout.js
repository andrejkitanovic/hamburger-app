import React, { useEffect } from 'react'
import {auth,logout} from '../../../store/actions/index'
import {Redirect} from 'react-router-dom'

import {connect} from 'react-redux'

const Logout = (props) => {

    useEffect(() => {
        props.logout();
    })
    
    return <Redirect to="/" exact/>
}

const mapDispatchToProps = {auth,logout}

export default connect(null,mapDispatchToProps)(Logout);
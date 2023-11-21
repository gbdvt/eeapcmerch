import React from "react";
import {
    Route,
} from "react-router-dom";

import Login from '../../User/Auth/Login/Login'
import SignUp from '../../User/Auth/SignUp/SignUp'

const App = () => {
    return (
        <>
            <Route path='/auth/login'>
                <Login />
            </Route>

            <Route path='/auth/signup'>
                <SignUp />
            </Route>
            
        </>
    )
}

export default App
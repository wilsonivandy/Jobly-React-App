import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import UserContext from './auth/UserContext';

function Homepage() {
    const { user } = useContext(UserContext);

    return (
        <div>
            <h1>Test</h1>
        </div>
    )
}

export default Homepage;
import React from 'react';
import {useLocation} from 'react-router-dom';

function Query() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const name = queryParams.get('name');
    const age = queryParams.get('age');

    return (
        <>
            <h3>이름 : {name}</h3>
            <h3>나이 : {age}</h3>
        </>
    );
}

export default Query;
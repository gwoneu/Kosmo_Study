import React from 'react';
import { Outlet } from 'react-router-dom';

function Video() {
    
    return (
        <div>
            <h1>Video</h1>
            <Outlet/>
        </div>
    );
}

export default Video;
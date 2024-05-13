import React from 'react';
import { Outlet } from 'react-router-dom';

function Chat() {
    return (
        <div>
            <h1>Chat</h1>
            <Outlet/>
        </div>
    );
}

export default Chat;
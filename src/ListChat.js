/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

export default function ListChat(props) {
    return (
        <dl className="chatMessage">
            {props.message}
        </dl>
    );
}

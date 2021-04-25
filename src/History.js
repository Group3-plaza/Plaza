import React from 'react';
import changes from './graphics/changes.gif';
import './History.css';

export default function History() {
    return (
        <div className="history">
            <dl>Welcome to Histroy page!</dl>
            <dl>Here you will be able to see the changes made to the canvas in gif</dl>
            <div className="gif">
                <img className="changes" src={changes} alt="changes" />
            </div>
        </div>
    );
}

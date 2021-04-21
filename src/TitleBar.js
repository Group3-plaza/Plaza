/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

// Title bar allowing navigation to different pages and login/signup
import { React } from 'react';
import { useHistory } from 'react-router-dom';
import './TitleBar.css';
import plazaLogo from './graphics/Plaza.png';

// eslint-disable-next-line import/prefer-default-export
export function TitleBar() {
    const history = useHistory();

    function LogoClick() {
        history.push('/signup');
    }

    return (
        // TODO: Implement titlebar
        <div className="TitleBar">
            <img src={plazaLogo} alt="Plaza" onClick={LogoClick} />
        </div>
    );
}

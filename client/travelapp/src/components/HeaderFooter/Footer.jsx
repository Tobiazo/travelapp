import React from 'react';
import './HeaderFooter.css';

function Footer(){
    return (
        <div id= "footer">
            <div class="wrap">
            <p> © NTNU {new Date().getFullYear()} studenter TDT4140</p>
            </div>
        </div>
    )
}
export default Footer;

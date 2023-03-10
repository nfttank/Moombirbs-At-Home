import React from 'react';
import tank from '../../assets/4227.png';
import the_bet from '../../assets/the_bet.png';
import './footer.css';

const Footer = (props) => (
    <div className="og__footer section__padding">
        <div className="og__footer-copyright">
            <a href="https://twitter.com/nfttank/status/1516757063308877824?s=20&t=NhQ8KdEZsn2yR1dBCRaA5w" target="_blank" rel="noopener noreferrer">
                <img alt="Tanks bet to build a Moonbird collection with 1/150 of the original Moonbird mint." className="og__footer-tweet" src={the_bet} />
            </a>
            <p>Moonbirds At Home are CC0 and with that in public domain.
                <br />Feel free to use your tokens in any way you want.
                <br /><br /><b>Not affiliated with <a href="https://www.proof.xyz">Proof</a> or the <a href="https://www.proof.xyz/moonbirds">Moonbirds</a> trademark.</b></p>
            <a href={props.data.tankTwitterUrl} target="_blank" rel="noopener noreferrer">
                <img alt="profile of Tank showing CryptoPunk #4227" className="og__footer-avatar" src={tank} />
            </a>
            <p>Made by Tank &#10084;</p>
        </div>
    </div>
);

export default Footer;




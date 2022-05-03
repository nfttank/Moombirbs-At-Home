import React from 'react';
import './header.css';
import Banner from '../../assets/banner.png';
import Only1 from '../../assets/1.png';

const Header = (props) => (

    <div className="og__header section__padding" id="home">
        <div className="og__header-content">
            <h2 className="gradient__text">Mom, can I have a Moonbird?</h2>
            <h2 className="gradient__text2">No honey, we have Moonbirds at home.</h2>
            <p />
            <h3>Moonbirds At Home:</h3>
            <img className="og__header-banner" src={Banner} />
            <img className="og__header-banner-only1" src={Only1} />
            <p />

            <div className="og__header-content__input">
                {true &&
                    <button onClick={props.data.mintFunction} type="button">
                        {
                            props.data.soldOut
                                ? "Sold out 🥳"
                                : (
                                    props.data.walletLoaded ?
                                        (
                                            props.data.remainingMintsForWallet === 0
                                                ? "Wallet limit of " + props.data.maxPerWallet + " reached."
                                                : "Mint " + props.data.mintCount.toString()
                                        )
                                        : "Mint"
                                )
                        }
                    </button>
                }
            </div>
            <p>
                <span className="gradient__text">You can still get your Moonbird At Home from <a href={props.data.openSeaUrl} target="_blank" rel="noopener noreferrer" title="OpenSea">OpenSea</a> or <a href={props.data.looksRareUrl} target="_blank" rel="noopener noreferrer" title="LooksRare">LooksRare</a> secondary.</span>
            </p>
        </div>

    </div >
);

export default Header;
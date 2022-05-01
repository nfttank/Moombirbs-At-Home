import React from 'react';
import { OgImg } from '../../components';
import './header.css';
import Banner from '../../assets/banner.png';

let getsDiscount = (data) => { return data.openMinting && data.mintInfo != null && data.mintInfo.canMint && data.mintInfo.totalMints > data.mintInfo.mintsToPay }

const Header = (props) => (

    <div className="og__header section__padding" id="home">
        <div className="og__header-content">
            <h2 className="gradient__text">"Mom, can I have a Moonbird?"</h2>
            <h2 className="gradient__text2">"No honey, we have Moonbirds at home."</h2>
            <p />
            <h3>Moonbirds At Home:</h3>
            <div className="og__header-image">
                <img src={Banner} />
            </div>
            {getsDiscount(props.data) &&
                <div>
                    <p>Awesome, you hold OG tokens! Thank you so much of being part of our nice little community.<br />You qualify for {props.data.mintInfo.totalMints - props.data.mintInfo.mintsToPay} free mints.<br />Just mint the amout of birds you'd love to have. We'll take care of your discount automatically.</p>
                </div>
            }
            {props.data.mintInfo != null && !getsDiscount(props.data) &&
                <div>
                    <p>Sorry but you can't get a discount because you either don't own any <a href="https://opensea.io/collection/og-nft-official" target="_blank" rel="noopener noreferrer" title="OG Official">OG tokens</a> or already claimed your free mints :(</p>
                </div>
            }
            {
                !props.data.openMinting && <h2><span className="gradient__text">{props.data.mintDateInfo}</span></h2>
            }
            <div className="og__header-content__input">
                {props.data.openMinting && !props.data.soldOut && props.data.walletLoaded && props.data.remainingMintsForWallet !== 0 && <button className="plusminus" onClick={() => props.data.mintCountAdd(-1)} type="button">-</button>}
                {props.data.openMinting &&
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
                {props.data.openMinting && !props.data.soldOut && props.data.walletLoaded && props.data.remainingMintsForWallet !== 0 && <button className="plusminus" onClick={() => props.data.mintCountAdd(+1)} type="button">+</button>}
            </div>
            {props.data.openMinting &&
                <div>
                    <p className="smalltext">Mints are limited to {props.data.maxPerWallet} per wallet.
                        {
                            props.data.walletLoaded
                                ? <span className="gradient__text"><b> {(props.data.maxSupply - props.data.totalSupply).toString()} left.</b></span>
                                : ""
                        }
                    </p>
                </div>
            }
        </div>

    </div>
);

export default Header;
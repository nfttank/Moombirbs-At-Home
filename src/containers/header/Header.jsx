import React from 'react';
import './header.css';
import Banner from '../../assets/banner.png';
import Only1 from '../../assets/1.png';

let isContractReady = (data) => { return data.isSaleActive && data.mintInfo != null }
let canMint = (data) => { return isContractReady(data) && data.mintInfo.canMint }
let getsDiscount = (data) => { return isContractReady(data) && data.mintInfo.canMint && data.mintInfo.totalMints > data.mintInfo.mintsToPay }
let canMintAndAreTokensAvailable = (data) => { return isContractReady(data) && !data.soldOut && data.walletLoaded && data.remainingMintsForWallet !== 0 }
let freeMintText = (data) =>
{
    const freeMints = data.mintInfo.totalMints - data.mintInfo.mintsToPay
    return (freeMints == 1 ? "one free mint" : freeMints + " free mints")
}

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
            {!props.data.walletLoaded &&
                <div>
                    <p>Connect your wallet to mint.</p>
                </div>
            }
            {isContractReady(props.data) && !canMint(props.data) &&
                <div>
                    <p>Pre-sale is active but you can't mint without <a href="https://opensea.io/collection/og-nft-official" target="_blank" rel="noopener noreferrer" title="OG Official">OG tokens</a>.</p>
                </div>
            }
            {isContractReady(props.data) && canMint(props.data) && getsDiscount(props.data) &&
                <div>
                    <p>Awesome, you hold OG tokens! Thank you so much for being part of our amazing community.<br /><span className="gradient__text"><b>You qualify for {freeMintText(props.data)}</b></span> 🥳<br />Just mint the amount of birds you'd love to own in total. We'll take care of your discount automatically.</p>
                </div>
            }
            {
                !isContractReady(props.data) && <h2><span className="gradient__text">{props.data.mintDateInfo}</span></h2>
            }
            <div className="og__header-content__input">
                {canMintAndAreTokensAvailable(props.data) && <button className="plusminus" onClick={() => props.data.mintCountAdd(-1)} type="button">-</button>}
                {isContractReady(props.data) &&
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
                {canMintAndAreTokensAvailable(props.data) && <button className="plusminus" onClick={() => props.data.mintCountAdd(+1)} type="button">+</button>}
            </div>
            {isContractReady(props.data) && props.data.walletLoaded &&
                <div>
                {props.data.mintInfo.mintsToPay == 0 && canMintAndAreTokensAvailable(props.data) && <p className="smalltext">Free for you, but not enough 😉</p>}
                {props.data.mintInfo.mintsToPay == 1 && !getsDiscount(props.data) && <p className="smalltext">One bird makes 0.0169Ξ in total.</p>}
                {(props.data.mintInfo.mintsToPay > 1 || (props.data.mintInfo.mintsToPay == 1 && getsDiscount(props.data))) && <p className="smalltext">{props.data.mintInfo.mintsToPay}x 0.0169Ξ makes {(props.data.mintInfo.priceToPay / 1000000000000000000).toString()}Ξ in total.</p>}
                    <p className="smalltext">Mints are limited to {props.data.maxPerWallet} per wallet.<br />
                        <span className="gradient__text"><b> {(props.data.maxSupply - props.data.totalSupply).toString()} left.</b></span>
                    </p>
                </div>
            }
        </div>

    </div >
);

export default Header;
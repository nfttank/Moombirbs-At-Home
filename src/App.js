import React, { Component } from 'react'
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import './App.css'
import mahAbi from './abis/MoonbirdsAtHome.json'
import { Footer, Header } from './containers';
import { Navbar } from './components';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            network: { name: 'mainnet', id: 1 },
            //network: { name: 'rinkeby', id: 4 },
            mintCountAdd: null,
            mintCount: 15, // suggestion
            mintFunction: null,
            showStoreFronts: true, // general switch to hide
            connectFunction: null,
            remainingMintsForWallet: 0,
            connected: false,
            totalSupply: 0,
            maxSupply: 10000,
            soldOut: true,
            signerAddress: '',
            provider: null,
            signer: null,
            contract: null,
            balance: 0,
            maxPerWallet: 50,
            walletLoaded: false,
            mintInfo: null,
            isSaleActive: false,
            twitterUrl: 'https://twitter.com/moonbirdsathome',
            discordUrl: 'https://discord.gg/pnXynhdgGz',
            tankTwitterUrl: 'https://twitter.com/nfttank',
            contractUrl: '[will be set if connected]',
            openSeaUrl: 'https://opensea.io/collection/moonbirds-at-home',
            looksRareUrl: '[will be set if connected]',
            gemUrl: 'https://www.gem.xyz/collection/moonbirds-at-home/',
            genieUrl: '[will be set if connected]',
            mintDateInfo: 'Public sale open!'
        }
    }

    async componentWillMount() {

        if (!window.ethereum) {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask.')
            return
        }

        const networkId = this.state.network.id
        const networkName = this.state.network.name
        const contractAddress = mahAbi.networks[networkId].address

        this.setState({ mintCountAdd: (value) => this.mintCountAdd(this, value) })
        this.setState({ mintFunction: () => this.mint(this, this.state.mintCount) })
        this.setState({ connectFunction: () => this.connect(this.state.network) })

        this.setState({ looksRareUrl: "https://looksrare.org/collections/" + contractAddress })

        if (networkId === 1) {
            this.setState({ contractUrl: "https://etherscan.io/address/" + contractAddress })
            this.setState({ genieUrl: "https://www.genie.xyz/collection/" + contractAddress })
        }
        else {
            this.setState({ contractUrl: "https://" + networkName + ".etherscan.io/address/" + contractAddress })
            this.setState({ genieUrl: "https://www.genie.xyz/collection/" + contractAddress })
        }
    }

    async connect(network) {

        const providerOptions = {
            /* See Provider Options Section */
        };

        const web3Modal = new Web3Modal({
            network: this.state.network.name,
            cacheProvider: true,
            providerOptions
        });

        const instance = await web3Modal.connect();

        const provider = new ethers.providers.Web3Provider(instance);
        const signer = provider.getSigner();


        const contract = new ethers.Contract(mahAbi.networks[this.state.network.id].address, mahAbi.abi, provider);


        this.setState({ provider: provider })
        this.setState({ signer: signer })
        this.setState({ signerAddress: await this.state.signer.getAddress() })
        this.setState({ connected: this.state.signerAddress !== '' })
        this.setState({ contract: contract })

        console.log("Connect to " + mahAbi.networks[this.state.network.id].address + " as " + this.state.signerAddress)

        const isPreSale = await this.state.contract.isPreSale()
        const isPublicSale = await this.state.contract.isPublicSale()
        this.setState({ isSaleActive: isPreSale || isPublicSale })

        const remainingMints = await this.getRemainingMintsForWallet()
        this.setState({ remainingMintsForWallet: remainingMints })

        if (this.state.mintCount > remainingMints)
            this.setState({ mintCount: remainingMints })

        // load details

        const balance = await this.state.contract.balanceOf(this.state.signerAddress)
        this.setState({ balance: balance })

        let totalSupply = await this.state.contract.totalSupply()

        this.setState({ totalSupply: totalSupply })
        this.setState({ soldOut: totalSupply >= this.state.maxSupply })

        this.setState({ walletLoaded: true })

        // load the mint info for the default mint count once
        const mintInfo = await this.state.contract.getMintInfo(this.state.signerAddress, this.state.mintCount)
        console.log(mintInfo)
        this.setState({ mintInfo: mintInfo })
    }

    getRemainingMintsForWallet = async () => {

        const balance = await this.state.contract.balanceOf(this.state.signerAddress)

        let count = this.state.maxPerWallet - balance;

        if (count < 0)
            return 0
        else if (count > this.state.maxPerWallet)
            return this.state.maxPerWallet

        const totalSupply = await this.state.contract.totalSupply()
        const available = 10000 - totalSupply
        if (count > available)
            return available

        return count
    }

    async mint(app, count) {

        console.log(count)

        if (app.state.contract == null)
            await app.connect(app.state.network);

        if (app.state.contract == null || app.state.remainingMintsForWallet <= 0)
            return;


        const totalSupply = await app.state.contract.totalSupply()

        if (totalSupply >= app.state.maxSupply) {
            window.alert("Sorry, already minted out :(")
            return
        }

        const canMint = count > 0 && count <= app.state.maxPerWallet && !app.state.soldOut

        if (canMint) {

            try {
                const mintInfo = await app.state.contract.getMintInfo(app.state.signerAddress, count)
                console.log(mintInfo)

                const options = { value: mintInfo.priceToPay }

                const stateChangingSigner = app.state.contract.connect(app.state.signer);
                await stateChangingSigner.mint(count, options)
            } catch (e) {
                console.log(e.message)
                window.alert(e.message)
            }
        }
    }

    async mintCountAdd(app, value) {

        if (value < 0 && this.state.mintCount > 15)
            value *= 5;
        else if (value > 0 && this.state.mintCount >= 10)
            value *= 5;

        const newCount = this.state.mintCount + value
        const guardedCount = Math.max(Math.min(1, this.state.remainingMintsForWallet), (Math.min(newCount, this.state.remainingMintsForWallet)))
        this.setState({ mintCount: guardedCount })

        if (app.state.contract == null || app.state.remainingMintsForWallet <= 0)
            return;

        const mintInfo = await app.state.contract.getMintInfo(app.state.signerAddress, guardedCount)
        this.setState({ mintInfo: mintInfo })
    }

    render() {
        return (
            <div className="App">
                <div className="gradient__bg">
                    <Navbar data={this.state} />
                    <Header data={this.state} />
                </div>
                <Footer data={this.state} />
            </div>
        );
    }
}

export default App;
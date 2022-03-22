import { useEffect, useState } from 'react';
import './App.css';
import CarouselComponent from './components/CarouselComponent';
import NavbarComponent from './components/navbar';
import Footer from './components/Footer';
import { ethers } from 'ethers';


import CONFIG from './config.json';
import MFERAbi from './abi/abi.json';
const contractAddress = "0xBB4B44266A7900c3E17Bb2B0f40805936e1f13E6";




function App() {
  const [web3, setWeb3] = useState(null)
  const [mfer, setMfer] = useState({})

  const [supplyAvailable, setSupplyAvailable] = useState(0)
  const [balanceOf, setBalanceOf] = useState(0)

  const [account, setAccount] = useState(null)
  const [currentNetwork, setCurrentNetwork] = useState(null)

  const [blockchainExplorerURL, setBlockchainExplorerURL] = useState('https://etherscan.io/')
  const [openseaURL, setOpenseaURL] = useState('https://opensea.io/')

  const [isMinting, setIsMinting] = useState(false)
  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState(null)

  const [currentTime, setCurrentTime] = useState(new Date().getTime())
  const [nftPrice, setNftPrice] = useState(0)

  const loadBlockchainData = async () => {
    // Fetch Contract, Data, etc.
    if (web3) {
      const networkId = await web3.getNetwork()
      setCurrentNetwork(networkId.chainId)

      try {
        const mferContract = new ethers.Contract(contractAddress, MFERAbi, web3)
        
        console.log(mfer)

        const maxSupply = await mferContract._maxSupply()
        const totalSupply = await mferContract.totalSupply()
        setSupplyAvailable(maxSupply - totalSupply)

        const balanceOf = await mferContract.balanceOf(account)

        setBalanceOf(balanceOf)
        setMfer(mferContract)

        // const allowMintingAfter = await mferContract.allowMintingAfter()
        // const timeDeployed = await openEmoji.methods.timeDeployed().call()
        // setRevealTime((Number(timeDeployed) + Number(allowMintingAfter)).toString() + '000')

        if (networkId.chainId !== 5777) {
          setBlockchainExplorerURL(CONFIG.NETWORKS[networkId.chainId].blockchainExplorerURL)
          setOpenseaURL(CONFIG.NETWORKS[networkId.chainId].openseaURL)
        }

      } catch (error) {
        setIsError(true)
        setMessage("Contract not deployed to current network, please change network in MetaMask")
      }

    }
  }

  const loadWeb3 = async () => {
    if (typeof window.ethereum !== 'undefined' && !account) {
      const web3 = new ethers.providers.Web3Provider(window.ethereum)
      setWeb3(web3)
      await web3.send("eth_requestAccounts", []);
      const accounts = await web3.listAccounts();

      if (accounts.length > 0) {
        setAccount(accounts[0])
      } else {
        setMessage('Please connect with MetaMask')
      }

      window.ethereum.on('accountsChanged', function (accounts) {
        setAccount(accounts[0])
        setMessage(null)
      });

      window.ethereum.on('chainChanged', (chainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        window.location.reload();
      });
    }
  }

  // MetaMask Login/Connect
  const web3Handler = async () => {
    if (web3) {
      await web3.send("eth_requestAccounts", []);
      const accounts = await web3.listAccounts();
      setAccount(accounts[0])
    }
  }

  const mintNFTHandler = async () => {
    // if (revealTime > new Date().getTime()) {
    //   window.alert('Minting is not live yet!')
    //   return
    // }

    if (balanceOf > 50) {
      window.alert('You\'ve already minted 50 collections!')
      return
    }
    // Mint NFT
    if (mfer) {
      setIsMinting(true)
      setIsError(false)

      const price = await mfer.getNFTPrice()
      setNftPrice(price)
      console.log(ethers.utils.formatEther(price))

      const signer = web3.getSigner()

      const contractWithSigner = mfer.connect(signer)

      const tx = await contractWithSigner.mint(1, { value: price })
      await tx.wait()
      const maxSupply = await mfer._maxSupply()
      const totalSupply = await mfer.totalSupply()
      setSupplyAvailable(maxSupply - totalSupply)
      const balanceOf = await mfer.balanceOf(account)
      setBalanceOf(balanceOf)

      // .on('confirmation', async () => {
      //   const maxSupply = await openEmoji.methods.maxSupply().call()
      //   const totalSupply = await openEmoji.methods.totalSupply().call()
      //   setSupplyAvailable(maxSupply - totalSupply)

      //   const balanceOf = await openEmoji.methods.balanceOf(account).call()
      //   setBalanceOf(balanceOf)
      // })
      // .on('error', (error) => {
      //   window.alert(error)
      //   setIsError(true)
      // })
    }
    setIsMinting(false)
  };

  useEffect(() => {
    loadWeb3()
    loadBlockchainData()

    console.log(mfer)
    console.log(message)
    console.log(currentNetwork)
    console.log(supplyAvailable)
    console.log(balanceOf)
  }, [account]);

  return (
    <div className="App">
      <NavbarComponent account={account} web3Handler={web3Handler} />
      <div className='relative'>
        <div className="before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('./img/collage.jpg')] before:bg-cover before:bg-center before:opacity-30 before:blur">
          < CarouselComponent mintNFTHandler={mintNFTHandler} openseaURL={openseaURL} account={account} blockchainExplorerURL={blockchainExplorerURL} />
          <div className='text-white z-10 font-custom text-xl'>
            {message ? (
              <div className='w-full text-center p-3 mb-4'><p>{message}</p></div>
            ) : (
              <div className='w-full text-center p-3 mb-4'>
                {mfer &&
                  (<a href={`${blockchainExplorerURL}address/${mfer.address}`}
                    target="_blank"
                    rel="noreferrer"
                    className="contract-link d-block my-3">
                    {mfer.address}
                  </a>)
                }

                {CONFIG.NETWORKS[currentNetwork] && (
                  <p>Current Network: {CONFIG.NETWORKS[currentNetwork].name}</p>
                )}

                <p>{`NFT's Left: ${supplyAvailable}, You've minted: ${balanceOf}`}</p>
              </div>

            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;

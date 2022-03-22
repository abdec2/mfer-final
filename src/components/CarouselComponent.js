import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import Logo from './../img/logo.jpg';
import img1 from './../img/138.png';
import img2 from './../img/1721.png';
import img3 from './../img/1862.png';
import img4 from './../img/1929.png';
import img5 from './../img/2004.png';
import img6 from './../img/2152.png';

const CarouselComponent = ({ mintNFTHandler, openseaURL, account, blockchainExplorerURL }) => {
  return (
    <>
      <div className="flex items-center justify-center flex-col md:flex-row py-20">
        <div className="w-full lg:w-1/2 p-4">
          <div className="relative text-white text-4xl lg:text-[60px] lg:leading-[20px] text-center md:text-left font-custom">
            MFER Friends
          </div>
          <div className="text-white container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem] text-center md:text-left font-custom">
            Welcome to the club.
          </div>
          <div className="flex mb-5 truncate flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
            <button className="relative text-xl  px-6 py-3 bg-[#2181e2] text-white hover:bg-[#42a0ff] cursor-pointer font-custom" onClick={mintNFTHandler}>
              MINT
            </button>
            <a href={openseaURL + account} target="_blank" className="font-custom text-xl py-3 px-6 bg-[#2181e2] hover:bg-[#42a0ff] text-white text-center  z-20">View My Opensea</a>
            <a href={`${blockchainExplorerURL}address/${account}`} target="_blank" className="font-custom text-xl py-3 px-6 bg-white hover:bg-slate-300 text-black text-center z-20">My Etherscan</a>
          </div>
        </div>
        <div className="w-[400px] rounded-[6rem]">
          <div className="p-6">
            <Carousel
              autoPlay
              infiniteLoop
              showStatus={false}
              showIndicators={false}
              showThumbs={false}
              showArrows={false}
            >
              <div>
                <img
                  className="rounded-t-lg"
                  src={Logo}
                  alt=""
                />
              </div>
              <div>
                <img
                  className="rounded-t-lg"
                  src={img1}
                  alt=""
                />
              </div>
              <div>
                <img
                  className="rounded-t-lg "
                  src={img2}
                  alt=""
                />
              </div>
              <div>
                <img
                  className="rounded-t-lg "
                  src={img3}
                  alt=""
                />
              </div>
              <div>
                <img
                  className="rounded-t-lg "
                  src={img4}
                  alt=""
                />
              </div>
              <div>
                <img
                  className="rounded-t-lg "
                  src={img5}
                  alt=""
                />
              </div>
              <div>
                <img
                  className="rounded-t-lg "
                  src={img6}
                  alt=""
                />
              </div>
            </Carousel>
          </div>

        </div>
      </div>

    </>
  );
};

export default CarouselComponent;

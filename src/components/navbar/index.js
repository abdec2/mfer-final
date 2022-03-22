import { Logo } from "./Icons"
import { useState } from "react";

const NavbarComponent = ({ account, web3Handler }) => {
    return (
        <>
            <div className="p-4  w-full bg-black ">
                <div className="flex items-center justify-between font-custom">
                    <Logo />
                    <div className="text-white bg-[#2181e2] hover:bg-[#42a0ff] rounded-lg text-xl  px-4 py-2">
                        {account ? (
                            <a
                                href={`https://etherscan.io/address/${account}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                {account.slice(0, 5) + '...' + account.slice(38, 42)}
                            </a>
                        ) : (
                            <button onClick={web3Handler}>Connect Wallet</button>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}

export default NavbarComponent
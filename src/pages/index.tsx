import {Web3Button} from "@web3modal/react";
import {useAccount} from "wagmi";
import Image from "next/image";
import {useState, useEffect} from "react";
import {Web3NetworkSwitch} from "@web3modal/react";

import {Account} from "../components";
import DepositModule from "../components/DepositModule";
import RewardsModule from "../components/RewardsModule";

function Page() {
    const {isConnected} = useAccount();
    // const [depositComp, setDepositcomp] = useState(true);

    useEffect(() => {
        // setTimeout(() => {
        //     console.log("Hello, World!");
        // }, 3000);
    }, []);

    const Header = () => {
        return (
            <div className="flex justify-between pt-4 h-14">
                <Image src="/GDXLogo.png" width="150" height="50" alt={""} />
                <div className="flex">
                    <div className="mr-4">
                        <Web3NetworkSwitch />
                    </div>
                    <Web3Button />
                </div>
            </div>
        );
    };

    return (
        <div className="flex-auto px-8 min-h-screen bg-[#1C1E30]">
            {Header()}
            <div className="flex justify-center items-center min-h-[700px] flex-col   ">
                <DepositModule />
                <RewardsModule />
            </div>

            {/* {isConnected && <Account />} */}
        </div>
    );
}

export default Page;

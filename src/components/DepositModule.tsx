import {ethers} from "ethers";
import Image from "next/image";
import {useState, useEffect} from "react";

import {useAccount, useBalance} from "wagmi";
import {
    useContractWrite,
    usePrepareContractWrite,
    useBlockNumber,
    usePrepareSendTransaction,
    useSendTransaction,
} from "wagmi";
import PlaceOrderABI from "../abis/PlaceOrderABI.json";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const tabs = [
    {name: "Deposit", href: "#", current: false},
    // {name: "Withdraw", href: "#", current: false},
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const someRendering = (
    <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
            Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            // defaultValue={tabs.find((tab) => tab.current).name}
        >
            {tabs.map((tab) => (
                <option className="w-1/2" key={tab.name}>
                    {tab.name}
                </option>
            ))}
        </select>
    </div>
);

export default function DespositModule() {
    const [depositComp, setDepositcomp] = useState(true);
    const {address} = useAccount();
    const {data: currentBlock} = useBlockNumber();
    console.log("currentBlock", currentBlock);
    const {config, error: prepError} = usePrepareSendTransaction({
        request: {
            to: "0x000000000000000000000000000000000000dead",
            value: 10000,
        },
    });
    console.log("prepError", prepError);
    const {sendTransaction} = useSendTransaction(config);

    // const {config} = usePrepareContractWrite({
    //     address: "0x36e56cc52d7a0af506d1656765510cd930ff1595",
    //     abi: PlaceOrderABI,
    //     functionName: "placeMakerOrder",
    //     args: [
    //         currentBlock,
    //         address,
    //         "0x7a250d5630b4cf539739df2c5dacb4c659f2488d", // WETH
    //         "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC
    //         5,
    //         true,
    //         0,
    //         10000000000000000,
    //     ],
    // });

    // const {data: makeOrderPlace, isSuccess, write} = useContractWrite(config);

    useEffect(() => {}, [depositComp]);

    const {data} = useBalance({
        address: address,
    });

    return (
        <div className=" w-4/12 bg-[#242741] rounded-lg	">
            {someRendering}

            {/* // Nav Component / useState for Deposit and Withdraw */}
            <div className="hidden sm:block">
                <div className="">
                    <nav
                        className="-mb-px flex space-x-8 bg-[#111320] px-2 rounded-t-lg                        "
                        aria-label="Tabs"
                        // onClick={() => setDepositcomp(!depositComp)}
                    >
                        {tabs.map((tab) => (
                            <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                    !depositComp
                                        ? "border-transparent text-[#9A9CB1] w-full text-center hover:text-gray-700"
                                        : "border-transparent text-[#9A9CB1] w-full text-center hover:text-gray-700",
                                    "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                                )}
                                aria-current={tab.current ? "page" : undefined}
                            >
                                {tab.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>

            {/* // Main Other Components */}
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    padding: 16,
                }}
            >
                <div className="flex justify-between w-full my-2">
                    <p className="text-[#9A9CB1]"> Select Token</p>
                    {/* <p className="text-[#9A9CB1]">Available: XXX</p> */}
                </div>

                <div className="flex flex-stretch w-full">
                    <div className="h-12 w-1/6 rounded-lg bg-[#111320] flex justify-center items-center">
                        <Image src="/EthLogo.png" width="30" height="30" alt={""} />
                    </div>
                    <div className="h-12 ml-4 w-5/6 py-2  rounded-lg flex justify-between items-center bg-[#111320]	">
                        <input
                            className="text-lg pl-4 w-5/6 text-[#9A9CB1] bg-[#111320] outline-none "
                            type={"number"}
                        ></input>
                        {/* <p className="text-white">{readMakerContract ? readMakerContract : "null"}</p> */}
                        <p className="text-[#9A9CB1]">{data?.formatted?.substring(0, 4)}</p>
                        <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            MAX
                        </button>
                    </div>
                </div>

                <div className="mt-4 flex flex-stretch w-full">
                    <div className="h-12 w-1/6 rounded-lg bg-[#111320] flex justify-center items-center">
                        <Image src="/GDXToken.png" width="30" height="30" alt={""} />
                    </div>
                    <div className="h-12 ml-4 w-5/6 py-2  rounded-lg flex justify-between items-center bg-[#111320]	">
                        <input
                            className="text-lg pl-4 w-5/6 text-[#9A9CB1] bg-[#111320] outline-none "
                            type={"number"}
                        ></input>
                        <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            MAX
                        </button>
                    </div>
                </div>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        sendTransaction?.();
                    }}
                    className="mt-4 bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 mpx-4 rounded-lg"
                >
                    {depositComp ? "Deposit" : "Withdraw"}
                </button>
            </div>
        </div>
    );
}

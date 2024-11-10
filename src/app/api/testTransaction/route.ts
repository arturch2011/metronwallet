import { ethers } from "ethers";
import ERC20 from "@/utils/ERC20.json";
import { createSmartAccountClient, PaymasterMode } from "@biconomy/account";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const url = process.env.RPC_URL as string;
        const idWallet = 0;
        const data = await req.json();

        const { to, amount, privateKey } = data;
        console.log("Private Key", privateKey);

        const provider = new ethers.JsonRpcProvider(url);
        const signer = new ethers.Wallet(privateKey, provider);

        const biconomySmartAccountConfig = {
            signer: signer,
            bundlerUrl: process.env.BUNDLER_URL as string,
            biconomyPaymasterApiKey: process.env.PAYMASTER_API_KEY,
        };

        const smartAccount = await createSmartAccountClient(
            biconomySmartAccountConfig
        );

        const smartWallet = await smartAccount.getAccountAddress({
            index: idWallet,
        });

        console.log("Smartwallet addresss", smartWallet);

        const addr = await smartAccount.getAddress();

        console.log("Address", addr);
        // console.log("index", smartAccount.index);
        console.log("WalletId ", idWallet);
        console.log("Smartwallet addresss", smartWallet);
        const amountWei: bigint = ethers.parseUnits(amount.toString(), 18);

        const contract = new ethers.Contract(
            `${process.env.NEXT_PUBLIC_CONTRACTERC20}`,
            ERC20,
            signer
        );

        const transferFunction = contract.getFunction("transfer");

        const mintTx = await transferFunction.populateTransaction(
            to,
            amountWei.toString()
        );

        const tx = {
            to: `${process.env.NEXT_PUBLIC_CONTRACTERC20}`,
            data: mintTx.data!,
        };

        const userOpResponse = await smartAccount.sendTransaction(tx, {
            paymasterServiceData: { mode: PaymasterMode.SPONSORED },
        });

        const { transactionHash } = await userOpResponse.waitForTxHash();
        console.log("Transaction Hash", transactionHash);

        const userOpReceipt = await userOpResponse.wait();

        if (userOpReceipt.success == "true") {
            console.log("Transaction receipt", userOpReceipt.receipt);
            return new NextResponse(
                JSON.stringify({ message: "success on transaction " }),
                { status: 200 }
            );
        } else {
            console.log("Transaction receipt", userOpReceipt.receipt);
            return new NextResponse(
                JSON.stringify({ message: "failed on transaction " }),
                { status: 400 }
            );
        }
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: JSON.stringify(error) }),
            {
                status: 500,
            }
        );
    }
};

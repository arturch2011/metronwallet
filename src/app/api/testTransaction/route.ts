import { ethers } from "ethers";
import ERC20 from "@/utils/ERC20.json";
import { createSmartAccountClient, PaymasterMode } from "@biconomy/account";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const url = process.env.RPC_URL as string;
        let idWallet = 0;
        const data = await req.json();

        let provider = new ethers.JsonRpcProvider(url);
        let signer = new ethers.Wallet(
            `${process.env.WALLET_PRIVATE_KEY}`,
            provider
        );

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

        var amount: any = ethers.parseUnits("100", 18);
        const contract = new ethers.Contract(
            `${process.env.NEXT_PUBLIC_CONTRACTERC20}`,
            ERC20,
            signer
        );

        console.log("Contract", contract);
        const transferFunction = contract.getFunction("transfer");

        const mintTx = await transferFunction.populateTransaction(
            "0xC4b9190C160253071375c4d3e4f2574E8Bb57FD5",
            amount.toString()
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

        console.log("userOpReceipt", userOpReceipt);

        if (userOpReceipt.success == "true") {
            console.log("Transaction receipt", userOpReceipt.receipt);
        }

        return new NextResponse(
            JSON.stringify({ message: "success on transaction " }),
            { status: 200 }
        );
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), {
            status: 500,
        });
    }
};

import { NextResponse, NextRequest } from "next/server";
import { createSmartAccountClient } from "@biconomy/account";
import { doc, getDoc } from "firebase/firestore";
import { ethers } from "ethers";
import { db } from "@/firebase/config";

export const POST = async (req: NextRequest) => {
    try {
        const url = process.env.RPC_URL as string;
        const data = await req.json();
        const { id } = data;

        const userBase = doc(db, "users", id);
        const userDoc = await getDoc(userBase);

        if (!userDoc.exists()) {
            return new NextResponse(
                JSON.stringify({ message: "user dont exists" }),
                { status: 400 }
            );
        }
        const userData = userDoc.data();
        const provider = new ethers.JsonRpcProvider(url);
        const signer = new ethers.Wallet(
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
            index: userData.idWallet,
        });

        return new NextResponse(
            JSON.stringify({
                message: "user data found",
                userWallet: smartWallet,
                idWallet: userData.idWallet,
            }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "internal error" }), {
            status: 500,
        });
    }
};

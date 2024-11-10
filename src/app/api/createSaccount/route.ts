import { NextResponse, NextRequest } from "next/server";
import { createSmartAccountClient } from "@biconomy/account";
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    getDoc,
} from "firebase/firestore";
import { ethers } from "ethers";
import { db } from "@/firebase/config";

export const POST = async (req: NextRequest) => {
    // console.log("POSST HEREEEEEEEEEEEEEE");
    try {
        const url = process.env.RPC_URL as string;

        const wallet = ethers.Wallet.createRandom();
        const privateKey = wallet.privateKey;

        const data = await req.json();
        // console.log("DATAAAAAAAAAAAAAA", data);
        const {
            id,
            firstName,
            lastName,
            userName,
            languageCode,
            // allowsWriteToPm,
        } = data;

        const userBase = doc(db, "users", id);
        const userDoc = await getDoc(userBase);

        if (userDoc.exists()) {
            return new NextResponse(
                JSON.stringify({
                    message: "User already have an account",
                    user: userDoc.data(),
                }),
                { status: 200 }
            );
        }

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
            index: 0,
        });

        const userObj = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            languageCode: languageCode,
            // allowsWriteToPm: allowsWriteToPm,
            wallet: smartWallet,
            idWallet: 0,
            privateKey: privateKey,
            walletAddress: wallet.address,
        };

        const user = await setDoc(userBase, userObj);

        return new NextResponse(
            JSON.stringify({
                message: "User created successfully",
                user: user,
            }),
            {
                status: 200,
            }
        );
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

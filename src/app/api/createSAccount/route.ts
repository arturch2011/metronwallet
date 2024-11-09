import { NextResponse, NextRequest } from "next/server";
import { createSmartAccountClient } from "@biconomy/account";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ethers } from "ethers";
import { db, auth } from "@/firebase/config";

export const POST = async (req: NextRequest) => {
    try {
        const url = process.env.RPC_URL as string;

        const data = await req.json();
        const { email, password } = data;

        const userBase = doc(db, "users", email);
        const usersRef = collection(db, "users");
        const queryIndex = query(usersRef);
        const index = (await getDocs(queryIndex)).size || 0;

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
            index: index,
        });

        await createUserWithEmailAndPassword(auth, email, password).then(
            async (userCredential) => {
                const user = userCredential.user;
                const uid = user.uid;

                await setDoc(userBase, {
                    uid: uid,
                    email: data.email,
                    wallet: smartWallet,
                    alchemyWallet: "",
                    idWallet: index,
                });
            }
        );
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), {
            status: 200,
        });
    }
};

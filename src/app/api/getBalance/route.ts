import { ethers } from "ethers";
import ERC20 from "@/utils/ERC20.json";
import { createSmartAccountClient } from "@biconomy/account";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const url = process.env.RPC_URL as string;

        const { idWallet } = await req.json();

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
        const smartAddress = await smartAccount.getAccountAddress({
            index: idWallet,
        });
           
        const contract = new ethers.Contract(
            `${process.env.NEXT_PUBLIC_CONTRACTERC20}`,
            ERC20,
            signer
        );

        const balances = await smartAccount.getBalances()
        const formatedBalances = balances.map((balance) => {
            const asset = balance.address === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' ? "tBNB" : "MTK";
            return {
                asset,
                address: balance.address,
                amount: balance.amount.toString(),
                formattedAmount: balance.formattedAmount,
            };
        })

        const balanceOf = contract.getFunction("balanceOf");
        const MTKBalance = await balanceOf(smartAddress);

        formatedBalances.push({ 
            asset: "MTK", 
            address: '0x4c53e9914FA38B69756BD9fF1a1CF338967770FD', 
            amount: MTKBalance.toString(), 
            formattedAmount: ethers.formatUnits(MTKBalance, 18)
        });

        return new NextResponse(
            JSON.stringify({ message: "success on transaction ", formatedBalances }),
            { status: 200 }
        );
    } catch (error) {
        console.log(error)
        return new NextResponse(
            JSON.stringify({ message: JSON.stringify(error) }),
            {
                status: 500,
            }
        );
    }
};

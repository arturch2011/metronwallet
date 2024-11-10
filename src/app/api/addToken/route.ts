import { NextResponse, NextRequest } from "next/server";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json();
        const { tokenAddr, id } = data;

        const userBase = doc(db, "users", id);
        const userDoc = await getDoc(userBase);

        if (!userDoc.exists()) {
            return new NextResponse(
                JSON.stringify({ message: "user doesn't exist" }),
                { status: 400 }
            );
        }

        const userData = userDoc.data();
        let tokens = userData.tokens || [];

        if (!tokens.includes(tokenAddr)) {
            tokens.push(tokenAddr);
            await updateDoc(userBase, { tokens });
        }

        return new NextResponse(
            JSON.stringify({ message: "Token added successfully" }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: "An error occurred",
                error: error,
            }),
            { status: 500 }
        );
    }
};

/* eslint-disable */

interface UserData {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code: string;
    is_premium?: boolean;
    wallet?: string;
    idWallet?: number;
    privateKey?: string;
    walletAddress?: string;
}

interface CreateSAccountResponse {
    message: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        userName: string;
        languageCode: string;
        allowsWriteToPm: boolean;
        wallet: string;
        idWallet: number;
        privateKey: string;
        walletAddress: string;
    };
}

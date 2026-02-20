// 1. CONTRACT ADDRESS HERE
const CONTRACT_ADDRESS = "0x3Eb9222cFCF462bBe1548f08F5aAd58871aFe355";

// 2. ABI HERE
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
        document.getElementById("walletText").innerText = userAddress.substring(0, 6) + "..." + userAddress.substring(38);
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
            li.innerText = id;
            list.appendChild(li);
        });
    } catch (error) {
        console.error(error);
        list.innerText = "Error loading list.";
    }
}
refreshBtn.addEventListener("click", loadMyInvoices);

// --- 5. VERIFY INVOICE ---
verifyBtn.addEventListener("click", async () => {
    const searchId = document.getElementById("searchId").value;
    const resultBox = document.getElementById("searchResult");
    
    if (!searchId) return;

    try {
        resultBox.innerHTML = `<div style="color:var(--text-dim);font-family:var(--mono);font-size:12px;padding:10px 0;">Searching chain...</div>`;
        resultBox.className = "result-box";
        resultBox.classList.remove("hidden");

        const invoices = await contract.getInvoice(searchId);

        if (invoices.length === 0) {
            resultBox.className = "result-box error-state";
            resultBox.innerHTML = `
                <span style="margin-right:6px;">✗</span> No invoices found for this ID.
            `;
            return;
        }

        resultBox.className = "result-box";
        resultBox.innerHTML = "";

        invoices.forEach((inv, index) => {
            const ipfsLink = `https://gateway.pinata.cloud/ipfs/${inv[4]}`;
            const card = document.createElement("div");
            card.className = "result-card";
            card.innerHTML = `
                <div class="result-title">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00e676" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Verified — Result #${index + 1}
                </div>
                <div class="result-row">
                    <span class="result-label">Client</span>
                    <span class="result-value">${inv[1]}</span>
                </div>
                <div class="result-row">
                    <span class="result-label">Amount</span>
                    <span class="result-value">${inv[2]}</span>
                </div>
                <div class="result-row">
                    <span class="result-label">Date</span>
                    <span class="result-value">${inv[3]}</span>
                </div>
                <div class="result-row">
                    <span class="result-label">Document</span>
                    <a href="${ipfsLink}" target="_blank" class="result-link">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                        View on IPFS
                    </a>
                </div>
            `;
            resultBox.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        resultBox.className = "result-box error-state";
        resultBox.classList.remove("hidden");
        resultBox.innerHTML = `<span style="margin-right:6px;">✗</span> Error fetching data.`;
    }
});

// --- 6. FILE NAME DISPLAY ---
document.getElementById("inpFile").addEventListener("change", function() {
    const display = document.getElementById("fileNameDisplay");
    display.innerText = this.files[0] ? this.files[0].name : "PDF or Image — max 10MB";
});

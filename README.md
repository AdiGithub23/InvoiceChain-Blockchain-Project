# **🔗 InvoiceChain: Decentralized Invoice Authentication System**

**InvoiceChain** is a Decentralized Application (DApp) that allows issuers to authenticate invoices on the Ethereum Blockchain while ensuring data privacy and immutability. It leverages **IPFS** for decentralized file storage and **Smart Contracts** for access control.

---

## 🧐 Problem Statement
In traditional supply chains, invoice fraud (double financing, forgery) is rampant. Centralized databases are vulnerable to hacks and manipulation.
**InvoiceChain** solves this by:
1.  **Immutability:** Once an invoice hash is on-chain, it cannot be altered.
2.  **Privacy:** "Issuer A" can only view invoices created by "Wallet A".
3.  **Uniqueness:** Prevents uploading the same invoice PDF twice using Content-Addressing (IPFS CIDs).

---

## 🛠 Technology Stack

* **Frontend:** HTML5, CSS3, JavaScript.
* **Blockchain Integration:** Ethers.js (v6).
* **Smart Contract:** Solidity.
* **Network:** Sepolia Testnet.
* **File Storage:** IPFS (Pinata API).
* **Authentication:** Web3 Injection (MetaMask).
* **Hosting:** Netlify (Static Site).

---

## ✨ Key Features

### 1. Wallet Authentication
* Users login via **MetaMask**. No passwords or emails stored.
* Session persists as long as the wallet is connected.

### 2. Secure Invoice Submission
* User uploads a PDF/Image.
* File is uploaded to **IPFS** (InterPlanetary File System).
* The unique **IPFS Hash (CID)** and metadata are stored on the Ethereum Blockchain.
* **Duplicate Check:** The Smart Contract rejects the transaction if the specific file has already been uploaded.

### 3. Privacy-Preserving Dashboard
* **Smart Filter:** The dashboard queries the blockchain and filters results.
* A user can **only** see the list of invoices they personally created.
* Strangers cannot view your invoice history.

### 4. Public Verification
* Anyone with a valid **Invoice ID** can verify its authenticity.
* The system returns the original metadata and a direct link to the IPFS file.

---

# 🛠️ InvoiceChain: Step-by-Step Implementation Guide

---

## 📂 Project Structure

```text
InvoiceChain/
├── index.html
├── styles.css
├── app.js
└── README.md
```
---

## 📋 Prerequisites

Before starting, ensure to have the following:

1.  **Web Browser:** Chrome, Edge, or Brave.
2.  **MetaMask Wallet:** Installed as a browser extension.
3.  **Testnet ETH:** Sepolia ETH (Claim from [Google Cloud Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)).
4.  **Pinata Account:** Sign up at [Pinata.cloud](https://pinata.cloud) (Free Tier).
5.  **Code Editor:** VS Code (recommended).

---

##  Phase 1: The Smart Contract (Backend)

We use **Remix IDE** to write and deploy the logic to the Ethereum Blockchain.

### 1. Write the Contract
1.  Go to [Remix IDE](https://remix.ethereum.org).
2.  Create a new file named `InvoiceChain.sol` inside the `contracts` folder.
3.  Paste the latest code: `InvoiceChain.sol-3.text` in the IDE

### 2. Compile & Deploy
1.	Compile: Click the "Solidity Compiler" tab (Left sidebar) -> Click Compile InvoiceChain.sol.
2.	Deploy: Click "Deploy & Run Transactions" tab.
	- Environment: Select Injected Provider - MetaMask.
	- Click Deploy and confirm the transaction in MetaMask.
3.	Save Critical Data:
	- Copy the Deployed Contract Address (0x...).
	- Go to the Compiler tab and copy the ABI (JSON).


## Phase 2: Storage Setup (IPFS)

1.	Log in to Pinata.
2.	Go to API Keys.
3.	Click New Key -> Enable Admin permissions -> Create.
4.	COPY THE JWT (JSON Web Token). This is your secret key. Save it securely.	


## Phase 3: The Frontend (User Interface)

1. 	index.html
2. 	styles.css
3.	app.js


## Phase 4: Integration & Testing

1.	Local Testing
2.	Verification Steps


## Phase 5: Hosting

1.	Prepare: Ensure index.html, styles.css, and app.js are in the root folder.
2.	Deploy:
	- Go to Netlify Drop.
	- Drag and drop your project folder.
3.	Test Application: `https://invoicechain.netlify.app`

---

## 🚀 Live Demo
**URL:** [https://invoicechain.netlify.app](https://invoicechain.netlify.app)  
*(Download MetaMask Mobile App or Desktop Browser Extension)*

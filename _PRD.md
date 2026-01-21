# Product Requirement Document: Decentralized Invoice Authentication System

**Project Name:** BCINVAUTH_TEST (MVP)
**Version:** 1.0
**Type:** Blockchain DApp (University Group Project)
**Date:** January 2026


## 1. Executive Summary

This project aims to build a **Blockchain-Based Invoice Authentication System** where multiple distinct issuers can securely upload invoice metadata to a decentralized ledger. The core value proposition is **provenance and privacy**: while the ledger provides immutability, the application logic ensures that issuers can only retrieve and view the details of invoices they personally created. The system utilizes Ethereum-based smart contracts for storage and MetaMask for identity management.

## 2. Technical Architecture & Stack

### 2.1 Technology Stack

* **Blockchain Network:** Ethereum Testnet (e.g., Sepolia).
* **Smart Contract Language:** Solidity.
* **Authentication:** Web3 Injection via **MetaMask** (No traditional email/password).
* **Backend Server:** **Python (FastAPI)**.
* *Role:* Serves the static frontend files and acts as the web server host.

* **Frontend:** **Pure HTML, CSS, and Vanilla JavaScript**.
* *Library:* Ethers.js or Web3.js (via CDN) for blockchain interaction.



### 2.2 System Diagram Description

1. **User Client:** The browser runs HTML/JS and connects to the MetaMask Extension.
2. **Identity Layer:** MetaMask signs transactions and provides the public wallet address as the User ID.
3. **Application Layer:** FastAPI serves the client interface.
4. **Storage Layer:** The Smart Contract acts as the database. It stores the mapping between "Invoice IDs" and "Wallet Addresses."

## 3. User Roles

* **Issuer (General User):**
* Identified solely by their unique Ethereum Wallet Address.
* Can create new invoices.
* Can view a list of *only* their own created invoices.
* Can search for specific invoice details *only* if they are the creator.



## 4. Functional Requirements

### 4.1 Feature: Wallet Authentication

* **Description:** Users must connect their crypto wallet to access the application.
* **Logic:**
* On page load, the application should check if MetaMask is installed.
* A "Connect Wallet" button must trigger the MetaMask connection request.
* Upon success, the UI updates to show the connected user's abbreviated wallet address.
* The application must detect account changes in MetaMask and reload the view dynamically.



### 4.2 Feature: Submit Invoice

* **Description:** Authenticated users can upload invoice metadata to the blockchain.
* **Data Fields:**
* **Invoice ID:** A unique string identifier (e.g., INV-1001).
* **Client Name:** String.
* **Amount:** Numeric/Integer.
* **Date:** String or Timestamp.


* **Constraints:**
* **Uniqueness:** The Smart Contract must verify that the *Invoice ID* does not already exist on the chain. If it exists, the transaction must fail/revert.
* **Ownership:** When storing the data, the Smart Contract must automatically record the sender's wallet address (`msg.sender`) as the owner of this invoice.



### 4.3 Feature: Dashboard (View My Invoices)

* **Description:** A view where the user sees a list of all invoices they have submitted.
* **Logic:**
* The application queries the Smart Contract for all Invoice IDs associated with the currently connected wallet address.
* The UI renders a table displaying the details of these invoices.
* **Privacy Rule:** The query must strictly filter results. User A must never see User B's invoices in this list.



### 4.4 Feature: Verify/Search Invoice

* **Description:** A specific search bar to retrieve details of a single invoice by its ID.
* **Logic:**
* User inputs an *Invoice ID*.
* The application calls the Smart Contract to retrieve details.
* **Access Control Rule:** The Smart Contract function must verify if the caller is the owner of the invoice.
* *If Caller == Owner:* Return the Client Name, Amount, and Date.
* *If Caller != Owner:* Return an error or empty data (Access Denied).





## 5. Data Models (Conceptual)

The Smart Contract will require a data structure to represent an **Invoice**, containing:

1. **ID:** The unique lookup key.
2. **Issuer:** The wallet address of the creator.
3. **Metadata:** Client Name, Amount, Date.

**Storage Mappings required:**

1. A mapping to store Invoice Objects accessible by their ID.
2. A mapping to track which IDs belong to which Wallet Address (for the Dashboard list).
3. A mapping or check to ensure IDs are unique.

## 6. API & Interface Specifications

### 6.1 Smart Contract Interface

The contract must expose three primary functions:

1. **Add Invoice:** Accepts invoice details. Checks uniqueness. Maps the ID to the sender's address. Emits an event upon success.
2. **Get My Invoices:** Returns an array of Invoice IDs that belong to the caller.
3. **Get Invoice Details:** Accepts an Invoice ID. strictly enforces that the caller must match the stored owner address before returning data.

### 6.2 Frontend Interface

* **Login Section:** Visible only when the wallet is disconnected.
* **Main Dashboard:** Visible only after connection.
* *Form:* "Create New Invoice" (Inputs: ID, Client, Amount, Date).
* *List:* "My Invoices" (Table).
* *Search:* "Verify Invoice" (Input: ID).



## 7. Security & Limitations

* **Immutability:** Once an invoice is created, it cannot be edited or deleted (for MVP simplicity).
* **Gas Fees:** Users must be informed (via MetaMask UI) that creating an invoice requires a gas fee (paid in Testnet ETH).
* **Data Visibility:** While the application UI restricts access, data stored on a public blockchain is technically readable by anyone running a node. For this academic project, "Privacy" is defined as **Application-Level Access Control** enforced by the Smart Contract View functions, not encryption.

## 8. Success Criteria

0. User can successfully log in via MetaMask.
1. User A can log in and submit "Invoice #1".
2. User B can log in and submit "Invoice #2".
3. User A sees only "Invoice #1" on their dashboard.
4. User B sees only "Invoice #2" on their dashboard.
5. If User A tries to search for "Invoice #2", the system returns "Access Denied."
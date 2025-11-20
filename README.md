# AI-Powered-Hajj-Umrah-Assistant


## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Tools & Technologies Used](#tools--technologies-used)
4. [Project Structure](#project-structure)
5. [How It Works](#how-it-works)
6. [How to Run the Project](#how-to-run-the-project)
7. [Contributors](#contributors)
8. [Future Improvements](#future-improvements)

## Overview
The **Hajj & Umrah AI Assistant** is an intelligent Arabic-language chatbot designed to help pilgrims during their Hajj and Umrah journey.  
It combines **Retrieval-Augmented Generation (RAG)** with a **Large Language Model (LLM)** to provide accurate, context-aware answers based on trusted Islamic sources.

The system retrieves information from a curated knowledge base (JSON files containing rulings, steps, rituals, and guidelines), and then generates clear answers using an AI model.  
This assistant aims to support pilgrims with reliable guidance, simplify access to essential information, and offer a smooth, interactive user experience through a clean web-based chat interface.

## Features
- **Arabic Intelligent Chatbot:**  
  Provides accurate, context-aware answers about Hajj and Umrah rituals using Arabic as the primary language.

- **RAG-Based Knowledge Retrieval:**  
  Searches through a structured knowledge base of trusted Islamic resources to extract relevant information.

- **LLM-Generated Answers:**  
  Produces clear, human-like responses using Groq’s LLM model while staying grounded to the retrieved context.

- **Safety & Authenticity:**  
  Avoids giving personal or unsupported fatwas. If the question lacks context, the assistant guides the user to ask a qualified scholar or official authority.

- **Clean Web Chat Interface:**  
  Simple and responsive front-end interface built using HTML, CSS, and JavaScript.

- **Lightweight Backend:**  
  Node.js backend that manages chat requests, RAG search, LLM generation, and knowledge base loading.


## Tools & Technologies Used

### **Frontend**
- **HTML5** – Structure of the web interface.
- **CSS3** – Styling and layout for the chat UI.
- **JavaScript (Vanilla JS)** – Sending/receiving messages and updating the chat interface dynamically.

### **Backend**
- **Node.js** – Main backend runtime environment.
- **Express.js** – Handles API endpoints and server routing.
- **CORS & Body-Parser** – Middleware for handling requests.

### **RAG (Retrieval-Augmented Generation)**
- **Custom RAG Engine (rag.js)** –  
  Searches inside the knowledge base (JSON files), scores chunks, and retrieves relevant context.
- **Local JSON Knowledge Base** –  
  Contains structured Hajj/Umrah information used to ground the AI’s answers.

### **LLM Integration**
- **Groq API (Llama 3 model)** –  
  Generates high-quality responses using retrieved context from RAG.
- **dotenv** – Loads API keys securely from `.env`.

### **Development Tools**
- **VS Code** – Main code editor.
- **Git/GitHub** – Version control and project hosting (optional).



## Project Structure

Below is an overview of all files and folders included in this project, along with a clear explanation of what each component does.

---

### 📁 backend/
Responsible for handling the server logic, RAG retrieval, LLM generation, and communication with the frontend.

---

#### **1. server.js**
This is the main backend server of the project.

**Contains:**
- Express server setup  
- `/chat` endpoint that receives messages from the frontend  
- Loads and initializes the knowledge base  
- Passes the user’s question to RAG (rag.js)  
- Sends the retrieved context to the LLM (llm.js)  
- Returns the final answer back to the frontend  

**Role:**  
Acts as the central controller connecting the frontend, RAG retrieval, and Groq LLM.

---

#### **2. rag.js**
This file implements the RAG (Retrieval-Augmented Generation) logic.

**Contains:**
- Loads all JSON knowledge files from `knowledge_base/`  
- Splits the content into searchable chunks  
- Computes similarity scores between the user question and stored texts  
- Returns the most relevant text chunks  

**Role:**  
Ensures the assistant answers based only on trusted Islamic knowledge.

---

#### **3. llm.js**
This file connects the project to Groq’s LLM API.

**Contains:**
- Groq SDK configuration  
- Custom Arabic system prompt  
- `generateAnswer()` function  
- Sends the question + retrieved context to Groq  
- Returns the generated AI response  

**Role:**  
Provides the AI reasoning component while staying grounded in the retrieved context.

---

#### **4. knowledge_base/**
A folder containing all the structured Islamic knowledge used by the RAG system.

**Contains:**
- Multiple `.json` files (each representing a topic such as: Hajj pillars, Tawaf, Sa’i, Ihram, etc.)  

Each file includes:

{
  "title": "",
  "category": "",
  "text": ""
}


**Role:**
Serves as the verified knowledge foundation for the assistant.

#### **5. .env**
The environment configuration file.

**Contains:**
GROQ_API_KEY=your_api_key_here


**Role:**  
Stores the Groq API key securely and prevents exposing sensitive information in the source code.

---

### 📁 frontend/
Handles everything related to the user interface and browser-side logic.

---

#### **6. index.html**
The main HTML file that displays the chatbot interface.

**Contains:**
- The chat layout  
- Header section  
- Message display area  
- User input field  
- Send button  
- Links to `style.css` and `script.js`

**Role:**  
Provides the visual interface that the user interacts with.

---

#### **7. style.css**
The styling file responsible for the visual appearance of the chat interface.

**Contains:**
- Chat message bubble styles  
- Layout and alignment rules  
- Colors, spacing, and responsive design  

**Role:**  
Makes the UI clean, clear, and comfortable to use.

---

#### **8. script.js**
The frontend JavaScript logic.

**Contains:**
- `sendMessage()` to send user messages to the backend  
- A `fetch` request to the `/chat` endpoint  
- `addMessage()` to show messages in the chat window  

**Role:**  
Connects the user interface to the backend and updates the chat in real time.



## How It Works

The Hajj & Umrah AI Assistant follows a clear and modular flow that connects the user interface, backend server, RAG system, and Groq LLM. Below is a step-by-step explanation of how the system processes each question.

---

### **1. User Sends a Message**
The user types a question in the chat interface (`index.html`).  
The `sendMessage()` function inside `script.js` sends the message to the backend using a POST request to the `/chat` endpoint.

---

### **2. Backend Receives the Question**
The `server.js` file receives the request.  
It:
- Extracts the user message  
- Loads the knowledge base (JSON files)  
- Sends the message to the RAG system (`rag.js`)

---

### **3. RAG Retrieves Relevant Knowledge**
Inside `rag.js`, the system:
- Loads all JSON files from the `knowledge_base` folder  
- Splits text into searchable chunks  
- Computes similarity between the user question and stored content  
- Returns the most relevant chunks (Top-K)

This ensures the answer is grounded in **trusted Islamic sources**.

---

### **4. LLM Generates the Final Answer**
The retrieved context + the user's question are sent to the LLM via `llm.js`.

The file:
- Connects to the Groq API  
- Uses a custom Arabic system prompt  
- Generates a safe and context-aware answer  
- Returns the final output to `server.js`

---

### **5. Backend Sends the Answer to the Frontend**
`server.js` sends the LLM's final answer back to the browser in JSON format.

Example response:
{ "reply": "هنا يتم وضع إجابة المساعد." }


---

### **6. Chat Interface Displays the Response**
The frontend receives the reply, and `addMessage()` (inside `script.js`) displays the bot message in the chat window.

The cycle then repeats for every new question.


## How to Run the Project

Follow the steps below to install and run the Hajj & Umrah AI Assistant on any computer.

---

### **1. Download or Clone the Project**
You can either download the project as a ZIP file or clone it using Git.


---

### **2. Navigate to the Backend Folder**
Open a terminal and go to the backend directory:

cd backend


---

### **3. Install Dependencies**
Install all Node.js packages required for the backend:

npm install


---

### **4. Add Your Groq API Key**
Create a file named `.env` inside the backend folder and add the following line:


GROQ_API_KEY=your_api_key_here


Replace `your_api_key_here` with your actual Groq API key.

---

### **5. Start the Backend Server**
Run the Node.js server:

node server.js


If everything is correct, you should see:

Server running on http://localhost:3000

Loaded (X) chunks from knowledge_base


---

### **6. Open the Frontend**
Open the `index.html` file located in the `frontend` folder.

You can open it by double-clicking it, or using:

open index.html


---

### **7. Start Chatting**
Once the frontend page opens in your browser:

- Type your question in Arabic  
- Press **Send**  
- The assistant will retrieve context from the knowledge base  
- Groq’s LLM will generate a grounded and safe answer  

Your Hajj & Umrah Assistant is now running locally 🎉

---

### **Important Notes**
- The backend **must** be running while using the frontend  
- Internet connection is required for the Groq LLM  
- The knowledge base can be expanded by adding more `.json` files  


## Contributors

This project was developed as a team effort. The following members contributed to building, designing, and testing the Hajj & Umrah AI Assistant:

- **Sana Rahmani** – Backend development, RAG system, LLM integration, and overall system architecture.  
- **Rama ALkusair** – Frontend UI, testing, documentation support, and project coordination.

## Future Improvements

There are several enhancements that can be added to improve the functionality, accuracy, and user experience of the Hajj & Umrah AI Assistant:

- **Advanced RAG Search (Embeddings):**  
  Replace keyword-based similarity with embedding-based semantic search for higher accuracy.

- **Larger Knowledge Base:**  
  Expand the collection of trusted Islamic resources to cover more rituals, common mistakes, FAQs, and official guidelines.

- **Improved UI/UX:**  
  Add modern animations, better layouts, mobile optimization, and a more interactive chat design.

- **Offline Model Support:**  
  Integrate local LLMs using tools like `Ollama` or `LM Studio` for cases where internet is limited during Hajj.

- **User Session History:**  
  Allow users to save or export previous conversations.

- **Voice Input & Output:**  
  Add speech-to-text and text-to-speech for a more accessible experience.

- **Admin Dashboard:**  
  A panel to upload, update, or manage RAG knowledge base content dynamically.





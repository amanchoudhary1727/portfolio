# embedder.py - FIXED VERSION (Copy-Paste Replace)
import os
from dotenv import load_dotenv
from langchain_community.document_loaders import TextLoader  # ✅ FIXED
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone

# 1. LOAD .env FILE
load_dotenv()
api_key = os.getenv("PINECONE_API_KEY")
if not api_key:
    raise ValueError("❌ PINECONE_API_KEY missing! Add to .env file: PINECONE_API_KEY=pt1_xxxx")
print("🔑 Pinecone API Key loaded ✅")

# 2. LOAD knowledgebase.md
print("📄 Loading knowledgebase.md...")
if not os.path.exists("knowledgebase.md"):
    raise FileNotFoundError("❌ knowledgebase.md not found! Create it first.")
loader = TextLoader("knowledgebase.md")
documents = loader.load()
print(f"✅ Loaded {len(documents)} pages")

# 3. SPLIT into chunks
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=100
)
splits = text_splitter.split_documents(documents)
print(f"✂️ Split into {len(splits)} chunks")

# 4. ADD metadata
for doc in splits:
    doc.metadata["source"] = "knowledgebase.md"

# 5. EMBEDDINGS
print("🔢 Creating embeddings (all-MiniLM-L6-v2)...")
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2",
    model_kwargs={'device': 'cpu'}
)

# 6. PINE CONE UPLOAD
print("☁️ Uploading to Pinecone portfolio-index...")
pc = Pinecone(api_key=api_key)
PineconeVectorStore.from_documents(
    documents=splits,
    embedding=embeddings,
    index_name="portfolio-index",
    text_key="text"
)

print(f"🎉 SUCCESS! Embedded {len(splits)} chunks from knowledgebase.md to Pinecone!")
print("🌐 Next: Test chat API → vercel --prod → LIVE!")

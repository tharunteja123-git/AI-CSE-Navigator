from langchain_chroma import Chroma

from app.ai.rag.embeddings import embeddings
from app.ai.rag.load_documents import chunks

vectorstore = Chroma.from_documents(
    chunks,
    embeddings,
    persist_directory="./chroma_db",
)

retriever = vectorstore.as_retriever(
    search_kwargs={
        "k": 5
    }
)
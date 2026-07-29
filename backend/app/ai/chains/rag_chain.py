from langchain.chains import RetrievalQA

from app.ai.models.gemini import llm
from app.ai.vectorstore.chroma_db import retriever

rag_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    chain_type="stuff",
)
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import os
from model_utils import load_model, generate_response

app = FastAPI(
    title="Healthcare Chatbot API",
    description="""
    🏥 **Healthcare Chatbot API** powered by fine-tuned T5 model
    
    This API provides AI-powered medical information responses based on a specialized healthcare dataset.
    
    ## Features
    
    * 🤖 Fine-tuned T5 model for medical Q&A
    * 💬 Conversational history support
    * 🎯 Domain-specific healthcare responses
    * 📋 Structured, easy-to-understand answers
    
    ## Important Notice
    
    ⚠️ This AI provides **general health information only** and is **not a substitute** 
    for professional medical advice. Always consult healthcare professionals for medical concerns.
    """,
    version="1.0.0",
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response Models
class ConversationTurn(BaseModel):
    user: str = Field(..., description="User's message in the conversation", example="What are the symptoms of diabetes?")
    model: str = Field(..., description="Model's response", example="Common symptoms of diabetes include increased thirst, frequent urination...")

class ChatRequest(BaseModel):
    history: List[ConversationTurn] = Field(
        default=[],
        description="Previous conversation history (can be empty for first message)",
        example=[
            {
                "user": "What is diabetes?",
                "model": "Diabetes is a chronic condition that affects how your body processes blood sugar..."
            }
        ]
    )
    new_message: str = Field(
        ...,
        description="New user message to get a response for",
        example="What are the symptoms of diabetes?",
        min_length=1,
        max_length=500
    )

class ChatResponse(BaseModel):
    response: str = Field(..., description="AI-generated response to the user's question", example="Common symptoms of diabetes include increased thirst, frequent urination, extreme hunger, unexplained weight loss, fatigue, blurred vision, and slow-healing sores.")

class HealthResponse(BaseModel):
    status: str = Field(..., example="healthy")
    message: str = Field(..., example="Healthcare Chatbot API is running")
    model_loaded: bool = Field(..., example=True)

# Load model on startup
model = None
tokenizer = None

@app.on_event("startup")
async def startup_event():
    """Load the model when the API starts"""
    global model, tokenizer
    try:
        model, tokenizer = load_model()
        print("✅ Model loaded successfully!")
    except Exception as e:
        print(f"❌ Failed to load model: {str(e)}")
        raise

@app.get("/", response_model=HealthResponse, tags=["Health"])
async def root():
    """
    Root endpoint - API health check
    
    Returns basic API status and model loading state.
    """
    return {
        "status": "healthy",
        "message": "Healthcare Chatbot API is running",
        "model_loaded": model is not None
    }

@app.post(
    "/api/chat/generate",
    response_model=ChatResponse,
    tags=["Chat"],
    summary="Generate AI Response",
    response_description="AI-generated medical information response"
)
async def chat_generate(request: ChatRequest):
    """
    Generate an AI-powered healthcare response based on the conversation history and new message.
    
    ## Request Body
    
    - **history**: List of previous conversation turns (user-model pairs). Can be empty for first message.
    - **new_message**: The new user question or message (1-500 characters)
    
    ## Example Usage
    
    **First Message (Empty History):**
    ```json
    {
      "history": [],
      "new_message": "What are the symptoms of diabetes?"
    }
    ```
    
    **Follow-up Message (With History):**
    ```json
    {
      "history": [
        {
          "user": "What is diabetes?",
          "model": "Diabetes is a chronic condition..."
        }
      ],
      "new_message": "How is it treated?"
    }
    ```
    
    ## Response
    
    Returns a structured medical information response based on the fine-tuned T5 model.
    
    ## Notes
    
    - Response time: 1-3 seconds on CPU
    - Model uses conversation history for context
    - Detects out-of-domain questions and responds appropriately
    - For greetings (hi, hello), returns a friendly introduction
    """
    if model is None or tokenizer is None:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded yet. Please wait a moment and try again."
        )
    
    try:
        response = generate_response(
            model=model,
            tokenizer=tokenizer,
            history=request.history,
            new_message=request.new_message
        )
        return ChatResponse(response=response)
    except Exception as e:
        print(f"Error generating response: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate response: {str(e)}"
        )

@app.get("/health", tags=["Health"])
async def health_check():
    """
    Detailed health check endpoint
    
    Returns comprehensive API health status including model and tokenizer loading state.
    Useful for monitoring and debugging.
    """
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "tokenizer_loaded": tokenizer is not None,
        "ready": model is not None and tokenizer is not None
    }


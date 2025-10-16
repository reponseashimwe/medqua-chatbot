import os
import torch
from transformers import T5ForConditionalGeneration, T5Tokenizer
from typing import List, Tuple
from pydantic import BaseModel

# System prompt - defines the AI's persona and behavior
SYSTEM_PROMPT = """You are a highly compassionate, clear, and accurate Medical Expert and AI Healthcare Assistant. Your primary goal is to provide comprehensive, easy-to-understand, and actionable health information based on your training. Structure your detailed answers using clear headings, bullet points, and numbered lists where appropriate for maximum clarity and readability. If the question is clearly outside the domain of medicine or healthcare, you MUST politely state your limitation and advise the user to consult an expert in that specific field. You must use the entire conversation history for context."""

# Friendly greeting for initial interactions
GREETING_RESPONSE = """Hello! 👋 I'm your Healthcare Assistant, here to help you with medical questions and health information.

I can assist you with:
• Understanding symptoms and conditions
• General health advice and wellness tips
• Medication information
• Preventive care guidance
• And much more!

Please note that while I strive to provide accurate and helpful information, I'm not a substitute for professional medical advice. For serious concerns or emergencies, please consult a healthcare professional.

How can I help you today?"""

class ConversationTurn(BaseModel):
    user: str
    model: str

def load_model() -> Tuple:
    """
    Load the T5 model for CPU inference (optimized for Render deployment)
    """
    model_id = os.getenv("MODEL_ID", "reponseashimwe/healthcare-chatbot")
    hf_token = os.getenv("HF_TOKEN")
    
    print(f"🔧 Loading model: {model_id}")
    print(f"💻 Device: CPU (optimized for cloud deployment)")
    
    try:
        # Load tokenizer
        print("📚 Loading tokenizer...")
        tokenizer = T5Tokenizer.from_pretrained(
            model_id,
            token=hf_token,
            legacy=False
        )
        print("✅ Tokenizer loaded successfully")
        
        # Load model with memory optimization
        print("🤖 Loading model with memory optimization...")
        print("⏳ This may take a minute as weights are processed.")
        
        model = T5ForConditionalGeneration.from_pretrained(
            model_id,
            token=hf_token,
            from_tf=True, 
            torch_dtype=torch.float16,
            device_map="auto",
            low_cpu_mem_usage=True
        )
        
        # Ensure model is on CPU (will be the case with device_map="auto" anyway)
        model = model.to('cpu')
        model.eval()  # Set to evaluation mode
        
        print("✅ Model loaded successfully on CPU!")
        print("🚀 Ready to serve requests!")
        
        return model, tokenizer
                
    except Exception as e:
        print(f"❌ Error loading model: {str(e)}")
        raise

def is_greeting(message: str) -> bool:
    """
    Check if the message is a simple greeting
    
    Args:
        message: User's message
        
    Returns:
        True if message is a greeting
    """
    greetings = ["hi", "hello", "hey", "greetings"]
    normalized = message.lower().strip().rstrip("!.,?")
    return normalized in greetings

def build_history_string(history: List[ConversationTurn]) -> str:
    """
    Build the history string in the required format:
    dialogue: <Q1> Response: <A1> dialogue: <Q2> Response: <A2>...
    
    Args:
        history: List of conversation turns
        
    Returns:
        Formatted history string
    """
    if not history:
        return ""
    
    history_parts = []
    for turn in history:
        history_parts.append(f"dialogue: {turn.user} Response: {turn.model}")
    
    return " ".join(history_parts) + " "

def generate_response(
    model,
    tokenizer,
    history: List[ConversationTurn],
    new_message: str
) -> str:
    """
    Generate a response using the model with proper prompt construction
    
    Args:
        model: The T5 model
        tokenizer: The T5 tokenizer
        history: List of previous conversation turns
        new_message: The new user message
        
    Returns:
        Generated response string
    """
    # Handle simple greetings
    if is_greeting(new_message) and len(history) == 0:
        return GREETING_RESPONSE
    
    # Build the history string
    history_string = build_history_string(history)
    
    # Construct the full prompt in the exact format:
    # [SYSTEM_PROMPT] [HISTORY STRING] question: [NEW_USER_MESSAGE]
    full_prompt = f"{SYSTEM_PROMPT} {history_string}question: {new_message}"
    
    # Tokenize the input
    inputs = tokenizer(
        full_prompt,
        return_tensors="pt",
        max_length=512,
        truncation=True
    ).to(model.device)
    
    # Generate response with Conservative Beam Decoding parameters
    outputs = model.generate(
        **inputs,
        num_beams=4,
        max_length=150,
        do_sample=False,
        length_penalty=0.8,
        early_stopping=True
    )
    
    # Decode the response
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    return response.strip()


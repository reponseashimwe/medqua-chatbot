# Healthcare Chatbot API

FastAPI backend for the Healthcare Chatbot application.

## Setup

1. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Create a `.env` file based on `.env.example` and add your Hugging Face token:

```env
MODEL_ID=reponseashimwe/healthcare-chatbot
HF_TOKEN=your_huggingface_token_here
```

4. Run the development server:

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### `GET /`

Health check endpoint.

**Response:**

```json
{
	"status": "healthy",
	"message": "Healthcare Chatbot API is running",
	"model_loaded": true
}
```

### `POST /api/chat/generate`

Generate a chat response based on conversation history.

**Request:**

```json
{
	"history": [
		{ "user": "What is diabetes?", "model": "Diabetes is..." },
		{ "user": "What are symptoms?", "model": "Common symptoms..." }
	],
	"new_message": "How is it treated?"
}
```

**Response:**

```json
{
	"response": "Treatment for diabetes typically includes..."
}
```

## Deployment

For deployment on Render or similar platforms:

1. Set the `MODEL_ID` and `HF_TOKEN` environment variables
2. The `Procfile` is configured to run the app with uvicorn
3. Ensure Python 3.9+ is specified in your deployment settings

## Model Loading

The API uses 8-bit quantization (`load_in_8bit=True`) for efficient memory usage, making it suitable for deployment on lower-resource machines.

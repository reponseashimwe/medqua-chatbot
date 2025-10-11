# Healthcare Chatbot - Individual Project

## 📋 Project Overview

Build a domain-specific chatbot tailored to **healthcare** that understands user queries and provides relevant medical information. The chatbot will be implemented using a pre-trained Transformer model from Hugging Face, fine-tuned on medical Q&A data.

**Domain:** Healthcare  
**Dataset:** [MedQuAD - Medical Question Answer Dataset](https://www.kaggle.com/datasets/pythonafroz/medquad-medical-question-answer-for-ai-research)  
**Approach:** Generative QA (recommended)  
**Framework:** TensorFlow + Hugging Face Transformers

---

## 🎯 Project Requirements

### 1. Dataset Collection & Preprocessing

-   ✅ Collect/create dataset of conversational pairs aligned with healthcare domain
-   Dataset should be diverse, covering various user intents
-   **Preprocessing requirements:**
    -   Tokenization (appropriate methods like WordPiece for BERT)
    -   Normalization
    -   Handling missing values
    -   Data cleaning (removal of noise)
    -   Format data correctly for Transformer model input

### 2. Model Selection & Fine-tuning

-   Select a pre-trained Transformer model from Hugging Face:
    -   Options: BERT, GPT-2, ALBERT, T5, Flan-T5, or similar
-   Implement in Python using TensorFlow
-   Fine-tune the model on the healthcare dataset
-   **Hyperparameter tuning:**
    -   Learning rate
    -   Batch size
    -   Optimizer selection
    -   Training epochs
    -   Document impact of adjustments

### 3. Evaluation

-   Use appropriate NLP metrics:
    -   BLEU score
    -   F1-score
    -   Perplexity
-   Qualitative testing through chatbot interaction
-   Analyze ability to generate meaningful responses
-   Test domain-specificity (correctly answer healthcare queries, appropriately handle out-of-domain questions)

### 4. Deployment

Choose one or more deployment methods:

-   ✅ **API-based chatbot** (planned)
-   ✅ **Web interface** using Flask/Streamlit/Gradio or Next.js on Vercel (planned)
-   Mobile app
-   Command-line interface (CLI)

Interface must be intuitive for user input and response display.

### 5. Submission Requirements

-   **GitHub Repository:**
    -   Jupyter Notebook or Python script
    -   Data preprocessing code
    -   Model training code
    -   Chatbot interaction code
    -   README with:
        -   Dataset explanation
        -   Performance metrics
        -   Steps to run the chatbot
        -   Example conversations
-   **Demo Video:** 5-10 minutes showcasing:
    -   Chatbot functionality
    -   User interactions
    -   Key insights

---

## 📊 Grading Rubric

### Dataset Collection & Preprocessing (10 points)

**Exemplary (10 to >6.0 pts):**

-   Uses high-quality, domain-specific dataset
-   Comprehensive preprocessing steps applied
-   Clear explanation of tokenization and normalization processes
-   Tokenization done using appropriate methods (e.g., WordPiece for BERT)
-   Data cleaned effectively (removal of noise, handling missing values)
-   Detailed documentation of preprocessing steps provided

### Model Fine-tuning (15 points)

**Exemplary (15 to >9.0 pts):**

-   Thorough exploration of hyperparameters with clear documentation
-   Significant performance improvements through validation metrics (accuracy, F1 score)
-   Multiple hyperparameters tuned (learning rate, batch size, etc.)
-   Results show improvement over baseline performance by **at least 10%**
-   Included experiment table comparing:
    -   Different hyperparameters
    -   Model architectures
    -   Preprocessing techniques

### Performance Metrics (5 points)

**Exemplary (5 to >3.0 pts):**

-   Uses appropriate NLP metrics (BLEU, F1-score, perplexity, qualitative testing)
-   Thoroughly analyzes chatbot performance
-   Multiple evaluation metrics reported with thorough analysis of results

---

## 🧩 Project Plan

| Stage | Task                                                       | Output                                       |
| ----- | ---------------------------------------------------------- | -------------------------------------------- |
| 1     | Dataset collection (MedQuAD)                               | Raw dataset (.csv / .json)                   |
| 2     | Data preprocessing (cleaning, normalization, tokenization) | Processed dataset ready for training         |
| 3     | Model selection (Flan-T5 or GPT-2)                         | Loaded pre-trained model                     |
| 4     | Fine-tuning using TensorFlow                               | Trained domain-specific chatbot model        |
| 5     | Hyperparameter tuning                                      | Optimized performance and validation results |
| 6     | Evaluation (BLEU, F1, Perplexity)                          | Metrics report and analysis                  |
| 7     | API development                                            | REST API for chatbot inference               |
| 8     | Web interface deployment                                   | Vercel-hosted web app (Next.js/React)        |
| 9     | Documentation & demo                                       | README, video, GitHub repository             |

---

## 📁 Dataset Information

**Source:** [MedQuAD on Kaggle](https://www.kaggle.com/datasets/pythonafroz/medquad-medical-question-answer-for-ai-research)

**Description:** Medical Question-Answer pairs for AI research, containing:

-   Medical questions from patients
-   Expert answers from healthcare professionals
-   Coverage of various medical topics and conditions

**Location:** `data/medquad.csv`

---

## 🛠️ Technical Stack

### Core Technologies

-   **Language:** Python 3.8+
-   **Framework:** TensorFlow
-   **NLP Library:** Hugging Face Transformers
-   **Model Options:** Flan-T5, GPT-2, T5, BERT

### Development Tools

-   Jupyter Notebook / Python scripts
-   pandas, numpy for data processing
-   sklearn for metrics
-   nltk / spaCy for text preprocessing

### Deployment Stack

-   **Backend API:** Flask / FastAPI
-   **Frontend:** Next.js / React (Vercel deployment)
-   Alternative: Streamlit / Gradio for quick prototyping

---

## 🚀 Deployment Strategy

### Option 1: API + Web App (Recommended)

1. **Backend API:**

    - Build REST API using Flask/FastAPI
    - Endpoints for chatbot inference
    - Deploy on Heroku/Railway/Google Cloud

2. **Frontend Web App:**
    - Next.js/React application
    - Clean, intuitive chat interface
    - Deploy on Vercel
    - Connect to backend API

### Option 2: All-in-One Deployment

-   Use Streamlit or Gradio for quick deployment
-   Host on Hugging Face Spaces or Streamlit Cloud
-   Simpler but less customizable

---

## 📝 Success Criteria

-   [ ] High-quality healthcare-specific dataset preprocessed
-   [ ] Model fine-tuned with documented hyperparameter experiments
-   [ ] Performance improvement of at least 10% over baseline
-   [ ] Multiple evaluation metrics (BLEU, F1, Perplexity) reported
-   [ ] Deployed chatbot accessible via web interface or API
-   [ ] Comprehensive documentation in README
-   [ ] 5-10 minute demo video completed
-   [ ] GitHub repository with all code and documentation
-   [ ] Chatbot correctly handles healthcare queries
-   [ ] Appropriate handling of out-of-domain questions

---

## 📚 Key Considerations

### Extractive QA vs Generative QA

-   **Extractive QA:** Extracts answers from provided context (like BERT-based models)
-   **Generative QA:** Generates free-text answers (like T5, GPT-2, Flan-T5)
-   **Recommendation:** Use generative QA for more natural responses

### Model Comparison

| Model       | Type       | Strengths                           | Considerations         |
| ----------- | ---------- | ----------------------------------- | ---------------------- |
| **Flan-T5** | Generative | Instruction-tuned, excellent for QA | Larger model size      |
| **GPT-2**   | Generative | Good text generation                | May require more data  |
| **BERT**    | Extractive | Strong understanding                | Needs context passages |
| **T5**      | Generative | Versatile, text-to-text             | Resource intensive     |

### Evaluation Metrics

-   **BLEU Score:** Measures similarity between generated and reference answers
-   **F1 Score:** Precision and recall of generated tokens
-   **Perplexity:** How well the model predicts the text
-   **Qualitative:** Human evaluation of response quality and relevance

---

## 🎬 Next Steps

1. ✅ Dataset already downloaded (`data/medquad.csv`)
2. Explore and analyze the dataset
3. Implement preprocessing pipeline
4. Set up model training infrastructure
5. Experiment with hyperparameters
6. Evaluate and iterate
7. Build deployment interface
8. Create documentation and demo video

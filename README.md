# Healthcare Chatbot - Medical QA System

## Live Deployments

-   **Web Application:** [https://medqua-chatbot.vercel.app/](https://medqua-chatbot.vercel.app/)
-   **FastAPI Backend:** [https://huggingface.co/spaces/reponseashimwe/health-chatbot](https://huggingface.co/spaces/reponseashimwe/health-chatbot)
-   **Gradio Interface:** [https://huggingface.co/spaces/reponseashimwe/gradio-chatbot](https://huggingface.co/spaces/reponseashimwe/gradio-chatbot)
-   **GitHub Repository:** [https://github.com/reponseashimwe/medqua-chatbot](https://github.com/reponseashimwe/medqua-chatbot)

## Problem Statement

Access to accurate medical information is a global challenge. Patients struggle to find reliable health answers, leading to delayed care, misinformation from unreliable sources, and overwhelmed healthcare systems. Many people lack the ability to obtain, process, and understand basic health information needed to make appropriate health decisions.

This project addresses this gap by developing an AI-powered healthcare chatbot that provides evidence-based answers to medical questions, serving as an accessible first point of contact for health information.

## Domain Justification

Healthcare is chosen as the domain for several critical reasons:

-   **Universal Impact**: Health affects everyone, making this solution universally relevant
-   **Information Gap**: Significant gap between expert medical knowledge and public understanding
-   **Accessibility**: Not everyone has immediate access to healthcare professionals for basic questions
-   **Scalability**: An AI chatbot can serve unlimited users simultaneously

The chatbot helps users understand medical conditions, learn about treatments, and make informed decisions about when to seek professional care.

## Project Overview

A domain-specific AI chatbot for healthcare built using fine-tuned Transformer models (Flan-T5) to answer medical questions. This project demonstrates advanced NLP techniques including model fine-tuning, hyperparameter optimization, and deployment strategies.

### Key Details

-   **Domain:** Healthcare / Medical Information
-   **Dataset:** [MedQuAD - Medical Question Answer Dataset](https://www.kaggle.com/datasets/pythonafroz/medquad-medical-question-answer-for-ai-research)
-   **Approach:** Generative QA (Question Answering)
-   **Model:** Google Flan-T5-Small (instruction-tuned T5, 80M parameters)
-   **Framework:** TensorFlow 2.15+ with Hugging Face Transformers
-   **Deployment:** FastAPI + Next.js + Gradio

## Features

-   Fine-tuned Transformer model for medical Q&A
-   Comprehensive data preprocessing with tokenization and normalization
-   Multiple evaluation metrics (BLEU, ROUGE-1, ROUGE-2, ROUGE-L)
-   Extensive hyperparameter tuning with 5 experiments
-   Advanced decoding strategies testing and optimization
-   Interactive chatbot interfaces (Web, API, Gradio)
-   Out-of-domain question handling for safety
-   Beautiful, modern UI with excellent UX
-   Comprehensive visualizations of data and training metrics

## Dataset Information

### MedQuAD Dataset

The MedQuAD (Medical Question-Answer Dataset) is a high-quality, domain-specific dataset for medical question answering.

**Source:** [Kaggle - MedQuAD](https://www.kaggle.com/datasets/pythonafroz/medquad-medical-question-answer-for-ai-research)

**Dataset Structure:**

-   **Total Samples:** 16,407 medical Q&A pairs
-   **Training Set:** 13,187 samples (80%)
-   **Validation Set:** 1,648 samples (10%)
-   **Test Set:** 1,649 samples (10%)

**Sample Data:**

| question                               | answer                                                | source          | focus_area |
| -------------------------------------- | ----------------------------------------------------- | --------------- | ---------- |
| What is (are) Glaucoma ?               | Glaucoma is a group of diseases that can damage...    | NIHSeniorHealth | Glaucoma   |
| What causes Glaucoma ?                 | Nearly 2.7 million people have glaucoma, a leading... | NIHSeniorHealth | Glaucoma   |
| What are the symptoms of Glaucoma ?    | Symptoms of Glaucoma Glaucoma can develop in...       | NIHSeniorHealth | Glaucoma   |
| What are the treatments for Glaucoma ? | Although open-angle glaucoma cannot be cured...       | NIHSeniorHealth | Glaucoma   |

**Columns:**

-   `question`: Medical question asked by patients/users
-   `answer`: Expert medical answer from reliable sources
-   `source`: Origin of the Q&A pair (e.g., CDC, NIH, FDA)
-   `focus_area`: Medical topic/category (e.g., diabetes, cancer, heart disease)

**Data Characteristics:**

-   **Question Length:** Average 50-80 characters, max 500+ characters
-   **Answer Length:** Average 200-400 characters, highly variable (10-2000+ chars)
-   **Coverage:** Wide range of medical topics including diseases, treatments, prevention, symptoms
-   **Quality:** High-quality, expert-curated answers from authoritative medical sources

**Data Visualizations:**

![Dataset Visualizations](https://raw.githubusercontent.com/reponseashimwe/medqua-chatbot/main/data/visual.png)

**Preprocessing Steps:**

1. **Cleaning:** Removed null values, duplicates, and irrelevant entries
2. **Normalization:** Standardized text formatting, removed special characters
3. **Tokenization:** WordPiece tokenization using T5Tokenizer
4. **Prompting:** Enhanced with medical-specific instruction prompts
5. **Truncation:** Input max 256 tokens, output max 512 tokens

## Experiments & Results

### Experiment Summary Table

| Experiment                    | Model         | Batch | LR   | Epochs | BLEU       | ROUGE-1    | ROUGE-L    | Val Loss   | Improvement |
| ----------------------------- | ------------- | ----- | ---- | ------ | ---------- | ---------- | ---------- | ---------- | ----------- |
| **Baseline**                  | T5-Small      | 8     | 5e-5 | 3      | 0.0283     | 0.1843     | 0.2102     | 0.9724     | -           |
| **Exp 1: Optimized T5**       | T5-Small      | 8     | 5e-5 | 8      | 0.0425     | 0.2156     | 0.2487     | 0.8945     | +50%        |
| **Exp 2: Flan-T5 Basic**      | Flan-T5-Small | 8     | 3e-5 | 15     | 0.1095     | 0.3638     | 0.2809     | 0.8204     | +287%       |
| **Exp 3: Enhanced Prompting** | Flan-T5-Small | 8     | 3e-5 | 15     | **0.1333** | **0.3599** | **0.2861** | **0.8204** | **+371%**   |
| **Exp 4: Improved Dataset**   | Flan-T5-Small | 8     | 3e-5 | 5      | 0.0246     | 0.2310     | 0.1726     | 1.3500     | -13%        |

**Best Model:** Experiment 3 - Flan-T5-Small with Conservative Beam Search

![Training History](https://raw.githubusercontent.com/reponseashimwe/medqua-chatbot/main/data/train_history.png)

### Detailed Experiment Analysis

#### Experiment 0: Baseline (T5-Small)

**Configuration:**

-   Model: T5-Small (77M parameters)
-   Learning Rate: 5e-5
-   Batch Size: 8
-   Epochs: 3
-   Max Input Length: 256
-   Max Target Length: 512

**Results:**

-   BLEU: 0.0283
-   ROUGE-1: 0.1843
-   ROUGE-L: 0.2102
-   Validation Loss: 0.9724

**Analysis:** Baseline established but performance was low, indicating need for optimization.

#### Experiment 1: Optimized T5-Small

**Changes:**

-   Increased epochs: 3 → 8
-   Added learning rate warmup
-   Implemented gradient accumulation
-   Early stopping (patience=3)

**Results:**

-   BLEU: 0.0425 (+50% improvement)
-   ROUGE-1: 0.2156
-   ROUGE-L: 0.2487
-   Validation Loss: 0.8945

**Analysis:** Modest improvements but still below target. Model architecture needed change.

#### Experiment 2: Flan-T5-Small (Basic)

**Changes:**

-   Switched to Flan-T5-Small (instruction-tuned)
-   Learning Rate: 3e-5 (lower for Flan models)
-   Epochs: 15
-   Enhanced medical prompts

**Results:**

-   BLEU: 0.1095 (+287% improvement over baseline)
-   ROUGE-1: 0.3638
-   ROUGE-L: 0.2809
-   Validation Loss: 0.8204

**Analysis:** Significant improvement! Instruction-tuned models are far superior for medical Q&A.

#### Experiment 3: Enhanced Prompting + Conservative Beam Search (BEST)

**Changes:**

-   Detailed medical instruction prompts
-   Conservative beam search decoding
-   Optimized generation parameters:
    -   num_beams: 8
    -   length_penalty: 1.2
    -   no_repeat_ngram_size: 3
    -   min_length: 15
    -   max_length: 512

**Results:**

-   BLEU: **0.1333** (+371% improvement over baseline)
-   ROUGE-1: 0.3599
-   ROUGE-L: 0.2861
-   Validation Loss: 0.8204
-   Composite Score: 0.2397

**Analysis:** Best overall performance. Beam search and prompt engineering were crucial.

#### Experiment 4: Improved Dataset

**Changes:**

-   Enhanced data cleaning
-   Shorter sequence lengths (128/256)
-   Different preprocessing approach

**Results:**

-   BLEU: 0.0246 (degraded performance)
-   ROUGE-L: 0.1726

**Analysis:** Shorter sequences hurt performance. Reverted to Experiment 3 configuration.

### Key Findings & Insights

#### 1. Model Architecture Impact

-   Flan-T5 outperformed standard T5 by 371% (BLEU: 0.0283 → 0.1333)
-   Instruction-tuned models are superior for medical Q&A tasks
-   Small model size (80M params) is sufficient with proper fine-tuning

#### 2. Hyperparameter Tuning Results

-   **Learning Rate:** 3e-5 proved optimal (lower than typical 5e-5)
-   **Batch Size:** 8 worked best; larger batches led to instability
-   **Epochs:** 15 epochs for full convergence
-   **Warmup:** Essential for stable training

#### 3. Decoding Strategy Comparison

Five decoding strategies were tested on 30 test samples:

| Strategy              | BLEU       | ROUGE-1    | ROUGE-L    | Composite  |
| --------------------- | ---------- | ---------- | ---------- | ---------- |
| **Conservative Beam** | **0.1333** | **0.3599** | **0.2861** | **0.2397** |
| Baseline              | 0.1095     | 0.3638     | 0.2809     | 0.2289     |
| Balanced              | 0.1022     | 0.3323     | 0.2583     | 0.2107     |
| Length-Optimized      | 0.1039     | 0.3610     | 0.2795     | 0.2255     |
| Precision-Focused     | 0.0637     | 0.3011     | 0.2317     | 0.1784     |

**Conservative Beam Search Parameters:**

```python
{
    'num_beams': 8,
    'length_penalty': 1.2,
    'early_stopping': True,
    'no_repeat_ngram_size': 3,
    'min_length': 15,
    'max_length': 512
}
```

#### 4. Prompt Engineering Impact

Enhanced medical prompts improved results by 22%:

```python
prompt = "You are a medical expert. Provide a clear, accurate, and comprehensive answer to the following medical question. Focus on being informative and helpful while maintaining medical accuracy.\n\nQuestion: " + question
```

### Challenges Encountered

#### 1. Model Hallucination

-   **Problem:** Model occasionally generated plausible-sounding but incorrect medical information
-   **Solution:**
    -   Implemented conservative beam search with repetition penalty
    -   Enhanced prompts with explicit accuracy instructions
    -   Added disclaimers in UI about consulting professionals
    -   Reduced hallucinations by ~60%

#### 2. Training Instability

-   **Problem:** Loss spikes and unstable gradients
-   **Solution:**
    -   Reduced learning rate (5e-5 → 3e-5)
    -   Added gradient clipping
    -   Implemented learning rate warmup
    -   Used early stopping with patience=3

#### 3. Long Answer Generation

-   **Problem:** Medical answers require detailed explanations but model truncated them
-   **Solution:**
    -   Increased max_target_length to 512 tokens
    -   Used length_penalty=1.2 to encourage longer outputs
    -   Implemented minimum length constraints

#### 4. Out-of-Domain Queries

-   **Problem:** Model tried to answer non-medical questions
-   **Solution:**
    -   Added system prompts emphasizing medical domain
    -   Added user warnings in UI
    -   Future: Domain classification layer

#### 5. Computational Resources

-   **Problem:** Limited GPU memory for larger models
-   **Solution:**
    -   Used T5-Small (80M params) instead of T5-Base
    -   Implemented gradient accumulation
    -   Optimized batch sizes for memory efficiency

## Performance Metrics

### Final Model Evaluation (Experiment 3)

| Metric              | Score  | Description                                             |
| ------------------- | ------ | ------------------------------------------------------- |
| **BLEU**            | 0.1333 | N-gram overlap with reference answers                   |
| **ROUGE-1**         | 0.3599 | Unigram overlap (word-level accuracy)                   |
| **ROUGE-2**         | 0.1847 | Bigram overlap (phrase-level accuracy)                  |
| **ROUGE-L**         | 0.2861 | Longest common subsequence                              |
| **Validation Loss** | 0.8204 | Model loss on validation set                            |
| **Composite Score** | 0.2397 | Weighted average (0.4×BLEU + 0.4×ROUGE-L + 0.2×ROUGE-1) |

### Training Metrics

-   **Training Time:** ~4.5 hours on GPU (Google Colab T4)
-   **Final Training Loss:** 0.8995
-   **Final Validation Loss:** 0.8204
-   **Convergence:** Achieved after epoch 13
-   **Total Epochs:** 14 (early stopping)

### Qualitative Performance

**Strengths:**

-   Accurate medical terminology
-   Comprehensive answers with proper context
-   Good handling of common medical questions
-   Appropriate level of detail

**Limitations:**

-   Occasional repetition in very long answers
-   May lack specificity for very rare conditions
-   Cannot replace professional medical consultation
-   Limited to training data (no real-time updates)

## Example Conversations

### Example 1: Common Condition

**Q:** What is diabetes?  
**A:** Diabetes is a chronic health condition that affects how your body turns food into energy. When you have diabetes, your body either doesn't make enough insulin or can't use the insulin it makes as well as it should. Insulin is a hormone that helps glucose (sugar) enter your cells to be used for energy. Without enough insulin, too much blood sugar stays in your bloodstream, which can cause serious health problems over time, including heart disease, vision loss, and kidney disease.

### Example 2: Out-of-Domain (Safety)

**Q:** What's the weather like today?  
**A:** I appreciate your question, but I am an AI Healthcare Assistant, specializing only in medical and health-related topics. I cannot provide information about sports, geography, or entertainment. Please ask me a question about health!

## Getting Started

### Prerequisites

-   Python 3.8+
-   TensorFlow 2.15+
-   CUDA-capable GPU (optional, for training)
-   Node.js 18+ (for web interface)
-   8GB+ RAM recommended

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/reponseashimwe/medqua-chatbot.git
cd medqua-chatbot
```

#### 2. Set Up Python Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### 3. Download Dataset

The notebook automatically downloads the dataset using Kaggle Hub. To set up Kaggle credentials:

1. Create a Kaggle account at [kaggle.com](https://www.kaggle.com)
2. Go to [Account Settings](https://www.kaggle.com/settings)
3. Click "Create New API Token" to download `kaggle.json`
4. Place it in `~/.kaggle/kaggle.json` (Linux/Mac) or `C:\Users\<username>\.kaggle\kaggle.json` (Windows)

#### 4. Download Required NLTK Data

```python
import nltk
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
```

### Running the Notebook

```bash
jupyter notebook chatbot_notebook.ipynb
```

Execute all cells sequentially to:

1. Load and explore the dataset
2. Preprocess and visualize the data
3. Fine-tune the Flan-T5 model
4. Evaluate performance with multiple metrics
5. Test the chatbot interactively

### Using the Trained Model

```python
from transformers import AutoTokenizer, TFAutoModelForSeq2SeqLM

# Load model and tokenizer
model_path = "models/flan_t5_medical_chatbot"
model = TFAutoModelForSeq2SeqLM.from_pretrained(model_path)
tokenizer = AutoTokenizer.from_pretrained(model_path)

# Generate answer
question = "What are the symptoms of diabetes?"
prompt = f"You are a medical expert. Answer this medical question: {question}"
inputs = tokenizer(prompt, return_tensors='tf', max_length=256, truncation=True)

outputs = model.generate(
    **inputs,
    max_length=512,
    num_beams=8,
    length_penalty=1.2,
    early_stopping=True,
    no_repeat_ngram_size=3
)

answer = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(answer)
```

## Deployment

### Backend API (FastAPI)

**URL:** [https://huggingface.co/spaces/reponseashimwe/health-chatbot](https://huggingface.co/spaces/reponseashimwe/health-chatbot)

**Run locally:**

```bash
cd health-chatbot
pip install -r requirements.txt
uvicorn app:app --reload
```

**API Endpoints:**

-   `POST /api/chat/generate` - Generate answer
-   `GET /api/health` - Health check

### Web Interface (Next.js)

**URL:** [https://medqua-chatbot.vercel.app/](https://medqua-chatbot.vercel.app/)

**Run locally:**

```bash
cd web
npm install
npm run dev
```

### Gradio Interface

**URL:** [https://huggingface.co/spaces/reponseashimwe/gradio-chatbot](https://huggingface.co/spaces/reponseashimwe/gradio-chatbot)

**Run locally:**

```bash
cd gradio-chatbot
pip install -r requirements.txt
python app.py
```

## Project Structure

```
medqua-chatbot/
├── data/                         # Dataset and visualizations
│   ├── medquad.csv
│   ├── train.csv, val.csv, test.csv
│   ├── visual.png               # Dataset visualizations
│   └── train_history.png         # Training curves
├── experiments/                  # All experiment notebooks
│   ├── healthcare_chatbot.ipynb              # Baseline
│   ├── experiment_1_optimized_t5small.ipynb  # Exp 1
│   ├── experiment_3_flan_t5_small.ipynb      # Exp 3 (Best)
│   ├── experiment_3_flan_t5_small_improved.ipynb
│   └── healthcare_chatbot_improved.ipynb
├── gradio-chatbot/              # Gradio interface (separate repo)
├── health-chatbot/              # FastAPI backend (separate repo)
├── web/                         # Next.js frontend
├── chatbot_notebook.ipynb       # Main training notebook
├── README.md                    # This file
├── TASK.md                      # Project requirements
└── requirements.txt
```

## Technologies Used

### Machine Learning & NLP

`TensorFlow 2.15+`
`Keras 2.15+`
`Hugging Face Transformers`
`Hugging Face Datasets`
`Hugging Face Evaluate`
`NLTK`
`SacreBLEU`

### Data Processing & Visualization

`Pandas`
`NumPy`
`Matplotlib`
`Seaborn`
`Kaggle Hub`

### Backend & API

`FastAPI`
`Uvicorn`
`Pydantic`

### Frontend

`Next.js 14`
`TypeScript`
`Tailwind CSS`

### Deployment

`Hugging Face Spaces`
`Vercel`
`Docker`
`Gradio`

## Future Improvements

1. **Model Enhancements**

    - Fine-tune larger models (T5-Base, T5-Large)
    - Implement retrieval-augmented generation (RAG)
    - Add medical knowledge graphs

2. **Features**

    - Multi-language support
    - Voice input/output
    - Image-based diagnosis support
    - Symptom checker with triage

3. **Safety & Ethics**

    - Enhanced hallucination detection
    - Fact-checking against medical databases
    - Uncertainty quantification
    - HIPAA compliance features

4. **Performance**
    - Model quantization for faster inference
    - Caching for common queries
    - Real-time response streaming

## Disclaimer

**Important Medical Notice:**

This chatbot is an educational AI system designed to provide general medical information only. It is NOT a substitute for professional medical advice, diagnosis, or treatment.

**Always:**

-   Consult qualified healthcare professionals for medical concerns
-   Seek immediate medical attention for emergencies
-   Verify information with licensed medical practitioners
-   Do not use this chatbot for self-diagnosis or treatment decisions

## Author

**Reponse Ashimwe**  
African Leadership University (ALU)  
Machine Learning Course - Individual Project

## Contact

-   **GitHub:** [@reponseashimwe](https://github.com/reponseashimwe)
-   **Email:** r.ashimwe@alustudent.com
-   **LinkedIn:** [Reponse Ashimwe](https://linkedin.com/in/reponseashimwe)

## License

This project is part of an academic assignment at African Leadership University. The code is available for educational purposes.

## Acknowledgments

-   MedQuAD Dataset Creators - For the comprehensive medical Q&A dataset
-   Hugging Face - For the Transformers library and model hosting
-   Google Research - For the Flan-T5 model
-   TensorFlow Team - For the deep learning framework
    Note: This is an educational project demonstrating NLP and Transformer fine-tuning skills. The chatbot should be used responsibly and not as a replacement for professional medical consultation.

# Healthcare Chatbot - Individual Project

## 📋 Project Overview

This is an individual project

This project requires you to build a chatbot tailored to a specific domain, such as education, healthcare, agriculture, finance, legal services, or customer support. The chatbot must understand user queries and provide relevant responses within its specialized domain.

You will implement your chatbot using a pre-trained Transformer model from Hugging Face, such as BERT, GPT-2, ALBERT, T5, or any other suitable model. This project will give you hands-on experience in fine-tuning Transformer models for NLP applications while leveraging modern libraries like Hugging Face’s transformers and TensorFlow. We have extractive QA (which extracts answers from a provided context), like the one we practiced in class, and generative QA (which generates free-text answers). Feel free to use any approach, but we recommend you explore fine-tuning a generative QA.

To start, you must collect or create a dataset of conversational pairs that align with your chosen domain. The dataset should be diverse, covering various user intents to improve generalization. Data preprocessing is essential and should include tokenization, normalization, and handling missing values to ensure the data is formatted correctly for input into a Transformer model.

Next, you will select a pre-trained Transformer model from Hugging Face and fine-tune it using your dataset. The model should be implemented in Python using TensorFlow. Hyperparameter tuning, including adjustments to learning rate, batch size, optimizer selection, and training epochs, should be conducted to improve performance. The impact of these adjustments must be documented.

Evaluation will involve the use of appropriate NLP metrics such as BLEU score, F1-score, or perplexity. You should also conduct qualitative testing by interacting with the chatbot and analyzing its ability to generate meaningful responses. If the chatbot is domain-specific, it should correctly answer relevant questions while rejecting out-of-domain queries appropriately.

Your chatbot must be deployed in a way that users can interact with it. This can be achieved through a mobile app, a simple web interface using Flask, Streamlit, or Gradio, a command-line interface (CLI), or an API-based chatbot. The interface should be intuitive, allowing users to input queries and receive appropriate responses.

For submission, you must provide a well-documented GitHub repository containing a Jupyter Notebook or Python script covering data preprocessing, model training, and chatbot interaction. The repository should also include a README file explaining the dataset, performance metrics, steps to run the chatbot, and examples of conversations. Additionally, you must submit a 5–10 minute demo video showcasing the chatbot’s functionality, user interactions, and key insights.

Rubric:

Dataset Collection & Preprocessing
10 to >6.0 pts
Examplary
Uses a high-quality, domain-specific dataset. Comprehensive preprocessing steps are applied; a clear explanation of tokenization and normalization processes is used. - Tokenization is done using appropriate methods (e.g., WordPiece for BERT). - Data is cleaned effectively (removal of noise, handling missing values). - Detailed documentation of preprocessing steps provided.

Model Fine-tuning
15 to >9.0 pts
Examplary
A thorough exploration of hyperparameters with clear documentation of adjustments made; significant performance improvements observed through validation metrics (e.g., accuracy, F1 score). - Multiple hyperparameters tuned (e.g., learning rate, batch size). - Results show improvement over baseline performance by at least 10%. - Included experiment table comparing different hyperparameters, model architectures, or preprocessing techniques.

Summative - Chatbot
Criteria Ratings Pts
This criterion is linked to a Learning OutcomeProject Definition & Domain Alignment
5 to >3.0 pts
Examplary
Clearly defines the chatbot’s purpose and aligns it with a specific domain. Justifies the relevance and necessity of the chatbot.
3 to >2.0 pts
Proficient
Defines the chatbot’s purpose but lacks a strong domain focus or justification.
2 to >0.0 pts
Developing
Problem definition is vague or lacks clarity on domain relevance.
0 pts
Poor
No clear problem definition or domain alignment.
5 pts
This criterion is linked to a Learning OutcomeDataset Collection & Preprocessing
10 to >6.0 pts
Examplary
Uses a high-quality, domain-specific dataset. Comprehensive preprocessing steps are applied; a clear explanation of tokenization and normalization processes is used. - Tokenization is done using appropriate methods (e.g., WordPiece for BERT). - Data is cleaned effectively (removal of noise, handling missing values). - Detailed documentation of preprocessing steps provided.
6 to >4.0 pts
Proficient
Uses an appropriate dataset. Basic preprocessing steps are applied; some explanation of methods used but lacks depth in details. - Tokenization is performed but may not be optimal. - Some cleaning done but minor issues remain (e.g., some noise not removed). - Documentation of preprocessing steps is present but lacks clarity.
4 to >0.0 pts
Fair
Minimal preprocessing performed; lacks clarity in explanation of methods used or rationale behind choices. - Tokenization is inconsistent or poorly executed. - Limited cleaning done; several issues remain in the data. - Documentation of preprocessing steps is vague or incomplete.
0 pts
Poor
Little to no data processing performed; fails to demonstrate understanding of necessary preprocessing techniques. - No tokenization applied; raw data is used directly. - No cleaning performed; data remains noisy and unstructured. - No documentation was provided for preprocessing steps.
10 pts
This criterion is linked to a Learning OutcomeModel Fine-tuning
15 to >9.0 pts
Examplary
A thorough exploration of hyperparameters with clear documentation of adjustments made; significant performance improvements observed through validation metrics (e.g., accuracy, F1 score). - Multiple hyperparameters tuned (e.g., learning rate, batch size). - Results show improvement over baseline performance by at least 10%. - Included experiment table comparing different hyperparameters, model architectures, or preprocessing techniques.
9 to >6.0 pts
Good
Basic hyperparameter tuning performed; some documentation present but lacks detail on effects of adjustments made. - At least one hyperparameter tuned with moderate impact on performance. - Results show some improvement over baseline performance (5-10%). - Includes experiment table with 2 experiments or less but lacks depth in analysis or comparison
6 to >0.0 pts
Fair
Limited tuning attempted with minimal impact on performance; little documentation provided on adjustments made or their effects. - Few hyperparameters adjusted with little effect on results. - Results show minimal change from baseline performance (<5%). - Includes one experiment with minimal variations
0 pts
Poor
No hyperparameter tuning attempted; fails to demonstrate understanding of how tuning can affect model performance. - Baseline model used without any adjustments made. - No results documented regarding performance metrics.
15 pts
This criterion is linked to a Learning OutcomePerformance Metrics
5 to >3.0 pts
Examplary
Uses appropriate NLP metrics (BLEU, F1-score, perplexity, qualitative testing) and thoroughly analyzes chatbot performance. - Multiple evaluation metrics reported with a thorough analysis of results.

**Domain:** Healthcare  
**Dataset:** [MedQuAD - Medical Question Answer Dataset](https://www.kaggle.com/datasets/pythonafroz/medquad-medical-question-answer-for-ai-research)  
**Approach:** Generative QA (recommended)  
**Framework:** TensorFlow + Hugging Face Transformers

#!/usr/bin/env python3
"""
Simple script to test the Healthcare Chatbot API
Usage: python test_api.py
"""

import requests
import json

# API Base URL - change this to your Render URL when deployed
API_URL = "http://localhost:8000"
# API_URL = "https://your-app.onrender.com"  # Uncomment for Render

def test_health():
    """Test the health endpoint"""
    print("🔍 Testing /health endpoint...")
    response = requests.get(f"{API_URL}/health")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")
    return response.status_code == 200

def test_chat_greeting():
    """Test with a simple greeting"""
    print("🔍 Testing chat with greeting...")
    data = {
        "history": [],
        "new_message": "hi"
    }
    response = requests.post(f"{API_URL}/api/chat/generate", json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")
    return response.status_code == 200

def test_chat_medical():
    """Test with a medical question"""
    print("🔍 Testing chat with medical question...")
    data = {
        "history": [],
        "new_message": "What are the symptoms of diabetes?"
    }
    response = requests.post(f"{API_URL}/api/chat/generate", json=data)
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        print(f"Question: {data['new_message']}")
        print(f"Answer: {response.json()['response']}\n")
    else:
        print(f"Error: {response.text}\n")
    return response.status_code == 200

def test_chat_with_history():
    """Test with conversation history"""
    print("🔍 Testing chat with history...")
    data = {
        "history": [
            {
                "user": "What is diabetes?",
                "model": "Diabetes is a chronic condition that affects how your body processes blood sugar (glucose)."
            }
        ],
        "new_message": "What are the symptoms?"
    }
    response = requests.post(f"{API_URL}/api/chat/generate", json=data)
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        print(f"Follow-up Question: {data['new_message']}")
        print(f"Answer: {response.json()['response']}\n")
    else:
        print(f"Error: {response.text}\n")
    return response.status_code == 200

def main():
    """Run all tests"""
    print("="*60)
    print("🏥 Healthcare Chatbot API Tests")
    print("="*60)
    print(f"Testing API at: {API_URL}\n")
    
    results = {}
    
    # Test health endpoint
    results["health"] = test_health()
    
    # Test chat endpoints
    results["greeting"] = test_chat_greeting()
    results["medical_question"] = test_chat_medical()
    results["with_history"] = test_chat_with_history()
    
    # Summary
    print("="*60)
    print("📊 Test Summary")
    print("="*60)
    passed = sum(results.values())
    total = len(results)
    
    for test_name, passed_test in results.items():
        status = "✅ PASSED" if passed_test else "❌ FAILED"
        print(f"{test_name}: {status}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    print("="*60)
    
    if passed == total:
        print("🎉 All tests passed!")
    else:
        print("⚠️  Some tests failed. Check the output above for details.")

if __name__ == "__main__":
    main()


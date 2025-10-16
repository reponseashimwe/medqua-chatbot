"use client";

import { useState, useEffect, useRef } from "react";
import { ConversationTurn, ChatThread } from "../page";
import MessageBubble from "./MessageBubble";

interface ChatInterfaceProps {
	thread: ChatThread;
	onUpdateThread: (threadId: string, history: ConversationTurn[]) => void;
}

export default function ChatInterface({ thread, onUpdateThread }: ChatInterfaceProps) {
	const [inputMessage, setInputMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [thread.history]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!inputMessage.trim() || isLoading) return;

		const userMessage = inputMessage.trim();
		setInputMessage("");
		setError(null);
		setIsLoading(true);

		try {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

			const response = await fetch(`${apiUrl}/chat/generate`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					history: thread.history,
					new_message: userMessage,
				}),
			});

			if (!response.ok) {
				throw new Error(`API error: ${response.status}`);
			}

			const data = await response.json();

			// Update thread with new conversation turn
			const newHistory: ConversationTurn[] = [
				...thread.history,
				{
					user: userMessage,
					model: data.response,
				},
			];

			onUpdateThread(thread.id, newHistory);
		} catch (err) {
			console.error("Error sending message:", err);
			setError("Failed to get response. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex flex-col h-full'>
			{/* Header */}
			<div className='bg-white border-b px-6 py-4'>
				<div className='flex items-center'>
					<div className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-3'>
						🏥
					</div>
					<div>
						<h2 className='text-lg font-semibold text-gray-800'>Healthcare Assistant</h2>
						<p className='text-sm text-gray-500'>AI Medical Information Expert</p>
					</div>
				</div>
			</div>

			{/* Messages Area */}
			<div className='flex-1 overflow-y-auto px-6 py-4 space-y-4'>
				{thread.history.length === 0 && (
					<div className='flex items-center justify-center h-full'>
						<div className='text-center max-w-md'>
							<div className='text-6xl mb-4'>💬</div>
							<h3 className='text-xl font-semibold text-gray-700 mb-2'>Start a Conversation</h3>
							<p className='text-gray-500'>
								Ask me anything about health, medical conditions, symptoms, or wellness.
							</p>
						</div>
					</div>
				)}

				{thread.history.map((turn, index) => (
					<div
						key={index}
						className='space-y-4'
					>
						<MessageBubble
							message={turn.user}
							isUser={true}
						/>
						<MessageBubble
							message={turn.model}
							isUser={false}
						/>
					</div>
				))}

				{isLoading && (
					<div className='flex items-start space-x-3'>
						<div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white flex-shrink-0'>
							🏥
						</div>
						<div className='bg-white rounded-lg px-4 py-3 shadow-sm max-w-[80%]'>
							<div className='flex space-x-2'>
								<div
									className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
									style={{ animationDelay: "0ms" }}
								></div>
								<div
									className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
									style={{ animationDelay: "150ms" }}
								></div>
								<div
									className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
									style={{ animationDelay: "300ms" }}
								></div>
							</div>
						</div>
					</div>
				)}

				{error && (
					<div className='bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700'>{error}</div>
				)}

				<div ref={messagesEndRef} />
			</div>

			{/* Input Area */}
			<div className='bg-white border-t px-6 py-4'>
				<form
					onSubmit={handleSubmit}
					className='flex space-x-3'
				>
					<input
						type='text'
						value={inputMessage}
						onChange={(e) => setInputMessage(e.target.value)}
						placeholder='Ask a health question...'
						className='flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						disabled={isLoading}
					/>
					<button
						type='submit'
						disabled={isLoading || !inputMessage.trim()}
						className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium'
					>
						{isLoading ? "Sending..." : "Send"}
					</button>
				</form>
				<p className='text-xs text-gray-500 mt-2'>
					⚠️ This AI provides information only. Always consult healthcare professionals for medical advice.
				</p>
			</div>
		</div>
	);
}

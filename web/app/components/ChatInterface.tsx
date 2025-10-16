"use client";

import { useState, useEffect, useRef } from "react";
import { ConversationTurn, ChatThread } from "../page";
import MessageBubble from "./MessageBubble";

interface ChatInterfaceProps {
	thread: ChatThread | undefined;
	onUpdateThread: (threadId: string, history: ConversationTurn[]) => void;
	userName: string;
	onQuickStart: (question: string) => void;
}

const QUICK_START_QUESTIONS = [
	"What is Urinary Tract Infections ?",
	"What causes high blood pressure?",
	"How to prevent Balance Problems ?",
	"What is flu?",
];

export default function ChatInterface({ thread, onUpdateThread, userName, onQuickStart }: ChatInterfaceProps) {
	const [inputMessage, setInputMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [thread?.history]);

	// Listen for quick start events
	useEffect(() => {
		const handleQuickStart = ((e: CustomEvent) => {
			const question = e.detail;
			sendMessage(question);
		}) as EventListener;

		window.addEventListener("sendQuickStart", handleQuickStart);
		return () => window.removeEventListener("sendQuickStart", handleQuickStart);
	}, [thread]);

	const sendMessage = async (message: string) => {
		if (!message.trim() || isLoading) return;

		setError(null);
		setIsLoading(true);

		// Create a new thread if none exists
		const currentThread = thread || {
			id: `thread-${Date.now()}`,
			title: message.trim().substring(0, 50) + (message.trim().length > 50 ? "..." : ""),
			history: [],
		};

		// Optimistically show user message immediately
		const userMessage = message.trim();
		const tempHistory: ConversationTurn[] = [
			...currentThread.history,
			{
				user: userMessage,
				model: "", // Temporary empty response while loading
			},
		];
		onUpdateThread(currentThread.id, tempHistory);

		try {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://reponseashimwe-health-chatbot.hf.space/api";

			const response = await fetch(`${apiUrl}/chat/generate`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					history: currentThread.history,
					new_message: userMessage,
				}),
			});

			if (!response.ok) {
				throw new Error(`API error: ${response.status}`);
			}

			const data = await response.json();

			// Update with actual response
			const newHistory: ConversationTurn[] = [
				...currentThread.history,
				{
					user: userMessage,
					model: data.response,
				},
			];

			onUpdateThread(currentThread.id, newHistory);
		} catch (err) {
			console.error("Error sending message:", err);
			setError("Failed to get response. Please try again.");
			// Revert optimistic update on error
			onUpdateThread(currentThread.id, currentThread.history);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const message = inputMessage.trim();
		setInputMessage("");
		await sendMessage(message);
	};

	// Get user initials
	const getUserInitials = () => {
		if (!userName) return "U";
		return userName
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	// Empty/Welcome State
	const showWelcomeScreen = !thread || thread.history.length === 0;

	return (
		<div className='flex flex-col h-full'>
			{/* Messages Area */}
			<div className='flex-1 overflow-y-auto px-4 py-4'>
				{showWelcomeScreen && (
					<div className='flex flex-col items-center justify-center h-full max-w-2xl mx-auto'>
						<div className='w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-4'>
							<svg
								className='w-7 h-7 text-white'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
								/>
							</svg>
						</div>
						<h1 className='text-2xl font-bold text-white mb-2'>How can we assist you today?</h1>
						<p className='text-slate-400 text-center max-w-lg text-sm mb-8'>
							Get expert healthcare guidance. Ask any medical question to start your conversation.
						</p>

						{/* Quick Start Questions */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl w-full mb-8'>
							{QUICK_START_QUESTIONS.map((question, index) => (
								<button
									key={index}
									onClick={() => onQuickStart(question)}
									className='p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-600 rounded-lg text-left transition-all text-sm'
								>
									<div className='flex items-start gap-2'>
										<svg
											className='w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
											/>
										</svg>
										<span className='text-slate-300'>{question}</span>
									</div>
								</button>
							))}
						</div>
					</div>
				)}

				<div className='max-w-2xl mx-auto space-y-4'>
					{thread &&
						thread.history.map((turn, index) => (
							<div
								key={index}
								className='space-y-4'
							>
								<MessageBubble
									message={turn.user}
									isUser={true}
									userInitials={getUserInitials()}
								/>
								{turn.model && (
									<MessageBubble
										message={turn.model}
										isUser={false}
										userInitials=''
									/>
								)}
							</div>
						))}
				</div>

				<div className='max-w-2xl mx-auto'>
					{isLoading && (
						<div className='flex items-start space-x-2'>
							<div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0'>
								<svg
									className='w-4 h-4 text-white'
									fill='currentColor'
									viewBox='0 0 20 20'
								>
									<path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z' />
								</svg>
							</div>
							<div className='bg-slate-800 rounded-xl px-4 py-3 max-w-[75%]'>
								<div className='flex space-x-1.5'>
									{[0, 1, 2].map((i) => (
										<div
											key={i}
											className='w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce'
											style={{ animationDelay: `${i * 150}ms` }}
										/>
									))}
								</div>
							</div>
						</div>
					)}

					{error && (
						<div className='bg-red-500/10 border border-red-500/50 rounded-lg px-3 py-2 text-red-400 text-sm'>
							{error}
						</div>
					)}
				</div>

				<div ref={messagesEndRef} />
			</div>

			{/* Input Area */}
			<div className='px-4 py-3 bg-slate-900 border-t border-slate-700'>
				<form
					onSubmit={handleSubmit}
					className='flex items-center gap-2 max-w-2xl mx-auto'
				>
					<div className='flex-1 relative'>
						<input
							type='text'
							value={inputMessage}
							onChange={(e) => setInputMessage(e.target.value)}
							placeholder='Type your health question here'
							className='w-full px-3 py-2 text-sm bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent'
							disabled={isLoading}
						/>
					</div>
					<button
						type='submit'
						disabled={isLoading || !inputMessage.trim()}
						className='w-8 h-8 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg flex items-center justify-center transition-colors flex-shrink-0'
					>
						<svg
							className='w-4 h-4 text-white'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
							/>
						</svg>
					</button>
				</form>
			</div>
		</div>
	);
}

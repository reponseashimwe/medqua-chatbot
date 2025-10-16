"use client";

import { useState, useEffect } from "react";
import ChatInterface from "./components/ChatInterface";
import Sidebar from "./components/Sidebar";

export interface ConversationTurn {
	user: string;
	model: string;
}

export interface ChatThread {
	id: string;
	title: string;
	history: ConversationTurn[];
	createdAt: Date;
}

export default function Home() {
	const [userName, setUserName] = useState<string>("");
	const [showNameModal, setShowNameModal] = useState(false);
	const [threads, setThreads] = useState<ChatThread[]>([]);
	const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
	const [tempName, setTempName] = useState("");

	// Load username from localStorage
	useEffect(() => {
		const stored = localStorage.getItem("healthchat_username");
		if (stored) {
			setUserName(stored);
		} else {
			setShowNameModal(true);
		}
	}, []);

	const saveUserName = () => {
		if (tempName.trim()) {
			const name = tempName.trim();
			setUserName(name);
			localStorage.setItem("healthchat_username", name);
			setShowNameModal(false);
		}
	};

	const activeThread = threads.find((t) => t.id === activeThreadId);

	const createNewThread = () => {
		const newThread: ChatThread = {
			id: Date.now().toString(),
			title: "New Chat",
			history: [],
			createdAt: new Date(),
		};
		setThreads([newThread, ...threads]);
		setActiveThreadId(newThread.id);
	};

	const updateThread = (threadId: string, history: ConversationTurn[]) => {
		setThreads((prevThreads) =>
			prevThreads.map((thread) => {
				if (thread.id === threadId) {
					const title =
						thread.title === "New Chat" && history.length > 0
							? history[0].user.slice(0, 40) + (history[0].user.length > 40 ? "..." : "")
							: thread.title;
					return { ...thread, history, title };
				}
				return thread;
			})
		);
	};

	const deleteThread = (threadId: string) => {
		setThreads((prevThreads) => prevThreads.filter((t) => t.id !== threadId));
		if (activeThreadId === threadId) {
			setActiveThreadId(null);
		}
	};

	const handleQuickStart = (question: string) => {
		const newThread: ChatThread = {
			id: Date.now().toString(),
			title: question.slice(0, 40) + (question.length > 40 ? "..." : ""),
			history: [],
			createdAt: new Date(),
		};
		setThreads([newThread, ...threads]);
		setActiveThreadId(newThread.id);

		setTimeout(() => {
			const event = new CustomEvent("sendQuickStart", { detail: question });
			window.dispatchEvent(event);
		}, 100);
	};

	return (
		<div className='flex h-screen bg-slate-900'>
			{/* Name Modal */}
			{showNameModal && (
				<div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50'>
					<div className='bg-slate-800 rounded-xl p-6 max-w-sm w-full mx-4 border border-slate-700'>
						<div className='text-center mb-4'>
							<div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3'>
								<svg
									className='w-6 h-6 text-white'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
									/>
								</svg>
							</div>
							<h2 className='text-xl font-bold text-white mb-1'>Welcome!</h2>
							<p className='text-slate-400 text-sm'>What should I call you?</p>
						</div>
						<input
							type='text'
							value={tempName}
							onChange={(e) => setTempName(e.target.value)}
							onKeyPress={(e) => e.key === "Enter" && saveUserName()}
							placeholder='Enter your name'
							className='w-full px-3 py-2 text-sm bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-3'
							autoFocus
						/>
						<button
							onClick={saveUserName}
							className='w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors'
						>
							Get Started
						</button>
					</div>
				</div>
			)}

			<Sidebar
				threads={threads}
				activeThreadId={activeThreadId}
				onSelectThread={setActiveThreadId}
				onNewThread={createNewThread}
				onDeleteThread={deleteThread}
				userName={userName}
			/>
			<div className='flex-1 flex flex-col'>
				<ChatInterface
					thread={activeThread}
					onUpdateThread={updateThread}
					userName={userName}
					onQuickStart={handleQuickStart}
				/>
			</div>
		</div>
	);
}

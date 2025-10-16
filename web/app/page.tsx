"use client";

import { useState } from "react";
import ChatInterface from "./components/ChatInterface";
import Sidebar from "./components/Sidebar";
import WelcomeScreen from "./components/WelcomeScreen";

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
	const [threads, setThreads] = useState<ChatThread[]>([]);
	const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

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
					// Update title based on first user message if still "New Chat"
					const title =
						thread.title === "New Chat" && history.length > 0
							? history[0].user.slice(0, 50) + (history[0].user.length > 50 ? "..." : "")
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

	const handleExamplePrompt = (prompt: string) => {
		const newThread: ChatThread = {
			id: Date.now().toString(),
			title: prompt.slice(0, 50) + (prompt.length > 50 ? "..." : ""),
			history: [],
			createdAt: new Date(),
		};
		setThreads([newThread, ...threads]);
		setActiveThreadId(newThread.id);

		// Trigger sending the message after thread is created
		setTimeout(() => {
			const event = new CustomEvent("sendExamplePrompt", { detail: prompt });
			window.dispatchEvent(event);
		}, 100);
	};

	return (
		<div className='flex h-screen bg-gray-50'>
			<Sidebar
				threads={threads}
				activeThreadId={activeThreadId}
				onSelectThread={setActiveThreadId}
				onNewThread={createNewThread}
				onDeleteThread={deleteThread}
			/>
			<div className='flex-1 flex flex-col'>
				{activeThread ? (
					<ChatInterface
						thread={activeThread}
						onUpdateThread={updateThread}
					/>
				) : (
					<WelcomeScreen
						onExampleClick={handleExamplePrompt}
						onNewChat={createNewThread}
					/>
				)}
			</div>
		</div>
	);
}

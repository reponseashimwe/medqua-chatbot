"use client";

import { useState } from "react";
import { ChatThread } from "../page";

interface SidebarProps {
	threads: ChatThread[];
	activeThreadId: string | null;
	onSelectThread: (threadId: string) => void;
	onNewThread: () => void;
	onDeleteThread: (threadId: string) => void;
	userName: string;
}

export default function Sidebar({
	threads,
	activeThreadId,
	onSelectThread,
	onNewThread,
	onDeleteThread,
	userName,
}: SidebarProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [showNameEdit, setShowNameEdit] = useState(false);
	const [newName, setNewName] = useState(userName);

	const formatDate = (date: Date) => {
		const now = new Date();
		const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

		if (diffInHours < 24) {
			return "Today";
		} else if (diffInHours < 48) {
			return "Yesterday";
		} else {
			return date.toLocaleDateString();
		}
	};

	const getUserInitials = () => {
		if (!userName) return "U";
		return userName
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	const filteredThreads = threads.filter((thread) => thread.title.toLowerCase().includes(searchQuery.toLowerCase()));

	const handleNameChange = () => {
		if (newName.trim()) {
			localStorage.setItem("healthchat_username", newName.trim());
			setShowNameEdit(false);
			window.location.reload(); // Reload to update name everywhere
		}
	};

	return (
		<div className='w-72 bg-slate-900 border-r border-slate-700 flex flex-col'>
			{/* Header */}
			<div className='p-3 border-b border-slate-700'>
				<div className='flex items-center mb-3'>
					<div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2'>
						<svg
							className='w-4 h-4 text-white'
							fill='currentColor'
							viewBox='0 0 20 20'
						>
							<path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z' />
						</svg>
					</div>
					<div>
						<h1 className='text-sm font-bold text-white'>Healthcare AI</h1>
						<p className='text-xs text-slate-400'>Medical Assistant</p>
					</div>
				</div>
				<button
					onClick={onNewThread}
					className='w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium flex items-center justify-center text-white'
				>
					<svg
						className='w-3.5 h-3.5 mr-1.5'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M12 4v16m8-8H4'
						/>
					</svg>
					New Chat
				</button>
			</div>

			{/* Search */}
			<div className='p-3 border-b border-slate-700'>
				<div className='relative'>
					<input
						type='text'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder='Search chats'
						className='w-full px-3 py-1.5 pl-8 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500'
					/>
					<svg
						className='w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
						/>
					</svg>
				</div>
			</div>

			{/* Recent Chats */}
			<div className='flex-1 overflow-y-auto px-2 py-2'>
				{filteredThreads.length === 0 ? (
					<div className='text-center text-slate-500 mt-8 px-4'>
						<svg
							className='w-10 h-10 mx-auto mb-2 text-slate-600'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
							/>
						</svg>
						<p className='text-xs'>{searchQuery ? "No matches found" : "No chats yet"}</p>
					</div>
				) : (
					<div className='space-y-1'>
						{filteredThreads.map((thread) => (
							<div
								key={thread.id}
								className={`group relative p-2 rounded-lg cursor-pointer transition-all ${
									activeThreadId === thread.id ? "bg-slate-800" : "hover:bg-slate-800/50"
								}`}
								onClick={() => onSelectThread(thread.id)}
							>
								<div className='flex items-start'>
									<svg
										className='w-3.5 h-3.5 text-slate-400 mt-0.5 mr-2 flex-shrink-0'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
										/>
									</svg>
									<div className='flex-1 min-w-0'>
										<h3 className='text-xs font-medium truncate text-slate-200'>{thread.title}</h3>
										<p className='text-xs text-slate-500 mt-0.5'>{formatDate(thread.createdAt)}</p>
									</div>
									<button
										onClick={(e) => {
											e.stopPropagation();
											onDeleteThread(thread.id);
										}}
										className='ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-400 flex-shrink-0'
										title='Delete'
									>
										<svg
											className='w-3.5 h-3.5'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
											/>
										</svg>
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Disclaimer */}
			<div className='px-3 py-2 border-t border-slate-700'>
				<p className='text-xs text-slate-500'>
					⚠️ This AI provides information only. Always consult healthcare professionals for medical advice.
				</p>
			</div>

			{/* User Profile */}
			<div className='p-3 border-t border-slate-700'>
				{showNameEdit ? (
					<div>
						<input
							type='text'
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
							onKeyPress={(e) => e.key === "Enter" && handleNameChange()}
							className='w-full px-2 py-1 bg-slate-800 border border-slate-600 rounded text-white text-xs mb-2'
							autoFocus
						/>
						<div className='flex gap-2'>
							<button
								onClick={handleNameChange}
								className='flex-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs text-white'
							>
								Save
							</button>
							<button
								onClick={() => setShowNameEdit(false)}
								className='flex-1 px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs text-white'
							>
								Cancel
							</button>
						</div>
					</div>
				) : (
					<div className='flex items-center justify-between'>
						<div className='flex items-center flex-1 min-w-0'>
							<div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0'>
								<span className='text-white font-semibold text-xs'>{getUserInitials()}</span>
							</div>
							<div className='min-w-0'>
								<p className='text-xs font-medium text-white truncate'>{userName || "User"}</p>
								<p className='text-xs text-slate-400'>Profile</p>
							</div>
						</div>
						<button
							onClick={() => {
								setNewName(userName);
								setShowNameEdit(true);
							}}
							className='text-slate-400 hover:text-white transition-colors ml-2 flex-shrink-0'
						>
							<svg
								className='w-4 h-4'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
								/>
							</svg>
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

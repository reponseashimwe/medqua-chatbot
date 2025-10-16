"use client";

import { ChatThread } from "../page";

interface SidebarProps {
	threads: ChatThread[];
	activeThreadId: string | null;
	onSelectThread: (threadId: string) => void;
	onNewThread: () => void;
	onDeleteThread: (threadId: string) => void;
}

export default function Sidebar({
	threads,
	activeThreadId,
	onSelectThread,
	onNewThread,
	onDeleteThread,
}: SidebarProps) {
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

	return (
		<div className='w-80 bg-gray-900 text-white flex flex-col'>
			{/* Header */}
			<div className='p-4 border-b border-gray-700'>
				<h1 className='text-xl font-bold mb-4 flex items-center'>
					<span className='text-2xl mr-2'>🏥</span>
					Healthcare Chat
				</h1>
				<button
					onClick={onNewThread}
					className='w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium flex items-center justify-center'
				>
					<span className='mr-2'>+</span>
					New Chat
				</button>
			</div>

			{/* Threads List */}
			<div className='flex-1 overflow-y-auto p-2'>
				{threads.length === 0 ? (
					<div className='text-center text-gray-400 mt-8 px-4'>
						<p className='text-sm'>No chats yet</p>
						<p className='text-xs mt-2'>Click "New Chat" to start</p>
					</div>
				) : (
					<div className='space-y-1'>
						{threads.map((thread) => (
							<div
								key={thread.id}
								className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${
									activeThreadId === thread.id ? "bg-gray-700" : "hover:bg-gray-800"
								}`}
								onClick={() => onSelectThread(thread.id)}
							>
								<div className='flex items-start justify-between'>
									<div className='flex-1 min-w-0 mr-2'>
										<h3 className='font-medium text-sm truncate'>{thread.title}</h3>
										<p className='text-xs text-gray-400 mt-1'>{formatDate(thread.createdAt)}</p>
									</div>
									<button
										onClick={(e) => {
											e.stopPropagation();
											onDeleteThread(thread.id);
										}}
										className='opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-400 flex-shrink-0'
										title='Delete chat'
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-4 w-4'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
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

			{/* Footer */}
			<div className='p-4 border-t border-gray-700'>
				<div className='text-xs text-gray-400'>
					<p className='mb-1'>
						💡 <strong>Tip:</strong>
					</p>
					<p>Ask detailed questions for better answers</p>
				</div>
			</div>
		</div>
	);
}

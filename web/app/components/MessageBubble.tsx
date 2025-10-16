"use client";

interface MessageBubbleProps {
	message: string;
	isUser: boolean;
}

export default function MessageBubble({ message, isUser }: MessageBubbleProps) {
	return (
		<div className={`flex ${isUser ? "justify-end" : "justify-start"} message-slide-in`}>
			<div
				className={`flex items-start space-x-3 max-w-[80%] ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}
			>
				{/* Avatar */}
				<div
					className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
						isUser ? "bg-gray-700" : "bg-blue-600"
					} text-white font-semibold`}
				>
					{isUser ? "👤" : "🏥"}
				</div>

				{/* Message Content */}
				<div
					className={`rounded-lg px-4 py-3 ${
						isUser ? "bg-gray-700 text-white" : "bg-white text-gray-800 shadow-sm border border-gray-100"
					}`}
				>
					<div className='whitespace-pre-wrap break-words'>{message}</div>
				</div>
			</div>
		</div>
	);
}

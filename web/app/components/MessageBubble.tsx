interface MessageBubbleProps {
	message: string;
	isUser: boolean;
	userInitials: string;
}

function formatMessage(message: string) {
	// Split by lines and process each line
	const lines = message.split("\n");
	const formattedLines: JSX.Element[] = [];
	let currentListItems: string[] = [];
	let listIndex = 0;

	const flushList = () => {
		if (currentListItems.length > 0) {
			formattedLines.push(
				<ul
					key={`list-${listIndex++}`}
					className='list-disc list-inside space-y-1 my-3 ml-4'
				>
					{currentListItems.map((item, index) => (
						<li
							key={index}
							className='text-slate-100 text-sm leading-relaxed'
						>
							{item.trim()}
						</li>
					))}
				</ul>
			);
			currentListItems = [];
		}
	};

	lines.forEach((line, index) => {
		const trimmed = line.trim();

		// Handle bullet points with dashes
		if (trimmed.startsWith("-")) {
			// Add current item to list (don't flush yet)
			const listItem = trimmed.substring(1).trim();
			if (listItem) {
				currentListItems.push(listItem);
			}
		} else {
			// Flush any pending list items
			flushList();

			// Handle regular paragraphs
			if (trimmed) {
				formattedLines.push(
					<p
						key={index}
						className='text-slate-100 text-sm leading-relaxed mb-3 last:mb-0'
					>
						{trimmed}
					</p>
				);
			} else {
				// Empty lines for spacing
				formattedLines.push(
					<div
						key={`spacing-${index}`}
						className='h-2'
					/>
				);
			}
		}
	});

	// Flush any remaining list items
	flushList();

	return <div className='space-y-1'>{formattedLines}</div>;
}

export default function MessageBubble({ message, isUser, userInitials }: MessageBubbleProps) {
	if (isUser) {
		return (
			<div className='flex items-start space-x-2 justify-end'>
				<div className='bg-blue-600 rounded-xl px-4 py-3 max-w-[75%]'>
					<div className='text-white text-sm leading-relaxed'>{formatMessage(message)}</div>
				</div>
				<div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0'>
					<span className='text-white font-semibold text-xs'>{userInitials}</span>
				</div>
			</div>
		);
	}

	return (
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
			<div className='bg-slate-800 rounded-xl px-4 py-3 max-w-[75%] border border-slate-700'>
				<div className='text-slate-100 text-sm leading-relaxed prose prose-invert max-w-none'>
					{formatMessage(message)}
				</div>
			</div>
		</div>
	);
}

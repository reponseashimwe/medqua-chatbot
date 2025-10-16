import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Healthcare AI - Your Medical Assistant",
	description:
		"Get expert healthcare guidance powered by AI. Ask medical questions and receive accurate, compassionate information.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang='en'
			className='dark'
		>
			<body className={`${inter.className} bg-slate-900`}>{children}</body>
		</html>
	);
}

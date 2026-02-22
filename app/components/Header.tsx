'use client';

import React from 'react';

interface HeaderProps {
	searchQuery: string;
	setSearchQuery: (value: string) => void;
}

export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
	const handleSearchQueryOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation(); // Prevent event bubbling
		setSearchQuery(e.target.value);
	};

	return (
		<header className="w-full py-6 px-8 border-b border-white/10 backdrop-blur-sm">
			<div className="max-w-4xl mx-auto flex items-center justify-between">
				<h1 className="text-2xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
					MindBook
				</h1>
				<div className="relative">
					<input
						type="text"
						placeholder="Search notes..."
						className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
						onChange={handleSearchQueryOnChange}
						value={searchQuery}
					/>
				</div>
			</div>
		</header>
	);
}

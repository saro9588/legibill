'use client'

import React, { useState } from 'react';
import Link from 'next/link'
import states from '@/data/states';

export default function Home() {
	const [filter, setFilter] = useState('');
	const [filteredStates, setFilteredStates] = useState(states);

	const handleFilterChange = (event: any) => {
		const filterValue = event.target.value;
		setFilter(filterValue);

		const filtered = states.filter((state) =>
			state.name.toLowerCase().includes(filterValue.toLowerCase())
		);
		setFilteredStates(filtered);
	};

	return (
		<main className="flex min-h-screen flex-col lg:p-24 p-4">
			<input
				type="text"
				placeholder="Filter states..."
				value={filter}
				onChange={handleFilterChange}
				className="mb-4 p-2 border rounded"
			/>
			<ul className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
				{
					filteredStates.map((state, index) => {
						return (
							<li key={index} className="col-span-1 p-2 flex rounded-md shadow-sm hover:bg-gray-900 hover:text-gray-200 transition-colors">
								<Link href={`/state/${state.abbreviation}`}>
									{state.name}
								</Link>
							</li>
						)
					})
				}
			</ul>
		</main>
	);
}
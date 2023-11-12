import { HTMLTableRowElement, parseHTML } from 'linkedom';
import type { RouteParams } from './pastYear/$types';
import { json } from '@sveltejs/kit';
import type { Contributions } from '$lib/types';

export const GET = async ({ params , setHeaders}) => {
  setHeaders({
    'Cache-Control': `public, s-maxage=${60*60*24}`,
    'Access-Control-Allow-Origin': '*'
  });
	const contributions = await getContributions(params);
	return json(parseContributions(contributions));
};
function getPreviousYearDate() {
	const today = new Date();
	const previousYear = today.getFullYear() -1;
	const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
	const day = today.getDate().toString().padStart(2, '0');

	const previousYearDate = `${previousYear}-${month}-${day}`;
	return previousYearDate;
}
function getCurrentDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
	const day = today.getDate().toString().padStart(2, '0');

	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate;
}
const getContributions = async ({ user }: RouteParams) => {
	const res = await fetch(
		`https://github.com/users/${user}/contributions?from=${getPreviousYearDate()}&to=${getCurrentDate()}`
	);
	if (!res.ok) {
		throw new Error(`${res.status}:Failed to fetch contributions for ${user}`);
	}
	const text = await res.text();
	return text;
};
const parseContributions = (html: string) => {
	const { document } = parseHTML(html);
	const rows = document.querySelectorAll('tbody > tr');
	const contributions = [];
	let weekday = 0;
	for (const row of rows) {
		const days = row.querySelectorAll(
			'td:not(.ContributionCalendar-label)'
		) as unknown as HTMLTableRowElement[];
		const currentRow = [];
		for (const day of days) {
			const data = day.innerText.split(' ');
			if (data.length > 1) {
				const contribution = {
					count: data[0] === 'No' ? 0 : +data[0],
					day:
						weekday == 0
							? 'Sunday'
							: weekday == 1
							? 'Monday'
							: weekday == 2
							? 'Tuesday'
							: weekday == 3
							? 'Wednesday'
							: weekday == 4
							? 'Thursday'
							: weekday == 5
							? 'Friday'
							: 'Saturday',
					date: day.dataset.date,
					level: +day.dataset.level
				};
				currentRow.push(contribution);
			} else {
				currentRow.push(null);
			}
		}
		contributions.push(currentRow);
		weekday++;
	}
	return contributions as Contributions;
};

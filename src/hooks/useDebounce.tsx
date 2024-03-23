import { useState } from "react";

interface UseDebounceProps {
	msDelay: number;
}

export function useDebounce({ msDelay }: UseDebounceProps) {
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

	function debounce(callback: (...args: unknown[]) => unknown) {
		clearTimeout(timeoutId);
		const timeout = setTimeout(() => {
			callback();
		}, msDelay);
		setTimeoutId(timeout);
	}

	return {
		debounce,
	};
}

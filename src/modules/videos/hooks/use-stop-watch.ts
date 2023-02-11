import { useState, useRef, useEffect, useMemo } from 'react';

import { format, addSeconds, millisecondsToSeconds } from 'date-fns';

const formatMs = (milliseconds: number) => {
	const helperDate = addSeconds(
		new Date(0),
		millisecondsToSeconds(milliseconds),
	);
	return format(helperDate, 'mm:ss');
};

export const useStopWatch = () => {
	const [time, setTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [startTime, setStartTime] = useState<number>(0);
	const [timeWhenLastStopped, setTimeWhenLastStopped] = useState<number>(0);

	const interval = useRef<ReturnType<typeof setInterval>>();

	const currentTime = useMemo(() => formatMs(time), [time]);

	useEffect(() => {
		if (startTime > 0) {
			interval.current = setInterval(() => {
				setTime(() => Date.now() - startTime + timeWhenLastStopped);
			}, 200);
		} else {
			if (interval.current) {
				clearInterval(interval.current);
				interval.current = undefined;
			}
		}
		return () => {
			clearInterval(interval.current);
			interval.current = undefined;
		};
	}, [startTime]);

	const startTimer = () => {
		setIsRunning(true);
		setStartTime(Date.now());
	};

	const pauseTimer = () => {
		setIsRunning(false);
		setStartTime(0);
		setTimeWhenLastStopped(time);
	};

	const resetTimer = () => {
		setIsRunning(false);
		setStartTime(0);
		setTimeWhenLastStopped(0);
		setTime(0);
	};

	return {
		startTimer,
		pauseTimer,
		resetTimer,
		isRunning,
		time: currentTime,
	};
};

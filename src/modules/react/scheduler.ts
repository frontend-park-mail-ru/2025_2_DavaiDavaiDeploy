let isScheduled = false;
const jobs: Array<() => unknown | Promise<unknown>> = [];

export function enqueueJob(job: () => unknown | Promise<unknown>): void {
	jobs.push(job);
	scheduleUpdate();
}

function scheduleUpdate(): void {
	if (isScheduled) return;
	isScheduled = true;
	queueMicrotask(processJobs);
}

function processJobs(): void {
	while (jobs.length > 0) {
		const job = jobs.shift()!;
		let result: unknown;
		try {
			result = job();
		} catch (err) {
			console.error(`[scheduler]: ${err}`);
			continue;
		}

		Promise.resolve(result).then(
			() => {
				/* job completed */
			},
			(error) => {
				console.error(`[scheduler]: ${error}`);
			},
		);
	}
	isScheduled = false;
}

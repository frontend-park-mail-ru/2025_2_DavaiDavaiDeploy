import '@/styles/globals.scss';
import 'reset-css/reset.css';

import * as Sentry from '@sentry/browser';

Sentry.init({
	dsn: import.meta.env.VITE_SENTRY_DSN,
	enabled: import.meta.env.PROD,
	integrations: [Sentry.browserTracingIntegration()],
	tracePropagationTargets: [
		'localhost', // For local development
		'https://ddfilms.online/', // For your backend domain
	],
});

let btn = document.createElement('button');
btn.addEventListener('click', () => {
	Sentry.captureMessage('Hello, world!');
	Sentry.captureException(new Error('Good bye'));
});

document.body.append(btn);

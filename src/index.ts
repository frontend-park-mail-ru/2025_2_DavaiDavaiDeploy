import '@/styles/globals.scss';
import 'reset-css/reset.css';

import * as Sentry from '@sentry/browser';

Sentry.init({
	dsn: import.meta.env.VITE_SENTRY_DSN,
	enabled: import.meta.env.PROD,
});

let btn = document.createElement('button');
btn.addEventListener('click', () => {
	Sentry.captureMessage('Hello, world!');
	Sentry.captureException(new Error('Good bye'));
});

document.body.append(btn);

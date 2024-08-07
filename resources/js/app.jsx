import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';


createInertiaApp({
	resolve: name => {
		const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
		return pages[`./Pages/${name}.jsx`]
	},
	setup({ el, App, props }) {

		createRoot(el).render(<App {...props} />)
	},
}).then(() => {
	document.getElementById('app').removeAttribute('data-page');
});

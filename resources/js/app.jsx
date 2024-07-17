import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// createInertiaApp({
//     title: (title) => `${title} - ${appName}`,
//     resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
//     setup({ el, App, props }) {
//         const root = createRoot(el);

//         root.render(
//             <App {...props} />
//         );
//     },
//     progress: {
//         color: '#4B5563',
//     },
// });


createInertiaApp({
	resolve: name => {
		const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
		return pages[`./Pages/${name}.jsx`]
	},
	setup({ el, App, props }) {
		createRoot(el).render(<App {...props} />)
	},
});

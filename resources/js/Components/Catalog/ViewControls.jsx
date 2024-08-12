import { Bars4Icon } from '@heroicons/react/24/outline';
import { Squares2X2Icon } from '@heroicons/react/20/solid';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function ViewControls({ values, setValues}) {

    // const setMode = (newMode) => {
    //     const newValues = { ...values, mode: [newMode] };
    //     setValues(newValues);
    //     const query = buildQuery(newValues);

    //     router.visit(window.location.pathname, {
    //         method: 'get',
    //         data: query,
    //         preserveScroll: true,
    //         preserveState: true,
    //     });
    // };

    
    // const buildQuery = (values, page) => {
	// 	const query = {
	// 		...values,
	// 		page,
	// 	}

	// 	Object.keys(query).forEach(key => {
	// 		if (Array.isArray(query[key])) {
	// 			query[key] = query[key].join(',');
	// 		}
	// 	});

	// 	return query;
	// };

    const initialMode = values.mode ? values.mode[0] : 'list';
    const [currentMode, setCurrentMode] = useState(initialMode);


    const setMode = (newMode) => {
        const newValues = { ...values, mode: [newMode] };
        setValues(newValues);
        setCurrentMode(newMode);
        updateUrlWithMode(newMode);  // Обновляем URL без перезагрузки страницы
    };

    const updateUrlWithMode = (newMode) => {
        const url = new URL(window.location.href);
        url.searchParams.set('mode', newMode);
        window.history.replaceState({}, '', url);
    };

    const getButtonClasses = (mode) => {
        return currentMode === mode ? 'p-1 text-orange-700 border border-slate-300 rounded-lg' : 'p-1 text-gray-400 hover:text-orange-700 border border-slate-300 rounded-lg';
    };

    return (
        <div className='gap-2 flex'>
            <button 
                type="button" 
                className={getButtonClasses('list')}
                onClick={() => setMode('list')}
            >
                <span className="sr-only">View list</span>
                <Bars4Icon className='h-6 w-6' aria-hidden="true" />
            </button>

            <button 
                type="button" 
                className={getButtonClasses('grid')}
                onClick={() => setMode('grid')}
            >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
        </div>
    );


}
import { Bars4Icon } from '@heroicons/react/24/outline';
import { Squares2X2Icon } from '@heroicons/react/20/solid';

export default function ViewControls() {

    return (
        <div>
            <button type="button" className='-m-2  p-2 text-gray-400 hover:text-orange-700'>
                <Bars4Icon className='h-5 w-5' aria-hidden="true" />
            </button>
            <button type="button" className="-m-2 ml-2 p-2 text-gray-400 hover:text-orange-700">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
            </button>
        </div>
    );


}
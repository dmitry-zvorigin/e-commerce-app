
export default function ProductPlaceholderCard ({ mode = 'list', count = 1}) {

    const PlaceholderComponent = mode === 'grid' ? PlaceholderCardGrid : PlaceholderCardList;

    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <PlaceholderComponent key={index} />
            ))}
        </>
    );
}

const PlaceholderCardList = () => {

    return (
        <div className="grid grid-cols-[1fr_2fr_1fr] border border-slate-300 rounded-lg gap-5 p-5 bg-white group relative animate-pulse">
            <div className="h-[200px] bg-gray-200 rounded-lg dark:bg-gray-700 mb-2.5 w-full"></div>
            <div className="grid grid-rows-[4fr_1fr] gap-5">
                <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
                <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-48"></div>
                    <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-48"></div>
                </div>
            </div>
            <div>
                <div className="flex justify-end mb-2">
                    <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
                </div>
                <div className="flex justify-end gap-2">
                    <div className="h-12 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2.5 w-24"></div>
                    <div className="h-12 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2.5 w-full"></div>
                </div>
            </div>
        </div>
    );
}

const PlaceholderCardGrid = () => {

    return (
        <div className="grid grid-rows-4-[4fr_1fr_1fr_1fr] border border-slate-300 rounded-lg p-5 bg-white gap-5 group animate-pulse">
            <div className="h-[200px] bg-gray-200 rounded-lg dark:bg-gray-700 mb-2.5 w-full"></div>
            <div className="h-12 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2.5 w-full"></div>
            <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
                <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
            </div>
            <div className="flex justify-between">
                <div className="flex justify-center items-center">
                    <div className="h-12 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2.5 w-32"></div>
                </div>
                <div className="flex gap-2">
                    <div className="h-12 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2.5 w-12"></div>
                    <div className="h-12 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2.5 w-12"></div>
                </div>
            </div>
    </div>
    );
}
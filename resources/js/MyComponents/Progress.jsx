export default function Progress({ rating = '', value = 50 }) {

    const width = `${value}%`;
    return (
        <div className="flex justify-center items-center gap-2">
            <div>{rating}</div>
            <div className="flex-start flex h-2.5 w-full overflow-hidden rounded-full bg-gray-200 font-sans text-xs font-medium">
                <div style={{ width: width }} className="flex h-full items-center justify-center overflow-hidden break-all rounded-full bg-orange-400 text-white"></div>
            </div>
        </div>
    );
}
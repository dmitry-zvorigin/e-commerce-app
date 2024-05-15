export default function ProductDescription({description}) {

    return (
        <div className="border border-slate-300 rounded-lg w-full p-2 mt-5">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-5">Описание</h2>
            <p>{description}</p>
        </div>
    );
}
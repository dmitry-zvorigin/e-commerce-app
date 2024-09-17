import ButtonCheckbox from "@/MyComponents/ButtonCheckbox";

export default function ButtonAddCompare() {

    return (
        <>
            <label 
                className='flex items-center px-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer h-full w-full duration-200 select-none'
            >
                <ButtonCheckbox />
                <span className="ml-2 text-sm text-gray-600 " >
                    Сравнить
                </span>
            </label>
        </>
    );
}
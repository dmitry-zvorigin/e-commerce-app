export default function ButtonCheckbox({ disabled, checked, onChange }) {

    return (
        <input 
            type="checkbox" 
            className="
            h-4 w-4 
            rounded border-gray-300 text-orange-400 
            cursor-pointer
            focus:ring-indigo-500 
            focus:ring-0
            ml-2
            "
            disabled={disabled}
            checked={checked}
            onChange={onChange}
        />
    );
}
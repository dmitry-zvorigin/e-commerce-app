export default function ButtonSelect({ checked, onChange }) {

    return (
        <input
            class="
                peer/draft cursor-pointer ml-2
                checked:bg-orange-400
                checked:hover:bg-orange-400 
                checked:active:bg-orange-400 
                checked:focus:bg-orange-400 
                checked:ring-0
                checked:outline-none
                focus:outline-none 
                focus:ring-0
                active:outline-none 
                active:ring-0
            " 
            type="radio" 
            name="status" 
            checked={checked}
            onChange={onChange}
        />
    );
}
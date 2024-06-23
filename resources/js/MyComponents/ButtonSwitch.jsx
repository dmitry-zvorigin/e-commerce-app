export default function ButtonSwitch({ enabled = false, onToggle  }) {

    return (
        <div className="inline-flex relative items-center mr-5 cursor-pointer" onClick={(e) => {            
            e.stopPropagation();
            onToggle();
            }} 
        >
            <input
                type="checkbox"
                className="sr-only peer"
                checked={enabled}
                readOnly
            />
            <label
                // onClick={(e) => {
                //     e.stopPropagation();
                //     setEnabled(!enabled);
                // }}
                className="w-11 h-6
                    bg-gray-200 rounded-full 
                    peer  
                    peer-focus:ring-orange-500  
                    peer-checked:after:translate-x-full 
                    peer-checked:after:border-white 
                    after:content-[''] 
                    after:absolute 
                    after:top-0.5 
                    after:left-[2px] 
                    after:bg-white 
                    after:border-gray-300 
                    after:border 
                    after:rounded-full
                    after:h-5 
                    after:w-5 
                    after:transition-all 
                    peer-checked:bg-orange-500
                    cursor-pointer
                    group-hover:brightness-75
                    "
            ></label>
        </div>
    );
}





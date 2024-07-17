import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useCollapse } from 'react-collapsed'
import { useState } from "react";

export default function ProductCharacteristics({ productName, characteristics }) {

    const [isExpanded, setExpanded] = useState(false);
    const { getCollapseProps, getToggleProps} = useCollapse({ isExpanded, collapsedHeight: 200 });

    return (
        <div className="border border-slate-300 rounded-lg w-full p-2">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-5">Характеристики {productName}</h2>

                    <div {...getCollapseProps()}>
                        {Object.keys(characteristics).map(groupName => (
                            <div className={`product-characteristics__group mb-5`} key={groupName}>
                                <h2 className="text-1xl font-bold tracking-tight text-gray-900">{groupName}</h2>
                                {characteristics[groupName].map((char, index) => (
                                    <div className="product-characteristics__spec flex mt-2" key={index}>
                                        <div className="product-characteristics__spec-title border-b min-w-[500px]">
                                            {char.attribute.name}
                                        </div>
                                        <div className="product-characteristics__spec-value">
                                            {/* TODO */}
                                            {char.value.name} {char.value.unit_type}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

            <div className="pt-2">
                <button 
                    {...getToggleProps({
                        onClick: () => setExpanded((prevExpanded) => !prevExpanded),
                    })}
                    className="px-3 py-1 border border-slate-300 rounded-lg  d-flex items-center flex">
                    {isExpanded ? 'Скрыть все' : 'Показать все'}
                    <ChevronDownIcon
                        className={`h-4 w-4 ml-2 transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                </button>
            </div>
            
        </div>
    );
}
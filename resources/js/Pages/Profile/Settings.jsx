import SidebarProfileLayout from "@/Layouts/SidebarProfileLayout";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const inputs = [
    { label: 'Никнейм', value: 'Текущий никнейм' },
    { label: 'Имя', value: '' },
    { label: 'Фамилия', value: '' },
    { label: 'Телефон', value: '+7-888-88-888-88' },
    { label: 'Электронная почта', value: 'test@test.test' },
    { label: 'Дата рождения', value: 'Текущая дата рождения' }
];

const Settings = () => {

    // const [isEditing, setIsEditing] = useState(Array(6).fill(false));
    const [isEditing, setIsEditing] = useState(inputs.map(input => !!input.value));
    const inputRefs = useRef(inputs.map(() => React.createRef()));

    const handleBlockClick = (index) => {
        const newIsEditing = [...isEditing];
        newIsEditing[index] = true;
        setIsEditing(newIsEditing);
    };

    const handleBlockBlur = (index) => {
        const newIsEditing = [...isEditing];
        newIsEditing[index] = false;
        setIsEditing(newIsEditing);
    };

    useEffect(() => {
        isEditing.forEach((editing, index) => {
            if (editing && inputRefs.current[index]) {
                inputRefs.current[index].focus();
            }
        });
    }, [isEditing]);



    return (
        <SidebarProfileLayout>
            <div>
                <div className="">
                    <form className="flex flex-col gap-5 p-5">
                        {inputs.map((input, index) => (
                            <div 
                                key={index} 
                                className="h-20 border border-slate-300 rounded-lg w-1/4 
                                    flex hover:bg-slate-200 focus-within:bg-slate-200 group cursor-text"
                                    onClick={() => handleBlockClick(index)}
                            >
                                <div 
                                    className="flex flex-col justify-center w-full cursor-text"
                                >
                                    <label 
                                        className=
                                        {`flex transition-all duration-300 ease-in-out px-4 cursor-text
                                            `
                                        }
                                    >
                                        {input.label}
                                    </label>

                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out
                                        ${isEditing[index] || input.value ? 'max-h-8 opacity-100' : 'max-h-0 opacity-0'}`}
                                    >

                                        <input
                                            type="text"
                                            onBlur={() => handleBlockBlur(index)}
                                            className="w-full p-4 focus:ring-0 focus:border-0 h-0
                                                border-none group-hover:bg-slate-200 group-focus-within:bg-slate-200"
                                            defaultValue={input.value}
                                            autoFocus
                                            ref={(el) => (inputRefs.current[index] = el)}
                                        />
                                    </div>

                                </div>
                            </div>
                        ))}

                        <button className="border border-slate-300 rounded-lg w-[150px] h-[50px] bg-orange-500 text-white">
                            Сохранить
                        </button>
                    </form>
                </div>
            </div>
        </SidebarProfileLayout>
    );
}

export default Settings;
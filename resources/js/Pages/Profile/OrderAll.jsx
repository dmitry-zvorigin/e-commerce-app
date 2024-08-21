import SidebarProfileLayout from "@/Layouts/SidebarProfileLayout";
import SearchInput from "@/MyComponents/SearchInput";
import { CalendarDaysIcon, CalendarIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useRef } from "react";
import Calendar from "react-calendar";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const OrderAll = () => {

    const holder = 'Номер документа, код или название товара'
    return (
        <SidebarProfileLayout>
            <div className="p-5 w-full h-full">
                <div className="border border-slate-300 w-full rounded-lg">
                    <div className="px-5 grid grid-cols-[4fr_2fr_2fr] gap-5 justify-center items-center mt-5">

                        <div className="w-full">
                            <SearchInput holder={holder} />
                        </div>

                        {/* <div className="h-full flex items-center"> */}
                            <Test/>
                        {/* </div> */}

                        <div className="flex justify-center items-center">
                            <button className="p-5 flex items-center">
                                <PlusIcon className="w-5 h-5 mr-1"/>
                                <p>Заказ по чеку</p>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 px-5 my-5">
                        <button className="rounded-lg bg-gray-200 text-gray-600 p-2 font-bold shadow-inner">Все</button>
                        <button className="rounded-lg hover:bg-gray-200 text-gray-600 p-2">Открытые</button>
                        <button className="rounded-lg hover:bg-gray-200 text-gray-600 p-2">Выкупленные</button>
                        <button className="rounded-lg hover:bg-gray-200 text-gray-600 p-2">Отменённые</button>
                    </div>

                </div>
            </div>
        </SidebarProfileLayout>
    );
}

export default OrderAll;

const Test = () => {

    const months = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Мая",
        "Июль",
        "Июнь",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ];

    const customStyles = {
        '.custom-calendar': {
            backgroundColor: 'black',
        }
    }

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    return (
        <div className="flex justify-center items-center border rounded-lg border-slate-300 h-[37px]">

            <div className="flex justify-center items-center text-gray-500 px-2 h-full">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="w-[120px] border-none outline-none h-5 focus:outline-none focus:ring-0 focus:border-none"
                    icon={<CalendarIcon/>}
                    placeholderText="От"
                    dateFormat='dd/MM/yyyy'
                    isClearable
                    calendarClassName="Calendar"
                />
            </div>
            
            <div className="border-l h-full border-slate-300"/>

            <div className="flex justify-center items-center text-gray-500 px-2 h-full">
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="w-[120px] border-none outline-none h-5 focus:outline-none focus:ring-0 focus:border-none"
                    icon
                    placeholderText="До"
                    dateFormat='dd/MM/yyyy'
                    isClearable
                    // popperClassName="react-datepicker-popper"
                    calendarClassName="Calendar"
                />
            </div>

        </div>

    )
}

{/* <div>
<Calendar onChange={onChange} value={value} locale="ru-RU" className="text-gray-600"/>
</div> */}
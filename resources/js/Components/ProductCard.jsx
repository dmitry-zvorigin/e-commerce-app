import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, HandThumbDownIcon, HandThumbUpIcon, HeartIcon, ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";
import ProductRating from "./ProductRating";
import { useState } from "react";
import { useCollapse } from 'react-collapsed'
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import Review from "./Review";


export default function ProductCard({ product, groupedCharacteristics, popularReview }) {

    // console.log(popularReview);
    // console.log(groupedCharacteristics);


    return (
        <div>

            <div className="border border-slate-300 rounded-lg mt-5">

                <div className="h-96 flex ml-2 mt-2 mr-2">

                    <div className="w-2/3 mr-8 flex">
                        <ImageSlider images={product.images} productName={product.name}/>
                    </div>

                    <div className="w-full p-5">

                        <h2>AM3+, 4 x 3.8 ГГц, L2 - 4 МБ, L3 - 4 МБ, 2 х DDR3-1866 МГц, TDP 95 Вт, кулер подробнее</h2>

                        <div className="flex mt-3 mb-3">
                            <div className="rounded-md p-1 flex justify-center items-center bg-gray-100">
                                <label 
                                    className='flex items-center p-1 w-full hover:bg-orange-100 rounded-md cursor-pointer'
                                >
                                    <input 
                                        type="checkbox" 
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-600 " >
                                        Сравнить
                                    </span>
                                    
                                </label>
                                
                            </div>

                            <div className="ml-2 p-1 rounded-md flex bg-gray-100 text-sm text-gray-600 items-center">
                                <button className="flex ">
                                    <ProductRating value={product.ratings_avg_rating_value}/>
                                    <p className="ml-1 mr-1">{product.ratings_count}</p>
                                </button>
                            </div>

                        </div>

                        <div className="flex h-16 justify-between">
                            <div className="rounded-lg flex bg-gray-100 text-4xl mr-5 text-center items-center w-96 p-2">
                                {product.price} ₽
                            </div>
                            <div className="rounded-lg flex bg-gray-100 text-sm text-gray-600 mr-5">
                                <button 
                                    className="
                                        rounded-lg border-slate-300 flex justify-center 
                                        items-center p-3 hover:border-orange-400 w-16
                                        hover:bg-gray-200
                                        "
                                >
                                    <HeartIcon className="h-7 w-7"/>
                                </button>
                            </div>
                            <div className="rounded-lg flex bg-gray-100 text-sm ">
                                <button 
                                    className="rounded-lg border border-slate-300 flex justify-center items-center 
                                    p-3 bg-orange-400 hover:bg-orange-300 w-44 text-2xl text-white"
                                >
                                    Купить
                                </button>
                            </div>
                        </div>


                    </div>
                </div>

                <div className="h-44 border m-2">
                    <div className="bg-slate-800 h-full w-full"/>
                </div>
            </div>

            <div className="flex mt-5">
                <div className="w-2/5 mr-8">
                    <div className="border border-slate-300 rounded-lg p-2">
                        <h2>Характеристики</h2>
                        <h2>Отзывы {product.ratings_count}</h2>
                    </div>
                </div>
                
                <div className="w-full">

                    <Characteristics productName={product.name} characteristics={groupedCharacteristics} />
                
					<div className="border border-slate-300 rounded-lg w-full p-2 mt-5">
						<h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-5">Описание</h2>
						<p>{product.description}</p>
					</div>

					<div className="border border-slate-300 rounded-lg w-full p-2 mt-5">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Самый популярный отзыв</h2>
                            <button className="text-blue-600 hover:text-orange-400">Все отзывы</button>
                        </div>
                        <Review review={popularReview}/>
                        <button 
                            className="border border-slate-300 rounded-lg p-2 
                            flex justify-center items-center mt-5 w-full bg-gray-200
                            hover:bg-gray-300
                            "
                        >
                            Все отзывы 576
                        </button>
					</div>						
												
                </div>

            </div>

        </div>
    );
}


const Characteristics = ({ productName, characteristics }) => {
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
                                        <div className="product-characteristics__spec-title border-b w-96">
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

            <div>
                <button 
                    {...getToggleProps({
                        onClick: () => setExpanded((prevExpanded) => !prevExpanded),
                    })}
                    className="px-3 py-1 border border-slate-300 rounded-lg mt-5 d-flex items-center flex">
                    {isExpanded ? 'Скрыть все' : 'Показать все'}
                    <ChevronDownIcon
                        className={`h-4 w-4 ml-2 transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                </button>
            </div>
            
        </div>
    );
}

const ImageSlider = ({images, productName}) => {
    const [fullSizeImage, setFullSizeImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const imagesPerPage = 4;

    const handleOpenFullScreen = (image) => {
        setFullSizeImage(image);
    };

    const handleCloseButtonClick = () => {
        setFullSizeImage(null);
    };

    const handleImageHover = (image) => {
        setSelectedImage(image);
    };

    const handlePreviousPage = () => {
        setSelectedImageIndex((prevIndex) => Math.max(0, prevIndex - 1));
    };

    const handleNextPage = () => {
        setSelectedImageIndex((prevIndex) => Math.min(images.length - 1, prevIndex + 1));
    };

    const renderImages = () => {
        return images.slice(selectedImageIndex, selectedImageIndex + imagesPerPage).map((image, index) => (
            <div key={index} className={`flex justify-center items-center size-24 border-s-4 ${image === selectedImage ? 'border-orange-400' : 'border-transparent'}`}>
                <img
                    src={`/products_images/image_thumbnail/${image.image_url_thumbnail}`}
                    alt={productName}
                    width={70}
                    className="object-contain cursor-zoom-in"
                    onMouseEnter={() => handleImageHover(image)}
                    onClick={() => handleOpenFullScreen(selectedImage)}
                    
                />
            </div>
        ));
    };
    
    return (
        <>
            <div className="p-2 items-center flex flex-col">
                <button 
                    className="border border-black rounded-full justify-center items-center p-1"
                    onClick={handlePreviousPage}
                    disabled={selectedImageIndex === 0}
                >
                    <ChevronDownIcon
                        className="h-4 w-4 transform rotate-180"
                    />
                </button>

                {renderImages()}

                <button 
                    className="border border-black rounded-full justify-center items-center p-1"
                    onClick={handleNextPage}
                    disabled={selectedImageIndex + imagesPerPage >= images.length}
                >
                    <ChevronDownIcon
                        className="h-4 w-4"
                    />
                </button>
            </div>

            <div className="h-full flex justify-center">
                {images && images.length > 0 ? (
                    <img
                        src={`/products_images/image_detail/${selectedImage.image_url_detail}`}
                        alt={productName}
                        className="object-contain cursor-zoom-in"
                        onClick={() => handleOpenFullScreen(selectedImage)}
                    />
                ) : (
                    <div className="bg-slate-800 h-full w-full"/>
                )}
            </div>

            <div>
                {fullSizeImage && (
                    <ImageFullSlider productName={productName} images={images} selectedImage={selectedImage} handleCloseButtonClick={handleCloseButtonClick}/>
                )}
            </div>

        </>
    );
}

const ImageFullSlider = ({ productName, images, selectedImage, handleCloseButtonClick }) => {

    console.log(selectedImage);
    const [selectedImageIndex, setSelectedImageIndex] = useState(images.findIndex(img => img === selectedImage));

    const handlePreviousImage = () => {
        const newIndex = (selectedImageIndex - 1 + images.length) % images.length;
        setSelectedImageIndex(newIndex);
    };

    const handleNextImage = () => {
        const newIndex = (selectedImageIndex + 1) % images.length;
        setSelectedImageIndex(newIndex);
    };

    const hadleOpenImage = (image) => {
        const newIndex = images.findIndex(img => img === image);
        setSelectedImageIndex(newIndex);
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);


    return (
        <div className="fixed inset-0 flex justify-center bg-black bg-opacity-75 z-50">
            <div className="bg-white flex flex-col  w-full h-full">
                
                <div className="pl-5 pr-5 pt-5">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold">{productName}</h1>
                        <button className="m-4 text-black" onClick={handleCloseButtonClick}>
                            <XMarkIcon className="h-6 w-6 "/>
                        </button>
                    </div>
                    <div className="">
                        Фото
                    </div>
                </div>
                
                <div className="border-b">

                </div>

                <div className="flex justify-between m-2 h-full">
                    <div>
                        <button 
                            className="border justify-center items-center h-full p-5 rounded-lg hover:bg-slate-200"
                            onClick={handlePreviousImage}
                        >
                            <ChevronLeftIcon
                                className="h-10 w-10"
                            />
                        </button>
                    </div>


                    <div className="flex flex-col justify-center items-center h-[70vh]">
                        <img
                            src={`/products_images/image_original/${images[selectedImageIndex].image_url_original}`}
                            alt={productName}
                            className="object-contain h-full w-full"
                        />
                    </div>
                    
                    <div>
                        <button 
                            className="border justify-center items-center h-full p-5 rounded-lg hover:bg-slate-200"
                            onClick={handleNextImage}
                        >
                            <ChevronRightIcon
                                className="h-10 w-10"
                            />
                        </button>
                    </div>


                </div>

                <div className="flex justify-between mt-5 m-2">

                    <div className="flex-none w-24 flex justify-center items-center h-full">
                        <button className="border border-black rounded-full">
                            <ChevronLeftIcon
                                className="h-5 w-5"
                            />
                        </button>
                    </div>

                    <div className="grow flex">
                        {images.map((image) => (
                            <div className="size-24">
                                <img
                                    key={image.id}
                                    className={`cursor-pointer object-contain border rounded-lg w-full h-full ${image === images[selectedImageIndex] ? 'border-orange-400' : ''}`}
                                    src={`/products_images/image_thumbnail/${image.image_url_thumbnail}`}
                                    alt={productName}
                                    onClick={() => hadleOpenImage(image)}
                                />
                            </div>

                        ))}
                    </div>

                    <div className="flex-none w-24 h-full flex justify-center items-center">
                        <button className="border border-black rounded-full">
                            <ChevronRightIcon
                                className="h-5 w-5"
                            />
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}


const Comment = () => {
    return (
        <>
            <div className="flex justify-between mb-5 mt-5">
                <div className="flex">
                    <div className="flex justify-center items-center font-bold ">
                        <div className="border rounded-full p-1 border-black mr-2">
                            <UserIcon className="w-7 h-7"/>
                        </div>
                        
                        <button className="text-blue-700">Пришелец-AAG67259</button>
                    </div>
                    <div className="flex justify-center items-center border rounded-lg text-green-700 font-bold p-1 ml-5">
                        <ShoppingBagIcon className="w-5 h-5" />
                        Реальный покупатель
                    </div>
                </div>
                <div>
                    02.11.2017
                </div>
            </div>

            <div className="flex mb-5">
                <div className="border mr-2 p-1 border-gray-100 rounded-lg bg-gray-100">
                    Общая: 5
                </div>
                <div className="border mr-2 p-1 border-gray-100 rounded-lg bg-gray-100"> 
                    Производительность: 5
                </div>
                <div className="border p-1 border-gray-100 rounded-lg bg-gray-100">
                Результат использования: 5
                </div>
            </div>

            <div className="mb-5">
                <div className="mb-5">
                    <h1 className="font-bold">Срок использования:</h1>
                    <p>Более года</p>
                </div>
                <div className="mb-5">
                    <h1 className="font-bold">Достоинства</h1>
                    <p>
                        не дорогой
                        производительный
                        относительно холодный
                        за такую цену сравнимый по производительности интел не нейти
                    </p>
                </div>
                <div className="mb-5">
                    <h1 className="font-bold">Недостатки</h1>
                    <p>нет</p>
                </div>
                <div className="mb-5">
                    <h1 className="font-bold">Комментарий</h1>
                    <p>
                        хотелось чтобы производитель упаковывал процессор хотя бы в пленочку, при покупке сотрудник ДНС принес процессор без ничего, 
                        просто в руках и сказал можем в А4 лист завернуть, ну не дело это

                        Прошло больше двух лет, а процессор все еще пашет на домашнем ПК, с задачами по работе с текстовыми редакторами, 
                        написанием кода/текста, браузер, видео справляется на 5+. Охлаждение стоит комплектное от FX-8350
                    </p>
                </div>

                <div>
                    <h1 className="font-bold">Фотографии</h1>
                    <div className="flex">
                        <div className="bg-black size-32 mr-2"/>
                        <div className="bg-black size-32"/>
                    </div>
                </div>

            </div>

            <div className="flex justify-between">
                <button className="flex justify-center items-center text-blue-600 hover:text-orange-400">
                    Комментарии (13) 
                    <ChevronDownIcon className="h-5 w-5"/>
                </button>
                <div className="flex justify-center items-center ">
                    <button className="m-2"><HandThumbUpIcon className="h-7 w-7 hover:text-green-800"/></button>
                    <div 
                        className={
                                `border border-gray-300 rounded-lg p-1 bg-gray-300 font-bold
                                ${50 < 0 ? 'text-red-600' : 'text-green-600'} 
                            `}
                    >
                        {50}
                    </div>
                    
                    <button className="m-2"><HandThumbDownIcon className="h-7 w-7 hover:text-red-800"/></button>
                </div>
            </div>

            <button 
                className="border border-slate-300 rounded-lg p-2 
                flex justify-center items-center mt-5 w-full bg-gray-200
                hover:bg-gray-300
                "
            >
                Все отзывы 576
            </button>
        </>
    );
};
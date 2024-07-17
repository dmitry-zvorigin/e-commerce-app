import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, HandThumbDownIcon, HandThumbUpIcon, HeartIcon, ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useCollapse } from 'react-collapsed'
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import Review from "./Review";
import React from "react";
import Rating from "@/MyComponents/Rating";


export default function ProductCard({ product, groupedCharacteristics, popularReview, reviewImages }) {

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
                                    <Rating value={product.ratings_avg_rating_value}/>
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

                {reviewImages.length > 0 ? (
                    <ImageGallery images={reviewImages}/>
                ) : (
                    <div className="h-24 border rounded-lg m-2 bg-slate-200 flex flex-col justify-center pl-5">
                        <h1 className="text-2xl ">Пока нет отзывов с фото</h1>
                        <p className="text-1xl">Будьте первыми и помогите другим с выбором</p>
                    </div>
                )}
                
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
                        {images.map((image, index) => (
                            <div className="size-24" key={image.id}>
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


class ImageGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            containerWidth: 0,
            imagePerRow: 0,
        };
        this.blockWidth = React.createRef();
        this.buttonRef = React.createRef();
    }

    componentDidMount() {
        this.updateContainerWidth();
        window.addEventListener('resize', this.updateContainerWidth);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateContainerWidth);
    }

    updateContainerWidth = () => {
        const blockWidth = this.blockWidth.current.clientWidth;
        const buttonWidth = this.buttonRef.current.clientWidth + 16;
        const containWidth = blockWidth - buttonWidth;
        const imageWidth = 112;
        const imagesPerRow = Math.floor(containWidth / imageWidth);
        this.setState({ containWidth, imagesPerRow });
    };

    render() {
        const { images } = this.props;
        const { imagesPerRow } = this.state;

        return (
            <div className="m-2 flex items-center h-24" ref={this.blockWidth}>
                <div className="flex">
                    {images.map((image, index) => (
                        index < imagesPerRow && (
                            <img
                                key={index}
                                src={`/reviews_images/image_thumbnail/${image.image_url_thumbnail}`}
                                alt={image.image_url_thumbnail}
                                width={96}
                                className="object-contain cursor-zoom-in rounded-lg m-2 border hover:brightness-125"
                            />
                        )
                    ))}
                </div>

                <button className="rounded-lg h-full w-24 bg-slate-200 m-2" ref={this.buttonRef}>
                    <p>Всего</p> {images.length}</button>
            </div>
        );
    }
}

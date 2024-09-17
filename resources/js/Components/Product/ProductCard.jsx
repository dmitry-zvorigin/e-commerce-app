import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, HeartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { Link } from '@inertiajs/react'
import ProductImageGallery from "./ProductImageGallery";
import Rating from "@/MyComponents/Rating";
import ButtonAddShoplist from "@/MyComponents/ButtonAddShoplist";
import ButtonAddWishlist from "@/MyComponents/ButtonAddWishlist";
import ButtonCheckbox from "@/MyComponents/ButtonCheckbox";
import ButtonAddCompare from "@/MyComponents/ButtonAddCompare";
import ProductRatingReviews from "@/MyComponents/ProductRatingReviews";


export default function ProductCard({ product, reviewImages }) {

    return (
        <div>
            <div className="border border-slate-300 rounded-lg mt-5">
                <div className="grid m-2 grid-cols-[1fr_1fr]">

                    <div>
                        <ImageSlider images={product.images} productName={product.name}/>
                    </div>

                    <div className="w-full p-5">
                        {/* TODO */}
                        <h2>AM3+, 4 x 3.8 ГГц, L2 - 4 МБ, L3 - 4 МБ, 2 х DDR3-1866 МГц, TDP 95 Вт, кулер подробнее</h2>
                        <div className="flex my-5 h-[36px]">

                            <div className="flex justify-center items-center ">
                                <ButtonAddCompare/>
                            </div>

                            <div className="ml-2">
                                {/* <Link 
                                    className="flex justify-center items-center bg-gray-100 hover:bg-gray-200 h-full w-full rounded-lg px-2 text-gray-600 text-sm" 
                                    href={route('product.reviews', { productSlug: product.slug })}>
                                        <Rating value={product.ratings_avg_rating_value} size={'small'} precision={0.1}/>
                                        <p className="ml-1 h-[18px]">{product.ratings_count}</p>
                                </Link> */}
                                <ProductRatingReviews productSlug={product.slug} productRating={product.ratings_avg_rating_value} ReviewsCount={product.ratings_count}/>
                            </div>

                        </div>

                        <div className="flex justify-between gap-5 h-[60px]">
                            <div className="bg-gray-100 rounded-lg w-full flex justify-start items-center text-4xl px-2 text-nowrap">{product.price} ₽</div>
                            <div className=""><ButtonAddWishlist productId={product.id} size={60}/></div>
                            <div className="h-full"><ButtonAddShoplist productId={product.id} isHover={true}/></div>
                        </div>

                    </div>
                </div>

                {reviewImages.length > 0 ? (
                    <ProductImageGallery images={reviewImages}/>
                ) : (
                    <div className="h-24 border rounded-lg m-2 bg-slate-200 flex flex-col justify-center pl-5">
                        <h1 className="text-2xl ">Пока нет отзывов с фото</h1>
                        <p className="text-1xl">Будьте первыми и помогите другим с выбором</p>
                    </div>
                )}
            
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
        <div className="flex h-[500px]">
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

            <div className="h-full w-full flex justify-center">
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

        </div>
    );
}

const ImageFullSlider = ({ productName, images, selectedImage, handleCloseButtonClick }) => {

    // console.log(selectedImage);
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
                                    className={
                                        `cursor-pointer object-contain border rounded-lg w-full h-full 
                                        ${image === images[selectedImageIndex] ? 'border-orange-400' : ''}`
                                    }
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



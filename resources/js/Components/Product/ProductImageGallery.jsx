import React from "react";

class ProductImageGallery extends React.Component {
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

export default ProductImageGallery;
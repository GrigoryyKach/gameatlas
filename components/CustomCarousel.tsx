import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";
import Image from "next/image";

interface CustomCarouselProps {
  images: { url: string; alt?: string }[];
}

const ImageModal = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl">
          &times;
        </button>
        <Image
          src={imageSrc}
          alt="Enlarged Image"
          width={1200}
          height={800}
          className="object-contain max-h-screen cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export const CustomCarousel: React.FC<CustomCarouselProps> = ({ images }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const updateIndex = () => setCurrentIndex(api.selectedScrollSnap());
    api.on("select", updateIndex);

    return () => {
      api.off("select", updateIndex);
    };
  }, [api]);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Main Carousel */}
      <Carousel setApi={setApi} className="relative">
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index} className="flex justify-center items-center">
              <Image
                src={img.url}
                alt={img.alt || `Image ${index + 1}`}
                width={600}
                height={400}
                className="object-cover cursor-pointer"
                onClick={handleImageClick}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white hover:text-accent hover:bg-minibg" />
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white hover:text-accent hover:bg-minibg" />
      </Carousel>

      {/* Thumbnails */}
      <div className="hidden md:flex justify-center mt-4 gap-2">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`box-border p-1 cursor-pointer ${
              currentIndex === index ? "border-2 border-accent" : ""
            }`}
          >
            <Image
              src={img.url}
              alt={`Thumbnail ${index + 1}`}
              width={100}
              height={60}
              className="object-cover max-h-[60px]"
            />
          </div>
        ))}
      </div>

      {!!images.length && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          imageSrc={images[currentIndex].url}
        />
      )}
    </div>
  );
};

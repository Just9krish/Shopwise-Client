import { useState } from 'react';
import getImageSource from '../../../helper/getImageSource';

export type ImageProps = {
  id: number;
  url: string;
  name: string;
  type: string;
  size: number;
};

export default function Carousel({ images }: { images: ImageProps[] }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleThumbnailClick = (image: ImageProps) => {
    setSelectedImage(image);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, image: ImageProps) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setSelectedImage(image);
    }
  };

  return (
    <div className="lg:flex lg:justify-between lg:items-center lg:gap-10">
      <div className="lg:w-1/4 space-y-5">
        {images.map((image) => (
          <div
            key={image.id}
            className="hover:opacity-40 cursor-pointer w-28 duration-500 border-[2.5px] hover:border-[2.5px] hover:border-orange-500 hover:bg-orange-500 rounded-lg"
            onClick={() => handleThumbnailClick(image)}
            onKeyDown={(e) => handleKeyDown(e, image)}
            role="button"
            tabIndex={0}>
            <img
              src={getImageSource(image.url)}
              className="rounded-lg"
              alt={image.name}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="lg:w-3/4 md:w-full">
        <img
          src={getImageSource(selectedImage.url)}
          className="rounded-lg border"
          alt={selectedImage.name}
          loading="lazy"
        />
      </div>
    </div>
  );
}

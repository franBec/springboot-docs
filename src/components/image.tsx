interface ImageProps {
  src: string;
  alt?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt }) => {
  const filename = src.split('/').pop()?.split('.')[0];
  const generatedAlt = filename
    ? filename
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';

  return <img src={src} alt={alt || generatedAlt} />;
};

export default Image;

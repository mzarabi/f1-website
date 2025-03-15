import React, { useState } from 'react';
import { Skeleton } from '@mui/material';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  style
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <>
      {isLoading && (
        <Skeleton
          variant="rectangular"
          width={width}
          height={height}
          animation="wave"
          style={{ ...style, borderRadius: '8px' }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={className}
        style={{
          ...style,
          display: isLoading ? 'none' : 'block',
          width: width,
          height: height,
          objectFit: 'cover',
          opacity: hasError ? 0.5 : 1
        }}
        onLoad={handleLoad}
        onError={handleError}
      />
    </>
  );
};

export default LazyImage; 
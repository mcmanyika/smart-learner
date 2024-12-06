import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback?: string;
}

export function LazyImage({ src, fallback, className, ...props }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  if (error && fallback) {
    return <img src={fallback} className={className} {...props} />;
  }

  return (
    <img
      src={src}
      className={cn(
        className,
        'transition-opacity duration-300',
        loaded ? 'opacity-100' : 'opacity-0'
      )}
      {...props}
    />
  );
}
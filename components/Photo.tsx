'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Photograph with a built-in fallback. If the remote photo cannot be loaded
 * (offline, blocked, removed), the matching line-art illustration is shown
 * instead, so the layout never has a broken image.
 */
export function Photo({
  src,
  fallback,
  alt,
  width,
  height,
  className = '',
  eager = false,
}: {
  src: string;
  fallback: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  eager?: boolean;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  // Catch errors that happened before React attached the onError handler.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={failed ? fallback : src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`block h-full w-full object-cover ${className}`}
    />
  );
}

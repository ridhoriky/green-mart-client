'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const BACKGROUND_IMAGES = [
  '/assets/images/hero-bg-01.jpg',
  '/assets/images/hero-bg-02.jpg',
  '/assets/images/hero-bg-03.jpg',
];

export function HeroBackgroundCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {BACKGROUND_IMAGES.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Hero Background ${index + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index === 0}
          className={`object-cover object-center transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </>
  );
}

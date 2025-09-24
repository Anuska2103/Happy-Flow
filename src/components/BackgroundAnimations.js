"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const shapes = [
  { type: 'circle', color: '#EF4D4C' },
  { type: 'triangle', color: '#FBF7F7' },
  { type: 'square', color: '#2C2C2C' }
];

const BackgroundAnimations = () => {
  const container = useRef();
  const floatingShapesRef = useRef([]);

  useGSAP(() => {
    // Animate each shape individually with a slightly random effect
    floatingShapesRef.current.forEach((shape, index) => {
      gsap.to(shape, {
        x: 'random(-500, 500)',
        y: 'random(-300, 300)',
        rotation: 'random(-360, 360)',
        scale: 'random(0.5, 1.5)',
        duration: 'random(10, 20)',
        opacity: 'random(0.1, 0.3)',
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.5
      });
    });
  }, { scope: container });

  return (
    <div
      ref={container}
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: -1, pointerEvents: 'none' }}
    >
      {shapes.map((shape, shapeIndex) => (
        // Render 3 copies of each shape
        [...Array(3)].map((_, copyIndex) => (
          <div
            key={`${shape.type}-${shapeIndex}-${copyIndex}`}
            ref={el => {
              if (el) floatingShapesRef.current.push(el);
            }}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            {shape.type === 'circle' && (
              <svg className="h-20 w-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50" fill={shape.color} />
              </svg>
            )}
            {shape.type === 'triangle' && (
              <svg className="h-20 w-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,10 90,90 10,90" fill={shape.color} />
              </svg>
            )}
            {shape.type === 'square' && (
              <svg className="h-20 w-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" fill={shape.color} />
              </svg>
            )}
          </div>
        ))
      ))}
    </div>
  );
};

export default BackgroundAnimations;
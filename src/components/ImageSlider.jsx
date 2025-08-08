import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImageSlider = () => {
  const slideshowRef = useRef();
  const containerRef = useRef();
  const titleRef = useRef();
  const slideRefs = useRef([]);
  const indicatorRefs = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Replace these with your actual image paths
  const slides = [
    { id: 1, image: "/1.jpg" },
    { id: 2, image: "/2.jpg" },
    { id: 3, image: "/3.jpg" },
    { id: 4, image: "/4.jpg" },
    { id: 5, image: "/5.jpg" },
    { id: 6, image: "/6.jpg" },
    { id: 7, image: "/7.jpg" },
    { id: 8, image: "/8.jpg" },
    { id: 9, image: "/9.jpg" },
    { id: 10, image: "/10.jpg" }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial reveal animation - FIXED: Removed reverse behavior
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: slideshowRef.current,
          start: "top 80%",
          end: "bottom 20%",
          // FIXED: Changed to prevent hiding on scroll up
          toggleActions: "play none none none",
          onStart: () => setHasAnimated(true),
          // Optional: Add this for debugging
          // markers: true,
        }
      });

      // Title animation
      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      });

      // Container reveal
      tl.from(containerRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power2.out"
      }, "-=0.5");

      // Set initial slide state
      slideRefs.current.forEach((slide, index) => {
        if (slide) {
          gsap.set(slide, {
            opacity: index === 0 ? 1 : 0,
            scale: index === 0 ? 1 : 1.1
          });
        }
      });

      // ADDED: Ensure elements stay visible after animation
      tl.set([titleRef.current, containerRef.current], {
        opacity: 1,
        clearProps: "transform"
      });
    });

    return () => ctx.revert();
  }, []);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Handle slide transitions
  useEffect(() => {
    slideRefs.current.forEach((slide, index) => {
      if (slide) {
        if (index === currentSlide) {
          gsap.to(slide, {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out"
          });
        } else {
          gsap.to(slide, {
            opacity: 0,
            scale: 1.05,
            duration: 0.8,
            ease: "power2.in"
          });
        }
      }
    });

    // Update indicators
    indicatorRefs.current.forEach((indicator, index) => {
      if (indicator) {
        gsap.to(indicator, {
          backgroundColor: index === currentSlide ? '#FFD700' : 'rgba(255, 255, 255, 0.3)',
          scale: index === currentSlide ? 1.2 : 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  }, [currentSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div ref={slideshowRef} style={styles.slideshow}>
      {/* Section Title */}
      <div ref={titleRef} style={styles.titleContainer}>
        <div style={styles.goldenLine}></div>
        <h2 style={styles.title}>OUR GALLERY</h2>
        <div style={styles.goldenLine}></div>
      </div>

      {/* Slideshow Container */}
      <div ref={containerRef} style={styles.container}>
        {/* Slides */}
        <div style={styles.slidesWrapper}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              ref={el => slideRefs.current[index] = el}
              style={styles.slide}
            >
              <img 
                src={slide.image} 
                alt={`Gallery image ${slide.id}`}
                style={styles.slideImage}
              />
            </div>
          ))}
        </div>

        {/* Navigation Indicators */}
        <div style={styles.indicators}>
          {slides.map((_, index) => (
            <button
              key={index}
              ref={el => indicatorRefs.current[index] = el}
              onClick={() => goToSlide(index)}
              style={styles.indicator}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div style={styles.progressBar}>
          <div 
            style={{
              ...styles.progressFill,
              animation: `progress 4s linear infinite`
            }}
          />
        </div>
      </div>

      {/* Decorative Elements */}
      <div style={styles.sparkle1}></div>
      <div style={styles.sparkle2}></div>
      <div style={styles.sparkle3}></div>
    </div>
  );
};

export default ImageSlider;

// Updated Styles - Same as before
const styles = {
  slideshow: {
    position: 'relative',
    padding: '80px 20px',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', sans-serif",
    overflow: 'hidden',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '60px',
    gap: '20px',
  },
  title: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 600,
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: '0.1em',
    textShadow: '0px 2px 10px rgba(255, 215, 0, 0.3)',
    margin: 0,
  },
  goldenLine: {
    height: '2px',
    width: '80px',
    background: 'linear-gradient(90deg, transparent 0%, #FFD700 50%, transparent 100%)',
  },
  container: {
    position: 'relative',
    width: '100%',
    maxWidth: '1200px',
    height: '500px',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
    border: '2px solid rgba(255, 215, 0, 0.1)',
  },
  slidesWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  slideImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    willChange: 'transform',
    filter: 'brightness(1.1) contrast(1.05)',
  },
  indicators: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '12px',
    zIndex: 10,
    background: 'rgba(0, 0, 0, 0.3)',
    padding: '10px 15px',
    borderRadius: '25px',
    backdropFilter: 'blur(10px)',
  },
  indicator: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: '1px solid rgba(255, 215, 0, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '100%',
    background: 'linear-gradient(90deg, #FFD700, #FFA500)',
    transformOrigin: 'left',
    transform: 'scaleX(0)',
  },
  sparkle1: {
    position: 'absolute',
    top: '15%',
    left: '10%',
    width: '6px',
    height: '6px',
    background: '#FFD700',
    borderRadius: '50%',
    boxShadow: '0 0 15px 5px rgba(255, 215, 0, 0.4)',
    animation: 'pulse 3s infinite',
  },
  sparkle2: {
    position: 'absolute',
    top: '25%',
    right: '15%',
    width: '8px',
    height: '8px',
    background: '#FFD700',
    borderRadius: '50%',
    boxShadow: '0 0 20px 8px rgba(255, 215, 0, 0.4)',
    animation: 'pulse 4s infinite 1.5s',
  },
  sparkle3: {
    position: 'absolute',
    bottom: '20%',
    left: '20%',
    width: '5px',
    height: '5px',
    background: '#FFD700',
    borderRadius: '50%',
    boxShadow: '0 0 12px 4px rgba(255, 215, 0, 0.4)',
    animation: 'pulse 5s infinite 2.5s',
  },
};

// CSS Animations remain the same
const cssAnimations = `
@keyframes progress {
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.5); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
}
`;

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImageSlider1 = () => {
  const containerRef = useRef();
  const trackRef = useRef();
  const titleRef = useRef();
  const sliderRef = useRef();
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const slides = [
    { id: 1, image: "../src/assets/1.jpg" },
    { id: 2, image: "/src/assets/2.jpg" },
    { id: 3, image: "/src/assets/3.jpg" },
    { id: 4, image: "/src/assets/4.jpg" },
    { id: 5, image: "/src/assets/5.jpg" },
    { id: 6, image: "/src/assets/6.jpg" },
    { id: 7, image: "/src/assets/7.jpg" },
    { id: 8, image: "/src/assets/8.jpg" },
    { id: 8, image: "/src/assets/9.jpg" },
    { id: 8, image: "/src/assets/10.jpg" }
  ];

  // Duplicate slides for seamless loop
  const extendedSlides = [...slides, ...slides, ...slides];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial reveal animation - FIXED: Removed reverse behavior
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sliderRef.current,
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
        y: 30,
        duration: 1.2,
        ease: "power2.out"
      }, "-=0.5");

      // ADDED: Ensure elements stay visible after animation
      tl.set([titleRef.current, containerRef.current], {
        opacity: 1,
        clearProps: "transform"
      });

      // Continuous horizontal movement
      const slideWidth = 350; // Width of each slide including gap
      const totalWidth = slideWidth * slides.length;
      
      gsap.set(trackRef.current, {
        x: 0
      });

      // Create infinite loop animation
      gsap.to(trackRef.current, {
        x: -totalWidth,
        duration: 25, // Adjust speed here (higher = slower)
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
        }
      });

      // Hover pause effect
      const track = trackRef.current;
      
      track.addEventListener('mouseenter', () => {
        gsap.globalTimeline.pause();
      });
      
      track.addEventListener('mouseleave', () => {
        gsap.globalTimeline.resume();
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sliderRef} style={styles.slider}>
      {/* Section Title */}
      <div ref={titleRef} style={styles.titleContainer}>
        <div style={styles.goldenLine}></div>
        <h2 style={styles.title}>OUR GALLERY</h2>
        <div style={styles.goldenLine}></div>
      </div>

      {/* Slider Container */}
      <div ref={containerRef} style={styles.container}>
        <div style={styles.track} ref={trackRef}>
          {extendedSlides.map((slide, index) => (
            <div key={`${slide.id}-${index}`} style={styles.slide}>
              <div style={styles.imageContainer}>
                <img 
                  src={slide.image} 
                  alt={`Gallery image ${slide.id}`}
                  style={styles.slideImage}
                />
                {/* Removed overlay since titles/descriptions are commented out */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Speed indicator */}
      <div style={styles.speedIndicator}>
        <div style={styles.speedDot}></div>
        <div style={styles.speedLine}></div>
        <span style={styles.speedText}>LIVE GALLERY</span>
      </div>

      {/* Decorative Elements */}
      <div style={styles.sparkle1}></div>
      <div style={styles.sparkle2}></div>
      <div style={styles.sparkle3}></div>
    </div>
  );
};

export default ImageSlider1;

// Updated Styles - Removed overlay and enhanced image clarity
const styles = {
  slider: {
    position: 'relative',
    padding: '80px 0',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
    minHeight: '80vh',
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
    width: '100%',
    height: '400px',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: '15px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  },
  track: {
    display: 'flex',
    height: '100%',
    willChange: 'transform',
  },
  slide: {
    flex: '0 0 330px',
    height: '100%',
    marginRight: '20px',
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: '12px',
    overflow: 'hidden',
    position: 'relative',
    border: '2px solid rgba(255, 215, 0, 0.2)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  slideImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
    // ADDED: Enhanced image clarity
    filter: 'brightness(1.1) contrast(1.05)',
  },
  speedIndicator: {
    position: 'absolute',
    bottom: '30px',
    right: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(0, 0, 0, 0.5)',
    padding: '10px 15px',
    borderRadius: '25px',
    border: '1px solid rgba(255, 215, 0, 0.3)',
    backdropFilter: 'blur(10px)',
  },
  speedDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#FFD700',
    animation: 'pulse 1.5s infinite',
  },
  speedLine: {
    width: '30px',
    height: '1px',
    background: 'linear-gradient(90deg, #FFD700, transparent)',
    position: 'relative',
    overflow: 'hidden',
  },
  speedText: {
    fontSize: '0.8rem',
    color: '#FFD700',
    fontWeight: 500,
    letterSpacing: '0.05em',
  },
  sparkle1: {
    position: 'absolute',
    top: '20%',
    left: '5%',
    width: '6px',
    height: '6px',
    background: '#FFD700',
    borderRadius: '50%',
    boxShadow: '0 0 15px 5px rgba(255, 215, 0, 0.4)',
    animation: 'sparkleMove 8s linear infinite',
  },
  sparkle2: {
    position: 'absolute',
    top: '60%',
    left: '10%',
    width: '4px',
    height: '4px',
    background: '#FFD700',
    borderRadius: '50%',
    boxShadow: '0 0 12px 4px rgba(255, 215, 0, 0.4)',
    animation: 'sparkleMove 12s linear infinite 2s',
  },
  sparkle3: {
    position: 'absolute',
    top: '30%',
    left: '8%',
    width: '5px',
    height: '5px',
    background: '#FFD700',
    borderRadius: '50%',
    boxShadow: '0 0 18px 6px rgba(255, 215, 0, 0.4)',
    animation: 'sparkleMove 10s linear infinite 4s',
  },
  
};


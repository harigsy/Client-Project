import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Secfour = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const cardsWrapperRef = useRef(null);

  const services = [
    { name: "Wedding Budget Decor", price: "9,999" },
    { name: "Birthday Surprise", price: "4,999" },
    { name: "Unplug Live Band", price: "29,999" },
    { name: "Theme Entry", price: "9,999" },
    { name: "Welcome Dance DJ", price: "29,999" },
    { name: "Chendamelam", price: "9,999" },
    { name: "Reception Setup", price: "14,999" },
    { name: "Couple Entry Props", price: "6,999" },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const wrapper = cardsWrapperRef.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapper,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          delay: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top center",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.to(content, {
        y: -100,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "600px",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
        background: "#000",
      }}
    >
      {/* Background */}
      <div
        ref={contentRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "120%",
          background:
            "url(https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2069&q=80) center/cover no-repeat",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(45deg, rgba(0,0,0,0.9), rgba(20,20,20,0.7))",
            zIndex: 2,
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 3,
          padding: "5%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#ffd700",
            marginBottom: "3rem",
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          Our Signature Event Services
        </h2>

        {/* Cards Grid */}
        <div
          ref={cardsWrapperRef}
          style={{
            display: "grid",
            gap: "2rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card"
              style={{
                minHeight: "400px",
                borderRadius: "20px",
                overflow: "hidden",
                background: "#111",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
                position: "relative",
              }}
            >
              {/* Header */}
              <div
                style={{
                  height: "50%",
                  background: "linear-gradient(135deg, #ffd700, #daa520)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem",
                  position: "relative",
                }}
              >
                <h3
                  style={{
                    color: "#000",
                    fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                    fontWeight: 800,
                    textAlign: "center",
                    zIndex: 2,
                    textTransform: "uppercase",
                  }}
                >
                  {service.name}
                </h3>
              </div>

              {/* Body */}
              <div
                style={{
                  height: "50%",
                  background: "#0a0a0a",
                  padding: "1.5rem",
                  color: "#f0f0f0",
                  fontSize: "0.95rem",
                  position: "relative",
                }}
              >
                <p>
                  Celebrate in style with our unique and creative touch designed
                  exclusively for your special moments.
                </p>
                <div
                  style={{
                    background: "linear-gradient(45deg, #ffd700, #daa520)",
                    color: "#000",
                    padding: "0.8rem 1.5rem",
                    fontWeight: 800,
                    fontSize: "1rem",
                    position: "absolute",
                    bottom: "-15px",
                    right: "20px",
                    transform: "skewX(-10deg)",
                    border: "2px solid rgba(0,0,0,0.3)",
                    boxShadow: "0 4px 20px rgba(218,165,32,0.4)",
                  }}
                >
                  <span style={{ transform: "skewX(10deg)" }}>
                    Rs. {service.price}/-
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Secfour;

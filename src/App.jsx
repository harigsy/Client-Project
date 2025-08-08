import React, { useState, useEffect } from 'react';
import './App.css';
import EliteInstitutions from './components/EliteInstitutions';
import Footer from './components/Footer';
import HorizontalCards from './components/HorizontalCards';
import Myhero from './components/Myhero'
import Secfour from './components/Secfour';
import Secthree from './components/Secthree'
import Sectiontwo from './components/Sectiontwo'
import SuccessStory from './components/SuccessStory';

import HorizontalScrollSection from "./components/Secfour";
import ImageSlider from './components/ImageSlider';
import ImageSlider1 from './components/ImageSlider1';

function App() {
  // Custom hook to detect mobile screen size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      // Define mobile breakpoints
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Condition for mobile: width <= 768px OR height <= 1024px (tablets in portrait)
      const mobileCondition = width <= 768 || (width <= 1024 && height <= 768);
      setIsMobile(mobileCondition);
    };

    // Check on initial load
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup event listener
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      <Myhero/>
      <ImageSlider1/>
      <Sectiontwo/>
      <ImageSlider/>
      
      {/* Conditionally render Secthree - only on desktop/tablet */}
      {!isMobile && <Secthree/>}
      
      <EliteInstitutions/>
      <SuccessStory/>
      {/* <HorizontalScrollSection /> */}
      <Secfour/>
      <Footer/>
    </>
  )
}

export default App;

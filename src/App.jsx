
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


  return (
    <>
    <Myhero/>
   
    <Sectiontwo/>
    <ImageSlider/>
    
    <Secthree/>
    <EliteInstitutions/>
    <ImageSlider1/>
    <SuccessStory/>
    {/* <HorizontalScrollSection /> */}

    <Secfour/>
    <Footer/>
    

    
    </>
  )
}

export default App

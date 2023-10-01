import React, { useContext, useEffect } from 'react';
import logo from './logo.png';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { animateScroll as scroll, scrollSpy} from 'react-scroll';
import * as ReactScroll from 'react-scroll';

import "animate.css/animate.min.css";
import './App.css';

import { AnchorLink, FullscreenBlock, HugeBlock } from './components/content_blocks';
import { Footer } from './components/footer';
import { Header } from './components/header';
import ThreeCanvas from './components/3d_showoff/showoff';
import { AnimatedHTMLPrinter, BgBlurredElement, RandomShapes } from './components/graphics_elements';
import { Landing } from './components/landing_page';

const Portfolio = () => {
  return (
    <div className="portfolio">
      <h2>Портфолио</h2>
      {/* Здесь отображаются ваши работы */}
    </div>
  );
};

const Projects = () => {
  return (
    <div className="projects">
      <h2>Проекты</h2>
      {/* Здесь отображаются ваши проекты */}
    </div>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>,
  },
  {
    path: "/wat",
    element: <Portfolio/>,
  },
  {
    path: "/projects",
    element: <Projects/>,
  },
]);


function App() {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const scrollToHashTitle = ()=>{
    if(window.scrollY < 876){
      scroll.scrollTo(1);
      scroll.scrollTo(0);
    }else{
      let scrollY = window.scrollY
      scroll.scrollTo(scrollY+1);
      scroll.scrollTo(scrollY);
    }

    
    const hash = window.location.hash.substring(1); // Убираем "#" из хеша
    if(!hash) return
    ReactScroll.scroller.scrollTo(hash, {smooth: true})
    // const element = document.getElementById(hash);
    // if (element) {
    //   console.log(element)
    //   scroll.scrollTo()
    //   element.scrollIntoView({ behavior: "smooth" });
    // }
  }

  useEffect(()=>{
    scrollToHashTitle()
    scrollSpy.update()
  })

  const cubeTextures = [
    'https://cdn.dribbble.com/users/3331076/screenshots/18423578/media/a14f1c292c3cd57e775be75d3ea55957.png?resize=1000x750&vertical=center',
    'https://cdn.dribbble.com/userupload/3731207/file/original-a95bccf7e2ab9e7bb2d4ff0dca5fd783.png?resize=1024x768',
    'https://cdn.dribbble.com/users/3331076/screenshots/18031498/media/836cd3312b758084feb3a4a798f3da32.png?resize=1000x750&vertical=center',
    // Добавьте другие URL-адреса текстур, как необходимо
  ];

  return (
    <div className="App">
      {/* <ThreeCanvas cubeTextures={cubeTextures} /> */}

      <Header />
      <div className='main-content-container'>
        <div className='main-content'>
          <RouterProvider router={router} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;

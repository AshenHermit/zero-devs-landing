import React, { useContext, useEffect } from 'react';
import logo from './logo.png';
import packageInfo from '../package.json'

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
import { Client, ClientContext, ClientWrapper } from './client';

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
], {basename: "/" + packageInfo.homepage});


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
  }

  useEffect(()=>{
    scrollToHashTitle()
    scrollSpy.update()
  })

  return (
    <ClientWrapper>
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
    </ClientWrapper>
  );
}

export default App;

import { useEffect, useRef } from 'react';
import logo from '../logo.png';
import { ReactComponent as SVGDemonFaceMicro } from "../graphics/demon_face_micro.svg";
import { BgBlurredElement } from "./graphics_elements";

export const Header = () => {
  let titles = [
    "Zero Devs - One Cup",
    "Almost Devs",
    "Almost Games",
    "Almost Team",
    "LIFE IS AN ERROR",
  ]
  let titleRef = useRef()
  let titleChangeTime = 5

  let setRandomTitle = () => {
    let randTitleIdx = Math.floor(Math.random()*titles.length)
    let randomTitle = titles[randTitleIdx]
    window.document.title = "Zero Devs, with zero games. oh you are looking at full page title, nice. im sorry for my... actually you know i will..."
    titleRef.current.innerText = randomTitle
    titleRef.current.style.minWidth = titleRef.current.clientWidth + "px"
  }
  useEffect(()=>{
    setRandomTitle()
    let interval = setInterval(()=>{
      setRandomTitle()
    }, 1000 * titleChangeTime)
    return ()=>{
      clearInterval(interval)
    }
  })
  return (
    <header>
      <div className='header-contents'>
        <nav>
          {/* <Overlay 
            images = {[
              "https://sun1-97.userapi.com/impg/TU9GgCoM_B0jE1WlGVH19_cWdOQQeuxyinbLhg/h0YTLSGn91U.jpg?size=1280x880&quality=96&sign=76d8449656d92c7c50c949561ebf94f4&type=album",
              "https://i.pinimg.com/564x/ad/dd/6d/addd6d78e764eeb487a950fd249f3b02.jpg",
              "https://i.pinimg.com/564x/09/6c/a6/096ca69d2c41bfa1050aa420843246c4.jpg"
            ]}
            changeTimeout = {1}
          /> */}

          <BgBlurredElement>
            <a href='/zero-devs/' className='header-title dynamic-logo-container'>
              <SVGDemonFaceMicro className='nav-logo'/>
              <strong ref={titleRef}>Almost Team</strong>
            </a>
          </BgBlurredElement>
          <ul>
            <li>
              <a href="/zero-devs/wat">Че</a>
            </li>
            <li>
              <a href="/zero-devs/projects">Проекты</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

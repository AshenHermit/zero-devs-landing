import React, { useContext, useEffect, useRef } from 'react';
import logo from '../logo.png';

import * as ReactScroll from 'react-scroll';

import { AnchorLink, FullscreenBlock, HugeBlock, SpaceFill } from './content_blocks';
import { AnimatedHTMLPrinter, BgBlurredElement, RandomShapes } from './graphics_elements';

import { ReactComponent as SVGBrainInJar } from "../graphics/brain_in_jar.svg";
import { ReactComponent as SVGBlade } from "../graphics/blade.svg";
import { ReactComponent as SVGBotanicula } from "../graphics/botanicula.svg";
import { ReactComponent as SVGDemonFace } from "../graphics/demon_face.svg";
import { isMobile } from 'react-device-detect';
import { ClientContext } from '../client';

export const defaultSectionObj = {
  titleText: "В черепной коробке",
  id: "in-brain",
  color: "red",
  titleContents: <>В черепной <br/><strong>КОРОБКЕ</strong></>, 
  grid: [],
}
export const SectionContext = React.createContext(defaultSectionObj);

export const SectionTitle = (props) => {
  const section = useContext(SectionContext)
  const client = useContext(ClientContext)
  
  return (
    <ReactScroll.Link to={section.id} smooth={true}>
      <BgBlurredElement blurScale={1.7}>
        <h1 className={section.color+' gradient-text'}>{section.titleContents}</h1>
      </BgBlurredElement>
    </ReactScroll.Link>
  )
}

export const SectionText = (props) => {
  let section = useContext(SectionContext)
  let elRef = useRef()
  useEffect(()=>{
    let el = elRef.current
    Array.from(el.getElementsByTagName("b")).forEach(b=>{
      b.classList.add(section.color, "gradient-text")
    })
  })
  return (
    <div ref={elRef} className='text'>
      <div className='marked-text'>
        {props.children}
      </div>
    </div>
  )
}

export const SectionIdeasRow = ({columns=[]}) => {
  let section = useContext(SectionContext)
  
  if(!columns) return
  
  return (
    <div className='ideas-row'>
      {columns.map(el=>{
        return (
          <AnimatedHTMLPrinter step={4} fps={60}>
            <div className='col'>
              {el}
            </div>
          </AnimatedHTMLPrinter>
        )
      })}
    </div>
  )
}

export const SectionRenderer = ({section=defaultSectionObj})=>{

  return (
    <SectionContext.Provider value={section}>
      <HugeBlock
        blockName={section.id}
        title={
          <ReactScroll.Link to={section.id} smooth={true}>
            <h1 className={section.color+' gradient-text'}>{section.titleContents}</h1>
          </ReactScroll.Link>
        }
        color={section.color}
        align={section.align}
        bg={section.bg}
        alreadyAnimated={section.alreadyAnimated}
        viewOffset={0}
        grid={section.grid}
      >
      </HugeBlock>
    </SectionContext.Provider>
  )
}

export const Landing = () => {
  let sections = [
    {
      titleText: "В черепной коробке", 
      id: "in-brain",
      color: "red",
      align: 'right',
      titleContents: <>В черепной <br/><strong>КОРОБКЕ</strong></>, 
      alreadyAnimated: true,
      grid: [
        {
          left: <SectionText>
                  <h3><b>Игра</b> как формат нарративного искусства - <b>это отдельная живая душа запечатанная в своей цифровой оболочке.</b></h3>
                  У которой есть свои мысли, отношение к вещам и к себе, свое настроение. Она погружает и парализует вас добровольно, мотивирует и вдохновляет на мысли.
                </SectionText>
          ,
          right: <SectionTitle/>,
          template: "2fr 1fr auto",
          reverse: isMobile
        },
        {
          left: <SectionIdeasRow columns={[
            <>
              <SectionText>
                <b>Она может как зарядить вас адреналином, так и забрать в ураган из проблем и головоломок, которые заставят мыслить творчески и нестандартно.</b><br/>
                Она вдохновит вас искать решения там, где их не ждешь. Когда ответ будет найден, вы почувствуете свободу полета мысли и озарения.
              </SectionText>
              <SVGBrainInJar/>
            </>
            ,
            <>
              <SVGBlade/>
              <SectionText>
                <b>Она даже может болеть и выздоравливать.</b><br/>
                Может отторгать вас.<br/>
                Может заставить вас чувствовать себя так - будто в мире больше нет никого кроме вас, будто вас подменили.<br/>
                <b>Будто вы не должны были существовать или вас и вовсе никогда и не существовало.</b>
              </SectionText>
            </>,
            <>
              <SectionText>
                <b>Она может заботиться о вас.</b> Может заставить чувствовать так - будто вы нашли давно потерянную часть себя, будто вы медитативно сливаетесь с природой.<br/>
                Будто уверенно почувствовали под ногами почву, услышали ответ с неба, <b>будто увидели теплый сон</b>, прожили год лета, год зимы. заного <b>встретили детство</b>, и возможно на этот раз навечно.
              </SectionText>
              <SVGBotanicula/>
            </>
          ]}/>
        }
      ]
    },

    {
      titleText: "В нервах", 
      id: "in-nerves",
      color: "blue",
      align: 'left',
      bg: 'left',
      titleContents: <>В нервах <br/><strong>=-----=</strong></>, 
      grid: [
        {"left": <SectionTitle/>}
      ]
    },

    {
      titleText: "В цифре",
      id: "in-program",
      color: "green",
      align: 'right',
      titleContents: <>[В цифре]<br/><strong>110100</strong></>, 
      grid: [
        {"right": <SectionTitle/>}
      ]
    },
  ]

  const ModelsShowoffLazy = React.lazy(() => import("./3d_showoff/showoff"));
  const client = useContext(ClientContext)
  client.sectionsData = sections

  useEffect(()=>{})

  return (
    <div className="home">
      <RandomShapes numShapes = {20} animated={!isMobile}/>
      {!isMobile ? 
        <React.Suspense fallback={null}>
          <ModelsShowoffLazy/>
        </React.Suspense>
       : ''}

      <FullscreenBlock
        outerSpace={<>
          <RandomShapes numShapes = {isMobile? 10: 20}/>
        </>}
        grid={[
          {
            left: <>
                <AnimatedHTMLPrinter fps={60}>
                <BgBlurredElement blurScale={1.7}>
                  <h1 className='red gradient-text'>Господи кто-нибудь<br/><strong>ПОМОГИТЕ МНЕ</strong></h1>
                </BgBlurredElement>
                <h2>
                  <span className='red bg-gradient-text'>Я насильно заперт...</span><br/>
                </h2>
                <ol>
                  {sections.map((section, i)=>{
                    return <li key={section.id + i}>
                      <ReactScroll.Link to={section.id} smooth={true} hashSpy={true}>
                        {section.titleText}
                      </ReactScroll.Link>
                    </li>
                  })}
                </ol>

                <h2>
                  <span className='red bg-gradient-text'>...в самой пиздатой геймдев команде 💪</span><br/>
                </h2>
                {/* <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span> */}
              </AnimatedHTMLPrinter>
            </>
            ,
            right: !isMobile ? <SVGDemonFace className='big-logo shadow-filter'/> : ''
          }
        ]}
      >
      </FullscreenBlock>

      {sections.map(section=>{
        return <SectionRenderer key={section.id} section={section}></SectionRenderer>
      })}

    </div>
  );
};
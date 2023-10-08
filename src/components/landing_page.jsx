import React, { useContext, useEffect, useRef, useState } from 'react';
import logo from '../logo.png';

import * as ReactScroll from 'react-scroll';

import { AnchorLink, FullscreenBlock, HugeBlock } from './content_blocks';
import { AnimatedHTMLPrinter, BgBlurredElement, RandomShapes } from './graphics_elements';

import SVGBrainInJar from "../graphics/brain_in_jar.svg?react";
import SVGBlade from "../graphics/blade.svg?react";
import SVGBotanicula from "../graphics/botanicula.svg?react";
import SVGDemonFace from "../graphics/demon_face.svg?react";

import SVGDoubleEye from "../graphics/double_eye.svg?react";
import SVGMultiHand from "../graphics/multi_hand.svg?react";
import SVGTemple from "../graphics/temple.svg?react";

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

export const IdeaComponent = ({children, className="", ...props}) => {
  return (
    <AnimatedHTMLPrinter step={4} fps={60}>
      <div className={'col idea '+className}>
        {children}
      </div>
    </AnimatedHTMLPrinter>
  )
}

export const SectionIdeasRow = ({columns=[], wreath=false, ...props}) => {
  let section = useContext(SectionContext)
  
  if(!columns) return
  let className = "ideas-row"
  if(wreath) className += " wreath"
  
  return (
    <div className={className}>
      {columns.map(el=>{
        return (
          el
        )
      })}
    </div>
  )
}

export const SectionRenderer = ({section=defaultSectionObj})=>{
  var [currentSectionData, setCurrentSectionData] = useState(null)
  const client = useContext(ClientContext)
  let className = ""

  useEffect(()=>{
    client.subscribeToSectionData(setCurrentSectionData)
  }, [])

  if(currentSectionData){
    if(currentSectionData.id == section.id){
      className = "active"
    }
  }

  return (
    <SectionContext.Provider value={section}>
      <HugeBlock
        className={className}
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
      titleText: "🧠 В черепной коробке", 
      id: "in-brain",
      color: "red",
      align: 'right',
      titleContents: <>В черепной <br/><strong>КОРОБКЕ</strong> 🧠</>, 
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
            <IdeaComponent>
              <SectionText>
                <b>Она может как зарядить вас адреналином, так и забрать в ураган из проблем и головоломок, которые заставят мыслить творчески и нестандартно.</b><br/>
                Она вдохновит вас искать решения там, где их не ждешь. Когда ответ будет найден, вы почувствуете свободу полета мысли и озарения.
              </SectionText>
              <SVGBrainInJar/>
          </IdeaComponent>
            ,
            <IdeaComponent>
              <SVGBlade/>
              <SectionText>
                <b>Она даже может болеть и выздоравливать.</b><br/>
                Может отторгать вас.<br/>
                Может заставить вас чувствовать себя так - будто в мире больше нет никого кроме вас, будто вас подменили.<br/>
                <b>Будто вы не должны были существовать или вас и вовсе никогда и не существовало.</b>
              </SectionText>
            </IdeaComponent>,
            <IdeaComponent>
              <SectionText>
                <b>Она может заботиться о вас.</b> Может заставить чувствовать так - будто вы нашли давно потерянную часть себя, будто вы медитативно сливаетесь с природой.<br/>
                Будто уверенно почувствовали под ногами почву, услышали ответ с неба, <b>будто увидели теплый сон</b>, прожили год лета, год зимы. заного <b>встретили детство</b>, и возможно на этот раз навечно.
              </SectionText>
              <SVGBotanicula/>
            </IdeaComponent>
          ]}/>
        }
      ]
    },

    {
      titleText: "🏛 В идее", 
      id: "in-idea",
      color: "blue",
      align: 'left',
      bg: 'left',
      titleContents: <>В идее <br/><strong>=-----=</strong></>, 
      grid: [
        {
          "left": <SectionTitle/>,
          "right": <SectionText>
            <h3>Хорошие идеи и вдохновение никогда не получаются из чего-то целиком, <b>их извлекают атомарно из всего что только можно.</b></h3>
          </SectionText>
        },
        {
          left: <SectionIdeasRow wreath={true} columns={[
            <IdeaComponent className='colored-bg'>
              <SectionText>
              Мы стараемся мыслить шире и объективнее, мы не привязаны ни к конкретным вкусам, ни к сеттингу, ни к жанру. 
              </SectionText>
              <SVGDoubleEye/>
              <SectionText>
              Мы привязаны к нашей собственной уникальной конструкции которую можно собрать из идей. 
              </SectionText>
            </IdeaComponent>
            ,
            <IdeaComponent>
              <SectionText>
              Вдохновляемся естественно всем подряд - произвидениями сферы игр, музыки, кинематографа, графики, литературы. 
              </SectionText>
              <SVGMultiHand/>
              <SectionText>
              И часто знаниями вообще не относящимися к играм и творчеству.
              </SectionText>
            </IdeaComponent>
            ,
            <IdeaComponent className='colored-bg'>
              <SectionText>
                Любые идеи очень ценны, поэтому мы стараемся вести базу, записывать их, формировать концепты, собирать как можно больше материала. 
              </SectionText>
              <SVGTemple/>
              <SectionText>
                Даже недоделаные проекты - это такой же сформированый материал, который содержит ценные идеи и опыт.
              </SectionText>
            </IdeaComponent>
          ]}/>
        }
      ]
    },

    {
      titleText: "📟 В цифре",
      id: "in-program",
      color: "green",
      align: 'center',
      titleContents: <>[В цифре]<br/><strong>110100</strong></>, 
      grid: [
        {"center": <SectionTitle/>}
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
        className={"active"}
        outerSpace={<>
          <RandomShapes numShapes = {isMobile? 10: 20} animated={!isMobile}/>
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
                      <ReactScroll.Link to={section.id} smooth={true} hashSpy={true} offset={-150}>
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
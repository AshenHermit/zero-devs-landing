import ScrollAnimation from "react-animate-on-scroll"
import { BgBlurredElement, SkewedLineBgEl } from "./graphics_elements"
import { Component, useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import * as ReactScroll from 'react-scroll';

export const ExternalLink = (props) => {
  return (
    <a className='link' target="_blank" rel="noopener noreferrer" {...props}>
      {props.children}
    </a>
  )
}

export const HugeBlock = ({grid=[], align="", color="", alreadyAnimated=false, viewOffset=0, blockName="", bg="", duration=0.5}) => {
  let className = "huge-block"

  if(align){
    className += " " + "align-" + align
  }
  if(color){
    className += " " + "colored-" + color
  }
  
  let blockAnimation = "animate__fadeIn"
  if (alreadyAnimated){
    blockAnimation = ""
  }

  if(!grid) return

  return (
    <ReactScroll.Element name={blockName}>
      <ScrollAnimation animatePreScroll={true} initiallyVisible={alreadyAnimated} animateOnce={true} duration={duration} offset={viewOffset+0} animateIn={blockAnimation}>
        <div className={className}>
          {bg ? <SkewedLineBgEl swapDirection={bg === "right"}/> : ''}
          <BlockGridRenderer grid={grid}/>
        </div>
      </ScrollAnimation>
    </ReactScroll.Element>
  )
}

export const BlockGridRenderer = ({grid=0, className="content", alreadyAnimated=false}) => {
  if(!grid) return <></>

  if(className) className += " " + className
  let duration = 0.5

  return (
    <div className={className}>
      {grid.map((row, r)=>{
        let colsTemplate = "" || row.template
        let rowStyle = {}
        if(colsTemplate){
          colsTemplate = colsTemplate.split(" ")
          colsTemplate.forEach((x, i)=>{
            rowStyle["--grid-"+i+"-el"] = x;
          })
        }
        let sideKeys = ["left", "center", "right"]
        if(row.reverse){
          sideKeys = sideKeys.reverse()
        }
        let rowEls = sideKeys.map(sideKey=>{
          let col = row[sideKey];
          if(!col) return (<div className="col"></div>);

          let sideFadeAnimation = "animate__fadeInLeft"
          if(sideKey=="left") sideFadeAnimation = "animate__fadeInLeft"
          if(sideKey=="center") sideFadeAnimation = "animate__fadeInDown"
          if(sideKey=="center" && r>0) sideFadeAnimation = "animate__fadeInUp"
          if(sideKey=="right") sideFadeAnimation = "animate__fadeInRight"
          if(alreadyAnimated) sideFadeAnimation = ""
          
          return (
            <div key={"" + r + sideKey} className={"col "+sideKey}>
              <ScrollAnimation
                animatePreScroll={false} initiallyVisible={alreadyAnimated} 
                animateOnce={true} duration={duration} offset={0} animateIn={sideFadeAnimation}
                >
                {col}
              </ScrollAnimation>
            </div>
          )
        })
        return (
          <div className="row" style={{gridTemplateColumns: colsTemplate}}>{rowEls}</div>
        )
      })}
    </div>
  )
}

export const FullscreenBlock = ({grid=[], outerSpace}) => {
  let className = "huge-block fullscreen"

  if(!grid) return

  return (
    <>
    <div className={className}>
      {outerSpace}
      <BlockGridRenderer grid={grid}/>
    </div>
    <SkewedLineBgEl half={true}/>
    </>
  )
}

export class MDDoc extends Component {
  constructor(props) {
    super(props)

    this.state = { mdText: null }
  }

  componentDidMount() {
    fetch(this.props.mdFilePath).then((response) => response.text()).then((text) => {
      this.setState({ mdText: text })
    })
  }

  render() {
    return (
      <div className="content">
        <ReactMarkdown>{this.state.mdText}</ReactMarkdown>
      </div>
    )
  }
}

export const AnchorLink = ({to="", children}) => {
  let elRef = useRef()

  let onClick = (e)=>{
    console.log("clicked")
    e.preventDefault();
    const hash = window.location.hash.substring(1); // Убираем "#" из хеша
    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  // useEffect(()=>{
  //   let el = elRef.current
  //   el.addEventListener("click", onClick)
  //   return ()=>{
  //     el.removeEventListener("click", onClick)
  //   }
  // })

  return (
    <a ref={elRef} onClick={onClick} className="anchor-link" href={"#"+to}>
      {children}
    </a>
  )
}
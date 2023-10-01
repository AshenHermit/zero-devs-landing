import {ReactComponent as SkewedLineHalfSVG} from '../graphics/skewed_line_half.svg';
import {ReactComponent as SkewedLineSVG} from '../graphics/skewed_line.svg';
import React, { Component, useEffect, useRef, useState } from 'react';
import * as Simplex from 'perlin-simplex';
import { isMobile } from 'react-device-detect';

export const BgBlurredElement = ({blurScale=1, children}) =>{
  var blurSize = 30 * blurScale;
  return (
    <div className='blur-container'>
      <div className='blur-bg' style={{filter: "blur("+blurSize+"px)"}}>
        {children}
      </div>
      <div className='blur-element'>
        {children}
      </div>
    </div>
  )
}

export const SkewedLineBgEl = ({swapDirection=false, half=false}) => {
  let className = 'skewed-line';

  if(swapDirection){
    className += " swap-direction"
  }

  let svgRef = useRef()
  let defaultCrop = useRef("")
  let shouldCrop = isMobile

  useEffect(()=>{
    if(shouldCrop){
      if(!defaultCrop.current)
        defaultCrop.current = svgRef.current.getAttribute("viewBox")
      
      let viewBox = defaultCrop.current
      viewBox = viewBox.split(" ").map(parseFloat)
      let crop = 220
      viewBox[0] += crop
      viewBox[2] -= crop
      viewBox = viewBox.join(" ")
      svgRef.current.setAttribute("viewBox", viewBox)
    }
  }, [])

  let svgEl = <SkewedLineSVG ref={svgRef} className={className}/>;
  if(half){
    svgEl = <SkewedLineHalfSVG ref={svgRef} className={className}/>;
  }
  return (
    <div className='graphic-el-container'>
      {svgEl}
    </div>
  )
}

export const Overlay = ({changeTimeout=1, images=[]}) => {
  var imgRef = useRef()
  currentImageIdx = 0

  useEffect(()=>{
    setInterval(()=>{
      changeImage()
    }, 1000 * changeTimeout)
    changeImage()
  })
  var currentImageIdx = 0
  function getCurrentImage(){
    return images[currentImageIdx]
  }
  function changeImage(){
    imgRef.current.src = getCurrentImage()
    currentImageIdx += 1
    if(currentImageIdx >= images.length){
      currentImageIdx = 0
    }
  }
  return (
    <img ref={imgRef} className='overlay' src={getCurrentImage()}/>
  )
}

export class RandomShapes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shapes: [],
    };
    this.container = React.createRef()
    this.generateRandomShapes = this.generateRandomShapes.bind(this)
    this.resizeContainer = this.resizeContainer.bind(this)
    this.startAnimation = this.startAnimation.bind(this)
    this.stopAnimation = this.stopAnimation.bind(this)
    this.getCurrentElTransform = this.getCurrentElTransform.bind(this)

    this.noise = new Simplex(Math)
    this.transformUpdateInterval = 0
    this.transformUpdateTime = 1000/5
    this.speed = 0.01
    this.time = 0
    this.noiseIdxOffsetFactor = 100
    this.noiseScale = 40.0

    this.transforms = {}
  }

  startAnimation(){
    this.transformUpdateInterval = setInterval(()=>{
      this.time += this.speed
      Array.from(this.container.current.getElementsByTagName("g")).forEach((el, i)=>{
        let trans = this.getCurrentElTransform(i)
        let newTrans = `translate(${trans.x}, ${trans.y}) rotate(${trans.rotation})`
        el.setAttribute("transform", newTrans)
      })
    }, this.transformUpdateTime)
  }
  stopAnimation(){
    clearInterval(this.transformUpdateInterval)
  }

  componentDidMount() {
    this.resizeContainer();
    this.generateRandomShapes();
    this.startAnimation()
  }
  componentWillUnmount(){
    this.stopAnimation()
  }
  
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getCurrentElTransform(i){
    let initTrans = this.transforms[i]

    let idxOffset = i * this.noiseIdxOffsetFactor
    let x = initTrans.x + this.noise.noise(0+idxOffset, this.time) * this.noiseScale
    let y = initTrans.y + this.noise.noise(10+idxOffset, this.time) * this.noiseScale
    let rotation = initTrans.rotation + this.noise.noise(20+idxOffset, this.time) * this.noiseScale

    return {x, y, rotation}
  }
  
  resizeContainer(){
    const conatinerEl = this.container.current
    const parentWidth = conatinerEl.parentNode.clientWidth
    const parentHeight = conatinerEl.parentNode.clientHeight
    conatinerEl.style.width = `${parentWidth}px`
    conatinerEl.style.height = `${parentHeight}px`
  }

  generateRandomShapes() {
    const numShapes = 20; // Количество случайных фигур, которые вы хотите создать

    const containerWidth = this.container.current.clientWidth
    const containerHeight = this.container.current.clientHeight

    const shapes = Array.from({ length: numShapes }, (_, index) => {
      const isCross = Math.random() < 0.5; // Решаем, будет это крестик или треугольник
      let isFilled = false
      if(!isCross) isFilled = Math.random() < 0.5

      const width = this.getRandomInt(20, 100); // Размер от 20 до 100
      const height = this.getRandomInt(20, 100);

      let x = this.getRandomInt(0, containerWidth - width); // Рандомная позиция по X (ограничиваем максимум до 400, чтобы не выходило за границы контейнера)
      let y = this.getRandomInt(0, containerHeight - height); // Рандомная позиция по Y

      let rotation = this.getRandomInt(0, 360); // Угол поворота от 0 до 360 градусов
      const opacity = 0.2 + this.getRandomInt(0, 1) / 2;
      
      this.transforms[index] = {x, y, rotation}
      let trans = this.getCurrentElTransform(index)
      rotation = trans.rotation
      x = trans.x
      y = trans.y

      var colors = ["#ff2482", "rgb(255, 200, 125)", "rgb(100, 100, 100)"]
      const fillColor = colors[this.getRandomInt(0, colors.length-1)]; // Рандомный цвет в формате RGB

      return (
        <g key={index} transform={`translate(${x}, ${y}) rotate(${rotation})`} opacity={opacity}>
          {isCross ? (
            <path
              d={`M0,0 L${width},${width} M${width},0 L0,${width}`}
              fill="none"
              stroke={fillColor}
              strokeWidth="5"
              strokeLinecap="round"
            />
          ) : (
            <polygon
              points={`0,0 ${width},0 ${width / 2},${height}`}
              stroke={fillColor}
              strokeWidth="5"
              fill={isFilled ? fillColor : 'none'}
              strokeLinejoin="round" // Закругляем углы многоугольника
            />
          )}
        </g>
      );
    });

    this.setState({ shapes });
  }

  render() {
    return (
      <div ref={this.container} className='shapes-overlay'>
        <svg width="100%" height="100%">
          {this.state.shapes}
        </svg>
      </div>
    );
  }
}

export class ElementViewObserver extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  
  handleIntersection = (entries) => {
    if(!entries) return
    let entry = entries[0]
    const intersecting = entry.isIntersecting
  
    if (intersecting) {
      this.props.onElementVisible();
    }
  };

  componentDidMount() {
    const options = {
      threshold:  1.0, // Порог видимости, например, 0.5 означает, что элемент считается видимым, когда он находится на экране хотя бы на 50%
    };

    this.observer = new IntersectionObserver(this.handleIntersection, options);
    let elToObserve = this.myRef.current
    if(this.props.ovserveChild) elToObserve = elToObserve.children[0]
    this.observer.observe(elToObserve);
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  render() {
    return <div ref={this.myRef}>{this.props.children}</div>;
  }
}

export const AnimatedHTMLPrinter = ({step=1, fps=60, children}) => {
  let srcRef = useRef()
  let dstRef = useRef()
  let canAnimate = useRef(false)

  useEffect(()=>{
    let interval = null
    let currentPosition = 0
    let currentHTMLString = ""
    let srcHTML = srcRef.current.innerHTML
    let dstEl = dstRef.current

    interval = setInterval(()=>{
      if(!canAnimate.current) return
      let isInTag = false

      let charsScanned = 0

      while(true){
        let nextChar = srcHTML.charAt(currentPosition)
        if(nextChar=="<") isInTag = true
        if(nextChar==">") isInTag = false
        currentHTMLString += nextChar
        currentPosition += 1
        if(isInTag) continue

        charsScanned+=1
        if(charsScanned < step){
          continue
        }
        
        break
      }
      dstEl.innerHTML = currentHTMLString
      if(currentPosition >= srcHTML.length){
        clearInterval(interval)
        dstRef.current.style.display = "none"
        srcRef.current.style.display = ""
      }
    }, 1000 / fps)

    return ()=>{
      clearInterval(interval)
    }
  })

  const onElementVisible = ()=>{

    canAnimate.current = true
  }

  return(
    <ElementViewObserver onElementVisible={onElementVisible}>
      <div className='html-printer'>
        <div ref={srcRef} style={{display: "none"}}>
          {children}
        </div>
        <div ref={dstRef} className='printed-content'>

        </div>
      </div>
    </ElementViewObserver>
  )
}

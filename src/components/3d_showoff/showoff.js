import { Stats, OrbitControls, useGLTF, Box } from '@react-three/drei'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useRef, useMemo, useEffect, useState } from 'react'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import {
  MeshNormalMaterial,
  IcosahedronGeometry,
  TorusKnotGeometry,
  Mesh,
  TextureLoader,
  MeshStandardMaterial,
} from 'three'
import * as THREE from 'three'
import { Physics, RapierRigidBody, RigidBody } from '@react-three/rapier';

function Plane({shadow, bodyRef, ...props}) {
    let visible = shadow !== undefined
    const boxRef = useRef()
    useEffect(()=>{
        if(!visible) boxRef.current.visible = false
    })
    return (
        <RigidBody ref={bodyRef} type="fixed" colliders="cuboid">
            <Box
                ref={boxRef}
                scale={[100, 10, 100]}
                receiveShadow={visible}
                // visible={visible}
                {...props}
            >
                {visible ? 
                <shadowMaterial opacity={0.5}/>: 
                <shadowMaterial opacity={0.0}/>}
            </Box>
        </RigidBody>
    )
}

function PistonPlane({shadow, position, targetPosition, ...props}) {
    let visible = shadow !== undefined

    const boxRef = useRef()
    const bodyRef = useRef()
    useEffect(()=>{
        if(!visible) boxRef.current.visible = false
    })
    targetPosition = targetPosition.map((x,i)=>x-position[i])

    useFrame(()=>{
        let body = bodyRef.current
        if(!body) return
        let position = body.translation()
        body.setTranslation({
            x: position.x + (targetPosition[0] - position.x)/10,
            y: position.y + (targetPosition[1] - position.y)/10,
            z: position.z + (targetPosition[2] - position.z)/10,
        })
    })

    return (
        <RigidBody ref={bodyRef} type="kinematicPosition" colliders="cuboid">
            <Box
                ref={boxRef}
                scale={[100, 10, 100]}
                receiveShadow={visible}
                // visible={visible}
                position={position}
                {...props}
            >
                {visible ? 
                <shadowMaterial opacity={0.5}/>: 
                <shadowMaterial opacity={0.0}/>}
            </Box>
        </RigidBody>
    )
}

export function getModelFilesPaths(modelName){
    let modelFolder = `/models/${modelName}/`
    return {
        modelFolder: modelFolder,
        modelFilepath: modelFolder+`${modelName}.glb`,
        textureFilepath: modelFolder+`${modelName}.png`,
        emissionTextureFilepath: modelFolder+`${modelName}_emission.png`,
    }
}

export function GLBRigidBody({modelName, children, position, ...props}) {
    const paths = getModelFilesPaths(modelName)
    const obj = useGLTF(paths.modelFilepath)

    // console.log(geometry)
    let viewGeometry = obj.nodes[modelName].geometry
    // let phyGeometry = obj.nodes[modelName+"_phy"].geometry
    const ref = useRef()

    useEffect(()=>{
        /** @type {RapierRigidBody} */
        let body = ref.current
        let rand = () => {return (Math.random()-0.5)/100.0}
        body.applyImpulse({x: 50+rand()*10, y:0+rand()*10, z:2+rand()*10})
        // setTimeout(()=>{
        //     body.applyImpulse({x: 50+rand()*10, y:0+rand()*10, z:2+rand()*10})
        //     setTimeout(()=>{
        //         body.applyImpulse({x: 100+rand()*10, y:0+rand()*10, z:2+rand()*10})
        //     }, 100)
        //     setTimeout(()=>{
        //         body.applyImpulse({x: 100, y:0, z:2})
        //     }, 300)
        // }, 100)
    }, [])

    function randOffset(offset){
        return offset + (Math.random()-0.5)*10
    }
    const positionRandomized = useRef(null)
    function randModelPos(offset){
        return [randOffset(position[0]), randOffset(position[1]), position[2]]
    }

    if(!positionRandomized.current){
        positionRandomized.current = randModelPos(position)
    }

    return (
        <RigidBody ref={ref} colliders="hull" friction={0.3}>
            <mesh
                castShadow
                geometry={viewGeometry}
                position={positionRandomized.current}
                {...props}
            >
                {children}
            </mesh>
        </RigidBody>
    )
}
export function Model({modelName, children, ...props}) {
    const paths = getModelFilesPaths(modelName)
    
    const texture = useLoader(TextureLoader, paths.textureFilepath)
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.flipY = false

    return (
        <GLBRigidBody modelName={modelName} {...props}>
            <meshToonMaterial map={texture}>
            </meshToonMaterial>
        </GLBRigidBody>
    )
}
export function ModelWithEmission({modelName, children, ...props}) {
    const paths = getModelFilesPaths(modelName)
    
    const texture = useLoader(TextureLoader, paths.textureFilepath)
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    
    let emissionTex = null
    emissionTex = useLoader(TextureLoader, paths.emissionTextureFilepath)
    emissionTex.magFilter = THREE.NearestFilter;
    emissionTex.flipY = false
    emissionTex.minFilter = THREE.LinearMipMapLinearFilter;

    return (
        <GLBRigidBody modelName={modelName} {...props}>
            <meshToonMaterial
                map={texture}
                emissive={"white"}
                emissiveMap={emissionTex}
                emissiveIntensity={1}
                side={THREE.DoubleSide}
            >
            </meshToonMaterial>
        </GLBRigidBody>
    )
}

const Camera = (props) => {
    const ref = useRef();
    const {camera} = useThree();

    useFrame((state, delta) => {
        camera.position.set(0, -window.scrollY/150, 3)
    });

    return (
        <perspectiveCamera ref={ref} {...props} 
            makeDefault
            position={[0, 0, 10]}
            fov={75}
            near={0.1}
            far={1000} 
        >
            {props.children}
        </perspectiveCamera>
    );
};

export const ModelsShowoff = ({...props})=>{
    const [gravity, setGravity] = useState({x: 3, y: -9.8*2, z: 0})
    const physicsRef = useRef()
        
    const canvasRef = useRef()
    const containerRef = useRef()
    const groundRef = useRef()
    const pistonPlaneRef = useRef()

    const gravityFreed = useRef(false)

    useEffect(()=>{
        // set({ camera: ref.current })
        
        const cb = (event) => {
            if(!groundRef.current) return
            if(window.scrollY > 700 && !gravityFreed.current){
                setGravity({x: 0, y: -0.04, z: 0.1})
                let ground = groundRef.current
                gravityFreed.current = true
                ground.setTranslation({x:0, y: 200, z: 0})
            }
        }
        cb()
        document.addEventListener("scroll", cb);
        console.log(physicsRef.current)
        return ()=>{
            document.removeEventListener("scroll", cb);
        }
    }, [])

    let startModelsPos = [-25, 10, -5]
    
    return (
        <div ref={containerRef} className='models-showoff'>
            <Canvas ref={canvasRef} shadows>
                <Camera>
                    <pointLight
                        position={[-10,4,-2]}
                        intensity={500.0}
                        distance={100.0}
                        castShadow
                        color={new THREE.Color("#ff1b82")}
                    />
                    <pointLight
                        position={[10,4,-2]}
                        intensity={500.0}
                        distance={100.0}
                        castShadow
                        color={new THREE.Color("#ffc87d")}
                    />
                    <pointLight
                        position={[0,1,-2]}
                        intensity={300.0}
                        distance={100.0}
                        color={"white"}
                    />
                </Camera>
                
                <Physics ref={physicsRef} gravity={[gravity.x, gravity.y, gravity.z]} interpolation={true} colliders={false}>
                    <Plane bodyRef={groundRef} position={[0, -2.2 - 5, 0]} rotation={[0, 0, 0]} shadow />
                    {/* <Plane ref={groundRef} position={[0, -2.2 - 5, 0]} rotation={[0, 0, -Math.PI / 50]} shadow /> */}

                    <Plane position={[0,0,-1.2 + 5]} rotation={[Math.PI / 2, 0, 0]} />
                    <Plane position={[0,0,-8 - 5]} rotation={[Math.PI / 2, 0, 0]} />

                    <Plane position={[8 + 5,0,0]} rotation={[0, 0, Math.PI / 2]} />
                    <PistonPlane
                        position={[-50 - 5,0,0]} 
                        targetPosition={[-8 - 5, 0, 0]}
                        rotation={[0, 0, Math.PI / 2]} />

                    <group>
                        <ModelWithEmission 
                            modelName="battery"
                            position={startModelsPos}
                            rotation={[0, -Math.PI / 2, 0]} />
                        <ModelWithEmission 
                            modelName="battery_socket"
                            position={startModelsPos}
                            rotation={[0, -Math.PI / 2, 0]} />
                        <ModelWithEmission 
                            modelName="piston"
                            position={startModelsPos}
                            />
                        <ModelWithEmission 
                            modelName="neuro_block"
                            position={startModelsPos}
                            />

                        <Model 
                            modelName="floor"
                            position={startModelsPos}
                            rotation={[0, -Math.PI / 2, 0]} />
                        <Model 
                            modelName="ceiling"
                            position={startModelsPos}
                            rotation={[0, -Math.PI / 2, 0]} />
                        <Model 
                            modelName="placeholder"
                            position={startModelsPos}
                            scale={[2,2,2]}/>
                        <Model 
                            modelName="injector"
                            position={startModelsPos}
                            scale={[0.3,0.3,0.3]}/>
                        <Model 
                            modelName="mandarin"
                            position={startModelsPos}
                            scale={[0.6,0.6,0.6]}/>
                    </group>
                </Physics>
            </Canvas>
        </div>
    )
}
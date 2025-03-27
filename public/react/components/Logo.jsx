/* eslint react/no-unknown-property: 0 */

import TreasureChest from "./TreasureChest";
import React, {Suspense, useRef} from "react";
import {CameraControls, OrbitControls, RandomizedLight} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";

export default function Logo () {
    const ref = useRef(null);
    useFrame((state, delta, frame) => {
        if(ref.current) {
            ref.current.azimuthAngle += 4 * delta * THREE.MathUtils.DEG2RAD;
        }
    })
    return <group>
        <CameraControls autoRotate={true}
                       minPolarAngle={Math.PI/2}
                       maxPolarAngle={Math.PI/2}
                       enableRotate={true}
                       autoRotateSpeed={10}
                       enableDamping={false}
                       dampingFactor={0.01}
                       enableZoom={false}
                       enablePan={false}
                       truckSpeed={0}
                       dollySpeed={0}
                       keyPanSpeed={0}
                       panSpeed={0}
                       zoomToCursor={true}
                       zoomSpeed={0}
                       minDistance={5}
                       maxDistance={5}
                        maxSpeed={1}
                        azimuthRotateSpeed={2}
                        ref={ref}
        />
            <Suspense>
                <TreasureChest scale={[0.04, 0.04, 0.04]} position={[0, -2, 0]}/>
            </Suspense>
        <OrbitControls/>
        <ambientLight intensity={Math.PI} />
        <RandomizedLight castShadow amount={8} frames={100} position={[5, 5, -10]} />
    </group>
}
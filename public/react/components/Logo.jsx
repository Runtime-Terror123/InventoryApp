import TreasureChest from "./TreasureChest";
import React, {Suspense} from "react";
import {OrbitControls, RandomizedLight} from "@react-three/drei";

export default function Logo () {
    return <group>
        <OrbitControls autoRotate={true} minPolarAngle={Math.PI/2} maxPolarAngle={Math.PI/2} rotateSpeed={0.001} enableDamping={true}/>
            <Suspense>
                <TreasureChest scale={[0.04, 0.04, 0.04]} position={[0, -2, 0]}/>
            </Suspense>
        <OrbitControls/>
        <ambientLight intensity={Math.PI} />
        <RandomizedLight castShadow amount={8} frames={100} position={[5, 5, -10]} />
    </group>
}
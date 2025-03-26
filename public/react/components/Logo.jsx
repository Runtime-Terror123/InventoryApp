import TreasureChest from "./TreasureChest";
import React, {Suspense} from "react";
import {OrbitControls, RandomizedLight} from "@react-three/drei";

export default function Logo () {
    return <group>
        <OrbitControls autoRotate={true}
                       minPolarAngle={Math.PI/2}
                       maxPolarAngle={Math.PI/2}
                       autoRotateSpeed={0.8}
                       enableDamping={true}
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
        />
            <Suspense>
                <TreasureChest scale={[0.04, 0.04, 0.04]} position={[0, -2, 0]}/>
            </Suspense>
        <OrbitControls/>
        <ambientLight intensity={Math.PI} />
        <RandomizedLight castShadow amount={8} frames={100} position={[5, 5, -10]} />
    </group>
}
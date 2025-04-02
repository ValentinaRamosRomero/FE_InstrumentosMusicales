// src/Componentes/GuitarCanvas.jsx
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage } from "@react-three/drei";

const GuitarModel = () => {
  const { scene } = useGLTF("/models/guitar/scene.glb"); // Asegúrate de tenerlo en public/models/guitar/
  return <primitive object={scene} scale={1.5} />;
};

const GuitarCanvas = () => {
  return (
    <Canvas style={{ height: "100%", width: "100%" }}>
      <ambientLight intensity={0.8} />
      <Suspense fallback={null}>
        <Stage environment="city" intensity={0.6}>
          <GuitarModel />
        </Stage>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
      </Suspense>
    </Canvas>
  );
};

export default GuitarCanvas;

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Box, Sphere, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import styles from './BlockchainCube.module.css';

// --- Constants ---
const CUBE_SIZE = 0.22; // Slightly bigger
const LINE_THICKNESS = 0.008; // Thinner lines (was 0.015)
const PACKET_SIZE = 0.04; // Smaller packet (was 0.06)
const SCALE = 1.0; // Smaller overall structure (was 1.2)

// Vertices for a cube centered at 0,0,0
const VERTICES = [
  new THREE.Vector3(-1, -1, -1), // 0
  new THREE.Vector3(1, -1, -1),  // 1
  new THREE.Vector3(1, 1, -1),   // 2
  new THREE.Vector3(-1, 1, -1),  // 3
  new THREE.Vector3(-1, -1, 1),  // 4
  new THREE.Vector3(1, -1, 1),   // 5
  new THREE.Vector3(1, 1, 1),    // 6
  new THREE.Vector3(-1, 1, 1),   // 7
];

// Adjacency list
const ADJACENCY = {
  0: [1, 3, 4],
  1: [0, 2, 5],
  2: [1, 3, 6],
  3: [0, 2, 7],
  4: [0, 5, 7],
  5: [1, 4, 6],
  6: [2, 5, 7],
  7: [3, 4, 6]
};

// Edges (pairs of vertex indices)
const EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 0], // Back face
  [4, 5], [5, 6], [6, 7], [7, 4], // Front face
  [0, 4], [1, 5], [2, 6], [3, 7]  // Connecting edges
];

// --- Components ---

const Node = ({ position, isLit, index }) => {
  const meshRef = useRef();
  const progress = useRef(0);
  const startY = position.y + 10; // Start high up
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Falling Animation
      // Add delay based on index
      const delay = index * 0.1;
      if (state.clock.elapsedTime > delay) {
        if (progress.current < 1) {
          progress.current += delta * 2; // Fall speed
          const t = 1 - Math.pow(1 - Math.min(progress.current, 1), 3); // Ease out cubic
          meshRef.current.position.y = THREE.MathUtils.lerp(startY, position.y, t);
        } else {
          meshRef.current.position.y = position.y;
        }
      }
    }
  });

  return (
    <Box 
      ref={meshRef}
      args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} 
      position={[position.x, startY, position.z]}
    >
      <meshStandardMaterial 
        color={isLit ? "#C8A44C" : "#CE3937"} 
        emissive={isLit ? "#C8A44C" : "#CE3937"}
        emissiveIntensity={isLit ? 0.5 : 0.2}
        roughness={1.0} // Fully matte, no reflection
        metalness={0.0} // No metalness
      />
    </Box>
  );
};

const Edge = ({ start, end, index }) => {
  // Calculate cylinder transform to connect start and end points
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  const position = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  
  // Create a quaternion to rotate the cylinder (which defaults to Y-axis) to align with direction
  const orientation = new THREE.Matrix4();
  orientation.lookAt(start, end, new THREE.Vector3(0, 1, 0));
  const offsetRotation = new THREE.Matrix4().makeRotationX(Math.PI / 2);
  orientation.multiply(offsetRotation);
  const quaternion = new THREE.Quaternion().setFromRotationMatrix(orientation);

  // Create dotted texture
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128; // Increased resolution for sharper lines
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Transparent background
    ctx.clearRect(0, 0, 128, 128);
    
    // Draw a solid band in the middle for the "dash"
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 32, 128, 64); // Fill middle 50% height
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    // Use NearestFilter for sharper edges on pixel-perfect dots, or Linear for smooth
    // Anisotropy helps with oblique angles
    tex.anisotropy = 16; 
    return tex;
  }, []);

  // Clone texture to set specific repeat for this edge length
  const edgeTexture = useMemo(() => {
    const t = texture.clone();
    t.repeat.set(1, length * 4); 
    return t;
  }, [texture, length]);

  const materialRef = useRef();

  useFrame((state, delta) => {
    if (materialRef.current) {
      // Fade in after nodes have started falling
      const delay = 1.5 + (index * 0.1);
      if (state.clock.elapsedTime > delay) {
        materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, 1, delta * 2);
      } else {
        materialRef.current.opacity = 0;
      }
    }
  });

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[LINE_THICKNESS, LINE_THICKNESS, length, 16]} />
      <meshStandardMaterial 
        ref={materialRef}
        color="#2C2C2C" 
        alphaMap={edgeTexture}
        transparent={true}
        opacity={0} // Start invisible
        roughness={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const DataPacket = ({ start, end, progress }) => {
  const position = new THREE.Vector3().lerpVectors(start, end, progress);
  
  return (
    <group position={position}>
      <Sphere args={[PACKET_SIZE, 32, 32]}>
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#C8A44C"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </Sphere>
      <pointLight color="#C8A44C" intensity={2} distance={3} decay={2} />
    </group>
  );
};

const SceneContent = () => {
  const groupRef = useRef();
  
  // Animation State
  const [litNode, setLitNode] = useState(null); // Start with no node lit
  const [activePath, setActivePath] = useState(null); // { from, to, startTime }
  const [packetProgress, setPacketProgress] = useState(0);
  const [isReady, setIsReady] = useState(false); // Wait for entrance animation

  // Rotate the whole cube slowly
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }

    // Check if entrance animation is done (approx 2 seconds)
    if (!isReady && state.clock.elapsedTime > 2.0) {
      setIsReady(true);
    }

    // Handle Packet Animation
    if (activePath) {
      const duration = 1.0; // seconds
      const elapsed = state.clock.elapsedTime - activePath.startTime;
      const progress = Math.min(elapsed / duration, 1);
      setPacketProgress(progress);

      if (progress >= 1) {
        // Arrived
        setLitNode(activePath.to);
        setActivePath(null);
        setPacketProgress(0);
      }
    }
  });

  // Logic Loop
  useEffect(() => {
    if (!isReady) return; // Don't start packet logic until ready

    let timeout;
    
    // Initial start or waiting at a node
    if (!activePath) {
      timeout = setTimeout(() => {
        // If no node is lit (start), pick 0. Else pick neighbor.
        const currentNode = litNode !== null ? litNode : 0;
        
        // If we are just starting (litNode is null), we light up 0 first? 
        // Or we immediately travel from 0?
        // Let's say we light up 0 immediately when ready, then wait, then travel.
        if (litNode === null) {
           setLitNode(0);
           return;
        }

        const neighbors = ADJACENCY[currentNode];
        const nextNode = neighbors[Math.floor(Math.random() * neighbors.length)];
        
        // Start travel
        setLitNode(null); // Turn off current node
        
        setActivePath({ 
          from: currentNode, 
          to: nextNode, 
          startTime: null // Will be set in useFrame
        });
        
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [litNode, activePath, isReady]);

  // Hook to inject start time into activePath once it's created
  const { clock } = useThree();
  useEffect(() => {
    if (activePath && activePath.startTime === null) {
      setActivePath(prev => ({ ...prev, startTime: clock.elapsedTime }));
    }
  }, [activePath, clock]);


  // Helper to get vertex vector scaled
  const getVec = (idx) => VERTICES[idx].clone().multiplyScalar(SCALE);

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {VERTICES.map((v, i) => (
        <Node 
          key={`node-${i}`} 
          index={i}
          position={getVec(i)} 
          isLit={litNode === i} 
        />
      ))}

      {/* Edges */}
      {EDGES.map((edge, i) => (
        <Edge 
          key={`edge-${i}`} 
          index={i}
          start={getVec(edge[0])} 
          end={getVec(edge[1])} 
        />
      ))}

      {/* Active Packet */}
      {activePath && activePath.startTime !== null && (
        <DataPacket 
          start={getVec(activePath.from)} 
          end={getVec(activePath.to)} 
          progress={packetProgress} 
        />
      )}
    </group>
  );
};

const BlockchainCube = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={styles.scene}>
      <div className={styles.canvasContainer}>
        <Canvas dpr={[1, 2]} style={{ pointerEvents: 'none' }}>
          <PerspectiveCamera makeDefault position={isMobile ? [0, 0, 11] : [-1.2, 0, 10]} />
          <ambientLight intensity={2.5} /> {/* Increased ambient light for better visibility */}
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <SceneContent />
        </Canvas>
      </div>
    </div>
  );
};

export default BlockchainCube;

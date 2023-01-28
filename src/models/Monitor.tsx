// @ts-nocheck
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/models/home/models/Monitor.glb --types true --keepnames --keepgroups true --meta true --shadows true --precision 5
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Monitor: THREE.Mesh
    Monitor_Button: THREE.Mesh
    MonitorStand: THREE.Mesh
  }
  materials: {
    ['Plastic.001']: THREE.MeshStandardMaterial
    Button: THREE.MeshStandardMaterial
    PlasticStand: THREE.MeshStandardMaterial
  }
}

type ActionName = 'Monitor' | 'Monitor Button' | 'MonitorStand'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('/home/models/Monitor.glb') as unknown as GLTFResult
  const { actions } = useAnimations<GLTFActions>(animations, group)
  return (
    <group animations={actions} ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh name="Monitor" castShadow receiveShadow geometry={nodes.Monitor.geometry} material={materials['Plastic.001']} position={[0, 0, -0.1306]} rotation={[-0.13592, 0, 0]} userData={{ name: 'Monitor' }}>
          <mesh name="Monitor_Button" castShadow receiveShadow geometry={nodes.Monitor_Button.geometry} material={materials.Button} userData={{ name: 'Monitor Button' }} />
          <mesh name="MonitorStand" castShadow receiveShadow geometry={nodes.MonitorStand.geometry} material={materials.PlasticStand} userData={{ name: 'MonitorStand' }} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/home/models/Monitor.glb')

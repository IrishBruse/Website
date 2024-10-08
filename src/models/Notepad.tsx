// @ts-nocheck
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/models/home/models/Notepad.glb --types true --keepnames --keepgroups true --meta true --shadows true --precision 5
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Plane011: THREE.Mesh
    Plane011_1: THREE.Mesh
    Metal_Ring: THREE.Mesh
  }
  materials: {
    Paper: THREE.MeshPhysicalMaterial
    Line: THREE.MeshPhysicalMaterial
    MetalRing: THREE.MeshPhysicalMaterial
  }
}

type ActionName = 'NotepadAction' | 'Metal Ring'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export function Model(props: JSX.IntrinsicElements['group'])
{
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('/home/models/Notepad.glb') as unknown as GLTFResult
  const { actions } = useAnimations<GLTFActions>(animations, group)
  return (
    <group animations={actions} ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Notepad" position={[0.34011, 0.00261, -0.07464]} rotation={[0, 0.38394, 0]} userData={{ name: 'Notepad' }}>
          <mesh name="Plane011" castShadow receiveShadow geometry={nodes.Plane011.geometry} material={materials.Paper} />
          <mesh name="Plane011_1" castShadow receiveShadow geometry={nodes.Plane011_1.geometry} material={materials.Line} />
          <mesh name="Metal_Ring" castShadow receiveShadow geometry={nodes.Metal_Ring.geometry} material={materials.MetalRing} position={[0, -0.00349, -0.02079]} userData={{ name: 'Metal Ring' }} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/home/models/Notepad.glb')

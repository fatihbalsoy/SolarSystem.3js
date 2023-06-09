/*
 *   mars.js
 *   3d-portfolio
 * 
 *   Created by Fatih Balsoy on 4/22/22
 *   Last Modified by Fatih Balsoy on 4/22/22
 *   Copyright © 2022 Fatih Balsoy. All rights reserved.
 */


import * as THREE from "three";
import Planet from "../planet";
import { Settings, Quality } from "../../settings";
import AppScene from "../../scene";

class Jupiter extends Planet {

    constructor() {
        const id = "jupiter"

        //? -- TEXTURES -- ?//
        const textureLoader = new THREE.TextureLoader(AppScene.loadingManager)
        const texture = textureLoader.load(Planet.getTexturePath(id))
        const lowTexture = textureLoader.load(Planet.getTexturePath(id, Quality.low))

        //? -- MATERIAL -- ?//
        const material = new THREE.MeshStandardMaterial()
        material.map = texture

        //? -- GEOMETRY -- ?//
        const geometry = new THREE.SphereGeometry(1, 64, 64)
        geometry.clearGroups()
        geometry.addGroup(0, Infinity, 0)
        super(id, [material], geometry, lowTexture);

        // Rotate mesh so the Great Red Spot aligns with the real-life counterpart (without time dilation)
        // Reference: https://www.lpi.usra.edu/publications/slidesets/ss_tour/slide_22.html
        // Angle Reference: Stellarium (Approx)
        const radians = 240 * Math.PI / 180
        this.realMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), radians)
    }
}

export default Jupiter;
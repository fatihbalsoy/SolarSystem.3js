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
import { Quality, Settings } from "../../settings";
import AppScene from "../../scene";

class Mercury extends Planet {
    constructor() {
        const id = "mercury"

        //? -- TEXTURES -- ?//
        const textureLoader = new THREE.TextureLoader(AppScene.loadingManager)
        const texture = textureLoader.load(Planet.getTexturePath(id))
        const lowResTexture = textureLoader.load(Planet.getTexturePath(id, Quality.low))

        //? -- MATERIAL -- ?//
        const material = new THREE.MeshStandardMaterial()
        material.map = texture

        //? -- GEOMETRY -- ?//
        const geometry = new THREE.SphereGeometry(1, 64, 64)
        geometry.clearGroups()
        geometry.addGroup(0, Infinity, 0)
        super(id, [material], geometry, lowResTexture);
    }
}

export default Mercury;
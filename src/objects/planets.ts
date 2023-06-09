/*
 *   objects.ts
 *   solar-system-3js
 * 
 *   Created by Fatih Balsoy on 5/2/23
 *   Copyright © 2023 Fatih Balsoy. All rights reserved.
 */

import Planet from './planet'

/** Stars **/
import Sun from './sun'
/** Planets **/
import Mercury from './planets/mercury'
import Venus from './planets/venus'
import Earth from './planets/earth'
import Mars from './planets/mars'
import Jupiter from './planets/jupiter'
import Saturn from './planets/saturn'
import Uranus from './planets/uranus'
import Neptune from './planets/neptune'
/** Dwarf Planets **/
import Pluto from './dwarf_planets/pluto'
import Ceres from './dwarf_planets/ceres'
/** Moons **/
import Moon from './moons/earth_moon'
import JupiterMoon from './moons/jupiter_moon';
import Io from './moons/jupiter_io';
import Callisto from './moons/jupiter_callisto';
import Europa from './moons/jupiter_europa';
import Ganymede from './moons/jupiter_ganymede';

/// Also includes dwarf planets and moons
class Planets implements Iterable<Planet> {
    static sun: Sun;
    static mercury: Mercury; static venus: Venus; static earth: Earth; static mars: Mars;
    static jupiter: Jupiter; static saturn: Saturn; static uranus: Uranus; static neptune: Neptune;
    static pluto: Pluto;
    static moon: Moon;
    static io: Io; static callisto: Callisto; static europa: Europa; static ganymede: Ganymede;

    constructor(objects: {}) {
        for (const key in objects) {
            const element = objects[key];
            Planets[key] = element
        }
    }

    static array(sort: boolean = false) {
        let a = [
            Planets.sun,
            Planets.mercury, Planets.venus, Planets.earth, Planets.mars,
            Planets.jupiter, Planets.saturn, Planets.uranus, Planets.neptune,
            Planets.pluto,
            Planets.moon,
            Planets.io, Planets.callisto, Planets.europa, Planets.ganymede
        ]
        let sorted = sort ? a.sort((a, b) => Planet.comparator(a, b)) : a
        return sorted
    }

    [Symbol.iterator](): Iterator<Planet> {
        let index = 0;
        let items = Planets.array()

        return {
            next(): IteratorResult<Planet> {
                if (index >= items.length) {
                    return { done: true, value: null };
                }

                return { done: false, value: items[index++] };
            }
        };
    }
}
export default Planets
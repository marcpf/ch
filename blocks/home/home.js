import {createOptimizedPicture} from '../../scripts/lib-franklin.js';

export default async function decorate(block) {

    //place random home image
    const randInt = randomIntFromInterval(1, 6)
    const homeImage = "/home-images/" + randInt + ".jpg"
    block.replaceWith(createOptimizedPicture(homeImage, '', false))
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}



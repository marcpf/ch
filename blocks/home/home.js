import {createOptimizedPicture} from '../../scripts/lib-franklin.js';

export default async function decorate(block) {

    const h2 = document.createElement('h2')
    h2.innerText = "Test";
    block.querySelector('div').replaceWith(h2)

    //place random home image
    const randInt = randomIntFromInterval(1, 6)
    const homeImage = "/home-images/" + randInt + ".jpg"
    block.append(createOptimizedPicture(homeImage, '', false))
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}



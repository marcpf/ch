import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
  const url = new URL(window.location.href)
  const imgSource = url.pathname + ".jpg"
  const imgAlt = "The Complete Calvin & Hobbes"

  // date from path
  const segments = url.pathname.split("/")
  const dateSegment = segments[segments.length-1]
  const dateSegments = dateSegment.split("-")

  const date = new Date(parseInt(dateSegments[0]), parseInt(dateSegments[1])-1, parseInt(dateSegments[2]));
  const dateString = date.toLocaleDateString('default', { month: 'short', year: 'numeric', day: 'numeric' });

  const h2 = document.createElement('h2')
  h2.innerText = dateString

  block.querySelector('div').replaceWith(h2)
  block.querySelector('div').replaceWith(createOptimizedPicture(imgSource, imgAlt))
}

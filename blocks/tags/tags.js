import {createOptimizedPicture} from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
    const url = new URL(window.location.href)

    // tag from path
    const segments = url.pathname.split("/")
    const tag = segments[segments.length - 1]

    //fetch index
    const index = await fetch(`/query-index.json`);
    if (index.ok) {
        const ul = document.createElement('ul');

        const indexData = await index.json()
        const records = indexData.data.filter(({chtags}) => chtags.includes(tag))

        records.forEach((record) => {
            const stripPath = record['path']
            if (stripPath.startsWith("/strips/")) {
                const imagePath = stripPath + ".jpg"
                const li = document.createElement('li')
                li.setAttribute("onclick", "location.href = '" + stripPath + "'")
                const stripImage = document.createElement('div')
                stripImage.className = 'tags-card-image'
                //Todo picture alt text
                stripImage.append(createOptimizedPicture(imagePath, '', false, [{width: '750'}]))
                li.append(stripImage)

                const stripBody = document.createElement('div')
                stripBody.className = 'tags-card-body'
                const stripTitle = document.createElement('p')
                // date from path
                const segments = record['path'].split("/")
                const dateSegment = segments[segments.length-1]
                const dateSegments = dateSegment.split("-")
                const date = new Date(parseInt(dateSegments[0]), parseInt(dateSegments[1])-1, parseInt(dateSegments[2]));
                const dateString = date.toLocaleDateString('default', { month: 'short', year: 'numeric', day: 'numeric' });
                stripTitle.innerText = dateString
                stripBody.append(stripTitle)
                const tags = document.createElement('p')

                tags.innerText = record['chtags']
                stripBody.append(tags)

                li.append(stripBody)

                ul.append(li)
            }
        });
        block.querySelector('div').replaceWith(ul)
    }
}

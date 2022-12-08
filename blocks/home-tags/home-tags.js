import {createOptimizedPicture} from '../../scripts/lib-franklin.js';

export default async function decorate(block) {

    console.log("in home-tags block")

    //fetch tags
    const tags = await fetch(`/chtags.json`);
    if (tags.ok) {
        const ul = document.createElement('ul');
        const tagsJson = await tags.json()
        const tagsData = tagsJson.data
        tagsData.forEach((tagData) => {
            const tag = tagData.tag
            const tagPath = `/tags/${tag}`
            const li = document.createElement('li')
            li.setAttribute("onclick", "location.href = '" + tagPath + "'")
            const tagImage = document.createElement('div')
            tagImage.className = 'home-tags-card-image'
            //Todo picture alt text
            tagImage.append(createOptimizedPicture(tagData.example, '', false, [{width: '750'}]))
            li.append(tagImage)

            const tagBody = document.createElement('div')
            tagBody.className = 'home-tags-card-body'
            const tagTitle = document.createElement('p')
            tagTitle.innerText = tagData.name
            tagBody.append(tagTitle)

            li.append(tagBody)
            ul.append(li)
        });

        block.querySelector('div').replaceWith(ul)
    }
}




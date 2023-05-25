
const articlesContainer = document.getElementById('articles');
const contentContainer = document.getElementById('content');

// create div for the preamble
const preamble = document.createElement('div');
preamble.id = 'preamble';
preamble.innerHTML = 'here goes the preamble text after being fetched from the file';

// a variable that defines the percentage of the site used for the circle
const factor = 0.9;


init();

async function init() {
    // read the content.json file and parse it into a variable
    let result = await fetch("content.json");
    let jsonObjekt = await result.json();

    // call the main function
    main(jsonObjekt.articles);


    // add content to the preamble
    preamble.innerHTML = jsonObjekt.preamble_text;
    // add the preamble to the content container
    contentContainer.appendChild(preamble);
}

function main(articles) {
    // log the articles to the console
    console.log(articles);

    // draw the articles
    articles.forEach((article, i) => {
        let articleNum = i + 1;
        drawArticles(article, articleNum);
    });
}


function drawArticles(article, i) {

    // creating title
    const articleTitle = document.createElement('h1');
    articleTitle.textContent = `${ i }`;

    // calculating positions
    let degree = (2 * Math.PI / 30 * -i + Math.PI + 2 * Math.PI / 30);

    // creating the element
    const articleDiv = document.createElement('div');
    // adding id
    articleDiv.id = `article${ i }`;

    // adding EventListener
    articleDiv.addEventListener("mouseover", () => {showText(article)}); // as soon as the mouse hovers over the element the function further down, called showText, is run
    // articleDiv.addEventListener("mouseleave", (event, val = article[0]) => { showText(val) })

    // offsetting to make a circle
    articleDiv.style.transform = 'translate(-50%,-50%)'; // using .style the css of the div gets changed

    // write the specific function into the style attribute of the element
    articleDiv.style.left = `calc(50vw + (${ Math.sin(degree) } * 50vh * ${ factor }) - 25px)`;
    articleDiv.style.top  = `calc(50vh + (${ Math.cos(degree) } * 50vh * ${ factor }) - 25px)`;

    // adding to HTML
    articleDiv.appendChild(articleTitle);
    articlesContainer.appendChild(articleDiv);
}


function showText(element) {
    const contentP = document.createElement('p');
    contentContainer.innerHTML = ''; // clear the container
    contentP.textContent = `${ element.content }`;
    contentContainer.appendChild(contentP);
}



const radiusInsideArticlesdisappear = 0.66; // 0.8 = 80% of the radius of the page
const radiusOutsideArticlesdisappear = 1.1; // 0.8 = 80% of the radius of the page

// add eventlistener on mouse move
document.addEventListener('mousemove', (event) => {
    // get the mouse position
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    
    // get the center of the screen
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;

    // calculate the distance between the mouse and the center
    let distanceX = mouseX - centerX;
    let distanceY = mouseY - centerY;
    
    // pythagoras to the difference between the mouse and the center
    let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // when the distance is smaller than the defined radius, the articles disappear
    if (distance < radiusInsideArticlesdisappear * window.innerHeight / 2) {
        contentContainer.innerHTML = "";
        contentContainer.appendChild(preamble);
    // and when the distance is bigger, the articles disappear too
    } else if (distance > radiusOutsideArticlesdisappear * window.innerHeight / 2) {
        contentContainer.innerHTML = "";
        contentContainer.appendChild(preamble);
    }
});

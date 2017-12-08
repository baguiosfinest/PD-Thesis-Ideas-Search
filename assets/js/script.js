const titlesJSON = "https://raw.githubusercontent.com/baguiosfinest/pd-thesis-ideas/master/titles.json";
const titles = [];

fetch(titlesJSON)
  .then(blob => blob.json())
  .then(data => titles.push(...data));



function findMatches(wordToMatch, titles){
  return titles.filter(item => {
    const regEx = new RegExp(wordToMatch, 'gi');
    return item.title.match(regEx);
  });
}


function displayMatches(){
  randomDiv.style.display = "none";
  const arrayMatched = findMatches(this.value, titles);

  const html = arrayMatched.map(item => {
    const regex = new RegExp(this.value, 'gi');
    const title = item.title.replace(regex, `<span class="highlight">${this.value}</span>`)
    
    return `<li>
      <span>${title}</span>
    </li>`
  }).join('');

  suggestions.innerHTML = html;
}

function generateRandom(){
  const min = 0;
  const max = titles.length;
  const rand = Math.floor(Math.random()*(max - min+1)) + min;
  randomDiv.style.display = "block";
  randomDiv.innerHTML = titles[rand].title;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
const random = document.querySelector('.btn-random');
const randomDiv = document.getElementById('random');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
random.addEventListener('click', generateRandom);
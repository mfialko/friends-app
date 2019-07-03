import { fetchPeople } from './src/fetch.js';
import { createHtmlList } from './src/createHtmlList';
import { sort } from './src/sort.js';


let filterForm = document.querySelector('form');
let resetButton = document.querySelector('.button');

fetchPeople()
    .then(list => createHtmlList(list))
    .then(html => {
        render(html);
        filterForm.addEventListener('change', (e) => { 
            sort(e, html, render);
        });
        filterForm.addEventListener('keyup', (e) => { 
            sort(e, html, render);
        });
        resetButton.addEventListener('click', () => {  
            reset();
            render(html);
        });
        
    });
           
function reset() {
    let items = filterForm.elements;
    for (let i in items) {
        if (items[i].type === 'select-one' || items[i].type === 'text') {
            items[i].value = "";
        }
    };
};

function render(usersHtml) {
    let htmlMain = usersHtml.map(e => e.textHtml).join('');
    if (usersHtml.length === 0) {
        htmlMain = `<div class="emptyList">Not found</div>`;
    }
    document.querySelector('.main').innerHTML = htmlMain;
}


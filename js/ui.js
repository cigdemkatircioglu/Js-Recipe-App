import { elements } from './helpers.js';

export const renderResults = (recipes) => {
  elements.resultList.innerHTML = '';
  recipes.slice(0, 10).forEach((recipe) => {
    
    const markup = `
         <a href="#${recipe.recipe_id}" class="result-link">
            <img
              src="${recipe.image_url}"
            />
            <div class="data">
              <h4>${recipe.title}</h4>
              <p>${recipe.publisher}</p>
            </div>
          </a>
        `;

    elements.resultList.insertAdjacentHTML('beforeend', markup);
  });
};

export const renderLoader = (parent) => {

  const loader = `
  <div class="loader">
   <img src="images/food-load.gif" />
  </div>
  `;
  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  
  const loader = document.querySelector('.loader');

  if (loader) loader.remove();
};

export const renderBasketItems = (items) => {
  const markup = items
    .map(
      (item) => `
    <li data-id=${item.id}>
    <i id="delete-item" class="bi bi-x"></i>
    <span>${item.title}</span>
    </li>
    `
    )
    .join('');

  elements.basketList.innerHTML = markup;
};
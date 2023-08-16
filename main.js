import { v4 } from 'https://jspm.dev/uuid';
import {
  elements,
  setLocalStorage,
  getFromLocal,
  controlBtn,
} from './js/helpers.js';
import { Search } from './js/api.js';
import {
  clearLoader,
  renderLoader,
  renderResults,
  renderBasketItems,
} from './js/ui.js';
import { Recipe } from './js/recipe.js';

const recipe = new Recipe();


elements.form.addEventListener('submit', handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  
  const query = elements.searchInput.value;

  if (query) {
  
    const search = new Search(query);

    renderLoader(elements.resultList);

    try {
      await search.getResults();
      
      clearLoader();
      renderResults(search.result);
    } catch (err) {
      alert('Aradığınız kriterler uygun tarif bulunamadı');
      clearLoader();
    }
  }
}

const controlRecipe = async () => {
  const id = location.hash.replace('#', '');
  if (id) {

    renderLoader(elements.recipeArea);

    try {
      
      await recipe.getRecipe(id);
      clearLoader();

      recipe.renderRecipe(recipe.info);

      elements.recipeArea.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      alert('Verileri alırken hata oluştu');
      clearLoader();
    }
  }
};

['hashchange', 'load'].forEach((eventName) => {
  window.addEventListener(eventName, controlRecipe);
});

let basket = getFromLocal('basket') || [];

document.addEventListener('DOMContentLoaded', () => {
  renderBasketItems(basket);

  controlBtn(basket);
});

const handleClick = (e) => {
  if (e.target.id === 'add-to-basket') {
    recipe.ingredients.forEach((title) => {
      
      const newItem = {
        id: v4(),
        title,
      };

      basket.push(newItem);
    });
    setLocalStorage('basket', basket);

    renderBasketItems(basket);

    controlBtn(basket);
  }

  if (e.target.id === 'like-btn') {
    recipe.controlLike();
  }
};

const deleteItem = (e) => {
  if (e.target.id === 'delete-item') {
    
    const parent = e.target.parentElement;

    basket = basket.filter((i) => i.id !== parent.dataset.id);

    setLocalStorage('basket', basket);

    parent.remove();

    controlBtn(basket);
  }
};

const handleClear = () => {
  const res = confirm('Bütün sepet silinecek!  Emin misiniz?');
  
  if (res) {
    
    setLocalStorage('basket', null);
    basket = [];
    controlBtn(basket);
    elements.basketList.innerHTML = '';
  }
};

elements.recipeArea.addEventListener('click', handleClick);

elements.basketList.addEventListener('click', deleteItem);

elements.clearBtn.addEventListener('click', handleClear);
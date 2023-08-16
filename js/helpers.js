export const elements = {
  form: document.querySelector('form'),
  searchInput: document.querySelector('form input'),
  resultList: document.querySelector('.results'),
  recipeArea: document.querySelector('.recipe'),
  basketList: document.querySelector('.shopping ul'),
  clearBtn: document.querySelector('#clear'),
  likeList: document.querySelector('.list'),
};


export const setLocalStorage = (key, data) => {
  
  const strData = JSON.stringify(data);

  localStorage.setItem(key, strData);
};


export const getFromLocal = (key) => {
  
  const strData = localStorage.getItem(key);

   return JSON.parse(strData);
};


export const controlBtn = (basket) => {
  if (basket.length > 0) {
    elements.clearBtn.style.display = 'flex';
  } else {
    elements.clearBtn.style.display = 'none';
  }
};

  
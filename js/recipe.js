import {
    elements,
    setLocalStorage,
    getFromLocal,
  } from './helpers.js';
  
  export class Recipe {
    constructor() {
      
      this.likes = getFromLocal('likes') || [];
      this.info = {};
      this.ingredients = [];
      this.renderLikes();
    }
  
    
    async getRecipe(id) {
      
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/get?rId=${id}`
      );
      
      const data = await res.json();
      
      this.info = data.recipe;
      this.ingredients = data.recipe.ingredients;
    }
  
    createIngredient() {
      const html = this.ingredients
        .map(
          (ingredient) => `
                <li>
                  <i class="bi bi-check-circle"></i>
                  <p>${ingredient}</p>
                </li>
      `
        )
        .join('');
  
      return html;
    }
  
    renderRecipe(recipe) {
      const markup = `
           <figure>
              <img
                src=${recipe.image_url}
              />
              <h1>${recipe.title}</h1>
  
              <p class="like-area">
                <i id="like-btn" class="bi ${
                  this.isRecipeLiked() ? 'bi-heart-fill' : 'bi-heart'
                }"></i>
              </p>
            </figure>
  
            <div class="ingredients">
              <ul>
                ${this.createIngredient()}
              </ul>
              <button id="add-to-basket">
                <i class="bi bi-cart2"></i>
                <span>Alışveriş Sepetine Ekle</span>
              </button>
            </div>
  
            <div class="directions">
              <h2>Nasıl Pişirilir?</h2>
              <p>
                Bu tarif dikkatlice
                <span>${recipe.publisher}</span> tarafından
                hazırlanmış ve test edilmiştir. Diğer detaylara onların
                websitesi üzerinden erişebilirsiniz.
              </p>
              <a href="${recipe.source_url}" target="_blank">Yönerge</a>
            </div>
      `;
  
      elements.recipeArea.innerHTML = markup;
    }
    isRecipeLiked() {
      const found = this.likes.find(
        (i) => i.id === this.info.recipe_id
      );
  
      return found;
    }
  
    
    controlLike() {
        const newObject = {
        id: this.info.recipe_id,
        img: this.info.image_url,
        title: this.info.title,
      };
  
      
      if (this.isRecipeLiked()) {
        this.likes = this.likes.filter((i) => i.id !== newObject.id);
      } else {
        
        this.likes.push(newObject);
      }
  
      
      setLocalStorage('likes', this.likes);
  
      this.renderRecipe(this.info);
  
      this.renderLikes();
    }
    renderLikes() {
      const html = this.likes.map(
        (item) => `
             <a href="#${item.id}">
                <img
                  src="${item.img}"
                />
                <p>${item.title}</p>
              </a>
      `
      );
  
      elements.likeList.innerHTML = html;
    }
  }
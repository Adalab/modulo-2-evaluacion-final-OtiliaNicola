const u=document.querySelector(".js_input_text"),k=document.querySelector(".js_search"),p=document.querySelector(".js_reset"),r=document.querySelector(".js_list"),l=document.querySelector(".js_favourites");let d=[];function m(t){if(d.some(s=>s.idDrink===t.idDrink))console.log("El cóctel ya está en la lista de favoritos.");else{d.push(t);const s=document.createElement("li");s.classList.add("section__all--licoc","fav-cocktail"),s.setAttribute("id",t.idDrink),s.dataset.cocktailId=t.idDrink,l.appendChild(s);const c=document.createElement("img");c.classList.add("small-img"),c.src=t.strDrinkThumb,c.setAttribute("alt",t.strDrinkThumb),s.appendChild(c);const o=document.createElement("h3");o.textContent=t.strDrink,s.appendChild(o);const i=document.createElement("button");i.textContent="x",i.classList.add("remove-button"),i.addEventListener("click",()=>g(s)),s.appendChild(i)}let e=JSON.parse(localStorage.getItem("cocktails"));console.log(e),e===null&&(e=[]),e.push({idDrink:t.idDrink,strDrink:t.strDrink,strDrinkThumb:t.strDrinkThumb}),localStorage.setItem("cocktails",JSON.stringify(e))}function g(t){const n=t.dataset.cocktailId;let e=JSON.parse(localStorage.getItem("cocktails"));console.log(e),e=e.filter(s=>s.idDrink!==n),localStorage.setItem("cocktails",JSON.stringify(e)),l.removeChild(t)}function f(t,n){t.addEventListener("click",e=>{const s=e.currentTarget.dataset.cocktailId,c=n.find(o=>o.strDrink===s);m(c)})}function h(t){r.innerHTML="";const n=t.drinks;for(const e of n){const s=e.strDrink,c=e.strDrinkThumb,o=document.createElement("li");o.classList.add("section__all--licoc"),o.setAttribute("id",e.idDrink),o.dataset.cocktailId=e.strDrink,r.appendChild(o);const i=document.createElement("h3");i.textContent=s,o.appendChild(i);const a=document.createElement("img");a.classList.add("small-img"),o.classList.add("img"),a.src=c,a.setAttribute("alt",s),o.appendChild(a),f(o,n)}}function v(t){t.preventDefault();const n=u.value;S(n)}function D(t){t.preventDefault(),u.value="",r.innerHTML="",l.innerHTML="",localStorage.removeItem("cocktails")}function S(t){const n=`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${t}`;fetch(n).then(e=>e.json()).then(e=>h(e)).catch(e=>console.log(e))}function C(){fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita").then(n=>n.json()).then(n=>h(n)).catch(n=>console.log(n))}C();function b(){const t=JSON.parse(localStorage.getItem("cocktails"));t&&t.length>0&&t.forEach(n=>{console.log(n),m(n)})}b();k.addEventListener("click",v);p.addEventListener("click",D);
//# sourceMappingURL=main.js.map

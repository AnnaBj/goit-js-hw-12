import{S as v,i as l,a as w}from"./assets/vendor-527658dd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const C=new v(".gallery-link"),u=document.querySelector(".form"),g=document.querySelector(".gallery"),n=document.querySelector(".loader"),d=document.querySelector(".more");let c=1,y=15,m;d.style.display="none";n.style.display="none";async function h(s,t){const r={key:"42296556-10e657c6d09903018112d9d9d",q:s,page:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:y},i=new URLSearchParams(r),{data:e}=await w.get(`https://pixabay.com/api/?${i}`);return e}u.addEventListener("submit",async s=>{if(s.preventDefault(),c=1,d.style.display="none",g.innerHTML="",m=u.elements.search.value.trim(),m===""){l.show({message:"Please write search image",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"});return}n.style.display="inline-block";try{const{hits:t,totalHits:r}=await h(m,c);if(r===0){l.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"}),n.style.display="none";return}p(t),r<y?f():d.style.display="block"}catch(t){l.show({message:`Sorry, ${t}`,messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"})}finally{u.reset()}});d.addEventListener("click",async()=>{c+=1,n.style.display="inline-block";try{const{hits:s,totalHits:t}=await h(m,c);p(s),P(),y*c>t&&f()}catch(s){l.show({message:`Sorry, ${s}`,messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"bottomCenter"})}});function p(s){const t=s.map(({largeImageURL:r,webformatURL:i,tags:e,likes:o,views:a,comments:F,downloads:b})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${r}">
          <img class="gallery-image" src="${i}" alt="${e}" width="360" />
        </a>
        <div class="img-text">
          <div class="img-info">
            <h3>Likes</h3>
            <p>${o}</p>
          </div>
          <div class="img-info">
            <h3>Views</h3>
            <p>${a}</p>
          </div>
          <div class="img-info">
            <h3>Comments</h3>
            <p>${F}</p>
          </div>
          <div class="img-info">
            <h3>Downloads</h3>
            <p>${b}</p>
          </div>
        </div>
      </li>
    `).join("");g.insertAdjacentHTML("beforeend",t),C.refresh(),n.style.display="none"}function f(){l.show({message:"We are sorry, but you have reached the end of search results.",messageColor:"#FAFAFB",backgroundColor:"#1DB8F5",position:"topRight"}),d.style.display="none",n.style.display="none"}function P(){const t=document.querySelector(".gallery-item").getBoundingClientRect().height*2;window.scrollBy({top:t,left:0,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map

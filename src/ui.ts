import { handleButtonClick } from "./actions";
import html from "nanohtml";
import { routes } from "./store";
import { notificationStyle, STYLES } from "styles";

export function AppRoot(state) {
  const pageData = state.pages[state.currentPage.name];
  return html`
    <div id="app">
      <div class="page ${state.currentPage.name}">${routing(state)}</div>
      ${notification(state)}
      ${textBackground(state.background.text, state.background.n, state.currentPage.name)}
      ${gifs(pageData.gifs, state.currentPage.name)}
    </div>
  `;
}

export function menuList(menu: Array<{name:string, url: string }>) {
  return html`
  <ul>
    ${menu.map(item => html`<li>
    <a target=${item.url.includes('http') ? `_blank` : ""} href="${item.url}">${item.name}</a>
    </li>`)}
  </ul>`
}

export function gifs(gifs: Array<{name:string, url: string, y: number, x: number}>, page: string) {
  if(gifs){
    return html`
    <div class="gifs ${page}">
      ${gifs.map(item => html`<div class="gif" style="top: ${item.y}px; left:${item.x}px" >
        <img src="${item.url}" />
        <small>${item.name}</small>
      </div>`)}
    </div>`
  }
  return ``
}


export function routing(state) {
  const pageData = state.pages[state.currentPage.name];
  switch (state.currentPage.name) {
    case "home":
      return html`
        <span>${pageData.title}</span>
        <p>${pageData.body}</p>
        ${menuList(pageData.menu)}
      `;
    case "libraries":
      return html`
      
        ${menuList(pageData.menu)}
      `;
    case "joro":
      return html`
        <img src="${pageData.logo.url}" />
        <h1>${pageData.title}</h1>
        <p>${pageData.body}</p>
        ${menuList(pageData.menu)}
      `;
    case "chumbucket":
      return html`
      <img src="${pageData.logo.url}" />
      <div class="center">
      <p>${pageData.title}</p>
      <p>${pageData.body}</p>
      ${menuList(pageData.menu)}
      </div>
      <div class="emoji">🍖🪣</div>
      <div class="emoji">🍖🪣</div>
      `;
    case "obake":
      return html`
      <img src="${pageData.logo.url}" />
      <h1>${pageData.title}</h1>
      <p>${pageData.body}</p>
        ${menuList(pageData.menu)}

      `;
    case "deathmark":
      return html`
      <img src="${pageData.logo.url}" />
      <h1>${pageData.title}</h1>
      <p>${pageData.body}</p>
        ${menuList(pageData.menu)}

      `;
    case "amico":
      return html`
      <h1>${pageData.logo.name}</h1>
      <h1>${pageData.title}</h1>
      <p>${pageData.body}</p>
        ${menuList(pageData.menu)}

      `;
    default:
      return html` <h1>404 CHUM</h1> `;
  }
}


function notification(state) {
  notificationStyle();
  return html`
    <div class="notification ${state.notification.show ? "show" : "hide"}">
      ${state.notification.text}
    </div>
  `;
}

function textBackground(text:string, len: number, suffix: string){
  var arr = [];
  for (var i = 0; i < len; i++) 
      {
    arr[i] = text;
  }
  return html`<div class="background ${suffix}">${arr.join('')}</div>`
}
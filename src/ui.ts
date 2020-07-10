import { handleGreetingClick } from './actions';
import html from 'nanohtml';
import { routes } from './store';
import { notificationStyle, homepageStyles, navpageStyles } from 'styles';

export function AppRoot(state) {
  return html`
  <div id="app">
      ${header(state)}
      <div class="page">
        ${routing(state)}
      </div>
      ${notification(state)}
    </div>
  `
}

export function routing(state) {
  switch (state.currentPage.name) {
    case "HOME":
      homepageStyles()
      return html`
      <div class="greeting">
        <h1>GDAY,</h1>
        <h2> I am Alex, Hows it going?</h2>
      </div>
    `
    case "NAV":
      navpageStyles()
      return html`
      <div id="navpage">
        <ul>
          ${Object.keys(routes).map(key => {
            if (key !== 'Home') {
              return html`<li><a href="${routes[key]}">${key}</a></li>`
            }
        })}
        </ul>
      </div>
    `
    case "EXAMPLE_FETCH":
      return html`
      <h1>Fetching no?</h1>
        <textarea>（*＾3＾）/～      ${state.greeting}</textarea>
        <button onclick=${handleGreetingClick}>Feed the Sharks</button>
    `
    default:
      return html`
       <h1>404 CHUM</h1>
  `
  }
}
export function header(state) {
  const isActive = state.currentPage.name === "NAV";
  return html`
  <div class="nav">
  <ul>
      <li>
        <a class="box" href="/">
        ${logo()}
      </a>
      </li>
      <li class="float-r ${isActive ? "down" : "up"}">
        <a class="box" href=" ${isActive ? "/" : "/nav"}"">▲</a>
      </li>
    </ul>
  </div>
      `;
}

export function logo(){
  const colorScheme = document.body.className;
  switch (colorScheme) {
    case "black-yellow":
        return html`<img height="36" class="logo-${colorScheme}" src="/logo-invert.png"/>`
      default:
        return html`<img height="36" class="logo-${colorScheme}" src="/logo-normal.png"/>`
  }
}

function notification(state) {
  notificationStyle()
  return html`
    <div class="notification ${state.notification.show ? "show" : "hide"}">
      ${state.notification.text}
    </div>
  `
}
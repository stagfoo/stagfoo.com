import page from 'page';
import { state } from './index';
const body = document.body
type Context = {
  params: {
    name?: string;
  };
};

// Handlers
const HOME_PAGE = (ctx: Context, next: any) => {
  body.className = "yellow-black"
  state._update('updateNotification', {
    text: "",
    show: false
  })
  state._update('updateCurrentPage', 'HOME')
  state._update('changeGreeting', '🍖🍖🍖🍖')

};
const NAV = (ctx: Context, next: any) => {
  body.className = "black-yellow"
  state._update('updateCurrentPage', 'NAV')
};
const OBAKE = (ctx: Context, next: any) => {
  body.className = "black-blue"
  state._update('updateCurrentPage', 'OBAKE')
};
const JORO = (ctx: Context, next: any) => {
  body.className = "black-green"
  state._update('updateCurrentPage', 'JORO')
};
const CHUMBUCKET = (ctx: Context, next: any) => {
  body.className = "black-yellow"
  state._update('updateCurrentPage', 'CHUMBUCKET')
};


const EXAMPLE_FETCH = (ctx: Context, next: any) => {
  getData().then(data => {
    state._update('changeGreeting', data.greeting)
    state._update('updateCurrentPage', 'EXAMPLE_FETCH')
  })
};

// Routes
page('/', HOME_PAGE);
page('/nav', NAV);
page('/obake', OBAKE);
page('/chumbucket', CHUMBUCKET);
page('/joro', JORO);
page('/example-fetch', EXAMPLE_FETCH);


export function startRouters(): void {
  page.start();
}

//Network Call
const API = {
  JSON: window.location.origin
}
export async function getData() {
  const resp = await fetch(`${API.JSON}/data.json`);
  if (resp.ok) {
    return resp.json();
  } else throw new TypeError('getData response is not Ok');
}

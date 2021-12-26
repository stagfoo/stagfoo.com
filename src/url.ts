import page from 'page';
import { state } from './index';
import { BaseStyles, STYLES  } from './styles';

// Handlers
const HOME_PAGE = (ctx, next) => {
  state._update('updateCurrentPage', 'home')
  state._update('updateBackground', { text:"( ･3･)～", n: 1000 })
};
const JORO = (ctx, next) => {
  BaseStyles();
  state._update('updateBackground', { text:"スパイダー", n: 1000 })
  if(ctx.querystring == "delete-all-css"){
    STYLES.remove('baseStyles', true);
    state._update('updateBackground', { text:"Congrats, you deleted all css added by Joro", n: 1 })
  }
  state._update('updateCurrentPage', 'joro')
};
const CHUMBUCKET = (ctx, next) => {
  state._update('updateCurrentPage', 'chumbucket')
  state._update('updateBackground', { text:"", n: 0 })

};
const OBAKE = (ctx, next) => {
  state._update('updateCurrentPage', 'obake')
  state._update('updateBackground', { text:"(ﾉ⊙﹏⊙)ﾉ", n: 1000 })
};
const DEATHMARK = (ctx, next) => {
  state._update('updateCurrentPage', 'deathmark')
  state._update('updateBackground', { text:"", n: 0 })
};
const AMICO = (ctx, next) => {
  state._update('updateCurrentPage', 'amico')
  state._update('updateBackground', { text:"", n: 0 })
};
const LIBRARIES = (ctx, next) => {
  BaseStyles();
  state._update('updateCurrentPage', 'libraries')
  state._update('updateBackground', { text: 'a list of links░ ', n: 1000 })
};

// Routes
page('/', HOME_PAGE);
page('/joro', JORO);
page('/libraries', LIBRARIES);
page('/chumbucket', CHUMBUCKET);
page('/obake', OBAKE);
page('/deathmark', DEATHMARK);
page('/amico', AMICO);


export function startRouters(): void {
  page.start();
}

//Network Call
export async function getData(url: string) {
  const resp = await fetch(url);
  if (resp.ok) {
    return resp.json();
  } else throw new TypeError('getData response is not Ok');
}

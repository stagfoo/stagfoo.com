import { reducer } from 'obake.js';

export const defaultState = {
  bucket: '',
  currentPage: { name: 'home' },
  pages: {},
  count: 0,
  background: { text:"( ･3･)～", n: 1000 },
  notification: {
    text: "",
    show: false
  }
 }

 export const routes = {
    'home': '/',
    'joro': '/joro',
    'chumbucket': '/chumbucket',
    'obake': '/obake',
    'deathmark': '/deathmark',
    'amico': '/amico',
 }

export const reducers = {
  updateCurrentPage: reducer((state, value: string) => {
    state.currentPage = { name: value  };
  }),
  updateCount: reducer((state, value: string) => {
    state.count = value;
  }),
  updateBucket: reducer((state, value: string) => {
    state.bucket = value;
  }),
  updatePages: reducer((state, value: string) => {
    state.pages = value;
  }),
  updateBackground: reducer((state, value) => {
    state.background = value;
  }),
}

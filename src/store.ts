import { reducer } from 'obake.js';

export const defaultState = {
  greeting: '🍖🍖🍖🍖',
  currentPage: { name: 'HOME' },
  notification: {
    text: "",
    show: false
  }
 }


 export const routes = {
    'Home': '/',
    // 'raeon': '/raeon',
    'obake.js': '/obake',
    'fairybread': '/fairybread',
    'joro': '/joro',
    'chumbucket': '/chumbucket',
    'pinky': '/pinky',
 }
// export const routes = {
//   'Home': '/',
//   'raeon': 'https://www.behance.net/gallery/85987423/Raeon-Design-Language?tracking_source=search_projects_recommended%7Cstagfoo',
//   'obake.js': 'https://github.com/stagfoo/obake',
//   'fairybread': 'https://github.com/stagfoo/fairybread',
//   'joro': 'https://github.com/stagfoo/joro',
//   'chumbucket': 'https://github.com/stagfoo/chumbucket',
// }
export const reducers = {
  updateCurrentPage: reducer((state, value: string) => {
    state.currentPage = { name: value  };
  }),
  changeGreeting: reducer((state, value: string) => {
    state.greeting = value;
  }),
  updateNotification: reducer((state, value:{text: string, show: boolean}) => {
    state.notification = value;
  }),
}

import { state } from './index';
import { showHiddenSpiders, hideSpiders } from 'styles';

export function handleGreetingClick() {
  state._update('changeGreeting', state.greeting + '🍖')
};

export function joroDemo(){
  if(!document.head.querySelector('#joro_demo_show')) {
    showHiddenSpiders();
  } else {
    hideSpiders();
  }
}

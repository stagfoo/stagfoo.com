import { state } from './index';
import { STYLES, BaseStyles } from './styles';

export function handleButtonClick() {
  state._update('updateBucket', state.bucket + '🍖')
};

export function hideNotifications(timeout: number) {
  setTimeout(()=> {
    state._update('updateNotification', {
      text: "",
      show: false
    })
  }, timeout)
};

export function showNotifications(message: string) {
  state._update('updateNotification', {
    text: message,
    show: true
  })
};

export function handleJoroDemo(){
  if(STYLES.registry['baseStyles']){
    state._update('updateBackground', { text:"/////Congrats, you deleted all css added by Joro/////", n: 200 })
    STYLES.remove('baseStyles', true);
  } else {
    BaseStyles()
    state._update('updateBackground', { text:"/////Congrats, added css with Joro/////", n: 200 })
  }
}

export function handleObakeDemo(){
  state._update('updateCount', state.count+1);
    state._update('updateBackground', { text:`/////You updated the state with obake.js ${state.count} times /////`, n: 200 })
}
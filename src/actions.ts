import { state } from './index';
import { showHiddenSpiders, hideSpiders } from 'styles';


export function joroDemo(){
  if(!document.head.querySelector('#joro_demo_show')) {
    showHiddenSpiders();
  } else {
    hideSpiders();
  }
}


export function obakeDemo(){
  const faces = [
    "(ﾉ„•﹏•„)ﾉ",
    "(ﻭ๑˃﹏˂)ﻭ",
    "(ﾉ´﹏`)ﾉ",
    "(ﾉ✧﹏✧)ﾉ",
    "ヽ(╬ Ò﹏Ó)ﾉ",
    "(ﾉ；￣Д￣)ﾉ "
  ]
  const nextFace = faces[Math.floor(Math.random()*faces.length)]
  //prevent double random number
  if(state.emoji === nextFace){
    state._update("updateEmoji", "(ﾉ⊙﹏⊙)ﾉ");
  } else {
    state._update("updateEmoji", nextFace);
  }
}
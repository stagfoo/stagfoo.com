
import html from 'nanohtml';
import { ObakeStyles } from '../styles';
import * as USER_ACTIONS from '../actions';

export function ObakeView(state) {
  ObakeStyles()
  return html`
  <div id="obake">
  ${emoji(state.emoji)}
  <button onclick="${USER_ACTIONS.obakeDemo}">Change Face</button>
  <pre id="code">${`
  import { createStore, reducer } from 'obakejs'

  const defaultState = {
    face: "(ﾉ⊙﹏⊙)ﾉ",
  };

  const reducers = {
    CHANGE_FACE: reducer((state, value) => { state.face = value; }),
  };

  function changeFace() {
    const faces = [
      "(ﾉ„•﹏•„)ﾉ",
      "(ﻭ๑˃﹏˂)ﻭ",
      "(ﾉ\´﹏\`)ﾉ",
      "(ﾉ✧﹏✧)ﾉ",
      "ヽ(╬ Ò﹏Ó)ﾉ",
      "(ﾉ；￣Д￣)ﾉ "
    ]
    state._update("CHANGE_FACE", faces[Math.floor(Math.random()*faces.length)]);
  }`}</pre>
  </div>

      `;
}

function emoji(emoji?:string){
  return html`
    <pre class="emoji">${emoji}</pre>
  `
}


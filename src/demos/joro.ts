
import html from 'nanohtml';
import { JoroStyles } from '../styles';
import * as USER_ACTIONS from '../actions';
export function JoroView(state) {
  JoroStyles()
  return html`
  <div id="joro">
${spider("main")}
${spider("little slot1")}
${spider("little slot2")}
${spider("little slot3")}
  <button onclick="${USER_ACTIONS.joroDemo}">Test</button>
  <pre id="code">${`var STYLES = new joro();

function showHiddenSpiders() {
  STYLES.add('joro_demo_show', \`
  .spider.little {
    color: #83FD58;
  }\`)
}

function hideSpiders(){
  STYLES.remove('joro_demo_show', true)
}`}</pre>
  </div>

      `;
}

function spider(type?:string){
  return html`
    <pre class="spider ${type}">${`  ,-,
/∞|<\\`}</pre>
  `
}
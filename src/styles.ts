import joro from 'joro';
import { pinky } from 'libs/pinky'
export const DS = {
  fontFamily: {
    default: "Fira Mono, san-serif",
    alt: "'Staatliches', san-serif",
  },
  fontSizes: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,

  },
  gutters: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,

  },
  colors: {
    purple: "#8D58FD",
    blue: "#58D5FD",
    green: "#83FD58",
    yellow: "#FDD758",
    black: "#000000",
    red: "#FD5858",
    pink: "#FD58B1"
  }
}

export const STYLES = new joro();


function buttonStyle(){
  return `
  background: inherit;
  color:  ${DS.colors.black};
  box-sizing: border-box;
  font-size: ${DS.fontSizes.lg}px;
  font-family:${DS.fontFamily.alt};
  padding: ${DS.gutters.sm}px ${DS.gutters.xxl}px;
  border-radius: 30px;
  border: 0;
  text-decoration: none;
  `
}
export function notificationStyle(){
  STYLES.add("notificationStyle", `
  .notification {
    background: #fff;
    box-shadow: 10px 10px 0px #000;
    position:fixed;
    font-size: ${DS.fontSizes.md}px;
    padding: ${DS.gutters.md}px;
    width: 320px;
    text-align:center;
    transition: ease all 0.3s;
    animation-duration: 0.3s;
    bottom: 0vh;
    }
  .notification.show {
    animation-name: notification;
  }
  .notification.hide {
    animation-name: notification-out;
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }
  `)
}

export function BaseStyles() {
  STYLES.add("baseStyles", `
    body {
      margin: 0;
      padding: 0;
      color:  ${DS.colors.yellow};
      background: transparent;
      opacity: 1;
    }

    textarea,
    button {
      display: block;
      clear:both;
      margin: ${DS.gutters.sm}px auto ${DS.gutters.sm}px auto;
      ${buttonStyle()}
    }
    textarea {
      width: 100%;
      min-height: 300px;
      font-size: ${DS.fontSizes.xl}px;
    }
    .nav {
      margin-top: ${DS.gutters.sm}px;
    }
    .nav li {
      display:inline-block;
    }
    .nav li a {
      border: 0;
      text-decoration: none;
      font-size: ${DS.fontSizes.md*2.5}px;
      line-height:1.4;
      color: inherit;
    }
    .nav li a img {
      margin-top: ${DS.fontSizes.md - 6}px;
    }
    .nav .down {
      transform: rotate(180deg);
    }
    @keyframes notification {
      from {bottom: -120vh;}
      to { bottom: 5vh; }
    }
    @keyframes notification-out {
      to {bottom: -5vh; display:none;}
      from {bottom: 5vh; display:block;}
    }
    .float-r {
      float:right;
    }
    .float-l {
      float:left;
    }
    ${colorSchemes()}
  `)
}


export function colorSchemes(){
  return `
    html body.yellow-black {
      background: ${DS.colors.yellow};
      color: ${DS.colors.black};
    }
    html body.yellow-black button {
      color: ${DS.colors.yellow};
      background: ${DS.colors.black};
    }

    html body.black-yellow {
      background: ${DS.colors.black};
      color: ${DS.colors.yellow};
    }
    html body.yellow-black button {
      background: ${DS.colors.yellow};
      color: ${DS.colors.black};
    }

    html body.black-green {
      background: ${DS.colors.black};
      color: ${DS.colors.green};
    }
    html body.black-green button {
      background: ${DS.colors.green};
      color: ${DS.colors.black};
    }

    html body.black-blue {
      background: ${DS.colors.black};
      color: ${DS.colors.blue};
    }
    html body.black-blue button {
      background: ${DS.colors.blue};
      color: ${DS.colors.black};
    }

  `
}

export function mountPinky(){
  STYLES.add('pinky', pinky)
}



export function homepageStyles(){
  STYLES.add('homepage', `
    .greeting {
      font-size: 1.3em;
      display:block;
      position:relative;
      margin-top: 25vh;
      width: 70%;
    }
    .greeting h2,
    .greeting h1 {
      font-weight:normal;
      display:inline;
      margin:0;
      padding:0;
    }
  `)
}

export function navpageStyles(){
  STYLES.add('navpage', `
    #navpage {
      margin-top: 20vh;
    }
    #navpage ul,
    #navpage ul li {
      list-style:none;
      margin:0;
      padding:0;
      text-align:center;
    }
    #navpage a {
      font-size: ${DS.fontSizes.xxl}px;
      font-family:${DS.fontFamily.alt};
      text-decoration: none;
    }
  `)
}

export function JoroStyles(){
  STYLES.add('joro_demo', `
    #joro #code {
      font-family:${DS.fontFamily.default};
      font-size: ${DS.fontSizes.md - 4}px;
      margin-top: ${DS.gutters.lg}px;
      border-radius: ${DS.gutters.md}px;
      border: ${DS.colors.green} 1px solid;
      color: ${DS.colors.green};
      display:block;
      padding: ${DS.gutters.md}px;
      overflow:hidden;
    }
    #joro button {
      margin-bottom: 10vh
    }
    .spider {
      font-weight: bold;
      display:inline-block;
      margin: 0px;
      padding: 0px;
      transition: 0.3s ease all;
    }
    .spider.main {
      font-size: ${DS.fontSizes.xxl}px;
      margin: 10vh auto 10vh auto;
      display:block;
      width: 50vw;
    }
    .spider.little {
      top: 10vh;
      position: absolute;
      color: ${DS.colors.black};

    }
    .spider.little.slot1 {
      left: 0vw;
    }
    .spider.little.slot2 {
      left: 30vw;
    }
    .spider.little.slot3 {
      left: 60vw;
    }
  `)
}

export function showHiddenSpiders() {
  STYLES.add('joro_demo_show', `
  .spider.little {
    color: ${DS.colors.green};
  }`)
}

export function hideSpiders(){
  STYLES.remove('joro_demo_show', true)
}


export function ObakeStyles(){
  STYLES.add('obake_demo', `
    #obake #code {
      font-family:${DS.fontFamily.default};
      font-size: ${DS.fontSizes.md - 4}px;
      margin-top: ${DS.gutters.lg}px;
      border-radius: ${DS.gutters.md}px;
      border: ${DS.colors.blue} 1px solid;
      color: ${DS.colors.blue};
      display:block;
      padding: ${DS.gutters.md}px;
      overflow-x:scroll;
    }
    #obake button {
      margin-bottom: 10vh
    }
    .emoji {
      font-weight: bold;
      margin: 0px;
      text-align:center;
      padding: 0px;
      transition: 0.3s ease all;
      font-size: ${DS.fontSizes.xxl}px;
      margin: 10vh auto 10vh auto;
      display:block;
    }
  `)
}
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
  background: ${DS.colors.blue};
  color:  ${DS.colors.purple};
  box-sizing: border-box;
  font-size: ${DS.fontSizes.lg}px;
  padding: ${DS.gutters.md}px;
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
    html body.black-yellow {
      background: ${DS.colors.black};
      color: ${DS.colors.yellow};
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
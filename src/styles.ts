import joro from 'joro';

export const DS = {
  fontFamily: {
    default: "Noto Sans JP, san-serif",
    alt: "IBM Plex Mono, san-serif",
  },
  fontSizes: {
    sm: 8,
    md: 16,
    lg: 28,
    bg: 23,
    xl: 32,

  },
  gutters: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  colors: {
    purple: "#8D58FD",
    blue: "#301FFD",
    blue_l: "#58D5FD",
    green: "#34FF00",
    yellow: "#F6E73B",
    pink: "#FD58B1",
    white: "#FFFFFF",
    black: "#000000"
  }
}

export const STYLES = new joro();


export function notificationStyle(){
  STYLES.add("notificationStyle", `
  .notification {
    background: #fff;
    box-shadow: ${DS.gutters.sm}px ${DS.gutters.sm}px 0px #000;
    position:fixed;
    left: 0px;
    right: 0px;
    margin: 0 auto;
    font-size: ${DS.fontSizes.md}px;
    padding: ${DS.gutters.md}px;
    width: 320px;
    text-align:center;
    transition: ease all 0.3s;
    bottom: -10vh;
    height: 0px;
    }
    .notification.show {
      transition: ease all 0.3s;
      bottom: ${DS.gutters.lg}px;
      height: auto;
    }
  `)
}

export function backgroundMutations(){
  return `
    .home.background {
      background: ${DS.colors.blue};
      color:  ${DS.colors.blue_l};
    }
    .joro.background { 
      color: ${DS.colors.purple};
      background: ${DS.colors.green};
    }
    .obake.background { 
      color: ${DS.colors.blue_l};
      background: ${DS.colors.purple};
    }
    .amico.background { 
      background: ${DS.colors.pink};
    }
    .chumbucket.background { 
      color: #000;
      background: ${DS.colors.white};
    }
    .libraries.background { 
      color: ${DS.colors.blue};
      background: ${DS.colors.yellow};
    }
    .deathmark.background { 
      background-color: ${DS.colors.yellow};
      background-image: url('logo-deathmark.png');
      background-size: 30px;
    }
  
  `
}
export function pageMutations(){
  return `
  .page.chumbucket {
    width: 100vw;
    height: 100vh;
    border: 0px;
    box-shadow: none;
    background: transparent;
  }
  .page.chumbucket li {
    border: none;
  }
  .page.chumbucket .center {
    margin: 20vh auto;
    width: 50%;
  }
  .chumbucket .emoji {
    position: absolute;
    right: 50%;
    top: 70%;
    font-size: 100px;
  }
  .chumbucket .emoji +   .emoji  {
    right: 80%;
    top: 20%;
  }
  .page.chumbucket img {
    position: absolute;
    right: ${DS.gutters.xl}px;
  }
  /*------------------*/
  .page.deathmark {
    background-repeat: no-repeat;
    background-position: 100% 10%;
    background-image: url('logo-deathmark.png');
  }
  .page.deathmark p {
    width: 80%;
  }
  /*------------------*/
  .page.obake {
    padding-top: 100px;
  }
  /*------------------*/
  .gifs.deathmark img,
  .gifs.joro img {
    width: 300px;
  }
  `
}

export function setBackground(font, bg, extra){
  STYLES.add('background', `
  .background {
    background-color: ${font};
    color:  ${bg};
    ${extra}
  }
  `)
}

export function BaseStyles() {
  STYLES.add("baseStyles", `
    * {
      font-family: ${DS.fontFamily.alt};
    }
    #app {
      position:relative;
      height: 100vh;
      overflow:hidden;
    }
    html,body {
      margin: 0;
      padding: 0;
      color:  ${DS.colors.black};
      opacity: 1;
      height: 100vh;
    }

    .background {
      position: absolute;
      word-break: break-all;
      top: 0px;
      left: 0px;
      font-family: ${DS.fontFamily.default};
      font-size: ${DS.fontSizes.bg}px;
      font-weight: bold;
      z-index: 0;
      color:  ${DS.colors.blue_l};
      height: 100vh;
      width: 100vw;
    }
    ${backgroundMutations()}
    ${pageMutations()}

    .page {
      border: 8px solid ${DS.colors.black};
      background: ${DS.colors.white};
      z-index: 5;
      position: absolute;
      width: 360px;
      box-sizing: border-box;
      padding: ${DS.gutters.lg}px;
      height: 640px;
      right: 0;
      left: 0;
      margin:10vh auto;
      box-shadow: 40px 40px 0px #000;
    }

    h1 {
      font-size: ${DS.fontSizes.lg}px;
    }

    .gifs {
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 1;
      width: 100vw;
      height: 100vh;
    }
    .gif {
      position: absolute;
    }
    .gifs img {
      border: 1px solid;
    }
    .gif small {
      background: ${DS.colors.white};
      margin: 0;
      padding: ${DS.gutters.sm}px;
      border: 1px solid;
      float:left;
    }


    a {
      text-decoration: none;
    }
    ul li {
      border-bottom: 2px dashed ${DS.colors.black};
    }
    ul li a {
      padding: ${DS.gutters.sm}px;
      display:block;
    }
    ul {
      list-style: none;
      margin: ${DS.gutters.lg}px 0px 0px 0px;
      padding: 0px;
    }
    button {
      cursor: pointer;
      background: ${DS.colors.white};
      border:1px solid;
      border-radius: 4px;
      padding: ${DS.gutters.sm}px;
      display:inline-block;
      width:auto;
    }

    @keyframes notification {
      from {bottom: -120vh;}
      to { bottom: 5vh; }
    }
    @keyframes notification-out {
      to {bottom: -5vh; display:none;}
      from {bottom: 5vh; display:block;}
    }
  `)
}
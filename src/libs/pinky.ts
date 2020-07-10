function makeCols(){
  let columms = ``
    const columnNumber = 12
      for (let col = 1; col <= columnNumber; col++) {
      columms = `${columms}
      .col-${col} {
          width: ${Math.floor(col/columnNumber*100)}%;
          display: inline-block;
      }
      @media only screen and (max-width: 319px) {
        .col-${col} {
            width: 100%;
        }
      }
      `
    }
  return columms
}


export const pinky = `
[class*="col-"] {
  width: 100%;
  float: left;
  min-height: 1px;
  box-sizing: border-box;
}
.container {
  width: 1140px;
  margin: 0 auto;
  display:block;
  *zoom: 1;

}
.container:before,
.container:after {
    content: " ";
    display: table;
  }
.container:after {
    clear: both;
  }

${makeCols()}
`
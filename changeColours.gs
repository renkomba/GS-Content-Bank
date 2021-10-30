// changes colours to equivalent shades in the sheet
function format() {
  let colour = findColour();
  let style = SpreadsheetApp.BorderStyle.SOLID_THICK;
  let ranges = findRanges();
  let darkRanges = add.getRangeList(ranges.dark);
  let deepRanges = add.getRangeList(ranges.deep);
  let plainRanges = add.getRangeList(ranges.plain);
  let lightRanges = add.getRangeList(ranges.light);
  let lighterRanges = add.getRangeList(ranges.lighter);
  let paleRanges = add.getRangeList(ranges.pale);
  let whiteRanges = add.getRangeList(ranges.white);
  let darkBorderRanges = add.getRangeList(ranges.darkBorder);
  let deepBorderRanges = add.getRangeList(ranges.deepBorder);

  paleRanges.setBackground(colour.pale);
  lighterRanges.setBackground(colour.lighter);
  lightRanges.setBackground(colour.light);
  plainRanges.setBackground(colour.plain);
  deepRanges.setBackground(colour.deep);
  darkRanges.setBackground(colour.dark)
    .setFontColor(colour.pale)
    .setBorder(true, true, true, true, null, null, colour.plain, style);
  whiteRanges.setBackground('white');
  darkBorderRanges.setBorder(true, true, true, true, null, null, colour.dark, style);
  deepBorderRanges.setBorder(true, true, true, true, null, null, colour.deep, style);
}

// create an object of ranges that need particular colour changes
function findRanges() {
  let lightButtons = ['C27:D28', 'J27:K28'];
  let sheetHeader = ['E2:I2'];
  let frame = ['B4:L29'];
  let ranges = {
    dark: ['B2:C2', 'K2:L2'], 
    deep: ['F27:H28'], 
    deepBorder: [],
    light: ['C5:C6', 'E5:E6', 'G5:G6', 'I5:I6', 'K5:K6',
            'C9:C10', 'C12:K13', 'C15:C16', 'E15:K16'],
    plain: [], 
    lighter: ['C20:K21', 'C24:K24'], 
    pale: ['A:M'],
    white: ['C7', 'E7', 'G7', 'I7', 'K7', 'E9:K10', 'C17:C18',
            'E17:K18', 'C22:K22', 'C25:K25'], 
    darkBorder: []
  };
  
  ranges.darkBorder = lightButtons.concat(ranges.deep);
  ranges.deepBorder = sheetHeader.concat(ranges.white, ranges.lighter, ranges.light, frame);
  ranges.plain = sheetHeader.concat(lightButtons);
  return ranges;
}

// create an object of CSS colours based on the colour name in cell 'A30'
function findColour() {
  let pink = {name: 'pink', pale: '#ead1dc', lighter: '#d5a6bd',
              light: '#c27ba0', plain: '#a64d79', deep: '#741b47',
              dark: '#4c1130', banding: SpreadsheetApp.BandingTheme.PINK};
  let purple = {name: 'purple', pale: '#d9d2e9', lighter: '#b4a7d6',
                light: '#8e7cc3', plain: '#674ea7', deep: '#351c75',
                dark: '#20124d', banding: SpreadsheetApp.BandingTheme.INDIGO};
  let blue = {name: 'blue', pale: '#cfe2f3', lighter: '#9fc5e8',
              light: '#6fa8dc', plain: '#3d85c6', deep: '#0b5394',
              dark: '#073763', banding: SpreadsheetApp.BandingTheme.BLUE};
  let teal = {name: 'teal', pale: '#d0e0e3', lighter: '#a2c4c9',
              light: '#76a5af', plain: '#45818e', deep: '#134f5c',
              dark: '#0c343d', banding: SpreadsheetApp.BandingTheme.CYAN};
  let green = {name: 'green', pale: '#d9ead3', lighter: '#b6d7a8',
               light: '#93c47d', plain: '#6aa84f', deep: '#38761d',
               dark: '#274e13', banding: SpreadsheetApp.BandingTheme.GREEN};
  let yellow = {name: 'yellow', pale: '#fff2cc', lighter: '#ffe599',
                light: '#f0cc60', plain: '#f1c232', deep: '#bf9000',
                dark: '#7f6000', banding: SpreadsheetApp.BandingTheme.YELLOW};
  let orange = {name: 'orange', pale: '#fce5cd', lighter: '#f9cb9c',
                light: '#f6b26b', plain: '#e69138', deep: '#b45f06',
                dark: '#783f04', banding: SpreadsheetApp.BandingTheme.ORANGE};
  let red = {name: 'red', pale: '#e6b8af', lighter: '#dd7e6b',
             light: '#cc4125', plain: '#a61c00', deep: '#85200c',
             dark: '#5b0f00', banding: SpreadsheetApp.BandingTheme.PINK};
  let grey = {name: 'grey', pale: '#d9d9d9', lighter: '#cccccc',
              light: '#b7b7b7', plain: '#999999', deep: '#666666',
              dark: '#434343', banding: SpreadsheetApp.BandingTheme.GREY};
  
  let colours = [pink, purple, blue, teal, green, yellow, orange, red, grey];
  let colourString = add.getRange('A30').getValue();
  
  for (let colour of colours) {
    if (colour.name == colourString) return colour;
  }
}

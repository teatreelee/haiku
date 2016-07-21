var haiku = require('./haiku.js');
var syllablesArr = haiku.array2d(8);
var cmudictFile = haiku.readCmudictFile('./cmudict.txt');
syllablesArr = haiku.syllableData(cmudictFile);

console.log(haiku.createHaiku(haiku.randomize(),syllablesArr)); // get undefined after statement.
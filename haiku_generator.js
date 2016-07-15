var haiku = require('./haiku.js');
var syllablesArr = array2d(8);
var cmudictFile = readCmudictFile('./cmudict.txt');
syllableData(cmudictFile);
console.log(haiku.createHaiku([5,7,5], syllablesArr)); // get undefined after statement.
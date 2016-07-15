var fs = require('fs');
//Goal 1: Create Haikus and log them to the console.
	//0.Create two-dimensional array with length of 8 (most syllables 7)
	//1.Be able to read each line alone --> ABABA  AH0 B AA1 B AH0
		//a. split each line based on new line ("\n")
	//2.Obtain the number of syllables from each word
		//a. Separate line into two parts, the actual word (ABABA) and the number of syllables (split("  "))
		//b. Check number of syllables of line[1] through match(/\d/g).length
		//c. store word in a two-dimensional array based on syllable length (ex. ABABA would be in arr[3])		
	//3. Check num of syllables is the same as the number of syllables needed for haiku line
		//a. loop through the structure ex. [5,7,5]
		//b. look at that index array. ex. first look at arr[5] for all words with five syllables
		//c. pick a random word from that list (Math.random() * arr[n].length)
		//d. add it to ans, add a new line to answer
	//4. Console.log info

// 7/15: Completed syllablesArr. (Steps 1-2).  Noticed non-words, like 'A(1)', are being included. Need to filter out.


//Questions
	//Is it better to create more functions for the sake of readability (ex. finding num of syllables, is a word, tranferrring to array)
//0. Create two-dimensional array (syllablesArr).

function array2d(rows){
	var arr = [];
	for (var i = 0; i < rows; i++){
		arr[i] = [];
	}
	return arr;
} 

var syllablesArr = array2d(8);

//1 & 2. Push words into syllablesArr based on num of syllables

var cmudictFile = readCmudictFile('./cmudict.txt'); //is reading the dictionary and translating it into a string

function readCmudictFile(file){ //translates file into a string?
  return fs.readFileSync(file).toString();
}

function isAWord(str){
	var patt = /^[a-zA-Z]+$/gi;
	return patt.test(str);
}
function syllableData(data){
	var lines = data.toString().split('\n'), // 1a.
		lineSplit, numOfSylls;
		lines.forEach(function(line){
			lineSplit = line.split("  "); //2a.
			numOfSylls = lineSplit[1].match(/\d/g);
			if (isAWord(lineSplit[0]) && numOfSylls !== null){
			numOfSylls.length < 8 ? syllablesArr[numOfSylls.length].push(lineSplit[0]) : syllablesArr;
		}
	});
		return syllablesArr;
}

//updated empty arr with information
syllableData(cmudictFile);

3 & 4.
function createHaiku(structure, dict){ //takes two arrays as parameters
	var haiku = "";
	for (var i = 0; i < structure.length; i++){
		haiku += dict[structure[i]][(Math.floor(Math.random() * dict[structure[i]].length))];
		if (i < structure.length -1){
			haiku += '\n';
		}
	}
	return haiku;
}
console.log(createHaiku([5,7,5],syllablesArr));

module.exports.array2d = array2d;
module.exports.createHaiku = createHaiku;
module.exports.readCmudictFile = readCmudictFile;
module.exports.syllableData = syllableData;
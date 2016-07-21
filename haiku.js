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
syllableData(cmudictFile);
//updated empty arr with information

//3 & 4.

function createHaiku(structure, dict){ //takes two arrays as parameters
	var haiku = "";
	var countSylls = 0, wordSylls;
	for (var i = 0; i < structure.length; i++){
		wordSylls = structure[i];
		haiku += dict[wordSylls][(Math.floor(Math.random() * dict[wordSylls].length))];
		countSylls += wordSylls;
		if (countSylls === 5 || countSylls === 12){
			haiku += '\n';
		} else if (i < structure.length -1){
			haiku += ' ';
		}
	}
	return haiku;
}

//5. allow haiku to have a random format
	//1. create empty array to store haiku format;
	//2. push random number from 1-5 to the array. keep doing so until there are five syllables ex:
		//a. pushed 2
		//b. put number btwn 1-3; pushed 1
		//c. put number between 1-2; pushed 1
		//d. since only 1 is an option, push 1;
	//3. repeat for 7 and 5
	//4. return array
function randomize(){
	var arr = [];
	var syllsLeft = [5,7,5];
	for (var i = 0; i < syllsLeft.length; i++){
		while (syllsLeft[i] > 0){
			arr.push(Math.floor(Math.random() * syllsLeft[i]) + 1);
			syllsLeft[i] -= arr[arr.length -1];
		}
	}
	return arr;
}

module.exports.array2d = array2d;
module.exports.createHaiku = createHaiku;
module.exports.readCmudictFile = readCmudictFile;
module.exports.syllableData = syllableData;
module.exports.randomize = randomize;
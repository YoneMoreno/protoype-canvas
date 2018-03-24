'use strict';

MyFileReader = function MyFileReader() {};

MyFileReader.prototype = {

    constructor: MyFileReader,

    readTextFile: function readTextFile(file, intoLines, intoWords) {

        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    allText = rawFile.responseText;
                    console.log('The complete text is', allText);
                    var lineArr = this.intoLines(allText);
                    var firstLineWords = this.intoWords(lineArr[0]);
                    var secondLineWords = this.intoWords(lineArr[1]);

                    console.log('Our  first line is: ', lineArr[0]);

                    var atlas = {};
                    for (var i = 0; i < firstLineWords.length; i++) {
                        console.log('Our ' + i + ' word in the first line is : ' + firstLineWords[i]);
                        console.log('Our ' + i + ' word in the SECOND line is : ' + secondLineWords[i]);
                        atlas[firstLineWords[i]] = secondLineWords[i];
                    }
                    console.log('The atlas is: ', atlas);
                    var atlasJson = JSON.stringify(atlas);
                    console.log('Atlas as json is: ', atlasJson);

                    this.download(atlasJson, 'atlasJson.txt', 'text/plain');
                }
            }
        };
        rawFile.send(null);
    },

    download: function download(text, name, type) {

        var a = document.getElementById("a");
        var file = new Blob([text], { type: type });
        a.href = URL.createObjectURL(file);
        a.download = name;
    },
    intoLines: function intoLines(text) {
        // splitting all text data into array "\n" is splitting data from each new line
        //and saving each new line as each element*

        var lineArr = text.split('\n');

        //just to check if it works output lineArr[index] as below


        return lineArr;
    },
    intoWords: function intoWords(lines) {

        var wordsArr = lines.split('" "');

        return wordsArr;
    }

};
//# sourceMappingURL=MyFileReader.js.map
//# sourceMappingURL=MyFileReader.js.map
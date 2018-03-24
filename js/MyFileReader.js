MyFileReader = function () {



}

MyFileReader.prototype = {

    constructor: MyFileReader,

    readTextFile: function (file, intoLines, intoWords) {

        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    allText = rawFile.responseText;
                    console.log('The complete text is', allText);
                    let lineArr = this.intoLines(allText);
                    let firstLineWords = this.intoWords(lineArr[0]);
                    let secondLineWords = this.intoWords(lineArr[1]);

                    console.log('Our  first line is: ', lineArr[0]);

                    let atlas = {};
                    for (let i = 0; i < firstLineWords.length; i++) {
                        console.log(`Our ${i} word in the first line is : ${firstLineWords[i]}`);
                        console.log(`Our ${i} word in the SECOND line is : ${secondLineWords[i]}`);
                        atlas[firstLineWords[i]] = secondLineWords[i];
                    }
                    console.log('The atlas is: ', atlas);
                    let atlasJson = JSON.stringify(atlas);
                    console.log('Atlas as json is: ', atlasJson);

                    this.download(atlasJson, 'atlasJson.txt', 'text/plain');
                }
            }
        };
        rawFile.send(null);
    },

    download: function (text, name, type) {

        var a = document.getElementById("a");
        var file = new Blob([text], {type: type});
        a.href = URL.createObjectURL(file);
        a.download = name;
    },
    intoLines: function (text) {
        // splitting all text data into array "\n" is splitting data from each new line
        //and saving each new line as each element*

        var lineArr = text.split('\n');

        //just to check if it works output lineArr[index] as below


        return lineArr;


    },
    intoWords: function (lines) {


        var wordsArr = lines.split('" "');


        return wordsArr;

    },

};




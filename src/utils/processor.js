
const Maps = require('../const/maps');

var cleanDate = function (date) {
    if (date) {
        let dateString = date.replace('[', '').replace(',', '');
        let dateArray = dateString.split(".");
        return { day: dateArray[0], month: (dateArray[1] - 1), year: dateArray[2] };
    }
}

var cleanName = function (name) {
    if (name) {
        var len = name.split(' ').length;
        if (len < 2) return name.split(' ')[0].replace(':', '');
        return name.split(' ')[0] + " " + name.split(' ')[1].replace(':', '');
    }
}

var processFileContent = function (input) {
    var incomingArray = input.split('[');
    var result = [];
    incomingArray.forEach(element => {
        if (element) {
            currentLine = {};
            var text = "";
            var elemArray = element.split(' ');
            for (var v in elemArray) {
                //ia fiecare bucata cuvant si vezi ce fel de text e: descriere, data etc..
                if (elemArray[v].indexOf(']') == -1) {
                    text += elemArray[v] + " ";
                    text = text.replace(' lei ', ' ').replace(' RON ', ' ').replace(' ron ', ' ');
                }
                else { continue; }
            }
            var myarray = text.split(/(.*,)(\s)(.*:)(\s)(\S*)(.*)/gm);
            if (myarray.length < 6 || myarray.indexOf("deleted") > -1 ) {
                return result;
            }
            var incomingDate = cleanDate(myarray[1]);
            currentLine.expense_date = new Date(incomingDate.year, incomingDate.month, incomingDate.day);
            currentLine.name = cleanName(myarray[3]);
            currentLine.sum = myarray[5].replace(",", ".");
            currentLine.description = myarray[6];
            var categ_and_bucket = get_Category_Bucket(myarray[6]);
            currentLine.bucket = categ_and_bucket.bucket;
            currentLine.type = categ_and_bucket.category;
            if (currentLine.sum) { result.push(currentLine); }
        }
        //console.log(result);
    });
    return result;
}

var get_Category_Bucket = function (description) {
    var returnCategory = { "category": 'Misc', "bucket": 'Total Cheltuieli' };
    if (description) {
        var inputArray = description.split(' ');
        for (var i in inputArray) {
            word = inputArray[i];
            if (word) {
                for (var j in Maps.constMaps) {
                    category = Maps.constMaps[j];
                    if (category.categ_words.includes(word.toLowerCase())) {
                        //console.log("Found " + category.categ_name + " - " + category.bucket_name);
                        return {
                            "category": category.categ_name,
                            "bucket": category.bucket_name
                        };
                    }
                }
            }
        }
    };
    console.log("Did not find any matches for: " + description);
    return returnCategory;
};

//processFileContent(testMesg);
module.exports = { processFileContent: processFileContent, get_Category_Bucket: get_Category_Bucket };

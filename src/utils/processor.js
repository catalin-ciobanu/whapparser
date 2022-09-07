// var testMesg = "[10.04.2021, 14:22:57] Elena Ciobanu: 20 bacsic unghii[12.04.2021, 13:19:52] Elena Ciobanu: 150 lidl[12.04.2021, 13:20:09] Elena Ciobanu: 120 emag - ulei si carte[15.04.2021, 09:12:46] Elena Ciobanu: 85 lidl[15.04.2021, 09:12:54] Elena Ciobanu: 120 farmacie[15.04.2021, 09:13:17] Elena Ciobanu: 100 oana[15.04.2021, 11:34:36] Elena Ciobanu: 450 charity[15.04.2021, 18:03:59] Elena Ciobanu: ‎This message was deleted.[15.04.2021, 18:05:47] Elena Ciobanu: 165 carti[18.04.2021, 18:26:49] Elena Ciobanu: 70 hm[18.04.2021, 18:26:54] Elena Ciobanu: 270 omv[18.04.2021, 18:27:08] Elena Ciobanu: 105 findus[18.04.2021, 18:28:04] Elena Ciobanu: 30 palas[18.04.2021, 18:31:32] Catalin: 60 glovo duminica[18.04.2021, 18:31:44] Catalin: 600 gaz pământ[18.04.2021, 18:50:02] Elena Ciobanu: 400 ionut ziua radu[20.04.2021, 13:39:17] Elena Ciobanu: 27 lei mega[20.04.2021, 13:39:20] Elena Ciobanu: 120 lidl[20.04.2021, 13:39:30] Elena Ciobanu: 40 palas"
// var arr = testMesg.split('[');
const Maps = require('../const/maps');

var cleanDate = function (date) {
    if (date) {
        let dateString = date.replace('[', '').replace(',', '');
        let dateArray = dateString.split(".");
        return { day: dateArray[0], month: (dateArray[1]-1), year: dateArray[2] };
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
                    text.replace(' lei ', '').replace(' RON ', '').replace(' ron ', '');
                }
                else
                    continue;
            }
            var myarray = text.split(/(.*,)(\s)(.*:)(\s)(\S*)(.*)/gm);
            if (myarray.length < 6) {
                return result;
            }
            var incomingDate = cleanDate(myarray[1]);
            currentLine.expense_date = new Date(incomingDate.year, incomingDate.month, incomingDate.day);
            currentLine.name = cleanName(myarray[3]);
            currentLine.sum = myarray[5];
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
                        console.log("Found " + category.categ_name + " - " + category.bucket_name);
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
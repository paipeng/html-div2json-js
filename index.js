/**
 * Created by paipeng on 17.06.15.
 */


module.exports = {
    convert: function (html, name, row_offset) {
        var cheerio = require('cheerio');
        $ = cheerio.load(html);
        return parserChilden($('#' + name).children(), row_offset);
    }
};


function parserChilden(divs, row_offset) {
    //console.log("parserChilden " + divs.length);
    var json = [];
    var value = {};
    var row = 0;
    divs.each(function (i, elem) {
        if (row_offset !== undefined && row < row_offset) {
            next;
        }

        if ($(elem).children().length > 0) {
            json.push(parserChilden($(elem).children()));
        } else {
            // console.log("children: " + $(elem).attr('class') + " -> " + $(elem).html());
            if (value[$(elem).attr('class')] === undefined) {
                value[$(elem).attr('class')] = $(elem).html()
            } else {
                value[$(elem).attr('class') + i] = $(elem).html()

            }
        }
        row++;
    });
    json.push(value);
    // console.log("json " + JSON.stringify(json));
    return json;
}

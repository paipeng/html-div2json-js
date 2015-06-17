/**
 * Created by paipeng on 17.06.15.
 */


module.exports = {
    convert: function(html, name) {
        var cheerio = require('cheerio');
        $ = cheerio.load(html);

        return parserChilden($('#' + div_name).children());
    }
};


function parserChilden(divs) {
    console.log("parserChilden " + divs.length);
    var json = [];
    divs.each(function(i, elem) {
        if ($(elem).children().length > 0) {
            json.push(parserChilden($(elem).children()));
        } else {
            console.log("children: " + $(elem).attr('class') + " -> " + $(elem).html());
            var value = {};
            value[$(elem).attr('class')] = $(elem).html()
            json.push(value);
        }
    });
    console.log("json " + JSON.stringify(json));
    return json;
}

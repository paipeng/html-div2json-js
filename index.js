/**
 * Created by paipeng on 17.06.15.
 */

var http = require('http');

var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());


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

function convertLottoToJson(html, div_name, server_res) {
    //console.log("convertLottoToJson " + html + " " + div_name);
    //var tabletojson = require('tabletojson');

    var cheerio = require('cheerio');

    $ = cheerio.load(html);

    //return $(div_name).html();

    parserChilden($('#' + div_name).children());

    //$.html();
    server_res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
    server_res.write(JSON.stringify($('#' + div_name ).html()));
    server_res.end();
}


function getLotto(server_res) {
    var url = "http://www.lottozahlenonline.de/statistik/beide-spieltage/lottozahlen-archiv.php?j=1955";
    http.get(url, function (res) {
        console.log("http get lotto result");
        var data = '';
        res.on("data", function (chunk) {
            data += chunk;
        });
        res.on("end", function (chunk) {
            convertLottoToJson(data, "gewinnzahlen", server_res);
        })
    }).on('error', function (e) {
        console.log("http get error " + e.message);
        server_res.writeHead(200, {'Content-Type': 'application/json'});
        server_res.write(JSON.stringify({result: 'error ', message: e.message}));
        server_res.end();
    });

}

app.get('/lotto', function (req, res) {
    getLotto(res);
});

app.listen(3004);
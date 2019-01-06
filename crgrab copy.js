"use strict";
var page = require('webpage').create(),
    system = require('system'),
    fs = require('fs'),
    host, port, address, host_array, port_array, host_random;

    page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';

    var host_num = 0;
    host = "66.70.191.215";
    port = "8080";

    var loadpage = function (i, max){
    if (i === max) {
        phantom.exit();
        return;
    }
    host_array = [
      "66.70.191.215",
      "107.178.4.109",
      "75.151.213.85",
      "107.182.111.102",
      "67.205.170.249",
      "35.193.215.131",
      "138.197.203.46",
      "104.236.166.203",
      "198.211.102.149",
      "192.223.24.227",
      "67.205.159.165",
      "68.178.128.103",
      "145.239.44.241",
      "51.254.34.26",
      "62.210.71.225"
    ];

    var address = 'https://www.cannabisreports.com/api/v1.0/products?page=' + i;
    var t = Date.now();

    phantom.setProxy(host, port, 'manual', '', '');
    page.open(address, function(status) {
        if (status !== 'success') {
            console.log('FAIL to load the address');
            host_num = host_num + 1;
            host = host_array[host_num];
            console.log("Rate limit!");
            console.log(host_num + "New host: "+ host);
            phantom.setProxy(host, port, 'manual', '', '');
            i--;
        } else {
            t = Date.now() - t;
            console.log('Loading ' + address);
            console.log('Loading time ' + t + ' msec');
            var jsonSource = page.plainText;
            console.log('Success');

            var captcha_check = jsonSource.search("One more step");
            var limit_check = jsonSource.search("You have exceeded your rate limit.");
            if(limit_check === -1 && captcha_check === -1) {
              try {
                var textPath = "/Applications/XAMPP/xamppfiles/htdocs/cr_json/extracts/"+i+".json";
                fs.write(textPath, jsonSource, 'w');
              } catch(e) {
                console.log(e);
              }
            } else {
              host_num = host_num + 1;
              host = host_array[host_num];
              console.log("Rate limit!");
              console.log(host_num + "New host: "+ host);
              phantom.setProxy(host, port, 'manual', '', '');
              i--;
            }
        }

        loadpage(i+1, max)
    });
};

loadpage(1049, 1059);

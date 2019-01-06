"use strict";
var page = require('webpage').create(),
    system = require('system'),
    fs = require('fs'),
    host, port, address, host_array, port_array, host_random;

    page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';

    var host_num = 0;
    host = "173.230.150.147";
    port = "3128";

    var loadpage = function (i, max){
    if (i === max) {
        phantom.exit();
        return;
    }
    host_array = [
      "173.230.150.147",
      "191.101.1.190",
      "52.160.103.205",
      "107.150.119.85",
      "198.101.238.179",
      "174.138.37.238",
      "75.102.38.54",
      "70.32.89.160",
      "47.91.197.58",
      "198.199.91.220",
      "47.91.143.118",
      "208.115.100.162",
      "54.183.229.224",
      "35.160.155.81",
      "97.90.251.98",
      "76.3.249.243",
      "162.230.215.138",
      "76.190.78.10",
      "47.91.138.21",
      "165.227.1.96",
      "104.236.65.142",
      "168.235.251.25",
      "67.205.191.116",
      "23.247.114.71",
      "64.77.242.74",
      "159.203.112.118",
      "172.8.207.192"
    ];

    var address = 'https://www.cannabisreports.com/api/v1.0/extracts?page=' + i;
    var t = Date.now();

    phantom.setProxy(host, port, 'manual', '', '');
    page.open(address, function(status) {
        if (status !== 'success') {
            console.log('FAIL to load the address');
            phantom.exit();
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
              console.log(host_num + " New host: " + host);
              phantom.setProxy(host, port, 'manual', '', '');
              i--;
            }
        }

        loadpage(i+1, max)
    });
};

loadpage(808, 1059);

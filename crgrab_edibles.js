"use strict";
var page = require('webpage').create(),
    system = require('system'),
    fs = require('fs'),
    host, port, address, host_array, port_array, host_random;

    page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';

    var host_num = 0;
    host = "208.47.176.252";
    port = "80";

    var loadpage = function (i, max){
    if (i === max) {
        phantom.exit();
        return;
    }
    host_array = [
      "208.47.176.252",
      "45.33.118.208",
      "52.27.22.179",
      "138.197.77.95",
      "166.78.12.249",
      "52.35.82.94",
      "98.172.91.132",
      "34.224.80.68",
      "13.82.31.140",
      "138.68.228.13",
      "108.161.151.98",
      "50.116.24.219",
      "54.67.87.44",
      "54.152.254.163",
      "52.24.78.66",
      "45.79.99.200",
      "98.228.67.167",
      "35.186.169.61",
      "207.182.156.11",
      "47.52.18.182",
      "74.201.86.22",
      "47.52.113.253",
      "34.193.82.17",
      "45.33.54.73",
      "69.246.27.181",
      "35.164.150.24",
      "98.201.148.66",
      "34.208.105.236",
      "96.44.148.86",
      "24.176.195.134",
      "54.187.52.159",
      "208.108.130.128",
      "13.56.40.133",
      "35.189.128.127",
      "13.59.137.136",
      "13.59.19.215",
      "198.11.137.72",
      "74.201.86.21"
    ];

    var address = 'https://www.cannabisreports.com/api/v1.0/edibles?page=' + i;
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
                var textPath = "/Applications/XAMPP/xamppfiles/htdocs/cr_json/edibles/"+i+".json";
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

loadpage(435, 765);

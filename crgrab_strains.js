"use strict";
var page = require('webpage').create(),
    system = require('system'),
    fs = require('fs'),
    host, port, address, host_array, port_array, host_random;

    page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';

    var host_num = 0;
    host = "165.227.124.179";
    port = "3128";

    var loadpage = function (i, max){
    if (i === max) {
        phantom.exit();
        return;
    }
    host_array = [
      "165.227.124.179",
      "192.151.151.194",
      "162.230.215.138",
      "54.174.242.79",
      "45.55.56.92",
      "138.197.12.6",
      "74.115.5.101",
      "64.77.242.74",
      "13.65.101.4",
      "45.55.127.200",
      "142.4.8.213",
      "159.203.112.118",
      "47.89.246.239",
      "170.24.131.171",
      "54.224.104.79",
      "34.212.26.255",
      "34.229.144.216",
      "165.227.77.19",
      "142.54.178.140",
      "66.45.231.190",
      "35.185.80.76",
      "104.238.129.17",
      "54.183.229.224",
      "142.54.178.138",
      "142.54.178.139"
    ];

    var address = 'https://www.cannabisreports.com/api/v1.0/strains?page=' + i;
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
                var textPath = "/Applications/XAMPP/xamppfiles/htdocs/cr_json/strains/"+i+".json";
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

loadpage(901, 902);

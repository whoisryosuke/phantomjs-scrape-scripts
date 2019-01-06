"use strict";
var page = require('webpage').create(),
    system = require('system'),
    fs = require('fs'),
    host, port, address, host_array, port_array, host_random;

    page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';

    var host_num = 0;
    host = "104.199.47.183";
    port = "8080";

    var loadpage = function (i, max){
    if (i === max) {
        phantom.exit();
        return;
    }
    host_array = [
      "104.199.47.183",
      "138.197.83.21",
      "47.88.84.190",
      "50.254.42.92",
      "47.91.233.131",
      "67.148.156.107",
      "154.53.194.72",
      "66.232.169.50",
      "12.110.218.178",
      "75.151.213.85",
      "199.7.220.121",
      "23.245.248.45",
      "184.185.166.27",
      "54.185.121.52",
      "45.55.86.49",
      "67.205.174.218",
      "104.238.75.211",
      "65.70.71.18",
      "165.138.225.250",
      "72.12.204.29",
      "100.42.95.68",
      "64.20.48.83",
      "68.190.17.93",
      "96.27.165.242",
      "71.14.241.170",
      "192.241.150.54",
      "104.236.47.73",
      "104.207.135.140",
      "73.202.155.44",
      "35.197.128.104",
      "206.105.116.13",
      "165.138.124.4",
      "38.123.201.17",
      "104.236.55.48",
      "192.95.18.162",
      "104.236.54.196",
      "4.31.64.69",
      "50.254.42.84",
      "23.89.159.84",
      "209.66.199.30",
      "172.221.243.80"
    ];

    var address = 'https://www.cannabisreports.com/api/v1.0/flowers?page=' + i;
    var t = Date.now();

    phantom.setProxy(host, port, 'manual', '', '');
    page.open(address, function(status) {
        if (status !== 'success') {
            console.log('FAIL to load the address');
            host_num = host_num + 1;
            host = host_array[host_num];
            console.log("Rate limit!");
            if(host != 'undefined') {
              console.log(host_num + "New host: "+ host);
              phantom.setProxy(host, port, 'manual', '', '');
              i--;
            } else {
              phantom.exit();
            }
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
                var textPath = "/Applications/XAMPP/xamppfiles/htdocs/cr_json/flowers/"+i+".json";
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

loadpage(623, 765);

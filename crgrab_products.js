"use strict";
var page = require('webpage').create(),
    system = require('system'),
    fs = require('fs'),
    host, port, address, host_array, port_array, host_random;

    page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';

    var host_num = 0;
    host = "94.177.225.237";
    port = "3128";

    var loadpage = function (i, max){
    if (i === max) {
        phantom.exit();
        return;
    }
    host_array = [
      "94.177.225.237",
      "193.193.68.2",
      "94.73.235.49",
      "177.194.142.213",
      "93.104.208.147",
      "51.15.49.7",
      "149.202.94.120",
      "31.3.242.140",
      "77.120.102.84",
      "185.82.217.50",
      "138.68.140.197",
      "35.162.238.140",
      "187.58.65.225",
      "41.87.86.51",
      "46.105.214.133",
      "45.32.103.86",
      "201.33.206.246",
      "189.1.164.112",
      "47.52.5.8",
      "187.1.51.122",
      "67.205.170.249",
      "46.36.65.10",
      "186.3.44.232",
      "144.217.104.145",
      "177.69.237.53",
      "200.108.138.118",
      "144.217.53.7",
      "86.238.220.148",
      "149.56.201.254",
      "158.69.170.220",
      "190.117.188.223",
      "190.12.9.30",
      "45.6.37.241",
      "198.50.219.239"
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
                var textPath = "/Applications/XAMPP/xamppfiles/htdocs/cr_json/products/"+i+".json";
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

loadpage(251, 1059);

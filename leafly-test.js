"use strict";
var page = require('webpage').create(),
    system = require('system'),
    fs = require('fs'),
    host, port, address, host_array, port_array, host_random;

    page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';

    var host_num = 0;
    host = "165.227.124.179";
    port = "3128";


    //var address = 'https://www.cannabisreports.com/api/v1.0/extracts?page=' + i;
    var address = 'https://www.leafly.com/hybrid/100-og';
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

            // STRAIN TYPE
            var url = address;
            //var type = url.replace('https://www.leafly.com/', '').replace('/'+slug+'/');


            // STRAIN NAME
            var title = page.evaluate(function() {
                return [].map.call(document.querySelectorAll('h1'), function(name) {
                    return name.innerText;
                });
            });
            console.log(title.join('\n'));

            // STRAIN DESCRIPTION
            var description = page.evaluate(function() {
                return [].map.call(document.querySelectorAll('.l-body-content .description p'), function(desc_txt) {
                    return desc_txt.innerText;
                });
            });
            console.log(description.join('\n'));
            console.log(title.join('\n'));

            // FLAVORS
            var flavors = page.evaluate(function() {
                return [].map.call(document.querySelectorAll('.strain__flavors li div div span'), function(flavor_text) {
                    return flavor_text.innerText;
                });
            });
            console.log(flavors.join('\n'));

            // LINEAGE
            var lineage = page.evaluate(function() {
                return [].map.call(document.querySelectorAll('.strain__lineage ul li div a img'), function(lineage_txt) {
                    return lineage_txt.getAttribute('alt');
                });
            });
            console.log(lineage.join('\n'));

            // Grow Metrics
            var grow = page.evaluate(function() {
                return [].map.call(document.querySelectorAll('.strain__data .selected'), function(grow_data) {
                    return grow_data.innerText;
                });
            });
            console.log(grow.join(', '));
            console.log('\n');

            // strain attributes

            var effects_names = page.evaluate(function() {
                return [].map.call(document.querySelectorAll('.m-attr-label'), function(effect_name) {
                    return effect_name.innerText;
                });
            });
            console.log(effects_names.join(', '));

            var effects_num = page.evaluate(function() {
                return [].map.call(document.querySelectorAll('.m-attr-bar'), function(effect_num) {
                    return effect_num.getAttribute('style');
                });
            });
            console.log(effects_num.join(', '));


            console.log('Success ');


            var results = {
              name: title.join(''),
              description: description.join(''),
              flavors: flavors.join(', '),
              lineage: lineage.join(', '),
              grow_metrics: grow.join(', '),
              attributes_title: effects_names.join(', '),
              attributes_num: effects_num.join(', ')
            };

            var json_output = JSON.stringify(results);

            //var captcha_check = jsonSource.search("One more step");
            //var limit_check = jsonSource.search("You have exceeded your rate limit.");
            //if(limit_check === -1 && captcha_check === -1) {
              try {
                var textPath = "/Applications/XAMPP/xamppfiles/htdocs/leafly_data/strains/100-og2.json";
                fs.write(textPath, json_output, 'w');
              } catch(e) {
                console.log(e);
              }
              phantom.exit();
            //} else {
              //host_num = host_num + 1;
              //host = host_array[host_num];
              //console.log("Rate limit!");
              //console.log(host_num + " New host: " + host);
              //phantom.setProxy(host, port, 'manual', '', '');
              //i--;
            //}
        }

    });

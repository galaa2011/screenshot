var webpage = require('webpage');
var page = webpage.create();
page.open('http://sinaluming.com/z/1754/', function (status) {
  var data;
  if (status === 'fail') {
    console.log('open page fail!');
  } else {
    page.render('2.png')
  }
  page.close();
  phantom.exit();
});

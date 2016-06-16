var tabletop = require('tabletop');
var _ = require('underscore');
var koa = require('koa');
var app = koa();

app.use(function *(){

  var ctx = this;
  var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=1ujZWyJk4CftjJtZqPINWhbtKwCBR8QMQ2d3uMoK7zvU&output=html';

  yield new Promise((resolve, reject) => {
    tabletop.init({
      key: publicSpreadsheetUrl,
      callback: function (data) {

        var where = _.chain(data)
          .filter(x => new Date(x.Date) <= Date.now())
          .sortBy('Date')
          .last()
          .value();

        ctx.body = where.Location + ', ' + where.Country;

        resolve();
      },
      simpleSheet: true
    });
  });
});

app.listen(process.env.PORT || 3000);

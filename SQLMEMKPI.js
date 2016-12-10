var chartDataSource2 = [
    { hora: '12:25', Oceania: 100 },
    { hora: '12:26', Oceania: 150 },
    { hora: '12:27', Oceania: 160 },
    { hora: '12:28', Oceania: 170 },
    { hora: '12:29', Oceania: 200 },
    { hora: '12:30', Oceania: 225 },
    { hora: '12:31', Oceania: 300 }
];

var chartDataSource3 = [
    { hora: '12:25', Oceania: 99.9 },
    { hora: '12:26', Oceania: 99.8 },
    { hora: '12:27', Oceania: 99.8 },
    { hora: '12:28', Oceania: 99.7 },
    { hora: '12:29', Oceania: 99.9 },
    { hora: '12:30', Oceania: 100 },
    { hora: '12:31', Oceania: 99.9 }
];

var currentSQLMEMMeasure;

var customStoreSQLMEM = new DevExpress.data.CustomStore({
    load: function (loadOptions) {
        var d = $.Deferred();
        $.getJSON('http://localhost:3000/sqlmem/').done(function (data) {
            d.resolve(data, { totalCount: data.length });
            currentSQLMEMMeasure = data[data.length-1].value;
        });
        return d.promise();
    }
});

var gridDataSourceConfiguration = {
    store: customStoreSQLMEM
};


setInterval(function(){
  customStoreSQLMEM.load();

  $("#chartContainer").dxChart({
    dataSource: gridDataSourceConfiguration,
    commonSeriesSettings: {
        argumentField: 'measuredatetime'
    },
    series: [
        { name: 'SQL MEM', valueField: 'value', showInLegend: false }
    ]
});


$("#circularGaugeContainer").dxCircularGauge({
  title: {
      text: 'SQL RAM',
      font: {
          size: 30,
          weight: 400
      },
      subtitle: {
          text: 'Mb',
          font: {
              size: 15,
              weight: 100
          }
      }
  },
    scale: {
        startValue: 0,
        endValue: 16
    },
    value: Number(currentSQLMEMMeasure),
    subvalues: [8,15],
    valueIndicator: {type: 'rangeBar'},
    //subvalueIndicator: {type: 'textCloud'},
    rangeContainer: {
        ranges: [
            { startValue: 0, endValue: 12,  color: 'green' },
            { startValue: 12,   endValue: 16, color: 'red' }
        ]
    }
});


}, 5000);

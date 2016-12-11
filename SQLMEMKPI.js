var serverMemory;
var currentSQLMEMMeasure;

var customStoreSQLMEM = new DevExpress.data.CustomStore({
    load: function (loadOptions) {
        var d = $.Deferred();
        $.getJSON('http://localhost:8080/Dashboard/?event_name=sqlmem&num=10').done(function (data) {
            d.resolve(data.sqlmem, { totalCount: data.length });
            currentSQLMEMMeasure = data.sqlmem[data.sqlmem.length-1].usage;
            serverMemory = data.sqlmem[data.sqlmem.length-1].total;
        });
        return d.promise();
    }
});

var gridDataSourceConfiguration = {
    store: customStoreSQLMEM
};


setInterval(function(){
  customStoreSQLMEM.load();
  $("#last-measure-mem").html("Last Measure " + currentSQLMEMMeasure);

  $("#chartContainerSQLMEM").dxChart({
    dataSource: gridDataSourceConfiguration,
    commonSeriesSettings: {
        argumentField: 'measuredatetime'
    },
    series: [
        { name: 'SQL MEM', valueField: 'usage', showInLegend: false }
    ],
    argumentAxis:  {
      label: {
        overlappingBehavior: {
          mode: "rotate",
          rotationAngle: 270
        }
      }
    },
    valueAxis: [
      {
        constantLines: [
          {
            color: "#FF0000",
            value: 10390,
            label: {
              text: 10390,
              visible: true,
              position: "inside",
              horizontalAlignment: "right"
            }
          }
        ]
      }
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
        endValue: Number(serverMemory)
    },
    value: Number(currentSQLMEMMeasure),
    subvalues: [8,15],
    valueIndicator: {type: 'rangeBar'},
    //subvalueIndicator: {type: 'textCloud'},
    rangeContainer: {
        ranges: [
            { startValue: 0, endValue: Number(serverMemory)*0.8,  color: 'green' },
            { startValue:  Number(serverMemory)*0.8, endValue: Number(serverMemory), color: 'red' }
        ]
    }
});


}, 5000);

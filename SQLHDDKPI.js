var currentSQLHDDMeasure;
var totalSpaceHDD;

var customStoreSQLHDD = new DevExpress.data.CustomStore({
    load: function (loadOptions) {
        var d = $.Deferred();
        $.getJSON('http://localhost:8080/Dashboard/?event_name=sqlhdd&num=10').done(function (data) {
            d.resolve(data.sqlhdd, { totalCount: data.sqlhdd.length });
            currentSQLHDDMeasure = data.sqlhdd[data.sqlhdd.length-1].usage;
            totalSpaceHDD = data.sqlhdd[data.sqlhdd.length-1].total;
        });
        return d.promise();
    }
});



setInterval(function(){
  customStoreSQLHDD.load();
    $("#last-measure-hdd").html("Last Measure " + currentSQLHDDMeasure);

  $("#chartContainerSQLHDD").dxChart({
      dataSource: customStoreSQLHDD,
      commonSeriesSettings: {
          argumentField: 'measuredatetime'
      },
      series: [
          { name: 'SQL HDD', valueField: 'usage', showInLegend: false }
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
              value: Number(totalSpaceHDD)*0.8,
              label: {
                text: Number(totalSpaceHDD)*0.8,
                visible: true,
                position: "inside",
                horizontalAlignment: "right"
              }
            }
          ]
        }
      ]
  });

$("#circularGaugeContainerSQLHDD").dxCircularGauge({
  title: {
      text: 'SQL HDD',
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
        endValue: Number(totalSpaceHDD)
    },
    value: Number(currentSQLHDDMeasure),
    subvalues: [8,15],
    valueIndicator: {type: 'rangeBar'},
    //subvalueIndicator: {type: 'textCloud'},
    rangeContainer: {
        ranges: [
            { startValue: 0, endValue: Number(totalSpaceHDD)*0.8,  color: 'green' },
            { startValue: Number(totalSpaceHDD)*0.8,   endValue: Number(totalSpaceHDD), color: 'red' }
        ]
    }
});


}, 5000);

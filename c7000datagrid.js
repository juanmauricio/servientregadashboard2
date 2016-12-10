
var c7000CustomStore = new DevExpress.data.CustomStore({
    load: function (loadOptions) {
        var d = $.Deferred();
        $.getJSON('http://localhost:3000/c7000').done(function (data) {
            d.resolve(data, { totalCount: data.length });
            var enclosureName = data.c7000[0].value.EnclosureName;
            var c7000status = data.c7000[0].value.Status;
            var c7000EnclosureType = data.c7000[0].value.EnclosureType;
            var c7000PartNumber = data.c7000[0].value.PartNumber;

/*
            var c7000IDstatus = data.Status.InternalData;
            var c7000REDstatus = data.Status.Redundancy;
            var c7000OAstatus = data.Status.OnboardAdministrator;
            var c7000CSstatus = data.Status.CoolingSubsystem;
*/

            document.getElementById("enclosureName").innerHTML = enclosureName;
            document.getElementById("statusC7000").innerHTML = c7000status;
            document.getElementById("c7000EnclosureType").innerHTML = c7000EnclosureType;
            document.getElementById("c7000PartNumber").innerHTML = c7000PartNumber;
/*
            if (c7000status == "OK")
            {
              document.getElementById("iconC7000Class").className = "fa fa-thumbs-up fa-3x";
            }else {
              document.getElementById("iconC7000Class").className = "fa fa-thumbs-down fa-3x";
            };

            document.getElementById("c7000IDstatus").innerHTML = "Internal Data: " + c7000IDstatus;
            document.getElementById("c7000REDstatus").innerHTML = "Redundancy: " + c7000REDstatus;
            document.getElementById("c7000OAstatus").innerHTML = "Onboard Administrator: " + c7000OAstatus;
            document.getElementById("c7000CSstatus").innerHTML = "Cooling Subsystem: " + c7000CSstatus;
*/

        });
        return d.promise();
    }
});


var c7000Servers = new DevExpress.data.CustomStore({
    load: function (loadOptions) {
        var d = $.Deferred();
        $.getJSON('http://localhost:3000/servers').done(function (data) {
            d.resolve(data.blade, { totalCount: data.blade.length });
        });
        return d.promise();
    }
});


setInterval(function(){
  c7000Servers.load();
  c7000CustomStore.load();

var gdsc7000Servers = {
    store: c7000Servers
};


$(function () {
    $("#gridContainerC7000").dxDataGrid({
        dataSource: gdsc7000Servers,
        columnAutoWidth: true,
        columns: [
			{ dataField: 'name', width: 125, caption: "Name" },
            { dataField: 'value.ManagementProcessor', width: 125, caption: "Management  Processor" },
            { dataField: 'value.ProductName', width: 125, caption: "Product Name" },
            { dataField: 'value.InternalData', width: 125, caption: "Internal Data" },
            { dataField: 'value.IOConfiguration', width: 125, caption: "IO Configuration" },
            { dataField: 'value.Power', width: 75, caption: "Power" },
            { dataField: 'value.Cooling', width: 75, caption: "Cooling" },
            { dataField: 'value.DeviceFailure', width: 125, caption: "Device Failure" },
            { dataField: 'value.DeviceDegraded', width: 125, caption: "Device Degraded" },
            { dataField: 'value.iLONetwork', width: 125, caption: "ILO Network" }
        ],
        columnChooser: { enabled: false },
        allowColumnReordering: false,
        editing: {
            allowUpdating: false,
            mode: 'row',
            allowAdding: false,
            allowDeleting: false
        },
        filterRow: { visible: false },
        searchPanel: { visible: false },
        selection: { mode: 'none' }
    });
});

}, 5000);
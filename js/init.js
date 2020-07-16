var toggleZeekStatusSelector = $("#zeek-toggle");
var toggleSuricataStatusSelector = $("#suricata-toggle");
var toggleFilebeatStatusSelector = $("#filebeat-toggle");
var zeekTableBodySelector = $("#zeek-process-status");
var suricataTableBodySelector = $("#suricata-process-status");
var filebeatTableBodySelector = $("#filebeat-process-status");
var zeekTableSelector = $("#zeek-status-table");
var suricataTableSelector = $("#suricata-status-table");
var filebeatTableSelector = $("#filebeat-status-table");

function formatAsDatatable(elem){
    $(document).ready( function () {
        $(elem).DataTable({
            pageLength:5,
            lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "All"]],
            autoWidth: true
        });
    } );
}

function updateZeekStatusComponents(callback) {
    var pidBadgeClass = "dark";
    $.get("/api/zeek/process", function(data, status){
        if (data["status"] === undefined){
            //TODO err
            return;
        }
        if(data["status"]["running"]){
            pidBadgeClass = "success";
            $(toggleZeekStatusSelector).bootstrapToggle('on')
        } else {
            $(toggleZeekStatusSelector).bootstrapToggle('off')
        }
        if(data["status"]["subprocesses"]){
            data["status"]["subprocesses"].forEach(function(subprocess){
                var process_inf = "";
                if(subprocess['process_type'] == "logger"){
                    process_inf = "A logger is an optional Zeek process that receives log messages from the rest of the " +
                    "nodes in the cluster using the Zeek communications protocol.";
                }
                else if(subprocess['process_type'] == "manager"){
                    process_inf = "The manager receives log messages from the rest of the nodes in the cluster and " +
                    "aggregates them into a single log instead of many discrete logs.";
                }
                else if(subprocess['process_type'] == "proxy"){
                    process_inf = "A proxy is a Zeek process that may be used to offload data storage or any arbitrary " +
                    "workload. A cluster may contain multiple proxy nodes.";
                }
                else if(subprocess['process_type'] == "worker"){
                    process_inf = "The worker is the Zeek process that sniffs network traffic and does protocol analysis on " +
                    "the reassembled traffic streams. Most of the work of an active cluster takes place on the workers and as " +
                    "such, the workers typically represent the bulk of the Zeek processes that are running in a cluster.";
                }
                $(zeekTableBodySelector).append("<tr>"+
                    "<td><b>" + subprocess['process_name'] + "</b></td>" +
                    "<td>" + '<span class="badge badge-pill badge-info" data-toggle="tooltip" data-placement="right" title="'+ process_inf +'">' + subprocess['process_type'] + "</span></td>" +
                    '<td><span class="badge badge-pill badge-' + pidBadgeClass + '">' + subprocess["pid"] + "</span></td>" +
                "</tr>")
            })
        }
        formatAsDatatable(zeekTableSelector)
        if (callback !== undefined){
            callback();
        }
    });
}
function updateSuricataStatusComponents(callback) {
    var pidBadgeClass = "dark";
    $.get("/api/suricata/process", function(data, status){
        if (data["status"] === undefined){
            //TODO err
            return;
        }
        if(data["status"]["running"]){
            pidBadgeClass = "success";
            $(toggleSuricataStatusSelector).bootstrapToggle('on')
        } else {
            $(toggleSuricataStatusSelector).bootstrapToggle('off')
        }
        if(data["status"]["pid"]){
            $(suricataTableBodySelector).append("<tr>" +
                "<td><b>Suricata</b></td>"+
                "<td>Main</td>"+
                '<td><span class="badge badge-pill badge-' + pidBadgeClass + '">' + data["status"]["pid"] + "</span></td>" +
            "</tr>")
        }
        formatAsDatatable(suricataTableSelector)
        if (callback !== undefined){
            callback();
        }
    });
}

function updateFilebeatStatusComponents(callback) {
    var pidBadgeClass = "dark";
    $.get("/api/filebeat/process", function(data, status){
        if (data["status"] === undefined){
            //TODO err
            return;
        }
        if(data["status"]["running"]){
            pidBadgeClass = "success";
            $(toggleFilebeatStatusSelector).bootstrapToggle('on')
        } else {
            $(toggleFilebeatStatusSelector).bootstrapToggle('off')
        }
        if(data["status"]["pid"]){
            $(filebeatTableBodySelector).append("<tr>" +
                "<td><b>Filebeat</b></td>"+
                "<td>Main</td>"+
                '<td><span class="badge badge-pill badge-' + pidBadgeClass + '">' + data["status"]["pid"] + "</span></td>" +
            "</tr>")
        }
        formatAsDatatable(filebeatTableSelector)
        if (callback !== undefined){
            callback();
        }
    });
}

function initialize(){
    updateZeekStatusComponents(function(){
        addToggleZeekStatusEventHandler();
        $('[data-toggle="tooltip"]').tooltip()
    });
    updateSuricataStatusComponents(function(){
        addToggleSuricataStatusEventHandler();
    });
    updateFilebeatStatusComponents(function(){
        addToggleFilebeatStatusEventHandler();
    });
}

initialize();


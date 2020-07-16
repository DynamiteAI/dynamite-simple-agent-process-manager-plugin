var toggleZeekStatusSelector = $("#zeek-toggle");
var toggleSuricataStatusSelector = $("#suricata-toggle");
var toggleFilebeatStatusSelector = $("#filebeat-toggle");

var zeekLoadingSelector = $("#zeek-loading");
var suricataLoadingSelector = $("#suricata-loading");
var filebeatLoadingSelector = $("#filebeat-loading");

function retrieveZeekProcessStatus(callback) {
    $.get("/api/zeek/process", function(data) {
        if (data["status"] === undefined) {
            return;
        }
        if (callback !== undefined) {
            callback(data);
        }
    });
}

function retrieveSuricataProcessStatus(callback) {
    $.get("/api/suricata/process", function(data) {
        if (data["status"] === undefined) {
            return;
        }
        if (callback !== undefined) {
            callback(data);
        }
    });
}

function retrieveFilebeatProcessStatus(callback) {
    $.get("/api/filebeat/process", function(data) {
        if (data["status"] === undefined) {
            return;
        }
        if (callback !== undefined) {
            callback(data);
        }
    });
}

function addToggleZeekStatusEventHandler() {
    $(toggleZeekStatusSelector).change(function(event) {
        $(toggleZeekStatusSelector).bootstrapToggle('disable');
        $(zeekLoadingSelector).show();
        retrieveZeekProcessStatus(function(data) {
            if (data["status"] === undefined) {
                //TODO err
                return;
            }
            if (data["status"]["running"]) {
                $.ajax({
                    type: "POST",
                    url: "/api/zeek/process/stop",
                    success: function() {
                        retrieveZeekProcessStatus(
                            function(data) {
                                if (data["status"]["running"]) {
                                    $(toggleZeekStatusSelector).bootstrapToggle('on')
                                    location.reload();
                                } else {
                                    $(toggleZeekStatusSelector).bootstrapToggle('off')
                                    location.reload();
                                }
                            });
                        $(toggleZeekStatusSelector).bootstrapToggle('enable');
                    },
                });
            } else {
                $.ajax({
                    type: "POST",
                    url: "/api/zeek/process/start",
                    success: function() {
                        retrieveZeekProcessStatus(
                            function(data) {
                                if (data["status"]["running"]) {
                                    $(toggleZeekStatusSelector).bootstrapToggle('on')
                                    location.reload();

                                } else {
                                    $(toggleZeekStatusSelector).bootstrapToggle('off')
                                    location.reload();
                                }
                            });
                        $(toggleZeekStatusSelector).bootstrapToggle('enable');
                    },
                });
            }
        })
    });
}

function addToggleSuricataStatusEventHandler() {
    $(toggleSuricataStatusSelector).change(function(event) {
        $(toggleSuricataStatusSelector).bootstrapToggle('disable');
        $(suricataLoadingSelector).show();
        retrieveSuricataProcessStatus(function(data) {
            if (data["status"] === undefined) {
                //TODO err
                return;
            }
            if (data["status"]["running"]) {
                $.ajax({
                    type: "POST",
                    url: "/api/suricata/process/stop",
                    success: function() {
                        retrieveSuricataProcessStatus(
                            function(data) {
                                if (data["status"]["running"]) {
                                    $(toggleSuricataStatusSelector).bootstrapToggle('on')
                                    location.reload();
                                } else {
                                    $(toggleSuricataStatusSelector).bootstrapToggle('off')
                                    location.reload();
                                }
                            });
                        $(toggleSuricataStatusSelector).bootstrapToggle('enable');
                    },
                });
            } else {
                $.ajax({
                    type: "POST",
                    url: "/api/suricata/process/start",
                    success: function() {
                        retrieveSuricataProcessStatus(
                            function(data) {
                                if (data["status"]["running"]) {
                                    $(toggleSuricataStatusSelector).bootstrapToggle('on')
                                    location.reload();

                                } else {
                                    $(toggleSuricataStatusSelector).bootstrapToggle('off')
                                    location.reload();
                                }
                            });
                        $(toggleSuricataStatusSelector).bootstrapToggle('enable');
                    },
                });
            }
        })
    });
}

function addToggleFilebeatStatusEventHandler() {
    $(toggleFilebeatStatusSelector).change(function(event) {
        $(toggleFilebeatStatusSelector).bootstrapToggle('disable');
        $(filebeatLoadingSelector).show();
        retrieveFilebeatProcessStatus(function(data) {
            if (data["status"] === undefined) {
                //TODO err
                return;
            }
            if (data["status"]["running"]) {
                $.ajax({
                    type: "POST",
                    url: "/api/filebeat/process/stop",
                    success: function() {
                        retrieveFilebeatProcessStatus(
                            function(data) {
                                if (data["status"]["running"]) {
                                    $(toggleFilebeatStatusSelector).bootstrapToggle('on')
                                    location.reload();
                                } else {
                                    $(toggleFilebeatStatusSelector).bootstrapToggle('off')
                                    location.reload();
                                }
                            });
                        $(toggleFilebeatStatusSelector).bootstrapToggle('enable');
                    },
                });
            } else {
                $.ajax({
                    type: "POST",
                    url: "/api/filebeat/process/start",
                    success: function() {
                        retrieveFilebeatProcessStatus(
                            function(data) {
                                if (data["status"]["running"]) {
                                    $(toggleFilebeatStatusSelector).bootstrapToggle('on')
                                    location.reload();

                                } else {
                                    $(toggleFilebeatStatusSelector).bootstrapToggle('off')
                                    location.reload();
                                }
                            });
                        $(toggleFilebeatStatusSelector).bootstrapToggle('enable');
                    },
                });
            }
        })
    });
}
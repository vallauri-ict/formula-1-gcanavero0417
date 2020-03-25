﻿"use strict;"

$(function () {
    $("#loadDrivers").on("click", function () {
        let _richiesta=$.ajax({
            url: "api/drivers",
            type: "GET",
            data: "",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: "json",
            timeout: 5000,
        });

        _richiesta.done(loadTable);
        _richiesta.fail(error);
    });
    $("#loadTeams").on("click", function () {
        let _richiesta =$.ajax({
            url: "api/Teams",
            type: "GET",
            data: "",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: "json",
            timeout: 5000,
        });

        _richiesta.done(loadTable);
        _richiesta.fail(error);
    });
    $("#loadCountries").on("click", function () {
        let _richiesta =$.ajax({
            url: "api/Countries",
            type: "GET",
            data: "",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: "json",
            timeout: 5000,
        });

        _richiesta.done(loadTable);
        _richiesta.fail(error);
    });

    function loadTable(data) {
        let tbl_body = "";
        let tbl_head = "";
        let odd_even = false;
        let first = true;
        $.each(data, function () {
            let tbl_row = "";

            $.each(this, function (k, v) {
                if (first) {
                    tbl_head += "<th>" + k + "</th>";
                }

                if (({}).constructor === v.constructor) //check if json
                {
                    for (var key in v) {
                        if (v.hasOwnProperty(key)) {
                            tbl_row += "<td>" + v[key] + "</td>";
                            break;
                        }
                    }
                }
                else
                    tbl_row += "<td>" + v + "</td>";
            });
            first = false;
            tbl_body += "<tr class=\"" + (odd_even ? "odd" : "even") + "\">" + tbl_row + "</tr>";
            odd_even = !odd_even;
        });
        $("#table thead").html(tbl_head);
        $("#table tbody").html(tbl_body);
    };
});

function error(jqXHR, testStatus, strError) {
    if (jqXHR.status == 0)
        alert("server timeout");
    else if (jqXHR.status == 200)
        alert("Formato dei dati non corretto : " + jqXHR.responseText);
    else
        alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
};
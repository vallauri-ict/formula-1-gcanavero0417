﻿"use strict;"

$(function () {
    let _wrapper = $("#wrapper");
    $("#loadDrivers").on("click", function () {
        richiesta("/drivers/simple", function (data) {
            _wrapper.html("<fieldset><h1>F1 2020 Drivers</h1></fieldset>");
            let _div=$("<div>")
                .css({"display": "grid",
                    "grid-template-columns": "auto auto auto"})
                .appendTo(_wrapper);
            for(let driver of data)
            {
                //#region generazione driver
                let _fs=$("<fieldset>")
                .addClass("driver")
                .data("id",driver.id)
                .data("open","false")
                .appendTo(_div);

                $("<span>")
                .html(driver.firstname)
                .addClass("firstname")
                .appendTo(_fs);

                $("<span>")
                .html(driver.lastname)
                .addClass("lastname")
                .appendTo(_fs);

                $("<span>")
                .html(driver.countrycode)
                .addClass("country")
                .appendTo(_fs);

                $("<hr>")
                .addClass("hr")
                .appendTo(_fs);

                $("<img>")
                .prop("src",driver.img)
                .addClass("img")
                .appendTo(_fs);
                //#endregion generazione driver
            }
            $("#wrapper div").on("click",".driver",function(){
                let _fs=$(this);
                if(_fs.data("open")=="false")
                {
                    //reset other opened fieldsets   
                    _div.children("fieldset")
                    .data("open","false")
                    .css("width","310px")
                    .find(".open").remove();

                    _fs.data("open","true");
                    richiesta("/drivers/"+_fs.data("id"),function(driver){                     
                        _fs.css("width","500px");
                        let date=new Date(driver.dob);
                        $("<span>")
                        .html("Dob: "+date.getDay()+'/'+date.getMonth()+'/'+date.getFullYear())
                        .addClass("open")
                        .css({
                            "position":"absolute",
                            "top": "22%",
                            "left": "2%"
                        }).appendTo(_fs);
                        $("<span>")
                        .html("Place of birth: "+driver.placeOfBirthday)
                        .addClass("open")
                        .css({
                            "position":"absolute",
                            "top": "28%",
                            "left": "2%"
                        }).appendTo(_fs);
                    });
                }else
                {
                    _fs.data("open","false")
                    .css("width","310px")
                    .find(".open").remove();
                }
            })
        });
    });

    $("#loadTeams").on("click", function () {
        
        richiesta("/teams/simple", function (data) {
            _wrapper.html("<fieldset><h1>F1 2020 Teams</h1></fieldset>");
            let _div=$("<div>")
                .css({"display": "grid",
                    "grid-template-columns": "auto auto"})
                .appendTo(_wrapper);
            for(let team of data)
            {
                //#region generazione team
                let _fs=$("<fieldset>")
                .addClass("team")
                .data("id",team.id)
                .data("open","false")
                .appendTo(_div);

                $("<span>")
                .html(team.name)
                .data("name",team.name)
                .addClass("name")
                .appendTo(_fs);

                $("<span>")
                .html(team.country)
                .addClass("country")
                .appendTo(_fs);

                $("<hr>")
                .addClass("hr")
                .appendTo(_fs);

                $("<span>")
                .html(team.firstdrivername)
                .appendTo(
                    $("<fieldset>")
                    .addClass("firstDriver")
                    .data("id",team.firstdriverid)
                    .data("open","false")
                    .appendTo(_fs));

                $("<span>")
                .html(team.seconddrivername)
                .appendTo(
                    $("<fieldset>")
                    .addClass("secondDriver")
                    .data("id",team.seconddriverid)
                    .data("open","false")
                    .appendTo(_fs));

                $("<img>")
                .prop("src",team.img)
                .addClass("img")
                .appendTo(_fs);

                $("<img>")
                .prop("src",team.logo)
                .addClass("logo")
                .appendTo(_fs);
                //#endregion generazione team
            }
            _div.on("click","fieldset.team",function(){
                let _fs=$(this);
                if(_fs.data("open")=="false")
                {
                    //reset other opened fieldsets   
                    _div.find("fieldset")
                    .data("open","false")
                    .css("height","")
                    .find(".open").remove();
                    _div.find(".team fieldset")
                    .css("height","");

                    _div.find(".name").each(function(){
                        $(this).html($(this).data("name"));
                    });

                    _fs.data("open","true");
                    richiesta("/teams/"+_fs.data("id"),function(team){                     
                        //_fs.css("width","100%");
                        _fs.css("height","350px");

                        _fs.children(".name")
                        .html(team.fullTeamName);
                        
                        $("<img>")
                        .prop("src",team.secondDriver.img)
                        .addClass("img")
                        .addClass("open")
                        .appendTo(_fs.children(".firstDriver").css("height","30%"));
                        $("<img>")
                        .prop("src",team.firstDriver.img)
                        .addClass("img")
                        .addClass("open")
                        .appendTo(_fs.children(".secondDriver").css("height","30%"));
                        $("<span>")
                        .html(team.firstDriver.firstname)
                        .addClass("open")
                        .appendTo(_fs.children(".firstDriver"));
                        $("<span>")
                        .html(team.secondDriver.firstname)
                        .addClass("open")
                        .appendTo(_fs.children(".secondDriver"));
                        
                        $("<span>")
                        .html("Power unit: "+team.powerUnit)
                        .addClass("open")
                        .addClass("powerUnit")
                        .appendTo(_fs);
                        $("<span>")
                        .html("Technical chief: "+team.technicalChief)
                        .addClass("open")
                        .addClass("technicalChief")
                        .appendTo(_fs);
                        $("<span>")
                        .html("Chassis: "+team.chassis)
                        .addClass("open")
                        .addClass("chassis")
                        .appendTo(_fs);
                    });
                }else
                {
                    _fs.data("open","false")
                    .css("height","")
                    .find(".open").remove();

                    _fs.children("fieldset").css("height","");
                }
            })
        });
    });

    $("#loadCircuits").on("click", function () {
        richiesta("/circuits/", function (data) {
            _wrapper.html("<fieldset><h1>F1 2020 Circuits</h1></fieldset>");
            let _div=$("<div>")
                .css({"display": "grid",
                    "grid-template-columns": "auto auto"})
                .appendTo(_wrapper);
            for(let circuit of data)
            {
                //#region generazione team
                let _fs=$("<fieldset>")
                .addClass("circuit")
                .data("id",circuit.id)
                .data("open","false")
                .appendTo(_div);

                $("<span>")
                .html(circuit.name)
                .addClass("name")
                .appendTo(_fs);
                $("<span>")
                .html(circuit.country.countryName)
                .addClass("country")
                .appendTo(_fs);
                $("<span>")
                .html((circuit.length/1000)+"km")
                .addClass("length")
                .appendTo(_fs);
                $("<span>")
                .html("Laps: "+circuit.nLaps)
                .addClass("nLaps")
                .appendTo(_fs);
                $("<hr>")
                .addClass("hr")
                .appendTo(_fs);
                $("<img>")
                .prop("src",circuit.img)
                .addClass("img")
                .appendTo(_fs);
                //#endregion generazione circuit
            }
        });
    });
});

function richiesta(parameters,callbackFunction) {
    let _richiesta = $.ajax({
        url: "api" + parameters,
        type: "GET",
        data: "",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "json",
        timeout: 5000,
    });

    _richiesta.done(callbackFunction);
    _richiesta.fail(error);
}

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
function loadElement(data) {
    console.log(data);
    let tbl_body = "";
    let tbl_head = "";

    $.each(data, function (k, v) {
        tbl_head += "<th>" + k + "</th>";

        if (({}).constructor === v.constructor) //check if json
        {
            for (var key in v) {
                if (v.hasOwnProperty(key)) {
                    tbl_body += "<td>" + v[key] + "</td>";
                    break;
                }
            }
        }
        else
            tbl_body += "<td>" + v + "</td>";
    });
    $("#table thead").html(tbl_head);
    $("#table tbody").html(tbl_body);
};

function error(jqXHR, testStatus, strError) {
    $("#table thead").html("");
    $("#table tbody").html("Impossibile trovare la risorsa richiesta, maggiori informazioni in console.");
    if (jqXHR.status == 0)
        console.log("server timeout");
    else if (jqXHR.status == 200)
        console.log("Formato dei dati non corretto : " + jqXHR.responseText);
    else
        console.log("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
};
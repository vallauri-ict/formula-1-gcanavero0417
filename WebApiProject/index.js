"use strict;"

$(function () {
    let _wrapper = $("#wrapper");
    $("#loadDrivers").on("click", function () {
        richiesta("/Drivers", function (data) {
            _wrapper.html("<fieldset><h1>F1 2020 Drivers</h1></fieldset>");
            let _div=$("<div>")
                .css({"display": "grid",
                    "grid-template-columns": "auto auto auto"})
                .appendTo(_wrapper);
            for(let driver of data)
            {
                //#region generazione driver
                let _fs=$("<fieldset>")
                .css({"border-top-right-radius": "25px",
                    "border": 0,
                    "border-top": "solid 2px #15151e",
                    "border-right": "solid 2px #15151e",
                    "position":"relative",
                    "width":"310px",
                    "height":"280px",
                    "margin": "20px",
                    "transition": "width 1s,height 1s"
                })
                .data("id",driver.ID)
                .data("open","false")
                .appendTo(_div);
                $("<span>")
                .html(driver.Firstname)
                .css({
                    "position":"absolute",
                    "top": "2%",
                    "left": "2%"
                }).appendTo(_fs);
                $("<span>")
                .html(driver.Lastname)
                .css({
                    "position":"absolute",
                    "top": "8%",
                    "left": "2%",
                    "font-family": "F1-bold",
                    "font-size":"1.2em"
                }).appendTo(_fs);
                $("<span>")
                .html(driver.Country.CountryCode)
                .css({
                    "position":"absolute",
                    "top": "5%",
                    "right": "4%",
                    "font-size":"1.3em"
                }).appendTo(_fs);
                $("<hr>")
                .css({
                    "position":"absolute",
                    "top": "18%",
                    "left":"2%",
                    "width": "94%"
                }).appendTo(_fs);
                $("<img>")
                .prop("src",driver.Img)
                .css({
                    "position":"absolute",
                    "bottom": "2%",
                    "right": "4%",
                    "width": "205px"
                }).appendTo(_fs);
                //#endregion generazione driver
            }
            $("#wrapper div").on("click","fieldset",function(){
                let _fs=$(this);
                if(_fs.data("open")=="false")
                {
                    _fs.data("open","true");
                    richiesta("/Drivers/"+_fs.data("id"),function(driver){
                        _fs.css("width","500px");
                        $("<span>")
                        .html("Dob: "+driver.Dob)
                        .addClass("open")
                        .css({
                            "position":"absolute",
                            "top": "22%",
                            "left": "2%"
                        }).appendTo(_fs);
                        $("<span>")
                        .html("Place of birth: "+driver.PlaceOfBirth)
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
        richiesta("/Teams", loadTable);
    });

    $("#loadCountries").on("click", function () {
        richiesta("/Countries", loadTable);
    });
    
    $("#loadRaces_Scores").on("click", function () {
        richiesta("/RacesScores", loadTable);
    });
    
    $("#loadDriver").on("click", function () {
        let driverId = $("#txtDriver").val();
        richiesta("/Drivers/" + driverId, loadElement);
    });
    $("#loadTeam").on("click", function () {
        let teamId = $("#txtTeam").val();
        richiesta("/Teams/" + teamId, loadElement);
    });
    $("#loadCountry").on("click", function () {
        let countryId = $("#txtCountry").val();
        richiesta("/Countries/" + countryId, loadElement);
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
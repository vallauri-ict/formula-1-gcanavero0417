"use strict;"

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
            $("#wrapper div").on("click","fieldset",function(){
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
                        $("<span>")
                        .html("Dob: "+driver.dob)
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
                //#region generazione driver
                let _fs=$("<fieldset>")
                .addClass("team")
                .data("id",team.id)
                .data("open","false")
                .appendTo(_div);

                $("<span>")
                .html(team.name)
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
                .html(team.firstdriver)
                .addClass("firstDriver")
                .appendTo(_fs);

                $("<span>")
                .html(team.seconddriver)
                .addClass("secondDriver")
                .appendTo(_fs);

                $("<img>")
                .prop("src",team.img)
                .addClass("img")
                .appendTo(_fs);

                $("<img>")
                .prop("src",team.logo)
                .addClass("logo")
                .appendTo(_fs);
                //#endregion generazione driver
            }
        });
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
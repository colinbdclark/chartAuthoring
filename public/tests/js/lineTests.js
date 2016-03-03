/*
Copyright 2016 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://raw.githubusercontent.com/fluid-project/chartAuthoring/master/LICENSE.txt
*/

(function ($, fluid) {

    "use strict";

    fluid.registerNamespace("floe.tests.chartAuthoring");

    fluid.defaults("floe.tests.chartAuthoring.lineChart.chart", {
        gradeNames: ["floe.chartAuthoring.lineChart.chart", "autoInit"],
        svgOptions: {
            height: 400,
            width: 400
        }
    });

    floe.tests.chartAuthoring.timeSeriesData1 = [
        {
            "date": "2014-12-31",
            "value": 45
        },
        {
            "date": "2015-01-07",
            "value": 24
        },
        {
            "date": "2015-01-14",
            "value": 31
        },
        {
            "date": "2015-01-21",
            "value": 36
        },
        {
            "date": "2015-01-28",
            "value": 40
        },
        {
            "date": "2015-02-04",
            "value": 14
        },
        {
            "date": "2015-02-11",
            "value": 12
        },
        {
            "date": "2015-02-18",
            "value": 8
        },
        {
            "date": "2015-02-25",
            "value": 49
        },
        {
            "date": "2015-03-04",
            "value": 6
        },
        {
            "date": "2015-03-11",
            "value": 31
        },
        {
            "date": "2015-03-18",
            "value": 11
        },
        {
            "date": "2015-03-25",
            "value": 46
        },
        {
            "date": "2015-04-01",
            "value": 7
        },
        {
            "date": "2015-04-08",
            "value": 5
        },
        {
            "date": "2015-04-15",
            "value": 33
        },
        {
            "date": "2015-04-22",
            "value": 12
        },
        {
            "date": "2015-04-29",
            "value": 35
        },
        {
            "date": "2015-05-06",
            "value": 17
        },
        {
            "date": "2015-05-13",
            "value": 23
        },
        {
            "date": "2015-05-20",
            "value": 45
        },
        {
            "date": "2015-05-27",
            "value": 7
        },
        {
            "date": "2015-06-03",
            "value": 25
        },
        {
            "date": "2015-06-10",
            "value": 18
        },
        {
            "date": "2015-06-17",
            "value": 19
        },
        {
            "date": "2015-06-24",
            "value": 45
        }
    ];

    floe.tests.chartAuthoring.timeSeriesData2 = [
        {
            "date": "2015-05-31",
            "value": 33
        },
        {
            "date": "2015-06-07",
            "value": 28
        },
        {
            "date": "2015-06-14",
            "value": 58
        },
        {
            "date": "2015-06-21",
            "value": 56
        },
        {
            "date": "2015-06-28",
            "value": 69
        },
        {
            "date": "2015-07-05",
            "value": 53
        },
        {
            "date": "2015-07-12",
            "value": 63
        },
        {
            "date": "2015-07-19",
            "value": 60
        },
        {
            "date": "2015-07-26",
            "value": 51
        },
        {
            "date": "2015-08-02",
            "value": 72
        },
        {
            "date": "2015-08-09",
            "value": 72
        },
        {
            "date": "2015-08-16",
            "value": 53
        },
        {
            "date": "2015-08-23",
            "value": 65
        },
        {
            "date": "2015-08-30",
            "value": 89
        },
        {
            "date": "2015-09-06",
            "value": 65
        },
        {
            "date": "2015-09-13",
            "value": 54
        },
        {
            "date": "2015-09-20",
            "value": 77
        },
        {
            "date": "2015-09-27",
            "value": 49
        },
        {
            "date": "2015-10-04",
            "value": 91
        },
        {
            "date": "2015-10-11",
            "value": 75
        },
        {
            "date": "2015-10-18",
            "value": 90
        },
        {
            "date": "2015-10-25",
            "value": 68
        },
        {
            "date": "2015-11-01",
            "value": 105
        },
        {
            "date": "2015-11-08",
            "value": 61
        },
        {
            "date": "2015-11-15",
            "value": 111
        },
        {
            "date": "2015-11-22",
            "value": 92
        }
    ];

    floe.tests.chartAuthoring.validateLine = function (that, expectedDataSet) {
        jqUnit.expect(2);
        // Test that the chart line is created
        var chartLine = that.locate("chartLine");

        jqUnit.assertNotEquals("The chart line element is created with the proper selector", 0, chartLine.length);

        jqUnit.assertEquals("The length of the data bound to the chart line is the same as that of the dataset", expectedDataSet.length, chartLine[0].__data__.length);
    };

    floe.tests.chartAuthoring.validateLineChart = function (that, expectedDataSet) {
        jqUnit.expect(6);
        // Test the base chart SVG element created
        var chart = that.locate("svg"),
            lineTitleId = that.locate("title").attr("id"),
            lineDescId = that.locate("description").attr("id"),
            lineAriaLabelledByAttr = chart.attr("aria-labelledby");


        jqUnit.assertNotEquals("The SVG element is created with the proper selector", 0, chart.length);

        jqUnit.assertEquals("The line's title has been created", that.model.svgTitle, that.locate("title").text());

        jqUnit.assertEquals("The line's description has been created", that.model.svgDescription, that.locate("description").text());

        jqUnit.assertDeepEq("The line's title and description are connected through the aria-labelledby attribute of the line SVG", lineAriaLabelledByAttr, lineTitleId + " " + lineDescId);

        // Test that the y-axis is created
        var yAxis = that.locate("yAxis");

        jqUnit.assertNotEquals("The y-axis element is created with the proper selector", 0, yAxis.length);

        // Test that the x-axis is created
        var xAxis = that.locate("xAxis");

        jqUnit.assertNotEquals("The x-axis element is created with the proper selector", 0, xAxis.length);

        floe.tests.chartAuthoring.validateLine(that, expectedDataSet);
    };

    jqUnit.test("Test line chart creation", function () {
        var that = floe.tests.chartAuthoring.lineChart.chart(".floec-ca-lineChart", {
            model: {
                dataSet: floe.tests.chartAuthoring.timeSeriesData1
            }
        });

        floe.tests.chartAuthoring.validateLineChart(that, floe.tests.chartAuthoring.timeSeriesData1);

        // that.applier.change("dataSet", floe.tests.chartAuthoring.timeSeriesData2);
    });

})(jQuery, fluid);

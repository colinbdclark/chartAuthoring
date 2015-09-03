/*!
Copyright 2015 OCAD University

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/gpii/universal/LICENSE.txt
*/

(function ($, fluid) {

    "use strict";

    fluid.defaults("gpii.chartAuthoring.dataEntryPanel", {
        gradeNames: ["gpii.chartAuthoring.templateInjection"],
        selectors: {
            dataEntryLabel: ".gpiic-ca-dataEntryPanel-dataEntryLabel",
            dataEntries: ".gpiic-ca-dataEntryPanel-dataEntries",
            dataEntry: ".gpiic-ca-dataEntryPanel-dataEntry",
            totalValue: ".gpiic-ca-dataEntryPanel-totalValue",
            totalPercentage: ".gpiic-ca-dataEntryPanel-totalPercentage",
            totalLabel: ".gpiic-ca-dataEntryPanel-totalLabel"
        },
        strings: {
            dataEntryLabel: "Enter your values",
            emptyTotalValue: "Value",
            totalPercentage: "%percentage%",
            totalLabel: "Total"
        },
        dynamicComponents: {
            dataEntry: {
                createOnEvent: "createDataEntryField",
                type: "gpii.chartAuthoring.dataEntry",
                container: "{arguments}.0",
                options: {
                    gradeNames: ["{that}.generateModelRelaysConnectionGrade"],
                    invokers: {
                        "generateModelRelaysConnectionGrade": {
                            funcName: "gpii.chartAuthoring.dataEntryPanel.generateModelRelaysConnectionGrade",
                            args: ["{that}.nickName", "{that}.id", ["dataEntries"]]
                        }
                    },
                    resources: {
                        template: "{dataEntryPanel}.options.resources.dataEntry"
                    }
                }
            }
        },
        model: {
            total: {
                // value: number,
                // percentage: number
            },
            dataEntries: {
                // "dataEntryComponent-uuid": {}
            }
        },
        modelRelay: [{
            source: "dataEntries",
            target: "total.value",
            singleTransform: {
                type: "gpii.chartAuthoring.transforms.reduce",
                value: "{that}.model.dataEntries",
                initialValue: null,
                extractor: "gpii.chartAuthoring.transforms.reduce.valueExtractor",
                func: "gpii.chartAuthoring.transforms.reduce.add"
            }
        }, {
            source: "total.value",
            target: "total.percentage",
            singleTransform: {
                type: "gpii.chartAuthoring.transforms.percentage",
                value: "{that}.model.total.value",
                total: "{that}.model.total.value"
            }
        }],
        numDataEntryFields: 5,
        events: {
            createDataEntryField: null
        },
        listeners: {
            "onCreate.renderPanel": "gpii.chartAuthoring.dataEntryPanel.renderPanel"
        },
        modelListeners: {
            "total": {
                listener: "gpii.chartAuthoring.dataEntryPanel.renderTotals",
                args: ["{that}"]
            }
        },
        resources: {
            template: {},
            dataEntry: {}
        }
    });

    gpii.chartAuthoring.dataEntryPanel.generateModelRelaysConnectionGrade = function (nickName, id) {
        var gradeName = "gpii.chartAuthoring.dataEntryPanel.modelRelayConnections." + fluid.allocateGuid();
        var modelPathBase = "{dataEntryPanel}.model.dataEntries." + nickName + "-" + id + ".";

        fluid.defaults(gradeName, {
            model: {
                value: modelPathBase + "value",
                percentage: modelPathBase + "percentage",
                label: modelPathBase + "label"
            },
            modelRelay: {
                source: "{dataEntryPanel}.model.total.value",
                target: "total",
                backward: "never",
                singleTransform: {
                    type: "fluid.transforms.identity"
                }
            }
        });

        return gradeName;
    };

    gpii.chartAuthoring.dataEntryPanel.append = function (container, template) {
        template = $(template).clone();
        container.append(template);
        return template;
    };

    gpii.chartAuthoring.dataEntryPanel.renderPanel = function (that) {
        that.locate("dataEntryLabel").text(that.options.strings.dataEntryLabel);
        that.locate("totalLabel").text(that.options.strings.totalLabel);

        var dataEntryContainerTemplate = that.locate("dataEntry").remove();
        for (var i = 1; i <= that.options.numDataEntryFields; i++) {
            var deCont = gpii.chartAuthoring.dataEntryPanel.append(that.locate("dataEntries"), dataEntryContainerTemplate);
            that.events.createDataEntryField.fire(deCont);
        }
    };

    gpii.chartAuthoring.dataEntryPanel.renderTotals = function (that) {
        var percentage, totalToRender;
        var total = that.model.total.value;

        if (fluid.isValue(total)) {
            percentage = that.model.total.percentage;
            totalToRender = total;
        } else {
            percentage = "";
            totalToRender = that.options.strings.emptyTotalValue;
        }

        that.locate("totalValue").text(totalToRender);
        gpii.chartAuthoring.percentage.render(that.locate("totalPercentage"), percentage, that.options.strings.totalPercentage);
    };

})(jQuery, fluid);
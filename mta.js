/**
 * Created by Vladi on 3/7/2015.
 * wrapper for http://morrisjs.github.io/morris.js/
 * version 1.2
 */
(function() {

    var MTA = {};

    if(!window.MTA) {
        window.MTA = MTA;
    }

    MTA.Line = function(morrisConfigObj, drawSelectCheckBox) {
        return constructor("Line", morrisConfigObj, drawSelectCheckBox);
    };

    MTA.Bar = function(morrisConfigObj, drawSelectCheckBox) {
        return constructor("Bar", morrisConfigObj, drawSelectCheckBox);
    };

    MTA.Donut = function(morrisConfigObj) {
        return constructor("Donut", morrisConfigObj, false);
    };

    function constructor(morrisGraphType, morrisConfigObj, drawSelectCheckBox) {

        if (!morrisGraphType || !morrisConfigObj) {
            console.log("Please make sure morris obj is correct");
            return;
        }

        if(!Morris) {
            console.log("Missing morris.js");
            return;
        }

        function Graph(morrisGraphType, morrisConfigObj) {
            this.container = document.querySelector("#" + morrisConfigObj.element);
            this.origData = morrisConfigObj.data;
            this.xkey = morrisConfigObj.xkey;
            this.origYKeys = morrisConfigObj.ykeys;
            this.displayedYKeys = morrisConfigObj.ykeys;
            this.labels = morrisConfigObj.labels;
            this.morris = Morris[morrisGraphType](morrisConfigObj);
        }

        var self = new Graph(morrisGraphType, morrisConfigObj);

        Graph.prototype.initSelectYKeys = function () {
            var keys = self.origYKeys,
                buttonsContainer = document.createElement("div"),
                graphParentElem = this.container.parentNode;
            buttonsContainer.className = "buttonsContainer";
            buttonsContainer.setAttribute("data-parent-graph", this.container.id);

            for (var keyIndex in keys) {
                var currCheckBox = document.createElement('input'),
                    btnWrapper = document.createElement("span");
                btnWrapper.className = "yKeyButton";
                if (keys.hasOwnProperty(keyIndex)) {
                    currCheckBox.setAttribute("type", "checkbox");
                    currCheckBox.checked = true;
                    currCheckBox.style.cursor = 'pointer';
                    btnWrapper.style.cursor = 'pointer';
                    currCheckBox.setAttribute("data-key-name", keys[keyIndex]);

                    currCheckBox.addEventListener("change" , function() {
                        var checkBox = this;
                        checkBox.checked = !checkBox.checked;
                    });

                    btnWrapper.addEventListener("click", function () {
                        var checkBoxElem = this.childNodes[0],
                            clickedKeyName = checkBoxElem.getAttribute("data-key-name");
                        if (clickedKeyName) {
                            self.toggleYKeys(new Array(clickedKeyName));
                            checkBoxElem.checked = !checkBoxElem.checked;
                        }
                    });

                    btnWrapper.appendChild(currCheckBox);
                    btnWrapper.appendChild(document.createTextNode("Display " + keys[keyIndex]));
                    buttonsContainer.appendChild(btnWrapper);
                }
            }
            graphParentElem.insertBefore(buttonsContainer, this.container.nextSibling);
            this.buttonsContainer = buttonsContainer;
        };

        Graph.prototype.show = function () {
            this.container.style.display = 'inline-block';
        };

        Graph.prototype.hide = function () {
            this.container.style.display = 'none';
        };

        Graph.prototype.getMorrisObj = function () {
            return this.morris;
        };

        Graph.prototype.setData = function (data) {
            if (data && data.length > 0) {
                this.morris.setData(data);
                this.origData = data;
                this.setYKeys(this.origYKeys);
            }
        };

        Graph.prototype.toggleYKeys = function (yKeysToToggle) {
            var currentDisplayedYKeys = this.displayedYKeys,
                newYKeys = [];

            // duplicate current displayed keys
            for (var i = 0, iSize = currentDisplayedYKeys.length; i < iSize; i++) {
                newYKeys.push(currentDisplayedYKeys[i]);
            }

            // toggling y key values
            for (var j = 0, jSize = yKeysToToggle.length; j < jSize; j++) {
                var eleIndex = newYKeys.indexOf(yKeysToToggle[j]);
                if (eleIndex > -1) {
                    delete newYKeys[eleIndex];
                }
                else {
                    newYKeys.push(yKeysToToggle[j]);
                }

            }

            this.displayedYKeys = newYKeys;
            this.setYKeys(newYKeys);
        };

        Graph.prototype.setYKeys = function (yKeys) {
            var data = this.filterData(this.origData, yKeys);
            if (data && data.length > 0) {
                this.morris.setData(data);
            }
        };

        Graph.prototype.filterData = function (data, yKeysToShow) {

            var resultObj = [];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var innerObj = data[key],
                        newObj = {},
                        isNewObjCreated = false;

                    for (var innerObjKey in innerObj) {
                        if (innerObj.hasOwnProperty(innerObjKey)) {
                            for (var i = 0, size = yKeysToShow.length; i < size; i++) {
                                if (this.xkey === innerObjKey || innerObjKey === yKeysToShow[i]) {
                                    newObj[innerObjKey] = data[key][innerObjKey];
                                    isNewObjCreated = true;
                                    break;
                                }
                            }
                        }
                    }
                    if (isNewObjCreated) {
                        resultObj.push(newObj);
                    }
                }
            }

            return resultObj;
        };

        if (drawSelectCheckBox) {
            self.initSelectYKeys();
        }

        return self;
    }
}());

let _ = {
    element: null,
    select: function (element) {
        if (typeof element == 'object') {
        } else if (element.charAt(0) == "#") {
            element = element.replace("#", "");
            element = document.getElementById(element);
        } else if (element.charAt(0) == ".") {
            element = element.replace(".", "");
            element = document.getElementsByClassName(element);
        } else {
            element = document.getElementsByTagName(element);
        }
        this.element = element;
        return this;
    },
    styleCreate: function (property, value) { //helper function
        if (typeof this.element.length != "undefined") {
            for (let i = 0; i < this.element.length; i++) {
                this.element[i].style[property] = value;
            }
        } else {
            this.element.style[property] = value;
        }
    },
    animateCreate : function(element,property,value,period){ //helper function
        let increment = 0;
        value = value.replace('px', '');
        let interval = setInterval(function () {
            if (increment > parseInt(value)) {
                element.style[property] = value;
                clearInterval(interval);
                return;
            }
            element.style[property] = increment + 'px';
            increment += 10;
        }, period);
    },
    eventAdd: function (event, def) { //helper function
        if (typeof this.element.length != "undefined") {
            for (let i = 0; i < this.element.length; i++) {
                this.element[i][event] = def
            }
        } else {
            this.element[event] = def
        }
    },
    css: function (style) {
        if (typeof style != "object" && typeof this.element.length == "undefined")
            return window.getComputedStyle(this.element, null).getPropertyValue(style);
        for (let i = 0; i < Object.keys(style).length; i++) {
            this.styleCreate(Object.keys(style)[i], Object.values(style)[i]);
        }
    },
    animate: function (style ,period) {
        for (let i = 0; i < Object.keys(style).length; i++) {
            let property = Object.keys(style)[i];
            let value = Object.values(style)[i];
            let element = this.element;
            if (typeof this.element.length != "undefined") {
                for (let i = 0; i < this.element.length; i++) {
                    this.animateCreate(element[i],property,value,period);
                }
            } else {
                this.animateCreate(element,property,value,period);
            }
        }
    },
    on: function (event, def) { this.eventAdd('on' + event, def) },
};

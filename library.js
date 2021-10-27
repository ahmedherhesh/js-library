let $ = {
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
    styleChange: function (property, value) {
        if (typeof this.element.length != "undefined") {
            for (let i = 0; i < this.element.length; i++) {
                this.element[i].style[property] = value;
            }
        } else {
            this.element.style[property] = value;
        }
    },
    eventAdd: function (event, def) {
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
            this.styleChange(Object.keys(style)[i], Object.values(style)[i]);
        }
    },
    on: function (event, def) { this.eventAdd('on' + event, def) },
};

Object.prototype.document = window.document;
Object.prototype.location = window.location;
const $ = require('zepto').$;
delete(Object.prototype.document);
delete(Object.prototype.location);

window.onload = function () {
    const colourNumber = Math.round(Math.random() * 2) + 1;
    $('#banner').addClass(`bannerColour${colourNumber}`);
};

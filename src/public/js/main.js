/* eslint no-extend-native: off */
Object.prototype.document = window.document;
Object.prototype.location = window.location;
const $ = require('zepto').$;
delete Object.prototype.document;
delete Object.prototype.location;

window.onload = function () {
    setInterval(cycleBannerColour(), 10 * 1000);
};

function cycleBannerColour () {
    let i = 0;
    return function () {
        $(`#background-${i}`).removeClass(`Background--off`);
        i = i === 2 ? 0 : i + 1;
        $(`#background-${i}`).addClass(`Background--off`);
    };
}

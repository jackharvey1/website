/* eslint no-extend-native:off */
Object.prototype.document = window.document;
Object.prototype.location = window.location;
const $ = require('zepto').$;
delete Object.prototype.document;
delete Object.prototype.location;

window.onload = function() {

};

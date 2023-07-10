"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTimeZone = void 0;
const moment = require("moment-timezone");
function setTimeZone(timeZone) {
    moment.tz.setDefault(timeZone);
}
exports.setTimeZone = setTimeZone;
//# sourceMappingURL=timezone.util.js.map
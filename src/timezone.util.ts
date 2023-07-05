import * as moment from 'moment-timezone';

export function setTimeZone(timeZone: string): void {
    moment.tz.setDefault(timeZone);
}
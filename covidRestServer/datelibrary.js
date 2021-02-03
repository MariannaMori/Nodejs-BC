'use strict';

function dateToIsoDate(date) {
    const [isoDate,] = date.toISOString().split('T'); //after T  is time part
    return isoDate;
}

function isoDateNow() {
    return dateToIsoDate(new Date(Date.now()));
}

function addDays(isoDate, daysToAdd){
    const dayInMs = 24*60*60*1000;
    const date = new Date(isoDate);
    date.setTime(date.getTime() + dayInMs*daysToAdd);
    return dateToIsoDate(date);
}

function addOneDay(isodate) { //adding one 1 day  function
    return addDays(isodate,1);
}

module.exports = { dateToIsoDate, isoDateNow, addDays,addOneDay};
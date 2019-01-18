TimeLine = function () {
    this.timeline = null;
};

TimeLine.prototype.onSelect = function (properties) {
    console.log(properties);
};

TimeLine.prototype.getItems = function(){
    var momnow = moment();
    var momstart = moment(momnow);
    momstart.set({'hours':0,'minute':0,'second':0,'millisecond':0});
    var diffmin = momnow.diff(momstart,'minutes');
    var itemlist = new Array();
    for(var tm = 0; tm < Math.floor(diffmin/10); tm++)
    {
        var datatime = moment(momstart);
        datatime.add(tm*10,'minutes');
        var sttimestr = datatime.format("YYYY-MM-DDTHH:mm:SS");
        var idstr = datatime.format("YYYYMMDDHHmmSS");
        var itm = {id:idstr,content:"<div>Memo</div>", start: sttimestr};
        itemlist.push(itm);
    }
    return(itemlist);
};

TimeLine.prototype.viewTimeLine = function () {
    var itemlist = this.getItems();
    var items = new vis.DataSet(itemlist);
    // DOM element where the Timeline will be attached
    var container = document.getElementById('visualization');
    var momnow = moment();
    momnow.add(-2,'hours');
    var sttimestr = momnow.format("YYYY-MM-DDTHH:00:00");
    var options = {start: sttimestr};
    this.timeline = new vis.Timeline(container, items, options);
    this.timeline.on('select', this.onSelect);
    this.timeline.on('rangechanged', function (properties) {
        console.log('rangechanged', properties);
    });
    this.timeline.on('click', function (properties) {
        console.log('click', properties);
    });
    return "TEST";
};
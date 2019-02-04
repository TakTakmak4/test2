SelectImg = function () {
    this.timeline = null;
    this.itemlist = {};
    this.items = new vis.DataSet(this.itemlist);
};

SelectImg.prototype.viewTimeLine = function () {
    var container = document.getElementById('visualization');
    var momnow = moment();
    var momstart = moment(momnow);
    momstart.add(-2,'hours');
    var sttimestr = momstart.format("YYYY-MM-DDTHH:00:00");
    var endtimestr = momnow.format("YYYY-MM-DDTHH:mm:ss");
    var options = {start: sttimestr,end:endtimestr};
    this.timeline = new vis.Timeline(container, this.items, options);

    var that = this;
    this.timeline.on('select', this.onSelect);
    //this.timeline.on('rangechanged', this.changeRange);
    this.timeline.on('rangechanged', function (properties) {
        that.changeRange(that,properties);
    });
    return "TEST";
};
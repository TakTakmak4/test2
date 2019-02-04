TimeLine = function () {
    this.timeline = null;
    this.selectimg = null;
    this.itemlist = {};
    this.items = new vis.DataSet(this.itemlist);
};

TimeLine.prototype.setSelectImg = function(_selectimg){
    this.selectimg = _selectimg;
}

TimeLine.prototype.onSelect = function (_this,properties) {
    //console.log('onSelect',properties);
    var trgtime = properties.items[0];
    var that = _this;
    that.selectimg.viewSelectImg(trgtime);
};

TimeLine.prototype.makeimgDom = function(timestr){
    var imgpath = "/static/data/imagedata/20190126173904/000001.jpg";
    var imgdom = "<img width=\"100\" higth=\"100\" src=\""+imgpath+"\">";
    return imgdom;
}

TimeLine.prototype.changeRange = function (_this,properties) {
    var that = _this;
    var momstart = moment(properties.start);
    var momend = moment(properties.end);
    momstart.add(-1,'hours');
    momstart.set({'hours':0,'minute':0,'second':0,'millisecond':0});
    momend.add(1,'hours');
    var diffmin = momend.diff(momstart,'minutes');
    var itemlist = new Array();
    for(var tm = 0; tm < Math.floor(diffmin/10); tm++)
    {
        var datatime = moment(momstart);
        datatime.add(tm*10,'minutes');
        var sttimestr = datatime.format("YYYY-MM-DDTHH:mm:ss");
        var idstr = datatime.format("YYYYMMDDHHmmss");
        var contentstr = that.makeimgDom(idstr);
        //console.log(sttimestr);
        var itm = {id:idstr,content:contentstr, start: sttimestr};
        itemlist.push(itm);
    }
    that.itemlist = itemlist;
    that.items = new vis.DataSet(that.itemlist);
    that.timeline.setItems(that.items);
    return(itemlist);
};


TimeLine.prototype.viewTimeLine = function () {
    var container = document.getElementById('visualization');
    var momnow = moment();
    var momstart = moment(momnow);
    momstart.add(-2,'hours');
    var sttimestr = momstart.format("YYYY-MM-DDTHH:00:00");
    var endtimestr = momnow.format("YYYY-MM-DDTHH:mm:ss");
    var options = {start: sttimestr,end:endtimestr};
    this.timeline = new vis.Timeline(container, this.items, options);

    var that = this;
    //this.timeline.on('select', this.onSelect);
    this.timeline.on('select', function (properties) {
        that.onSelect(that,properties);
    });
    //this.timeline.on('rangechanged', this.changeRange);
    this.timeline.on('rangechanged', function (properties) {
        that.changeRange(that,properties);
    });
    return "TEST";
};
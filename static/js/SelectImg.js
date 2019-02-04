SelectImg = function () {
    this.momtrg = null;
    this.timer = null;
    this.count = 0;
};

SelectImg.prototype.makeImgPath = function(timestr){
    var imgpath = "/static/data/imagedata/"+timestr+".jpg";
}

SelectImg.prototype.updateImg = function(_this){
    var that = _this;
    var momimg = moment(that.momtrg);
    var addnum = that.count % 10;
    momimg.add(addnum,'minutes');
    var ftimestr = momimg.format("YYYYMMDDHHmmss");
    var imgpath = that.makeImgPath(ftimestr);
    console.log(imgpath);
    that.count++;
}

SelectImg.prototype.viewSelectImg = function (starttimestr) {
    var that = this;
    var container = document.getElementById('selectimg');
    that.momtrg = moment(starttimestr,"YYYYMMDDHHmmss");
    timer1 = setInterval(that.updateImg, 1000, that);
    return "TEST";
};
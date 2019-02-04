$(document).ready(function () {
    var selectimg = new SelectImg();
    var timelineobj = new TimeLine();
    timelineobj.setSelectImg(selectimg);
    timelineobj.viewTimeLine();
});
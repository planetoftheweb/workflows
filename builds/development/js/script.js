var rclick = function() {
  var myNodes = document.querySelectorAll(".rclick");
 
  for (var i=0; i<myNodes.length; i++) {
    myNodes[i].addEventListener("contextmenu", function(e) {
      e.preventDefault();
      if (e.target.tagName === 'IMG') {
        if (document.querySelector('.preview')== null) {
          var myElement = document.createElement('div');
          myElement.className = 'preview';
          e.target.parentNode.appendChild(myElement);
 
          var myImg = document.createElement('img');
          var imgLoc = e.target.src;
          myImg.src = imgLoc.substr(0, imgLoc.length-7) + '.jpg';
 
          myElement.style.left = e.offsetX + 90 + 'px';
          myElement.style.top = e.offsetY + -90 + 'px';
 
          myElement.appendChild(myImg);
 
          e.target.addEventListener('mouseout', function handler(d) {
            var someNode = d.target.parentNode.querySelector('div.preview');
            someNode.parentNode.removeChild(someNode);
            e.target.removeEventListener('mouseout', handler, false);
          }, false);
 
          e.target.addEventListener('mousemove', function(f) {
            myElement.style.left = f.offsetX + 90 + 'px';
            myElement.style.top = f.offsetY + -90 + 'px';
          });    
        } // make sure I dont' have one opened
      } // check to see that I clicked on IMG only
    }, false); // click event
  }
}(); //anonymous closure
var pixgrid = function() {
    function centerImage(theImage) {
        var myDifX = (window.innerWidth - theImage.width) / 2, myDifY = (window.innerHeight - theImage.height) / 2;
        return theImage.style.top = myDifY + "px", theImage.style.left = myDifX + "px", 
        theImage;
    }
    var myNodes = document.querySelectorAll(".pixgrid");
    for (var i=0; i<myNodes.length; i++) {
        myNodes[i].addEventListener("click", function(e) {
            if ("IMG" === e.target.tagName) {
                var myOverlay = document.createElement("div");
                myOverlay.id = "overlay", document.body.appendChild(myOverlay), myOverlay.style.position = "absolute", 
                myOverlay.style.top = 0, myOverlay.style.backgroundColor = "rgba(0,0,0,0.7)", myOverlay.style.cursor = "pointer", 
                myOverlay.style.width = window.innerWidth + "px", myOverlay.style.height = window.innerHeight + "px", 
                myOverlay.style.top = window.pageYOffset + "px", myOverlay.style.left = window.pageXOffset + "px";
                var imageSrc = e.target.src, largeImage = document.createElement("img");
                largeImage.id = "largeImage", largeImage.src = imageSrc.substr(0, imageSrc.length - 7) + ".jpg", 
                largeImage.style.display = "block", largeImage.style.position = "absolute", largeImage.addEventListener("load", function() {
                    this.height > window.innerHeight && (this.ratio = window.innerHeight / this.height, 
                    this.height = this.height * this.ratio, this.width = this.width * this.ratio), this.width > window.innerWidth && (this.ratio = window.innerWidth / this.width, 
                    this.height = this.height * this.ratio, this.width = this.width * this.ratio), centerImage(this), 
                    myOverlay.appendChild(largeImage);
                }), largeImage.addEventListener("click", function() {
                    myOverlay && (window.removeEventListener("resize", window, !1), window.removeEventListener("scroll", window, !1), 
                    myOverlay.parentNode.removeChild(myOverlay));
                }, !1), window.addEventListener("scroll", function() {
                    myOverlay && (myOverlay.style.top = window.pageYOffset + "px", myOverlay.style.left = window.pageXOffset + "px");
                }, !1), window.addEventListener("resize", function() {
                    myOverlay && (myOverlay.style.width = window.innerWidth + "px", myOverlay.style.height = window.innerHeight + "px", 
                    myOverlay.style.top = window.pageYOffset + "px", myOverlay.style.left = window.pageXOffset + "px", 
                    centerImage(largeImage));
                }, !1);
            }
        }, !1);
    }
}();
var fill;

(fill = function(item) {
  return $('.tagline').append("" + item);
})('The most creative minds in Art');

fill;

$(function() {
  var Mustache = require('mustache');
 
  $.getJSON('js/data.json', function(data) {
    var template = $('#speakerstpl').html();
    var html = Mustache.to_html(template, data);
    $('#speakers').html(html);    
  }); //getJSON
  
}); //function
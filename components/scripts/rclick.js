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
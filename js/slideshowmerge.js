//=======================
//
// Merging Image Slideshow
//
// http://www.astral-consultancy.co.uk/cgi-bin/hunbug/doco.cgi?11530
//
//=======================

var slideshowMergeAnimate = new Array();
var slideshowMergeTimer   = new Array();
var slideshowMergeCount   = new Array();
var slideshowMergeImages  = new Array();

//======================

function slideshowMerge(id,cl,imageArray,fadeInterval,holdTime)
{

  for(i=0;i<imageArray.length;i++)
  {
    var imgLoad = new Image();
    imgLoad.src = imageArray[i];
  }

  if(cl)
    cl = ' class="'+cl+'"';

  document.write('<div id="'+id+'"'+cl+' style="position:relative">');
  document.write('<img id="'+id+'img1" class="slideshowimg" style="position:absolute; top:0px; left:15px; margin-right:15px" onload="slideshowMergeRun(\''+id+'\')"/>');
  document.write('<img id="'+id+'img2" class="slideshowimg" style="position:absolute; top:0px; left:15px; margin-right:15px; display:none;"/></div>');
  
  slideshowMergeCount[id]   = 0;
  slideshowMergeImages[id]  = imageArray;
  slideshowMergeAnimate[id] = 'run';
  slideshowMergeTimer[id]   = setInterval('slideshowMergeAnimation(\''+id+'\',\''+holdTime+'\');',fadeInterval);

}

//======================

function slideshowMergeAnimation(id,holdTime)
{
  if(slideshowMergeAnimate[id]=='run')
  {
    var obj1 = document.getElementById(id+'img1');
    var obj2 = document.getElementById(id+'img2');

    var opa  = slideshowMergeCount[id]%100;

    if(opa==0)
    {  
      if(obj1.src)
      {
        slideshowMergeAnimate[id] = 'hold';
        setTimeout('slideshowMergeRun(\''+id+'\')',holdTime);
        obj2.src = obj1.src;
        obj2.style.display = 'block';
      }
    }
    else if(opa==1)
    {
      slideshowMergeAnimate[id] = 'load';
      obj1.src = slideshowMergeImages[id][Math.floor(slideshowMergeCount[id]/100)%slideshowMergeImages[id].length];
    }
      
    obj1.style.opacity = (opa/100).toString();
    obj1.style.filter  = "alpha(opacity="+opa.toString()+")";
    obj2.style.opacity = ((100-opa)/100).toString();
    obj2.style.filter  = "alpha(opacity="+(100-opa).toString()+")";
     
    slideshowMergeCount[id]++;
    
    if(slideshowMergeCount[id]==(slideshowMergeImages[id].length*100))
      slideshowMergeCount[id]=0;
  }
}

//======================

function slideshowMergeRun(id)
{
  slideshowMergeAnimate[id] = 'run';
}

//======================
//=======================
//
// Fading Image Slideshow
//
// http://www.astral-consultancy.co.uk/cgi-bin/hunbug/doco.cgi?11510
//
//=======================


var slideshowFadeAnimate = new Array();
var slideshowFadeTimer   = new Array();
var slideshowFadeCount   = new Array();
var slideshowFadeImages  = new Array();


//======================


function slideshowFade(id,cl,imageArray,fadeInterval,holdTime)
{

  if(cl)
    cl = ' class="'+cl+'"';

  document.write('<div id="'+id+'"'+cl+'><img id="'+id+'img" onload="slideshowFadeRun(\''+id+'\')"/></div>');

  var ss = document.getElementById(id+'img');
  if(ss.addEventListener)
  {
    ss.addEventListener('mouseover',function(){slideshowFadeMouseover(id)},false);
    ss.addEventListener('mouseout',function(){slideshowFadeMouseout(id)},false);
  }
  else if(ss.attachEvent)
  {
    ss.attachEvent('onmouseover',function(){slideshowFadeMouseover(id)});
    ss.attachEvent('onmouseout',function(){slideshowFadeMouseout(id)},false);
  }
  
  slideshowFadeCount[id]   = 0;
  slideshowFadeImages[id]  = imageArray;
  slideshowFadeAnimate[id] = 'run';
  slideshowFadeTimer[id]   = setInterval('slideshowFadeAnimation(\''+id+'\',\''+holdTime+'\');',fadeInterval);

}


//======================


function slideshowFadeAnimation(id,holdTime)
{
  if(slideshowFadeAnimate[id]=='run')
  {
    var obj = document.getElementById(id+'img');
    var opa = slideshowFadeCount[id]%200;

    if(opa==0)
    {
      slideshowFadeAnimate[id] = 'load';
      obj.src = slideshowFadeImages[id][Math.floor(slideshowFadeCount[id]/200)%slideshowFadeImages[id].length];
    }
    else if(opa==100)
    {
      slideshowFadeAnimate[id] = 'hold';
      setTimeout('slideshowFadeRun(\''+id+'\')',holdTime);
    }
    else if(opa>100)
      opa = 200-opa;
      
    obj.style.opacity = (opa/100).toString();
    obj.style.filter  = "alpha(opacity="+opa.toString()+")";
    
    slideshowFadeCount[id]++;
    
    if(slideshowFadeCount[id]==(slideshowFadeImages[id].length*200))
      slideshowFadeCount[id]=0;
  }
}


//======================


function slideshowFadeMouseout(id)
{
  if(slideshowFadeAnimate[id]=='mouseover')
    slideshowFadeAnimate[id] = 'run';
}


//======================


function slideshowFadeMouseover(id)
{
  if(slideshowFadeAnimate[id]=='run')
  {
    slideshowFadeAnimate[id] = 'mouseover';
    var obj = document.getElementById(id+'img');
    obj.style.opacity = "1";
    obj.style.filter  = "alpha(opacity=100)";
    slideshowFadeCount[id] = (Math.floor(slideshowFadeCount[id]/200)*200)+101;
  }
}


//======================


function slideshowFadeRun(id)
{
  slideshowFadeAnimate[id] = 'run';
}


//======================
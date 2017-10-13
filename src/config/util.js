const setTranslate=(elm,x,y,z)=>{
    const v='translate3d('+x+'px,'+y+'px,'+z+'px'+')';
    elm.style.webkitTransform = v;
    elm.style.MozTransform = v;
    elm.style.msTransform = v;
    elm.style.OTransform = v;
    elm.style.transform = v;
}

export  {
    setTranslate
}
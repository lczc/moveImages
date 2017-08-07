
//滚动条的 滚动距离
function scroll() {
    if (document.body.scrollTop){
        return {
            top:document.body.scrollTop,
            left:document.body.scrollLeft
        }
    }
    else{
        return {
            top:document.documentElement.scrollTop,
            left:document.documentElement.scrollLeft
        }
    }
}

//获取屏幕宽度
function client(){
    if (document.body.clientWidth || document.body.clientHeight){
        return {
            width:document.body.clientWidth,
            height:document.body.clientHeight
        }
    }
    else{
        return {
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }
    }
}

function $(val) {
    return document.querySelector(val)
}

//显示
function show(id){
    $(id).style.display="block";
}

//隐藏
function hide(id){
    $(id).style.display="none";
}



function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr]
    }
    else
    {
        return getComputedStyle(obj,null)[attr]
    }
}


function animate(obj,json,fn){
    clearInterval(obj.timer);

    obj.timer=setInterval(function () {
        //不要忘了去掉PX
        var off=true;

        for(var attr in json){   //attr 属性   json[attr]目标点
            var current = parseInt(getStyle(obj,attr));
            //var current = parseInt(getStyle(obj,attr));

            //var current = parseInt(getStyle(obj,attr));
            // console.log(json[attr]);
            speed = (json[attr] - current) /10;
            speed = speed >0 ? Math.ceil(speed) : Math.floor(speed);

            if (attr == "opacity" || attr=== "zIndex"){
                obj.style[attr]=json[attr];
            }
            else{
                obj.style[attr]=current + speed + "px";
            }


            /*if (!speed){
             clearInterval(obj.timer);
             }*/
            if (json[attr] != current){   //目标点只要有一个人没到位置  就是false
                off=false;
            }
        }
        if (off){
            clearInterval(obj.timer);
            //alert("到位置了,回去吧");
            if(fn){
                fn()
            }
        }
    },30)
}
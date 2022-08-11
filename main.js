var ctx=document.getElementById("myCanvas");
var canvas=ctx.getContext("2d");
function line(x1,y1,x2,y2){
    canvas.beginPath();
    canvas.moveTo(x1, y1);
    canvas.lineTo(x2,y2);
    canvas.stroke();
}
function circle(x1,y1,r){
    canvas.beginPath();
    canvas.arc(x1, y1, r/4, 0, 2 * Math.PI);
    canvas.stroke();
    canvas.fill();
}
function dot(x1,y1){
    //canvas.fillStyle="black";
    canvas.fillRect(x1,y1,7,7);
    canvas.fill();
}
function clear(){
    canvas.clearRect(0,0,1000,1000);
}
var l1=200;
var l2=200;
var m1=20;
var m2=40;
var a1=Math.PI/4;//Math.PI/4;
var a2=Math.PI;//Math.PI/8;
var a1_v=0;
var a2_v=0;
var g=1;
var dots=[];
window.onload=()=>{
    
    update();
}
function update(){
    var x1=l1*Math.sin(a1)+500;
    var y1=l1*Math.cos(a1)+400;
    var x2=x1+l2*Math.sin(a2);
    var y2=y1+l2*Math.cos(a2);
    dots.push(x2);
    dots.push(y2);
    clear();
    line(500,400,x1,y1);
    circle(x1,y1,m1);
    line(x1,y1,x2,y2);
    circle(x2,y2,m2);
    for(var i=0;i<dots.length-1;i+=2){
        dot(dots[i],dots[i+1]);
    }
    var num1=-g * (2 * m1 + m2)*Math.sin(a1);
    var num2=-m2 * g * Math.sin(a1-2*a2);
    var num3=-2 * Math.sin(a1-a2)*m2;
    var num4=a2_v*a2_v*l2+a1_v*a1_v*l1*Math.cos(a1-a2);
    var den=l1*(2*m1+m2-m2*Math.cos(2*a1-2*a2));
    var a1_a=(num1+num2+num3*num4)/den;//0.01;/*-g*(2*m1+m2)*Math.sin(a1)-m2*g*Math.sin(a1-2*a2)-2*Math.sin(a1-a2)*m2*(a2_v*a2_v*l2+a1_v*a1_v*l1*Math.cos(a1-a2))/l1*(2*m1+m2-m2*Math.cos(2*a1-2*a2));*/
    
    num1=2*Math.sin(a1-a2);
    num2=(a1_v*a1_v*l1*(m1+m2));
    num3=g*(m1+m2)*Math.cos(a1);
    num4=a2_v*a2_v*l2*m2*Math.cos(a1-a2);
    den=l2*(2*m1+m2-m2*Math.cos(2*a1-2*a2));
  
    var a2_a=(num1*(num2+num3+num4))/den;//-0.001;/*2*Math.sin(a1-a2)*(a1_v*a1_v*l1*(m1+m2)+g*(m1+m2)*Math.cos(a1)+a2_v*a2_v*l2*m2*Math.cos(a1-a2))/l2*(2*m1+m2-m2*Math.cos(2*a1-2*a2));*/
    a1_v+=a1_a;
    a2_v+=a2_a;
    a1+=a1_v;
    a2+=a2_v;
    window.requestAnimationFrame(update);
}
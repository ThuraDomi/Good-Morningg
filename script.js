const sky=document.getElementById("sky");
const stars=document.getElementById("stars");
const intro=document.getElementById("intro");
const wakeBtn=document.getElementById("wakeBtn");
const morning=document.getElementById("morning");
const sun=document.getElementById("sun");
const hello=document.getElementById("hello");
const wish=document.getElementById("wish");
const particles=document.getElementById("particles");

const heartLayer=document.getElementById("heartLayer");
let heartTimer=null;

function spawnHeart(){
  const heart=document.createElement("span");
  heart.className="float-heart";
  heart.textContent=Math.random()>.45?"♡":"♥";

  const colors=["#ffd4df","#ffc0d3","#ffe1e8","#ffb9cb","#fff0f4"];

  heart.style.left=(4+Math.random()*92)+"%";
  heart.style.setProperty("--heart-color",colors[Math.floor(Math.random()*colors.length)]);
  heart.style.setProperty("--heart-size",(12+Math.random()*14)+"px");
  heart.style.setProperty("--heart-life",(6+Math.random()*4)+"s");
  heart.style.setProperty("--heart-drift",(Math.random()*120-60)+"px");
  heart.style.setProperty("--heart-rot",(Math.random()*90-45)+"deg");

  heartLayer.appendChild(heart);
  setTimeout(()=>heart.remove(),10500);
}

function startHearts(){
  if(heartTimer) return;
  for(let i=0;i<5;i++){
    setTimeout(spawnHeart,i*350);
  }
  heartTimer=setInterval(spawnHeart,900);
}



const clockTime=document.getElementById("clockTime");
const clockPeriod=document.getElementById("clockPeriod");

function updateClock(){
  const now=new Date();
  let hours=now.getHours();
  const minutes=String(now.getMinutes()).padStart(2,"0");
  const period=hours>=12?"PM":"AM";
  hours=hours%12||12;

  clockTime.textContent=`${hours}:${minutes}`;
  clockPeriod.textContent=period;
}

updateClock();
setInterval(updateClock,1000);


function applyTimeTheme(){
  const hour=new Date().getHours();

  sky.classList.remove("time-morning","time-day","time-sunset","time-night");

  if(hour>=5 && hour<12){
    sky.classList.add("time-morning");
  }else if(hour>=12 && hour<18){
    sky.classList.add("time-day");
  }else if(hour>=18 && hour<20){
    sky.classList.add("time-sunset");
  }else{
    sky.classList.add("time-night");
  }
}

applyTimeTheme();



let started=false;

function makeStars(){
  const n=Math.min(150,Math.floor(window.innerWidth/6));
  for(let i=0;i<n;i++){
    const s=document.createElement("i");
    s.className="star";
    s.style.left=Math.random()*100+"%";
    s.style.top=Math.random()*80+"%";
    const z=(Math.random()*2+0.8)+"px";
    s.style.width=z;s.style.height=z;
    s.style.setProperty("--t",(1.5+Math.random()*3.5)+"s");
    stars.appendChild(s);
  }
}

function typeText(el,text,speed,done){
  let i=0;el.textContent="";
  const timer=setInterval(()=>{
    el.textContent+=text[i++];
    if(i>=text.length){clearInterval(timer);if(done)done();}
  },speed);
}

function wake(){
  if(started)return;
  started=true;
  wakeBtn.disabled=true;
  intro.classList.add("hide");
  setTimeout(()=>{
    sky.classList.add("day");
    morning.classList.add("show");
    startHearts();
  },450);
  setTimeout(()=>{
    typeText(hello,"Good Morning Bro",85,()=>{
      setTimeout(()=>{
        typeText(wish,"I hope you woke up feeling a little happier today.",43);
      },400);
    });
  },3600);
}

function sparkle(){
  const r=sun.getBoundingClientRect();
  const x=r.left+r.width/2,y=r.top+r.height/2;
  const colors=["#fff8a8","#ffd66d","#ffffff","#ffcfcf","#ffefb5"];
  for(let i=0;i<42;i++){
    const p=document.createElement("b");
    p.className="spark";
    const a=Math.random()*Math.PI*2,d=55+Math.random()*135;
    p.style.setProperty("--left",x+"px");
    p.style.setProperty("--top",y+"px");
    p.style.setProperty("--x",Math.cos(a)*d+"px");
    p.style.setProperty("--y",Math.sin(a)*d+"px");
    p.style.setProperty("--size",(4+Math.random()*7)+"px");
    p.style.setProperty("--life",(850+Math.random()*800)+"ms");
    p.style.setProperty("--c",colors[Math.floor(Math.random()*colors.length)]);
    particles.appendChild(p);
    setTimeout(()=>p.remove(),1800);
  }
}

wakeBtn.addEventListener("click",wake);
sun.addEventListener("click",sparkle);
makeStars();

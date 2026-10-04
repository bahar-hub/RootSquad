// Modularized from the original tree/canvas animation.
export function initTree(){
  const $=id=>document.getElementById(id);
  const cv=$('tree-canvas'); if(!cv) return;
  window.RK='home';

const cx=cv.getContext('2d');let W,H,D;
function rs(){D=Math.min(devicePixelRatio||1,2);W=cv.width=innerWidth*D;H=cv.height=innerHeight*D}
addEventListener('resize',rs);rs();
const B=[],LV=7;let TOP=0;
for(let i=0;i<LV;i++){
  const y=-260-i*400,w=190+i*55,dy=-(330+i*30);
  TOP=Math.min(TOP,y+dy);
  [-1,1].forEach(s=>{
    const j=s*(i%2?.9:1);
    B.push({k:'b',p:[[0,y],[j*w*.7,y+25],[j*w*1.12,y+dy*.45],[j*w*.85,y+dy]],r:[[j*w*.28,y+dy*.62]],t:.38,l:i});
  });
  // small hooks at the edges like the logo
  [-1,1].forEach(s=>B.push({k:'h',x:s*(w*.98),y:y+dy*.5,s}));
}
const sway=t=>Math.sin(t/2500)*3;
function drawBranch(b,t,gl){
  const [a,c1,c2,d]=b.p,x=(u,k)=>{const m=1-u;return m*m*m*a[k]+3*m*m*u*c1[k]+3*m*u*u*c2[k]+u*u*u*d[k]};
  cx.beginPath();cx.moveTo(a[0],a[1]);cx.bezierCurveTo(c1[0],c1[1],c2[0],c2[1],d[0],d[1]);cx.stroke();
  const px=x(b.t,0),py=x(b.t,1);
  cx.beginPath();cx.moveTo(px,py);cx.quadraticCurveTo(b.r[0][0],b.r[0][1],d[0],d[1]);cx.stroke();
  cx.save();cx.fillStyle=`rgba(57,255,136,${gl*.16})`;cx.beginPath();cx.moveTo(px,py);cx.quadraticCurveTo(b.r[0][0],b.r[0][1],d[0],d[1]);cx.quadraticCurveTo(c2[0],c2[1]+(d[1]-c2[1])*.2,px,py);cx.fill();cx.restore();
}
function trunk(){
  [-1,1].forEach(s=>{cx.beginPath();cx.moveTo(s*14,70);cx.bezierCurveTo(s*6,-300,-s*22,-1200,s*8,TOP+260);cx.stroke()});
}
function roots(){
  const R=[[-1,300,180],[1,300,180],[-1,200,330],[1,200,330],[-1,90,420],[1,90,420]];
  R.forEach(([s,w,h],i)=>{cx.beginPath();cx.moveTo(0,0);cx.bezierCurveTo(s*w*.15,h*.35,s*w*.9,h*.35,s*w*(1+i*.1),h);cx.stroke();
    cx.beginPath();cx.moveTo(s*w*.4,h*.32);cx.quadraticCurveTo(s*w*.3,h*.75,s*w*.5,h*1.05);cx.stroke()});
}
function hexa(r,y){cx.beginPath();for(let i=0;i<6;i++){const a=Math.PI/6+i*Math.PI/3-Math.PI/2+Math.PI/6;cx[i?'lineTo':'moveTo'](Math.cos(a)*r,y+Math.sin(a)*r)}cx.closePath();cx.stroke()}
let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
const segs=[],leaves=[];
function grow(x,y,a,len,d,maxd,root){
  const x2=x+Math.cos(a)*len,y2=y+Math.sin(a)*len;
  const bend=(rnd()-.5)*len*.5;
  segs.push({x,y,x2,y2,cx:(x+x2)/2+bend,cy:(y+y2)/2,w:Math.max(.6,(maxd-d)*(root?1:1.5)),d,root});
  if(d>=maxd){ if(!root)leaves.push({x:x2,y:y2,a:a+(rnd()-.5),s:14+rnd()*22,p:rnd()*6});return}
  const n=d<1?3:2;
  for(let i=0;i<n;i++){
    const spread=(i-(n-1)/2)*(root?.55:.5)+(rnd()-.5)*.25;
    grow(x2,y2,a+spread,len*(.74+rnd()*.12),d+1,maxd,root);
  }
}
grow(0,0,-Math.PI/2,430,0,8,false);
grow(0,0,Math.PI/2,260,0,6,true);
let wv=0,wvT=0;
function drawOld(t){
  const sc=(1+prog*1.1)*D*Math.min(1,innerWidth/900+.4);
  const camY=900*(1-prog)*(1-prog)*0.2+(300-prog*(-TOP0+400));
  cv.style.opacity=1;
  cx.clearRect(0,0,W,H);
  cx.save();cx.translate(W/2,H*.5);cx.scale(sc,sc);cx.translate(0,camY);
  cx.lineCap='round';cx.shadowColor='#39ff88';
  for(const s of segs){
    const pulse=.5+.5*Math.sin(t/900-s.d*.9+(s.root?3:0));
    cx.strokeStyle=s.root?`rgba(167,243,207,${.35+pulse*.3})`:`rgba(57,255,136,${.5+pulse*.4})`;
    cx.lineWidth=s.w;cx.shadowBlur=8+pulse*10;
    cx.beginPath();cx.moveTo(s.x,s.y);cx.quadraticCurveTo(s.cx,s.cy,s.x2,s.y2);cx.stroke();
  }
  for(const l of leaves){
    const sway=Math.sin(t/1200+l.p)*.15,gl=.2+.8*wv;
    cx.save();cx.translate(l.x,l.y);cx.rotate(l.a+sway);
    cx.strokeStyle=`rgba(57,255,136,${.3+gl*.7})`;cx.fillStyle=`rgba(57,255,136,${gl*.18})`;cx.lineWidth=1.4+wv*.8;cx.shadowBlur=4+gl*18;
    cx.beginPath();cx.moveTo(0,0);cx.quadraticCurveTo(l.s*.6,-l.s*.5,l.s*1.6,0);cx.quadraticCurveTo(l.s*.6,l.s*.5,0,0);cx.fill();cx.stroke();
    cx.beginPath();cx.moveTo(0,0);cx.lineTo(l.s*1.3,0);cx.stroke();
    cx.restore();
  }
  cx.restore();
  const gy=H*.5+camY*sc;
  if(gy>-10&&gy<H+10){cx.strokeStyle='rgba(167,243,207,.25)';cx.lineWidth=D;cx.setLineDash([6*D,10*D]);cx.beginPath();cx.moveTo(0,gy);cx.lineTo(W,gy);cx.stroke();cx.setLineDash([])}
}
const TOP0=Math.min(...segs.map(s=>s.y2));
// ---- Story tree: trunk -> 5 service branches -> 10 portfolio sub-branches ----
const stCl=v=>Math.min(1,Math.max(0,v)),stEz=u=>u*u*(3-2*u);
const stSp=(p,u)=>{const l=(a,b)=>[a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u],[a,b,c,d]=p,ab=l(a,b),bc=l(b,c),cd=l(c,d),abc=l(ab,bc),bcd=l(bc,cd);return [a,ab,abc,l(abc,bcd)]};
const stBz=(p,t)=>{const m=1-t;return [m*m*m*p[0][0]+3*m*m*t*p[1][0]+3*m*t*t*p[2][0]+t*t*t*p[3][0],m*m*m*p[0][1]+3*m*m*t*p[1][1]+3*m*t*t*p[2][1]+t*t*t*p[3][1]]};
const stBd=(p,t)=>{const m=1-t;return [3*m*m*(p[1][0]-p[0][0])+6*m*t*(p[2][0]-p[1][0])+3*t*t*(p[3][0]-p[2][0]),3*m*m*(p[1][1]-p[0][1])+6*m*t*(p[2][1]-p[1][1])+3*t*t*(p[3][1]-p[2][1])]};
const stCub=q=>{cx.beginPath();cx.moveTo(q[0][0],q[0][1]);cx.bezierCurveTo(q[1][0],q[1][1],q[2][0],q[2][1],q[3][0],q[3][1]);cx.stroke()};
const stLeaf=(x,y,a,L,al)=>{cx.save();cx.translate(x,y);cx.rotate(a);cx.strokeStyle=`rgba(57,255,136,${al})`;cx.fillStyle=`rgba(57,255,136,${al*.25})`;cx.lineWidth=2;cx.beginPath();cx.moveTo(0,0);cx.quadraticCurveTo(L*.6,-L*.5,L*1.6,0);cx.quadraticCurveTo(L*.6,L*.5,0,0);cx.fill();cx.stroke();cx.restore()};
const ST_TL=[[-30,30],[-26,-300],[-20,-700],[-14,-1010]],ST_TR=ST_TL.map(([x,y])=>[-x,y]);
const ST_BR=[ // 5 service branches, attached along the upper trunk
 {n:'Bubble',p:[[0,-520],[-150,-520],[-380,-560],[-430,-760]]},
 {n:'Java',p:[[0,-620],[160,-620],[390,-670],[440,-870]]},
 {n:'WordPress',p:[[0,-730],[-130,-760],[-300,-820],[-330,-1050]]},
 {n:'UI/UX',p:[[0,-830],[130,-860],[290,-900],[300,-1110]]},
 {n:'AI & SEO',p:[[0,-1000],[-12,-1150],[14,-1280],[0,-1420]]}];
const ST_F=[90,-430,-820,-1080,-1120],ST_Z=[1,1.1,.95,.8,.8];
let sS=0;
function drawStory(t){
  // stage position: 0 roots, 1 trunk, 2 branches, 3 leaves/sub-branches, 4 canopy
  const ids=['roots','team','services','work','estimate'],cs=ids.map(id=>{const e=$(id);return e?e.offsetTop+e.offsetHeight/2:0}),y=scrollY+innerHeight/2;
  let sT=0;if(y>=cs[4])sT=4;else if(y>cs[0]){for(let i=0;i<4;i++)if(y<=cs[i+1]){sT=i+(y-cs[i])/Math.max(1,cs[i+1]-cs[i]);break}}
  sS+=(sT-sS)*.08;const s=sS,i0=Math.min(3,Math.floor(s)),f=s-i0;
  const focus=ST_F[i0]+(ST_F[i0+1]-ST_F[i0])*f,zm=ST_Z[i0]+(ST_Z[i0+1]-ST_Z[i0])*f;
  const sc=D*Math.min(1,Math.max(.42,innerWidth/1250))*zm,camY=-focus,xo=innerWidth>800?-W*.18*(1-stCl(s*2)):0;
  cv.style.opacity=.9;
  cx.setTransform(1,0,0,1,0,0);cx.globalCompositeOperation='source-over';cx.shadowBlur=0;cx.clearRect(0,0,W,H);
  cx.save();cx.translate(W/2+xo,H*.5);cx.scale(sc,sc);cx.translate(0,camY);
  cx.lineCap='round';cx.lineJoin='round';cx.shadowColor='#39ff88';
  const pu=.5+.5*Math.sin(t/900);cx.shadowBlur=8+pu*6;
  cx.strokeStyle='rgba(167,243,207,.55)';cx.lineWidth=3;roots();
  // trunk: a single line like the branches
  const ut=.35+.65*stCl(s);cx.strokeStyle='#39ff88';cx.lineWidth=7;cx.shadowBlur=10+pu*8;stCub(stSp([[0,30],[-6,-300],[8,-700],[0,-1010]],ut));
  // 5 service branches
  cx.shadowBlur=8+pu*6;
  ST_BR.forEach((b,k)=>{
    const u=stEz(stCl((s-1.55-k*.1)/.55));if(u<=0)return;
    cx.strokeStyle='#39ff88';cx.lineWidth=7-k*.3;stCub(stSp(b.p,u));
    const tip=stBz(b.p,u);
    // label + node at the tip while in the services stage
    const la=stCl(1-Math.abs(s-2)*1.4)*u;
    if(la>.02){cx.save();cx.translate(tip[0],tip[1]);cx.shadowBlur=0;cx.strokeStyle=`rgba(57,255,136,${la})`;cx.lineWidth=2.5;cx.beginPath();for(let q=0;q<6;q++){const a=q*Math.PI/3+Math.PI/6;cx[q?'lineTo':'moveTo'](Math.cos(a)*16,Math.sin(a)*16)}cx.closePath();cx.stroke();
      cx.restore()}
    // 2 sub-branches per service = portfolio
    [[.55,.65],[.8,-.65]].forEach(([tt,rot],j)=>{
      const v=stEz(stCl((s-2.55-k*.07-j*.05)/.5));if(v<=0)return;
      const P=stBz(b.p,tt),T=stBd(b.p,tt),a=Math.atan2(T[1],T[0])+rot,len=190*v,ex=P[0]+Math.cos(a)*len,ey=P[1]+Math.sin(a)*len;
      cx.strokeStyle='#39ff88';cx.lineWidth=3.6;cx.beginPath();cx.moveTo(P[0],P[1]);cx.quadraticCurveTo(P[0]+Math.cos(a-rot*.3)*len*.6,P[1]+Math.sin(a-rot*.3)*len*.6,ex,ey);cx.stroke();
    });
  });
  cx.restore();
  const gy=H*.5+camY*sc;
  if(gy>-10&&gy<H+10){cx.strokeStyle='rgba(167,243,207,.25)';cx.lineWidth=D;cx.setLineDash([6*D,10*D]);cx.beginPath();cx.moveTo(0,gy);cx.lineTo(W,gy);cx.stroke();cx.setLineDash([])}
}
let prog=0,tprog=0;
addEventListener('scroll',()=>{const m=document.documentElement.scrollHeight-innerHeight;tprog=m>0?scrollY/m:0});
const stages=['ROOTS','TRUNK','BRANCHES','LEAVES','CANOPY'],dots=document.querySelectorAll('#depth i');
function draw(t){
  const hm=window.RK==='home';cv.style.display=hm?'':'none';$('depth').style.display=hm?'':'none';$('stage').style.display=hm?'':'none';
  if(!hm){requestAnimationFrame(draw);return}
  if(window.RK==='home'){const wk=$('work');if(wk){const c=wk.offsetTop+wk.offsetHeight/2;tprog=Math.min(1,Math.max(0,scrollY/Math.max(1,c-innerHeight/2)));wvT=Math.max(0,1-Math.abs(scrollY+innerHeight/2-c)/innerHeight)}}
  wv+=(wvT-wv)*.08;
  prog+=(tprog-prog)*.07;
  if(window.RK==='home'){drawStory(t);let si=0;['roots','team','services','work','estimate'].forEach((id,i)=>{const e=$(id);if(e&&e.offsetTop<=scrollY+innerHeight*.5)si=i});dots.forEach((d,i)=>d.classList.toggle('on',i<=si));$('stage').textContent=stages[si]+' · '+String(Math.round(prog*100)).padStart(2,'0')+'%';requestAnimationFrame(draw);return}
  const sc=(1+prog*.5)*D*Math.min(1,innerWidth/900+.45),camY=-120+prog*(-TOP-100+120);
  cv.style.opacity=.2;
  cx.clearRect(0,0,W,H);cx.save();cx.translate(W/2,H*.5);cx.scale(sc,sc);cx.translate(0,camY);
  cx.lineCap='round';cx.lineJoin='round';cx.shadowColor='#39ff88';
  const pu=.5+.5*Math.sin(t/900);cx.shadowBlur=0;
  cx.strokeStyle='rgba(167,243,207,.5)';cx.lineWidth=1.6;roots();
  cx.strokeStyle='rgba(57,255,136,.8)';cx.lineWidth=2;trunk();
  const gl=0;
  cx.save();cx.rotate(0);
  B.forEach(b=>{if(b.k==='b'){cx.save();cx.translate(sway()*(b.l+1)*.2,0);drawBranch(b,t,gl);cx.restore()}else{cx.beginPath();cx.arc(b.x,b.y,16,b.s>0?Math.PI*.5:-Math.PI*.5,b.s>0?Math.PI*1.4:Math.PI*.4+Math.PI,false);cx.stroke()}});
  cx.restore();
  
  cx.restore();
  const gy=H*.5+camY*sc;
  if(gy>-10&&gy<H+10){cx.strokeStyle='rgba(167,243,207,.25)';cx.lineWidth=D;cx.setLineDash([6*D,10*D]);cx.beginPath();cx.moveTo(0,gy);cx.lineTo(W,gy);cx.stroke();cx.setLineDash([])}
  const si=Math.min(4,Math.floor(prog*5));
  dots.forEach((d,i)=>d.classList.toggle('on',i<=si));
  $('stage').textContent=stages[si]+' · '+String(Math.round(prog*100)).padStart(2,'0')+'%';
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

}

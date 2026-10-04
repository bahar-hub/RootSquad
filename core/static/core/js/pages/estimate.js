const TYPE=[["صفحه معرفی",8],["سایت شرکتی",15],["فروشگاهی",30],["وب‌اپ",50]];
const PLAT=[["WordPress",1],["Bubble",1.3],["Java",1.8]];
const EXT=[["سئو",5],["هوش مصنوعی",20],["چندزبانه",8],["پنل مدیریت",15]];
const PER_PAGE=1.2;
export function initEstimator(){
  const $=id=>document.getElementById(id); if(!$('o-type')) return;
  const make=(box,arr,name,multi=false)=>{$(box).innerHTML=arr.map((a,i)=>`<label><input type="${multi?'checkbox':'radio'}" name="${name}" value="${i}" ${!multi&&i===0?'checked':''}><span>${a[0]}</span></label>`).join('')};
  make('o-type',TYPE,'t'); make('o-plat',PLAT,'p'); make('o-ext',EXT,'e',true);
  const calc=()=>{const t=TYPE[+document.querySelector('[name=t]:checked').value][1];const p=PLAT[+document.querySelector('[name=p]:checked').value][1];const pg=+$('pages').value;$('pv').textContent=pg;let e=0;document.querySelectorAll('[name=e]:checked').forEach(x=>e+=EXT[+x.value][1]);const base=(t+pg*PER_PAGE)*p+e;const f=n=>Math.round(n).toLocaleString('fa-IR');$('out').textContent=`${f(base*.9)} تا ${f(base*1.2)} میلیون تومان`;$('tm').textContent=`زمان تقریبی: ${f(Math.max(2,Math.ceil(base/10)))} تا ${f(Math.max(3,Math.ceil(base/7)))} هفته`;};
  document.querySelectorAll('.est input').forEach(i=>i.addEventListener('input',calc)); calc();
}

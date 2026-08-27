document.getElementById('year')?.append(new Date().getFullYear());

const menuBtn=document.querySelector('.menu-btn');
const menu=document.querySelector('.navlinks');
menuBtn?.addEventListener('click',()=>{
  const open=menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded',String(open));
});
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));

const messages=[
  {primary:'Tiefbau aus der Region.',secondary:'Sauber umgesetzt.'},
  {primary:'Hochbau mit Erfahrung.',secondary:'Solide gebaut.'},
  {primary:'Zimmerei mit Handwerk.',secondary:'Präzise gefertigt.'}
];

const primary=document.getElementById('heroPrimary');
const typed=document.getElementById('typedText');
const dots=[...document.querySelectorAll('.dot')];
let current=0;
let rotationTimer;
let typingTimer;

function typeText(text){
  clearInterval(typingTimer);
  typed.textContent='';
  let i=0;
  typingTimer=setInterval(()=>{
    typed.textContent += text.charAt(i);
    i++;
    if(i>=text.length) clearInterval(typingTimer);
  },68);
}

function showMessage(index){
  current=index;
  primary.textContent=messages[index].primary;
  dots.forEach((d,i)=>d.classList.toggle('is-active',i===index));
  typeText(messages[index].secondary);
}

function startRotation(){
  clearInterval(rotationTimer);
  rotationTimer=setInterval(()=>showMessage((current+1)%messages.length),5600);
}

dots.forEach((dot,i)=>dot.addEventListener('click',()=>{
  showMessage(i);
  startRotation();
}));

showMessage(0);
startRotation();

const heroSlides=[
 {primary:'Tiefbau aus der Region.',secondary:'Sauber umgesetzt.'},
 {primary:'Hochbau mit Erfahrung.',secondary:'Solide gebaut.'},
 {primary:'Zimmerei mit Handwerk.',secondary:'Präzise gefertigt.'}
];
const hp=document.getElementById('heroPrimary'), ht=document.getElementById('typedText');
const hd=[...document.querySelectorAll('.dot')]; let hi=0, hrot, htype;
function hShow(i){hi=i; hp.textContent=heroSlides[i].primary; hd.forEach((d,n)=>d.classList.toggle('is-active',n===i)); clearInterval(htype); ht.textContent=''; let x=0; htype=setInterval(()=>{ht.textContent+=heroSlides[i].secondary.charAt(x++);if(x>=heroSlides[i].secondary.length)clearInterval(htype)},65)}
function hStart(){clearInterval(hrot);hrot=setInterval(()=>hShow((hi+1)%heroSlides.length),5600)}
hd.forEach((d,i)=>d.addEventListener('click',()=>{hShow(i);hStart()}));hShow(0);hStart();

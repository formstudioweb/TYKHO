const cart=[];
const cartPanel=document.querySelector('.cart');
const overlay=document.querySelector('.overlay');
const toast=document.querySelector('.toast');
let certificateAmount=2000;
let currentPhoto=0;
const photos=[
  {src:'images/collection.png',name:'тарілка «Хвиля»'},
  {src:'images/hero.png',name:"чашка «М’яка»"},
  {src:'images/grater.png',name:'тарілка-тертка «Ритуал»'},
  {src:'images/collection.png',name:'набір «Тиха вечеря»'}
];

function money(value){return new Intl.NumberFormat('uk-UA').format(value)+' ₴'}
function notify(text){toast.textContent=text;toast.hidden=false;clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.hidden=true,2300)}
function addItem(name,price){cart.push({name,price:Number(price)});renderCart();notify(name+' — додано до кошика')}
function renderCart(){
  document.querySelector('.cart-btn b').textContent=cart.length;
  const items=document.querySelector('.cart-items');items.innerHTML='';
  cart.forEach((item,index)=>{const row=document.createElement('div');row.innerHTML=`<span>${item.name}</span><button data-remove="${index}">Видалити</button>`;items.append(row)});
  document.querySelector('.empty').hidden=cart.length>0;
  document.querySelector('.total').hidden=!cart.length;
  document.querySelector('.checkout').hidden=!cart.length;
  document.querySelector('.total strong').textContent=money(cart.reduce((sum,item)=>sum+item.price,0));
}
function openCart(){cartPanel.classList.add('open');overlay.classList.add('visible')}
function closeCart(){cartPanel.classList.remove('open');overlay.classList.remove('visible')}
function showPhoto(index){currentPhoto=(index+photos.length)%photos.length;const modal=document.querySelector('.lightbox');const photo=photos[currentPhoto];modal.querySelector('img').src=photo.src;modal.querySelector('img').alt=photo.name;modal.querySelector('p').textContent=photo.name;modal.hidden=false;document.body.style.overflow='hidden'}
function closePhoto(){document.querySelector('.lightbox').hidden=true;document.body.style.overflow=''}

document.querySelectorAll('[data-product]').forEach(button=>button.addEventListener('click',()=>addItem(button.dataset.product,button.dataset.price)));
document.querySelector('.cart-btn').addEventListener('click',openCart);
document.querySelector('.cart-close').addEventListener('click',closeCart);
overlay.addEventListener('click',closeCart);
document.querySelector('.cart-items').addEventListener('click',event=>{const button=event.target.closest('[data-remove]');if(!button)return;cart.splice(Number(button.dataset.remove),1);renderCart()});
document.querySelector('.menu-btn').addEventListener('click',()=>document.querySelector('.nav').classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',()=>document.querySelector('.nav').classList.remove('open')));
document.querySelectorAll('[data-amount]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-amount]').forEach(x=>x.classList.remove('selected'));button.classList.add('selected');certificateAmount=Number(button.dataset.amount);document.querySelector('.gift-card strong').textContent=money(certificateAmount)}));
document.querySelector('.certificate-add').addEventListener('click',()=>addItem('Сертифікат TYKHO',certificateAmount));
document.querySelector('.newsletter form').addEventListener('submit',event=>{event.preventDefault();event.currentTarget.reset();notify('Готово — повідомимо про нову партію')});
document.querySelector('.checkout').addEventListener('click',()=>notify('Це демонстраційний кошик портфоліо'));
document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>showPhoto(Number(button.dataset.zoom))));
document.querySelector('.lightbox-close').addEventListener('click',closePhoto);
document.querySelector('.lightbox').addEventListener('click',event=>{if(event.target===event.currentTarget)closePhoto()});
document.querySelector('.lightbox .prev').addEventListener('click',()=>showPhoto(currentPhoto-1));
document.querySelector('.lightbox .next').addEventListener('click',()=>showPhoto(currentPhoto+1));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closePhoto();if(!document.querySelector('.lightbox').hidden&&event.key==='ArrowLeft')showPhoto(currentPhoto-1);if(!document.querySelector('.lightbox').hidden&&event.key==='ArrowRight')showPhoto(currentPhoto+1)});

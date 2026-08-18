// Mobile nav toggle
const menu=document.querySelector(".menu");
const nav=document.querySelector(".nav");
if(menu&&nav){
menu.addEventListener("click",()=>{
 const open=nav.classList.toggle("mobile-open");
 if(open){
   nav.style.display="flex";
   nav.style.position="absolute";
   nav.style.top="86px";
   nav.style.left="0";
   nav.style.right="0";
   nav.style.background="#fff";
   nav.style.borderTop="1px solid #e2e5ea";
   nav.style.padding="24px";
   nav.style.flexDirection="column";
   nav.style.alignItems="flex-start";
   nav.style.gap="18px";
   nav.style.boxShadow="0 12px 24px rgba(15,36,56,.08)";
 }else nav.style.display="";
});
}

// Elegant carousel (arrow scroll + dot indicators)
document.querySelectorAll(".carousel").forEach(carousel=>{
 const track=carousel.querySelector(".carousel-track");
 const prev=carousel.querySelector(".carousel-arrow.prev");
 const next=carousel.querySelector(".carousel-arrow.next");
 const dotsWrap=carousel.querySelector(".carousel-dots");
 const slides=[...track.children];
 if(!slides.length) return;

 function pageCount(){
   const slideWidth=slides[0].getBoundingClientRect().width;
   const gap=parseFloat(getComputedStyle(track).gap)||0;
   const perPage=Math.max(1,Math.round((track.clientWidth+gap)/(slideWidth+gap)));
   return Math.max(1,Math.ceil(slides.length/perPage));
 }
 function pageWidth(){
   return track.clientWidth;
 }
 function currentPage(){
   return Math.round(track.scrollLeft/Math.max(1,pageWidth()));
 }
 function buildDots(){
   const pages=pageCount();
   dotsWrap.innerHTML="";
   for(let i=0;i<pages;i++){
     const b=document.createElement("button");
     if(i===0) b.classList.add("active");
     b.setAttribute("aria-label","Go to slide group "+(i+1));
     b.addEventListener("click",()=>{
       track.scrollTo({left:i*pageWidth(),behavior:"smooth"});
     });
     dotsWrap.appendChild(b);
   }
 }
 function updateArrows(){
   const max=track.scrollWidth-track.clientWidth-2;
   if(prev) prev.disabled=track.scrollLeft<=2;
   if(next) next.disabled=track.scrollLeft>=max;
 }
 function updateDots(){
   const dots=[...dotsWrap.children];
   const idx=Math.min(currentPage(),dots.length-1);
   dots.forEach((d,i)=>d.classList.toggle("active",i===idx));
 }

 buildDots();
 updateArrows();

 if(prev) prev.addEventListener("click",()=>track.scrollBy({left:-pageWidth(),behavior:"smooth"}));
 if(next) next.addEventListener("click",()=>track.scrollBy({left:pageWidth(),behavior:"smooth"}));

 let scrollTimer;
 track.addEventListener("scroll",()=>{
   updateArrows();
   clearTimeout(scrollTimer);
   scrollTimer=setTimeout(updateDots,80);
 });
 window.addEventListener("resize",()=>{
   buildDots();
   updateArrows();
   updateDots();
 });
});

// Contact form (no backend — confirms client-side)
const contactForm=document.getElementById("contact-form");
if(contactForm){
contactForm.addEventListener("submit",e=>{
 e.preventDefault();
 const note=document.getElementById("form-note");
 if(note){
   note.textContent="Thanks — your enquiry has been noted. This demo form isn't connected to a server yet.";
   note.classList.add("show");
 }
 contactForm.reset();
});
}

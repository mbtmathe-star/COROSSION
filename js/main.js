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

// Animated stat counters (count up from 0 when scrolled into view)
const counters=document.querySelectorAll("[data-count]");
if(counters.length){
 const animateCounter=el=>{
   const target=parseFloat(el.dataset.count);
   const suffix=el.dataset.suffix||"";
   const duration=1400;
   const start=performance.now();
   function tick(now){
     const progress=Math.min((now-start)/duration,1);
     const eased=1-Math.pow(1-progress,3);
     const value=Math.round(target*eased);
     el.textContent=value.toLocaleString()+suffix;
     if(progress<1) requestAnimationFrame(tick);
   }
   requestAnimationFrame(tick);
 };
 const immediate=[...counters].filter(el=>el.dataset.animate==="onload");
 const deferred=[...counters].filter(el=>el.dataset.animate!=="onload");
 immediate.forEach(animateCounter);
 if(deferred.length){
   if("IntersectionObserver" in window){
     const observer=new IntersectionObserver(entries=>{
       entries.forEach(entry=>{
         if(entry.isIntersecting){
           animateCounter(entry.target);
           observer.unobserve(entry.target);
         }
       });
     },{threshold:0.4});
     deferred.forEach(el=>observer.observe(el));
   }else{
     deferred.forEach(animateCounter);
   }
 }
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

// Contact forms (no backend — confirms client-side)
document.querySelectorAll("form.ajax-form").forEach(form=>{
 form.addEventListener("submit",e=>{
   e.preventDefault();
   const note=form.querySelector(".form-note");
   if(note){
     note.textContent="Thanks — your enquiry has been noted. This demo form isn't connected to a server yet.";
     note.classList.add("show");
   }
   form.reset();
 });
});

// Interactive process diagram (click/keyboard to step through)
const processDiagram=document.querySelector(".process-diagram");
if(processDiagram){
 const cards=[...processDiagram.querySelectorAll(".process-card")];
 const fill=processDiagram.querySelector(".process-fill");
 function setActiveStep(index){
   cards.forEach((c,i)=>c.classList.toggle("active",i===index));
   if(fill){
     const diagramRect=processDiagram.getBoundingClientRect();
     const circleRect=cards[index].querySelector(".process-num").getBoundingClientRect();
     const centerX=circleRect.left+circleRect.width/2-diagramRect.left;
     fill.style.width=Math.max(0,centerX-22)+"px";
   }
 }
 cards.forEach((card,i)=>{
   card.setAttribute("tabindex","0");
   card.setAttribute("role","button");
   card.setAttribute("aria-label","Step "+(i+1));
   card.addEventListener("click",()=>setActiveStep(i));
   card.addEventListener("keydown",e=>{
     if(e.key==="Enter"||e.key===" "){e.preventDefault();setActiveStep(i);}
   });
 });
 setActiveStep(0);
 window.addEventListener("resize",()=>{
   const activeIndex=Math.max(0,cards.findIndex(c=>c.classList.contains("active")));
   setActiveStep(activeIndex);
 });
}

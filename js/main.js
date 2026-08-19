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

// Expandable offer/product lists (accordion — one open at a time per list)
document.querySelectorAll(".offer-list").forEach(list=>{
 const items=[...list.querySelectorAll(".offer-item")];
 items.forEach(item=>{
   const head=item.querySelector("h3");
   head.setAttribute("tabindex","0");
   head.setAttribute("role","button");
   const toggle=()=>{
     const wasActive=item.classList.contains("active");
     items.forEach(i=>i.classList.remove("active"));
     if(!wasActive) item.classList.add("active");
   };
   head.addEventListener("click",toggle);
   head.addEventListener("keydown",e=>{
     if(e.key==="Enter"||e.key===" "){e.preventDefault();toggle();}
   });
 });
});

// Sitewide scroll-reveal animation (progressive enhancement — elements
// stay visible by default; JS hides them only once it's ready to reveal)
(function(){
 const reduceMotion=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(reduceMotion||!("IntersectionObserver" in window)) return;
 const targets=document.querySelectorAll(
   ".section-header, .value-card, .offer-item, .offer-image-panel, .industry-card, .cert-card, .about-image, .about-copy, .contact-form-card, .contact-info-card, .process-card, .marquee-viewport"
 );
 if(!targets.length) return;
 targets.forEach(el=>el.classList.add("reveal-init"));
 const observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
     if(entry.isIntersecting){
       entry.target.classList.add("reveal-visible");
       observer.unobserve(entry.target);
     }
   });
 },{threshold:0.15});
 targets.forEach(el=>observer.observe(el));
})();

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

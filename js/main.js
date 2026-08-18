// Mobile nav toggle
const menu=document.querySelector(".menu");
const nav=document.querySelector(".nav");
if(menu&&nav){
menu.addEventListener("click",()=>{
 const open=nav.classList.toggle("mobile-open");
 if(open){
   nav.style.display="flex";
   nav.style.position="absolute";
   nav.style.top="75px";
   nav.style.left="0";
   nav.style.right="0";
   nav.style.background="#fff";
   nav.style.padding="25px";
   nav.style.flexDirection="column";
   nav.style.alignItems="flex-start";
   nav.style.gap="20px";
 }else nav.style.display="";
});
}

// Projects filter (Projects page)
const filterBtns=document.querySelectorAll(".filter-btn");
const filterItems=document.querySelectorAll("[data-category]");
if(filterBtns.length&&filterItems.length){
filterBtns.forEach(btn=>{
 btn.addEventListener("click",()=>{
   filterBtns.forEach(b=>b.classList.remove("active"));
   btn.classList.add("active");
   const cat=btn.dataset.filter;
   filterItems.forEach(item=>{
     item.classList.toggle("hidden",cat!=="all"&&item.dataset.category!==cat);
   });
 });
});
}

// FAQ accordion
document.querySelectorAll(".faq-question").forEach(q=>{
 q.addEventListener("click",()=>{
   const item=q.closest(".faq-item");
   const wasOpen=item.classList.contains("open");
   item.parentElement.querySelectorAll(".faq-item").forEach(i=>i.classList.remove("open"));
   if(!wasOpen) item.classList.add("open");
 });
});

// Contact form (no backend — confirms client-side)
const contactForm=document.getElementById("contact-form");
if(contactForm){
contactForm.addEventListener("submit",e=>{
 e.preventDefault();
 const note=document.getElementById("form-note");
 if(note){
   note.textContent="Thanks — your message has been noted. This demo form isn't connected to a server yet.";
   note.classList.add("show");
 }
 contactForm.reset();
});
}

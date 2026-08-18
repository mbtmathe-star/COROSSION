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

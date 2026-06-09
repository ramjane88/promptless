const SELECTORS=['[contenteditable="true"]','.ProseMirror','#prompt-textarea','.ql-editor','textarea','[role="textbox"]'];
let activeEl=null;
function getText(el){return el.tagName==='TEXTAREA'?el.value:el.innerText||'';}
function setText(el,text){if(el.tagName==='TEXTAREA'){el.value=text;el.dispatchEvent(new Event('input',{bubbles:true}));}else{el.focus();document.execCommand('selectAll');document.execCommand('insertText',false,text);}}
function injectBtn(el){
if(document.getElementById('pl-btn'))return;
activeEl=el;
const btn=document.createElement('button');
btn.id='pl-btn';btn.innerHTML='✦ Promptless';
btn.onclick=async(e)=>{e.preventDefault();e.stopPropagation();
const text=getText(activeEl);if(!text.trim())return;
btn.innerHTML='✦ ...';btn.disabled=true;
const r=await chrome.runtime.sendMessage({action:'optimize',text});
if(r.success)setText(activeEl,r.optimized);
btn.innerHTML='✦ Promptless';btn.disabled=false;};
const w=document.createElement('div');w.id='pl-wrap';w.appendChild(btn);
(el.closest('form')||el.parentElement).appendChild(w);}
document.addEventListener('focusin',(e)=>{const el=e.target;if(SELECTORS.some(s=>{try{return el.matches(s)}catch{return false}})&&el.offsetHeight>30)injectBtn(el);},true);
new MutationObserver(()=>{SELECTORS.forEach(s=>{try{document.querySelectorAll(s).forEach(el=>{if(el.offsetHeight>30&&document.activeElement===el)injectBtn(el);});}catch{}});}).observe(document.body,{childList:true,subtree:true});

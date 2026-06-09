chrome.storage.sync.get(['apiKey'],r=>{if(r.apiKey)document.getElementById('k').value=r.apiKey;});
function save(){const k=document.getElementById('k').value.trim();if(!k)return;chrome.storage.sync.set({apiKey:k},()=>{document.getElementById('s').textContent='✓ Saved!';});}

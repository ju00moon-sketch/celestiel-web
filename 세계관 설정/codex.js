(function(){
  var b=document.body,t=document.getElementById('tg'),l=document.getElementById('tgl');
  t.addEventListener('click',function(){
    b.classList.toggle('truth');
    l.textContent=b.classList.contains('truth')?'교단의 시선으로':'진실 보기';
  });
  // keyboard shortcut: T toggles the veil
  document.addEventListener('keydown',function(e){
    if(e.key==='t'||e.key==='T'){ if(!/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) t.click(); }
  });
})();

// 원화 라이트박스 — 이미지를 클릭하면 화면 가득 크게 본다
(function(){
  document.addEventListener('click',function(e){
    var img=e.target.closest?e.target.closest('.fig img, .card img.art'):null;
    if(!img)return;
    var box=document.createElement('div');
    box.className='lightbox';
    var big=document.createElement('img');
    big.src=img.currentSrc||img.src;
    big.alt=img.alt||'';
    box.appendChild(big);
    function close(){box.remove();document.removeEventListener('keydown',onKey);}
    function onKey(ev){if(ev.key==='Escape')close();}
    box.addEventListener('click',close);
    document.addEventListener('keydown',onKey);
    document.body.appendChild(box);
  });
})();

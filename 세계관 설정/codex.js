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

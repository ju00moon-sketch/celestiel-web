(function(){
  var b=document.body,t=document.getElementById('tg'),l=document.getElementById('tgl');
  // 키보드로도 누를 수 있는 버튼으로 승격
  t.setAttribute('role','button');
  t.setAttribute('tabindex','0');
  t.setAttribute('aria-pressed','false');
  t.addEventListener('click',function(){
    b.classList.toggle('truth');
    var on=b.classList.contains('truth');
    t.setAttribute('aria-pressed',on?'true':'false');
    l.textContent=on?'교단의 시선으로':'진실 보기';
  });
  t.addEventListener('keydown',function(e){
    if(e.key==='Enter'||e.key===' '){ e.preventDefault(); t.click(); }
  });
  // keyboard shortcut: T toggles the veil
  document.addEventListener('keydown',function(e){
    if(e.key==='t'||e.key==='T'){ if(!/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) t.click(); }
  });
})();

// 책갈피 바 — 머리의 점프 내비가 스크롤로 사라지면 상단에 고정 바로 따라오고, 현재 섹션을 표시한다
(function(){
  var srcs=[].slice.call(document.querySelectorAll('.jumps'));
  if(!srcs.length)return;
  var nav=document.querySelector('nav');
  // 페이지의 모든 점프 내비에서 앵커 링크를 모은다 (중복 제거)
  var seen={},links=[];
  srcs.forEach(function(j){
    [].slice.call(j.querySelectorAll('a[href^="#"]')).forEach(function(a){
      var href=a.getAttribute('href');
      if(seen[href])return;seen[href]=1;
      links.push({href:href,label:a.textContent});
    });
  });
  if(!links.length)return;
  var bar=document.createElement('div');bar.className='bookbar';
  var row=document.createElement('nav');row.className='jumps';row.setAttribute('aria-label','책갈피');
  links.forEach(function(l){
    var a=document.createElement('a');a.href=l.href;a.textContent=l.label;row.appendChild(a);
  });
  bar.appendChild(row);document.body.appendChild(bar);
  var as=[].slice.call(row.children);
  var targets=links.map(function(l){return document.getElementById(l.href.slice(1));});
  var first=srcs[0],cur=-1;
  function layout(){
    var navH=nav?nav.offsetHeight:0;
    bar.style.top=navH+'px';
    // 앵커 착지 위치를 내비 + 책갈피 바 높이만큼 내린다
    document.documentElement.style.setProperty('--anchor-off',(navH+bar.offsetHeight+14)+'px');
  }
  function spy(){
    var navH=nav?nav.offsetHeight:0;
    bar.classList.toggle('on',first.getBoundingClientRect().bottom<navH);
    var line=navH+bar.offsetHeight+60,idx=-1;
    for(var i=0;i<targets.length;i++){
      if(targets[i]&&targets[i].getBoundingClientRect().top<=line)idx=i;
    }
    if(idx!==cur){
      cur=idx;
      as.forEach(function(a,i){a.classList.toggle('here',i===idx);});
      if(idx>=0){
        var c=as[idx];
        if(row.scrollWidth>row.clientWidth)row.scrollTo({left:c.offsetLeft-24,behavior:'smooth'});
      }
    }
  }
  window.addEventListener('scroll',spy,{passive:true});
  window.addEventListener('resize',function(){layout();spy();},{passive:true});
  layout();spy();
})();

// 원화 라이트박스 — 클릭 또는 Enter·Space로 열고, 아무 데나 누르거나 Esc로 닫는다.
// 열려 있는 동안 포커스는 대화상자 안에 갇히고, 닫으면 원래 이미지로 되돌아간다.
(function(){
  var SEL='.fig img, .card img.art';
  var openBox=null;

  // 그림을 키보드로도 열 수 있는 버튼으로 승격한다
  [].forEach.call(document.querySelectorAll(SEL),function(img){
    img.setAttribute('tabindex','0');
    img.setAttribute('role','button');
    img.setAttribute('aria-label',(img.alt?img.alt+' — ':'')+'크게 보기');
  });

  function show(trigger){
    var box=document.createElement('div');
    box.className='lightbox';
    box.setAttribute('role','dialog');
    box.setAttribute('aria-modal','true');
    box.setAttribute('aria-label',(trigger.alt||'원화')+' — 확대 보기');

    var big=document.createElement('img');
    big.src=trigger.currentSrc||trigger.src;
    big.alt=trigger.alt||'';

    // 닫기 버튼 — 클릭은 상자로 올라가 닫히므로 따로 처리하지 않는다
    var close=document.createElement('button');
    close.type='button';
    close.className='lightbox-close';
    close.setAttribute('aria-label','닫기');
    close.textContent='×';

    box.appendChild(big);
    box.appendChild(close);
    document.body.appendChild(box);
    document.body.classList.add('noscroll');
    close.focus();

    function done(){
      if(!openBox)return;
      openBox=null;
      box.remove();
      document.body.classList.remove('noscroll');
      document.removeEventListener('keydown',onKey,true);
      trigger.focus();
    }
    function onKey(ev){
      if(ev.key==='Escape'){ev.preventDefault();done();return;}
      // 뒤쪽 내비로 포커스가 새어 나가지 않게 가둔다 (안에 있는 것은 닫기 버튼 하나뿐)
      if(ev.key==='Tab'){ev.preventDefault();close.focus();}
    }

    box.addEventListener('click',done);
    document.addEventListener('keydown',onKey,true);
    openBox=done;
  }

  document.addEventListener('click',function(e){
    if(openBox)return;
    var img=e.target.closest?e.target.closest(SEL):null;
    if(img)show(img);
  });
  document.addEventListener('keydown',function(e){
    if(openBox)return;
    if(e.key!=='Enter'&&e.key!==' ')return;
    var img=e.target.closest?e.target.closest(SEL):null;
    if(!img)return;
    e.preventDefault();
    show(img);
  });
})();

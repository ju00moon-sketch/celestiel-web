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

// 책갈피 바 — 머리의 점프 내비가 스크롤로 사라지면 상단에 고정 바로 따라오고, 현재 섹션을 표시한다.
// 페이지 안 점프 그룹이 둘 이상이면 첫 그룹(페이지 전체 목차)은 오른쪽 사이드 레일로 빼고
// 상단 바에는 절 안의 세부 목차만 남긴다 — 두 목차가 위아래로 겹쳐 보이는 것을 막는다.
(function(){
  var groups=[].slice.call(document.querySelectorAll('.jumps'));
  if(!groups.length)return;
  var nav=document.querySelector('body > nav');

  // 첫 그룹은 언제나 페이지 전체 목차이므로 오른쪽 레일이 맡는다.
  // 그룹이 하나뿐인 편은 상단 바에 남길 것이 없으므로 바 자체를 감춘다.
  var railHref={};
  [].forEach.call(groups[0].querySelectorAll('a[href^="#"]'),function(a){
    railHref[a.getAttribute('href')]=1;
  });

  var seen={},links=[];
  groups.forEach(function(j){
    [].slice.call(j.querySelectorAll('a[href^="#"]')).forEach(function(a){
      var href=a.getAttribute('href');
      if(seen[href])return;seen[href]=1;
      links.push({href:href,label:a.textContent,rail:!!railHref[href]});
    });
  });
  if(!links.length)return;

  var bar=document.createElement('div');bar.className='bookbar';
  var row=document.createElement('nav');row.className='jumps';row.setAttribute('aria-label','책갈피');
  links.forEach(function(l){
    var a=document.createElement('a');a.href=l.href;a.textContent=l.label;
    if(l.rail)a.setAttribute('data-rail','');
    row.appendChild(a);
  });
  if(groups.length===1)bar.classList.add('rail-only');
  bar.appendChild(row);document.body.appendChild(bar);

  // 사이드 레일 — 넓은 화면에서만 보이고, 좁아지면 CSS가 숨기고 상단 바가 전부 떠맡는다
  var railWrap=document.createElement('div');railWrap.className='rail';
  var rlabel=document.createElement('div');rlabel.className='rlabel';rlabel.textContent='CONTENTS';
  railWrap.appendChild(rlabel);
  var railNav=document.createElement('nav');railNav.className='railnav';
  railNav.setAttribute('aria-label','페이지 목차');
  links.forEach(function(l){
    if(!l.rail)return;
    var a=document.createElement('a');a.href=l.href;a.textContent=l.label;
    railNav.appendChild(a);
  });
  railWrap.appendChild(railNav);document.body.appendChild(railWrap);

  // 상단 바는 자기 목차를 가진 절 안에 있을 때만 뜬다 — 그 절을 지나가면 사라진다
  var barOwner=groups.length>1?groups[1].closest('section'):null;
  var barMarks=[].slice.call(row.children);
  var railMarks=[].slice.call(document.querySelectorAll('.railnav a'));
  var targets=links.map(function(l){return document.getElementById(l.href.slice(1));});
  var first=groups[0],cur=-1,curRail=-1;

  function layout(){
    var navH=nav?nav.offsetHeight:0;
    bar.style.top=navH+'px';
    // 앵커 착지 위치를 내비 + 책갈피 바 높이만큼 내린다
    document.documentElement.style.setProperty('--anchor-off',(navH+bar.offsetHeight+14)+'px');
  }
  function spy(){
    var navH=nav?nav.offsetHeight:0;
    var past=first.getBoundingClientRect().bottom<navH;
    var inOwner=true;
    if(barOwner){
      var ob=barOwner.getBoundingClientRect();
      inOwner=ob.top<navH+bar.offsetHeight&&ob.bottom>navH+bar.offsetHeight;
    }
    bar.classList.toggle('on',past&&inOwner);
    railWrap.classList.toggle('on',past);
    var line=navH+bar.offsetHeight+60,idx=-1,ridx=-1;
    for(var i=0;i<targets.length;i++){
      if(targets[i]&&targets[i].getBoundingClientRect().top<=line){
        idx=i;
        if(links[i].rail)ridx=i;
      }
    }
    if(idx!==cur){
      cur=idx;
      var href=idx>=0?links[idx].href:null;
      barMarks.forEach(function(a){a.classList.toggle('here',a.getAttribute('href')===href);});
      var c=row.querySelector('a.here');
      if(c&&row.scrollWidth>row.clientWidth)row.scrollTo({left:c.offsetLeft-24,behavior:'smooth'});
    }
    // 레일은 자기 그룹(페이지 전체 목차) 안에서 현재 위치를 따로 표시한다
    if(ridx!==curRail){
      curRail=ridx;
      var rhref=ridx>=0?links[ridx].href:null;
      railMarks.forEach(function(a){a.classList.toggle('here',a.getAttribute('href')===rhref);});
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

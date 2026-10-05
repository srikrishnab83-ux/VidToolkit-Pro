
// VidToolkit-Pro - REAL AdMob IDs Injected
const ADMOB_CONFIG = {
  publisherId: 'ca-pub-3669501893002041',
  appId: 'ca-app-pub-3669501893002041~7340302451',
  slots: {
    topBanner: '5836658255',      // ca-app-pub-3669501893002041/5836658255
    inContent: '5836658255',      // using banner for in-feed too
    afterTool: '2901615569',       // ca-app-pub-3669501893002041/2901615569 interstitial
    sidebar: '5836658255'
  },
  fullUnits: {
    banner: 'ca-app-pub-3669501893002041/5836658255',
    interstitial: 'ca-app-pub-3669501893002041/2901615569'
  },
  testMode: false
};

(function injectAdSense(){
  if(document.querySelector('script[src*="adsbygoogle.js"]')) return;
  const s=document.createElement('script');
  s.async=true;
  s.src=`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADMOB_CONFIG.publisherId}`;
  s.crossOrigin='anonymous';
  document.head.appendChild(s);
})();

function createAdSlot(slotId, format='auto', label='ADVERTISEMENT'){
  const wrap=document.createElement('div');
  wrap.className='admob-ad-wrap';
  wrap.innerHTML=`
    <div style="text-align:center;font-size:10px;color:#888;margin:6px 0;letter-spacing:1px">${label} - ${ADMOB_CONFIG.publisherId}</div>
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="${ADMOB_CONFIG.publisherId}"
         data-ad-slot="${slotId}"
         data-ad-format="${format}"
         data-full-width-responsive="true"></ins>`;
  setTimeout(()=>{try{(window.adsbygoogle=window.adsbygoogle||[]).push({});}catch(e){}},600);
  return wrap;
}

document.addEventListener('DOMContentLoaded', ()=>{
  const header=document.querySelector('header, nav, .navbar');
  if(header){
    const ad=createAdSlot(ADMOB_CONFIG.slots.topBanner,'auto','TOP BANNER AD');
    header.insertAdjacentElement('afterend',ad);
  }
  const main=document.querySelector('main, #tools, .container, #grid');
  if(main && main.children.length>1){
    const ad=createAdSlot(ADMOB_CONFIG.slots.inContent,'fluid','IN-FEED AD');
    try{ main.children[1].insertAdjacentElement('afterend',ad); }catch(e){}
  }
  // Interstitial on download
  document.querySelectorAll('button').forEach(btn=>{
    if(/convert|download|generate/i.test(btn.textContent)){
      btn.addEventListener('click',()=>{
        setTimeout(()=>{try{(window.adsbygoogle=window.adsbygoogle||[]).push({});}catch(e){}},1200);
      });
    }
  });
});

window.showRewardedAd=function(onReward){
  if(window.AndroidAdInterface && window.AndroidAdInterface.showInterstitial){
    window.AndroidAdInterface.showInterstitial();
    window.onAdRewarded=onReward;
    setTimeout(()=>{ if(onReward) onReward(); },4000);
  }else{
    console.log('Interstitial Ad: ca-app-pub-3669501893002041/2901615569');
    try{(window.adsbygoogle=window.adsbygoogle||[]).push({});}catch(e){}
    if(onReward) onReward();
  }
}
console.log('AdMob Injected - App:', ADMOB_CONFIG.appId, 'Banner:', ADMOB_CONFIG.fullUnits.banner);

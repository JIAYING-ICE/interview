(function(){
  "use strict";
  var MAIN_SLIDES=14;
  var slides=[
    {name:"cover",section:""},{name:"profile",section:"education"},{name:"design",section:"education"},{name:"toolkit",section:"education"},
    {name:"portfolio",section:"portfolio"},{name:"bipv",section:"portfolio"},{name:"cpc",section:"portfolio"},{name:"mres",section:"portfolio"},
    {name:"research-direction",section:"proposal"},{name:"motivation",section:"proposal"},{name:"research-questions",section:"proposal"},{name:"research-design",section:"proposal"},{name:"contributions",section:"proposal"},{name:"future",section:"future"}
  ];
  var sections=[
    {key:"education",label:"Education",target:"profile"},{key:"portfolio",label:"Research Portfolio",target:"portfolio"},{key:"proposal",label:"Research Proposal",target:"research-direction"},{key:"future",label:"Future Plans",target:"future"}
  ];
  var toolkitCopy={
    spatial:{verb:"MEASURE",title:"Measure spatial patterns, recurrence and uncertainty",body:"Spatial statistics, hierarchical models and sensitivity analysis turn mapped variation into comparable evidence.",evidence:"Spatial statistics · hierarchical models · interpretable ML · sensitivity analysis"},
    geo:{verb:"OBSERVE",title:"Observe urban conditions across scales and time",body:"Earth observation, LiDAR, GIS and three-dimensional urban data resolve buildings, infrastructure and environmental change.",evidence:"Remote sensing · GIScience · LiDAR · OpenStreetMap · Google Earth Engine"},
    simulation:{verb:"TEST",title:"Test mechanisms, interventions and performance trade-offs",body:"System models, parametric analysis and building simulation compare explanations and alternatives under explicit assumptions.",evidence:"Causal diagrams · EnergyPlus · lifecycle assessment · agent-based and network models"}
  };
  function contentSlides(){return Array.prototype.slice.call(document.querySelectorAll(".remark-slide-content"),0,MAIN_SLIDES);}
  function go(name){window.location.hash="#"+name;}
  function createNav(content,index){
    if(index===0)return;
    var section=slides[index].section;
    var nav=document.createElement("div");nav.className="deck-nav";
    var brand=document.createElement("span");brand.className="nav-brand";brand.textContent="JIAYING LI · NUS PHD";nav.appendChild(brand);
    sections.forEach(function(item){var b=document.createElement("button");b.type="button";b.className="nav-link"+(item.key===section?" is-active":"");b.textContent=item.label;b.addEventListener("click",function(e){e.stopPropagation();go(item.target);});nav.appendChild(b);});
    var prog=document.createElement("span");prog.className="nav-progress";prog.style.width=(((index+1)/MAIN_SLIDES)*100)+"%";nav.appendChild(prog);content.appendChild(nav);
    var idx=document.createElement("div");idx.className="slide-index";idx.textContent=String(index+1).padStart(2,"0")+" / "+MAIN_SLIDES;content.appendChild(idx);
    var chip=document.createElement("div");chip.className="section-chip";chip.textContent=sections.filter(function(x){return x.key===section;})[0].label;content.appendChild(chip);
  }
  function initPanelsets(root){
    root.querySelectorAll(".web-panelset").forEach(function(set){
      var tabs=Array.prototype.slice.call(set.querySelectorAll(":scope > .web-tabs .web-tab"));
      var panels=Array.prototype.slice.call(set.querySelectorAll(":scope > .web-panels > .web-panel"));
      var defaultName=set.getAttribute("data-default")||(tabs[0]&&tabs[0].getAttribute("data-panel"));
      function activate(name){tabs.forEach(function(t){t.classList.toggle("is-active",t.getAttribute("data-panel")===name);t.setAttribute("aria-selected",t.getAttribute("data-panel")===name?"true":"false");});panels.forEach(function(p){p.classList.toggle("is-active",p.getAttribute("data-panel")===name);});}
      tabs.forEach(function(tab){tab.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();activate(tab.getAttribute("data-panel"));});});activate(defaultName);
    });
  }
  function initToolkit(root){
    var map=root.querySelector(".toolkit-map"), detail=root.querySelector(".toolkit-detail"); if(!map||!detail)return;
    map.querySelectorAll("[data-toolkit]").forEach(function(button){button.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();var key=button.getAttribute("data-toolkit"),d=toolkitCopy[key];map.setAttribute("data-active-toolkit",key);map.querySelectorAll("[data-toolkit]").forEach(function(x){x.classList.toggle("is-selected",x===button);});detail.querySelector(".toolkit-detail-kicker").textContent=d.verb;detail.querySelector(".toolkit-detail-title").textContent=d.title;detail.querySelector(".toolkit-detail-body").textContent=d.body;detail.querySelector(".toolkit-evidence span").textContent=d.evidence;});});
    var drawer=root.querySelector(".node-drawer"),open=root.querySelector(".node-drawer-toggle"),close=root.querySelector(".node-drawer-close");
    function setDrawer(state){if(!drawer)return;drawer.classList.toggle("is-open",state);drawer.setAttribute("aria-hidden",state?"false":"true");}
    if(open)open.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();setDrawer(true);});
    if(close)close.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();setDrawer(false);});
  }
  function initStructure(root){
    var drawer=root.querySelector(".structure-drawer"),open=root.querySelector(".structure-drawer-toggle"),close=root.querySelector(".structure-drawer-close");
    function setDrawer(state){if(!drawer)return;drawer.classList.toggle("is-open",state);drawer.setAttribute("aria-hidden",state?"false":"true");}
    if(open)open.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();setDrawer(true);});
    if(close)close.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();setDrawer(false);});
  }
  function initZoom(){
    var overlay=document.createElement("div");overlay.className="zoom-overlay";overlay.setAttribute("aria-hidden","true");var img=document.createElement("img");img.alt="Enlarged research figure";overlay.appendChild(img);document.body.appendChild(overlay);
    document.querySelectorAll("img.zoomable").forEach(function(el){el.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();img.src=el.currentSrc||el.src;img.alt=el.alt||"Enlarged research figure";overlay.classList.add("is-open");overlay.setAttribute("aria-hidden","false");});});
    function close(){overlay.classList.remove("is-open");overlay.setAttribute("aria-hidden","true");img.removeAttribute("src");}
    overlay.addEventListener("click",close);document.addEventListener("keydown",function(e){if(e.key==="Escape"&&overlay.classList.contains("is-open")){e.stopPropagation();close();}});
  }
  function initInternalLinks(){document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener("click",function(e){var name=a.getAttribute("href").slice(1);if(slides.some(function(s){return s.name===name;})){e.preventDefault();e.stopPropagation();go(name);}});});}
  function initialise(){
    var roots=contentSlides();if(roots.length<MAIN_SLIDES)return false;
    roots.forEach(function(root,index){createNav(root,index);initPanelsets(root);initToolkit(root);initStructure(root);});
    initZoom();initInternalLinks();document.documentElement.classList.add("deck-ready");return true;
  }
  var attempts=0;function waitForDeck(){attempts++;if(initialise()||attempts>80)return;window.setTimeout(waitForDeck,100);} 
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",waitForDeck);else waitForDeck();
})();
var T={
 es:{sub:"Carta de ejemplo · Conil",cats:["Para picar","Del mar","Bebidas"],upd:"Actualizado hoy",btn:"Agotar un plato",out:"Agotado",rec:"Recomendado"},
 en:{sub:"Sample menu · Conil",cats:["Starters","From the sea","Drinks"],upd:"Updated today",btn:"Mark one sold out",out:"Sold out",rec:"Recommended"},
 de:{sub:"Beispielkarte · Conil",cats:["Vorspeisen","Aus dem Meer","Getränke"],upd:"Heute aktualisiert",btn:"Gericht ausverkauft",out:"Ausverkauft",rec:"Empfohlen"}
};
var M=[
 [["Tortillitas de camarones",{es:"Crujientes, hechas al momento",en:"Crispy shrimp fritters, made to order",de:"Knusprige Garnelenküchlein, frisch"},"9,00"],
  ["Ensaladilla de la casa",{es:"Con atún y huevo cocido",en:"With tuna and boiled egg",de:"Mit Thunfisch und Ei"},"7,50"],
  ["Papas aliñás",{es:"Con melva y cebolleta",en:"With mackerel and spring onion",de:"Mit Makrele und Frühlingszwiebel"},"8,00"]],
 [["Atún rojo de almadraba",{es:"A la plancha con sal en escamas",en:"Grilled, with flaked salt",de:"Gegrillt, mit Salzflocken"},"19,00",1],
  ["Fritura de pescado",{es:"Pescado del día para compartir",en:"Fish of the day, to share",de:"Fisch des Tages, zum Teilen"},"16,50"],
  ["Choco a la plancha",{es:"Con ajo y perejil",en:"With garlic and parsley",de:"Mit Knoblauch und Petersilie"},"14,00"]],
 [["Caña",{es:"Cerveza de barril",en:"Draught beer",de:"Fassbier"},"1,80"],
  ["Tinto de verano",{es:"Con limón",en:"With lemon",de:"Mit Zitrone"},"3,50"],
  ["Fino",{es:"Copa de vino de Jerez",en:"Glass of sherry",de:"Glas Sherry"},"2,50"]]
];
var lang="es",cat=0,agot={};
var tabsEl=document.getElementById("tabs"),itemsEl=document.getElementById("items");
function render(){
  var t=T[lang];
  document.getElementById("sub").textContent=t.sub;
  document.getElementById("updtxt").textContent=t.upd;
  document.getElementById("agot").textContent=t.btn;
  tabsEl.innerHTML="";
  t.cats.forEach(function(c,i){
    var b=document.createElement("button");b.textContent=c;b.setAttribute("role","tab");b.setAttribute("aria-selected",i===cat);
    b.onclick=function(){cat=i;render()};tabsEl.appendChild(b);
  });
  itemsEl.innerHTML="";
  M[cat].forEach(function(it,j){
    var key=cat+"-"+j,li=document.createElement("li"),off=agot[key];
    li.innerHTML='<div class="'+(off?"out":"")+'"><b>'+it[0]+'</b><span class="d">'+it[1][lang]+'</span>'+(it[3]&&!off?'<span class="tag">'+t.rec+'</span>':'')+'</div><div class="p">'+(off?t.out:it[2]+' €')+'</div>';
    itemsEl.appendChild(li);
  });
}
document.querySelectorAll(".lang button").forEach(function(b){
  b.onclick=function(){
    lang=b.dataset.l;
    document.querySelectorAll(".lang button").forEach(function(x){x.setAttribute("aria-pressed",x===b)});
    render();
  };
});
document.getElementById("agot").onclick=function(){
  var n=M[cat].length,k=null;
  for(var j=0;j<n;j++){if(!agot[cat+"-"+j]){k=cat+"-"+j;break}}
  if(k===null){agot={}}else{agot[k]=true}
  render();
};
document.getElementById("nom").addEventListener("input",function(e){
  document.getElementById("barname").textContent=e.target.value.trim()||"Chiringuito La Cala";
});
render();
document.documentElement.classList.add("js");
var MAIL="oladigitalconil@gmail.com";
document.getElementById("pide").addEventListener("submit",function(e){
  e.preventDefault();
  var n=document.getElementById("pn").value.trim();
  var t="Hola, soy de un "+document.getElementById("pt").value+" llamado \""+n+"\" y me interesa "+document.getElementById("pq").value+". ¿Me enseñáis una demo?";
  window.location.href="mailto:"+MAIL+"?subject="+encodeURIComponent("Demo para "+n)+"&body="+encodeURIComponent(t);
});
(function(){
  var els=document.querySelectorAll("main section");
  if(!("IntersectionObserver" in window)){return}
  var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.08});
  els.forEach(function(s){s.classList.add("rv");io.observe(s)});
})();

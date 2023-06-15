// FUNÇÃO: Inicializaçã AOS =====================
AOS.init();


// FUNÇÃO: Tema Escuro ==========================
const $html = document.querySelector("html");
const $tema = document.querySelectorAll(".tema");
const $temaCheckbox = document.querySelector("#tema-checkbox");
let temaAtual = localStorage.getItem("tema");

// recupera estado do tema salvo
if (temaAtual == "escuro") {
  $html.classList.toggle("tema-escuro");
  $html.classList.toggle("tema-claro");

  let iconeTema = document.getElementsByClassName("tema-icone");
  for(let i = 0; i < iconeTema.length; i++){
    iconeTema[i].classList.toggle("fa-sun");
    iconeTema[i].classList.toggle("fa-moon");
  }
}

// recebe click ícone e troca ícone
$tema.forEach(function(el){
  el.addEventListener("click", function(){
    $temaCheckbox.click();
    
    let iconeTema = document.getElementsByClassName("tema-icone");
    for(let i = 0; i < iconeTema.length; i++){
      iconeTema[i].classList.toggle("fa-sun");
      iconeTema[i].classList.toggle("fa-moon");
    }
  });
});

// troca tema e salva estado do tema
$temaCheckbox.addEventListener("change", function(){
  $html.classList.toggle("tema-escuro");
  $html.classList.toggle("tema-claro");

  let tema = "light";
  if ($html.classList.contains("tema-escuro")) {
    tema = "escuro";
  }

  // variável local com estado
  localStorage.setItem("tema", tema); 
});


// FUNÇÃO: Exibição aleatória de Projetos =======
const bodyId = document.getElementsByTagName("body")[0].id;
// Página Inicial ===============================
if (bodyId == 'pagina-inicio'){
  const divsProjetosLinha1 = document.querySelectorAll(".projetos-inicio-linha-1");
  const divsProjetosLinha2 = document.querySelectorAll(".projetos-inicio-linha-2");
  const randomIndex1 = Math.floor(Math.random() * divsProjetosLinha1.length);
  const randomIndex2 = Math.floor(Math.random() * divsProjetosLinha2.length);

  divsProjetosLinha1.forEach(div => div.classList.add("d-none"));
  divsProjetosLinha2.forEach(div => div.classList.add("d-none"));

  divsProjetosLinha1[randomIndex1].classList.remove("d-none");
  divsProjetosLinha2[randomIndex2].classList.remove("d-none");

// Página Sobre =================================
}else if (bodyId == 'pagina-sobre'){
  const divsProjetos = document.querySelectorAll(".projetos-sobre");
  const randomIndex1 = Math.floor(Math.random() * divsProjetos.length);

  divsProjetos.forEach(div => div.classList.add("d-none"));
  divsProjetos[randomIndex1].classList.remove("d-none");
}


// FUNÇÃO: Alternar seta do Cúrriculo no clique =
function toggleArrow(id){
  var el = document.getElementById(id);

  if (el.classList.contains("fa-angle-down")){
    el.classList.remove("fa-angle-down");
    el.classList.add("fa-angle-up");
  }else{
    el.classList.remove("fa-angle-up");
    el.classList.add("fa-angle-down");
  }
}
// FUNÇÃO: MUDANÇA DE TEMA ==============================
const $html = document.querySelector("html");
const $tema = document.querySelectorAll(".tema");
const $temaCheckbox = document.querySelector("#tema-checkbox");
let temaAtual = localStorage.getItem("tema");

// recupera estado do tema salvo
if (temaAtual == "escuro") {
  $html.classList.add("tema-escuro");

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

  let tema = "light";
  if ($html.classList.contains("tema-escuro")) {
    tema = "escuro";
  }

  localStorage.setItem("tema", tema); // variável local com estado
});
// function toggleArrow(id){
//   var el = document.getElementById(id);

//   if (el.classList.contains("fa-angle-down")){
//     el.classList.remove("fa-angle-down");
//     el.classList.add("fa-angle-up");
//   }else{
//     el.classList.remove("fa-angle-up");
//     el.classList.add("fa-angle-down");
//   }
// }


// FUNÇÃO DARK THEME ==============================
const $html = document.querySelector("html");
const $theme = document.querySelectorAll(".theme");
const $themeCheckbox = document.querySelector("#theme-checkbox");
let currentTheme = localStorage.getItem("theme");

// recupera estado do tema salvo
if (currentTheme == "dark") {
  $html.classList.add("dark-theme");

  let themeIcon = document.getElementsByClassName("theme-icon");
  for(let i = 0; i < themeIcon.length; i++){
    themeIcon[i].classList.toggle("fa-sun");
    themeIcon[i].classList.toggle("fa-moon");
  }
}

// recebe click ícone e troca ícone
$theme.forEach(function(el){
  el.addEventListener("click", function(){
    $themeCheckbox.click();
    
    let themeIcon = document.getElementsByClassName("theme-icon");
    for(let i = 0; i < themeIcon.length; i++){
      themeIcon[i].classList.toggle("fa-sun");
      themeIcon[i].classList.toggle("fa-moon");
    }
  });
});

// troca tema e salva estado do tema
$themeCheckbox.addEventListener("change", function(){
  $html.classList.toggle("dark-theme");

  let theme = "light";
  if ($html.classList.contains("dark-theme")) {
    theme = "dark";
  }

  localStorage.setItem("theme", theme); // variável local com estado
});
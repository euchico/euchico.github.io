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
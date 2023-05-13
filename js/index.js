 import  {initialize} from "./streetView.js";
window.initialize = initialize;

$("#start_btn").on("click", function () {
  $("#starting_panel").fadeOut(); 
}); 
// document.querySelector('.button.start').addEventListener("click", () => {
//   document.getElementById("starting_panel").style.display= "none"; 
// })
import { csu } from "./places.js";
import  {initialize, changePosition} from "./streetView.js";

window.initialize = initialize;
window.currentPlaceId = 0; 

$(document).ready(() => {
  $("#next").attr("value", "1");
  $("#starting_panel").attr("value", "1"); 
  $(".guide_title").text(csu[window.currentPlaceId].title); 
  $("#guide_section article").hide();
  
  $("#start_btn").on("click", function () {
    $(".guide_explanation").text(csu[window.currentPlaceId].description); 
    $("#starting_panel").fadeOut(400, function () {
      if (!$("#guide_section").hasClass("minimized")) {
        $("#guide_section article").fadeToggle(1500);
      } 
      $("#starting_panel").attr("value", "0"); 
    }); 
  }); 

  $("#next").on("click", () => {
    window.currentPlaceId = $("#next").attr("value");
    changePosition(window.currentPlaceId); 
  })
  $("#prev").on("click", () => {
    window.currentPlaceId = $("#prev").attr("value");
    changePosition(window.currentPlaceId); 
  })

  $(".min_btn").on("click", () => {
    if ($("#guide_section ").hasClass("minimized")) {
      $("#guide_section article").fadeToggle(800);
    } else {
      $("#guide_section article").fadeToggle(800);
    }
    $("#guide_section ").toggleClass("minimized");
  })
})


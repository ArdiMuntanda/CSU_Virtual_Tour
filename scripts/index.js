import { csu } from "./places.js";
import  {initialize, changePosition} from "./streetView.js";
import { truncate } from "./guide.js";
window.initialize = initialize;
window.currentPlaceId = 0; 

$(document).ready(() => {
  $("#next").attr("value", "1");
  $("#starting_panel").attr("value", "1"); 
  $(".guide_title").text(csu[window.currentPlaceId].title); 
  $(".guide_title").attr("title", csu[window.currentPlaceId].title);
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
    // window.currentPlaceId = $("#next").attr("value");
    changePosition($("#next").attr("value")); 
  })
  $("#prev").on("click", () => {
    // window.currentPlaceId = $("#prev").attr("value");
    changePosition($("#prev").attr("value")); 
  })

  $(".min_btn").on("click", () => {
    if ($("#guide_section ").hasClass("minimized")) {
      $("#guide_section article").fadeToggle(800);
      $("img.min_btn").attr('src','./images/minimized.png');
    } else {
      $("#guide_section article").fadeToggle(800);
      $("img.min_btn").attr('src','./images/maximize.png');
    }
    $("#guide_section ").toggleClass("minimized");
  }); 
  
  csu.forEach(place => {
    if ($('.mobile-places article')) {
      let box = document.createElement('div');
      box.classList.add('place-box');
      box.setAttribute('value', place.id);
      box.addEventListener('click', () => {
        changePosition(place.id);
      })
      box.addEventListener('click', () => {
        changePosition(place.id);
      })
      box.innerHTML = '<figure>'+(place.id+1)+'</figure><h5>'+truncate(place.title, 8)+'</h5>';
      document.querySelector('.mobile_places article').appendChild(box);
      if (window.currentPlaceId == place.id) {
        box.classList.add('current'); 
      }
    } 
      let box = document.createElement('div');
      box.classList.add('location-box');
      box.setAttribute('value', place.id);
      box.setAttribute('title', place.title);
      box.addEventListener('click', () => {
        changePosition(place.id);
      }); 
      box.innerHTML = '<figure>'+(place.id+1)+'</figure><h5>'+truncate(place.title, 13)+'</h5>';
  
      $('.locations-panel article').append(box);
  
      if (window.currentPlaceId == place.id) {
        box.classList.add('current'); 
      }

  });
  // Mobile location navigator 
  $('.mobile_places header').click(() => {
    $('.mobile_places').toggleClass('expanded');
    $('.mobile_places article').toggleClass('show');
    if (!$("#guide_section ").hasClass("minimized")) {
      $(".min_btn").click();
    }
  })

  $(".locations-panel ").hover(() => {
    // $('.location-box-section').animate({display: 'show',width: 'show'}, 500); 
    $('.location-box-section').show(); 
    $('.places_scroll.left').show(); 

    $('.places_scroll.right').show(); 
    $('.places_scroll.left').show(); 
    
    $('.places_scroll.right').on('click', () => {
      
      var scrollAmount = $('.locations-panel section').scrollLeft()+200;
      $('.locations-panel section').animate({scrollLeft: scrollAmount}, 500);
    });
    $('.places_scroll.left').on('click', () => {
      
      var scrollAmount = $('.locations-panel section').scrollLeft()-200;
      $('.locations-panel section').animate({scrollLeft: scrollAmount}, 500);
    });

    }, () => {
      $('.places_scroll.right').hide(); 
      $('.places_scroll.left').hide(); 
      $('.location-box-section').hide();
  })
  
})

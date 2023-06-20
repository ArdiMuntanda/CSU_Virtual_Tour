import { playGuide } from "../scripts/audios.js";
export function guide(csu, location) {
    const check = findCoordinateIndex(csu, location.lng, location.lat);
     
    if (check !== parseInt(window.currentPlaceId)) {
        if (check === -1) {
            $("#guide_section article").removeClass("open");
            $("#guide_section ").removeClass("open");
            $("#guide_section article").hide(400);
        } else {
            let overlayState = $("#starting_panel").attr("value");
            if (overlayState == "0") {
                    $("#guide_section h3").text(csu[check].title);
                    $(".guide_title").attr("title", truncate(csu[check].title, 25));
                    $("#guide_section article p").text(csu[check].description);
                    window.currentPlaceId = csu[check].id; 
                    $("#prev").attr("value", csu[check].prev); 
                    $("#next").attr("value", csu[check].next); 
                    
                    if (!$("#guide_section article").hasClass("open")) {
                        $("#guide_section article").addClass("open");
                    }
    
                    if (!$("#guide_section ").hasClass("minimized")) {
                        $("#guide_section article.open").fadeIn(800); 
                    } else {
                        $("#guide_section article").hide(400); 
                    }
                    $('.location-box.current').removeClass('current');
                    
                    document.querySelectorAll('.location-box').forEach(element => {
                        if (element.getAttribute('value') == window.currentPlaceId) {
                            element.classList.add('current');
                        }
                    });

                    if ($('.mobile-places article')) {
                        $('.place-box.current').removeClass('current');
                        document.querySelectorAll('.place-box').forEach(element => {
                            if (element.getAttribute('value') == window.currentPlaceId) {
                                element.classList.add('current');
                            }
                        });
                    }

                    if (!$('.guide_btn').hasClass('muted')) {
                        playGuide(csu[check].audio); 
                    }
            }

        }

    } 
} 

function findCoordinateIndex(array, longitude, latitude) {
    const EARTH_RADIUS = 6371000; // Approximate radius of the Earth in meters
  
    for (let i = 0; i < array.length; i++) {
      const point = array[i].location;
      const { lat: pointLatitude, lng: pointLongitude } = point;
  
      // Convert longitude and latitude to radians
      const lon1 = longitude * (Math.PI / 180);
      const lat1 = latitude * (Math.PI / 180);
      const lon2 = pointLongitude * (Math.PI / 180);
      const lat2 = pointLatitude * (Math.PI / 180);
  
      // Haversine formula to calculate distance between two points
      const deltaLon = lon2 - lon1;
      const deltaLat = lat2 - lat1;
      const a = Math.sin(deltaLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = EARTH_RADIUS * c;
  
      if (distance <= 3) {
        return i; // Return the index if within 5 meters
      }
    }
  
    return -1; // Return -1 if no match found
  }

export function truncate(text, max) 
{
    return text.substr(0,max-1)+(text.length>max?'&hellip;':''); 
}
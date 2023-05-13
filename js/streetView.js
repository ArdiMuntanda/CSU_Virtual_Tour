import { guide } from "./guide.js";

export function initialize() {
    const csu = [{lat: 35.324585468807385, lng: 33.34469145172765}]; 
   
    const panorama = new google.maps.StreetViewPanorama(
      document.getElementById("pano"),
      {
        position: csu[0],
        pov: {
          heading: 40,
          pitch: -5,
        },
      }
    );
    console.log(panorama); 
    panorama.addListener("position_changed", () => {
        console.log("changed") ;
        guide(panorama.getPosition()); 
      });
      panorama.addListener("pov_changed", () => {
        const headingCell = document.getElementById("heading-cell");
        const pitchCell = document.getElementById("pitch-cell");
        console.log("heading: " + panorama.getPov().heading); 
        console.log("Pitch: " + panorama.getPov().pitch); 
      });
  }
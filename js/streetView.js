import { guide } from "./guide.js";
import {csu} from "./places.js";

export let panorama;
export function initialize() {
     panorama = new google.maps.StreetViewPanorama(
      document.getElementById("pano"),
      {
        position: csu[0].location,
        pov: {
          heading: 40,
          pitch: -5,
        },
        addressControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_LEFT,
          enabled: false // Disable address control options
        },
        linksControl: false,
        enableCloseButton: false,
      }
    );
    console.log(panorama); 
    panorama.addListener("position_changed", () => {
        // console.log(panorama.getPosition().toJSON());
        guide(csu, panorama.getPosition().toJSON()); 
      });
      // panorama.addListener("pov_changed", () => {
      //   console.log("heading: " + panorama.getPov().heading); 
      //   console.log("Pitch: " + panorama.getPov().pitch); 
      // });
}

export function changePosition(id) {
  panorama.setPosition(csu[id].location);
}
// {
//   position: { lat: 42.345573, lng: -71.098326 },
//   addressControlOptions: {
//     position: google.maps.ControlPosition.BOTTOM_CENTER,
//   },
//   linksControl: false,
//   panControl: false,
//   enableCloseButton: false,
// }
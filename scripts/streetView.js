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
        zoomControl: false,
        panControlOptions: {
          position: google.maps.ControlPosition.TOP_LEFT,
          enabled: false, 
        },
        linksControl: true,
        enableCloseButton: false,
        fullscreenControl: false,
      }
    );
    panorama.addListener("position_changed", () => {
      // console.log(panorama.getPosition().toJSON());
      guide(csu, panorama.getPosition().toJSON()); 
    });
    // panorama.addListener("pov_changed", () => {
    //   console.log('{'+"heading: " + panorama.getPov().heading+', '+"pitch: " + panorama.getPov().pitch+'}') 
    // });
}

export function changePosition(id) {
  panorama.setPosition(csu[id].location);
  panorama.setPov({ heading: csu[id].heading, pitch: csu[id].pitch });
}


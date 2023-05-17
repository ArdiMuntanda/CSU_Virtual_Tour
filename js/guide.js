export function guide(csu, location) {
    $(document).ready(()=>{
        let overlayState = $("#starting_panel").attr("value");
        if (overlayState == "0") {
            $("#guide_section article").hide(200, function () {
                let i = 0; 

                while(i < csu.length) {
                    if (location.lat == csu[i].location.lat && location.lng == csu[i].location.lng) {
                        $("#guide_section h2").text(csu[i].title);
                        $("#guide_section article p").text(csu[i].description);
                        window.currentPlaceId = csu[i].id; 

                        $("#prev").attr("value", csu[i].prev); 
                        $("#next").attr("value", csu[i].next); 
                        
                        if (!$("#guide_section article").hasClass("open")) {
                            $("#guide_section article").addClass("open");
                        }
                        if (!$("#guide_section ").hasClass("minimized")) {
                            $("#guide_section article.open").fadeToggle(800); 
                        } else {
                            $("#guide_section article").hide(400); 
                        }

                        break;

                    } else {
                        $("#guide_section article").removeClass("open");
                        $("#guide_section ").removeClass("open");
                    }
                    i++;
                }
                // csu.forEach(csu[i] => {
                //     if (location.lat == csu[i].location.lat && location.lng == csu[i].location.lng) {
                //         $("#guide_section article h2").text(csu[i].title);
                //         $("#guide_section article p").text(csu[i].description);
                //         window.currentPlaceId = csu[i].id; 

                //         if (window.currentPlaceId == 0) {
                //             $("#prev").attr("disable", "disable");
                //             $("#prev").attr("value", null);
                //             $("#next").attr("value", 1);
                        
                //         } else if (window.currentPlaceId == 18) {
                //             $("#next").attr("disable", "disable");
                //             $("#next").attr("value", null);
                //             $("#prev").attr("value", 17);
                //         } else {
                //             $("#next").attr("value", window.currentPlaceId++);
                //             $("#prev").attr("value", window.currentPlaceId--);
                //         }

                //         $("#guide_section article").addClass("open");
                //         $("#guide_section ").addClass("open");
                //         $("#guide_section article").show(1500); 
                //         $("#guide_section .open").show(1500);
                //         break;

                //     } else {
                //         $("#guide_section article").removeClass("open");
                //         $("#guide_section ").removeClass("open");
                //     }
                // });
            });   
        }
    })
} 
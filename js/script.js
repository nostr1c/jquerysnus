var insideSafeZone = "false";
var selectedSnus = 0;
var snusId = 0;

$(document).ready(function() {
    var prillaAmount = 24;
    
    $("#lock").draggable()

    for(var i = 0; i < prillaAmount; i++){
        snusId++
        let randomTop = getRandomInt(8);
        let randomLeft = getRandomInt(5);
        let randomRotate = getRandomInt(180);
        let html = `<div id="snus-${snusId}" class="snus-prilla"></div>`;
        $("#dosa-area").append(html);
        $(`#snus-${snusId}`).css("top", `${randomTop}vw`)
        .css("left", `${randomLeft}vw`)
        .css({'transform' : 'rotate('+ randomRotate +'deg)'});
    }

    $('.snus-prilla').on('mousedown', function() {
        $(".drop-zone").css("border", "0.2vw dashed #aaa");
        selectedSnus = $(':hover').last().attr('id');
        //console.log(`Current Snus ID is now: ${selectedSnus}`);
    });

    $('.snus-prilla').on('mouseup', function() {
        $(".drop-zone").css("border", "dashed 0.2vw transparent");
    });

    $('.snus-prilla').collidify({
        collides: [ $('.drop-zone')],
        revert: [ $('.snus-prilla') ],
        onCollideEnter: function() { 
            $(".drop-zone").css("border", "dashed 0.2vw transparent")
            .css("background", "#29e")
            .css("color", "#fff");
            $("#drop-title").html("Drop snus");
            insideSafeZone = "true";
        },
        onCollideLeave: function() {
            $(".drop-zone").css("border", "0.2vw dashed #aaa")
            .css("background", "#bfe4ff")
            .css("color", "black");
            $("#drop-title").html("Drag snus");
            insideSafeZone = "false";
        },
        onEnd: function() {
            //console.log(`insideSafeZone: ${insideSafeZone}`);
            if(insideSafeZone == "true") {
                prillaAmount--;
                $(`#${selectedSnus}`).remove();
                $(".drop-zone").css("background", "#bfe4ff")
                .css("color", "black");
                $("#drop-title").html("Drag snus");
                //console.log(`Removed ${selectedSnus}`);
                //console.log(`Snus left: ${prillaAmount}`);
            } else {
                $(".drop-zone").css("border", "dashed 0.2vw transparent")
                //console.log(`${selectedSnus} was not removed`)
                //console.log(`Snus left: ${prillaAmount}`);
            }
        }
      }, {
        scroll: false,
    });
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
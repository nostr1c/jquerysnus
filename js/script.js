var isInside = "false";
var selectedSnus = 0;
var snusId = 0;

$(document).ready(function() {
    var prillaAmount = 24;

    $("#lock").draggable()

    $("#snus-left").html(prillaAmount);

    for(var i = 0; i < prillaAmount; i++){
        let randomTop = getRandomInt(8);
        let randomLeft = getRandomInt(5);
        let randomRotate = getRandomInt(180);
        snusId++
        let html = `
        <div id="snus-${snusId}" class="snus-prilla draggable"></div>
        `;
        $("#dosa-area").append(html);
        $(`#snus-${snusId}`).css("top", `${randomTop}vw`)
        .css("left", `${randomLeft}vw`)
        .css({'transform' : 'rotate('+ randomRotate +'deg)'});
    }

    $('.snus-prilla').on('mousedown', function() {
        selectedSnus = $(':hover').last().attr('id');
        console.log(`Current Snus ID is now: ${selectedSnus}`);
    });

    $('.snus-prilla').collidify({
        collides: [ $('.drop-zone')],
        revert: [ $('.snus-prilla') ],
        onCollideEnter: function() {
            $(".mouth").css("background", "url('img/mouth-opened.png') no-repeat")
            .css("background-size", "cover");
            isInside = "true";
        },
        onCollideLeave: function() {
            $(".mouth").css("background", "url('img/mouth-closed.png') no-repeat")
            .css("background-size", "cover");
            isInside = "false";
        },
        onEnd: function() {
            console.log(`isInside: ${isInside}`);
        },
        onRevert: function() {
            if(isInside == "true") {
                $(".mouth").css("background", "url('img/mouth-snus.png') no-repeat")
                .css("background-size", "cover");
                $(`#${selectedSnus}`).remove();
                $("#snus-left").html(prillaAmount);
                prillaAmount--;
                console.log(`Removed ${selectedSnus}`);
            } else {
                console.log(`snus-${selectedSnus} was not removed`)
            }

        }
      }, {
        scroll: false,
        containment: "#wrapper"
    });
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
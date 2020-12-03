//instructors
class Instructor {
    constructor(name, photo, text) {
        this.name = name;
        this.photo = photo;
        this.text = text;
    }

    display() {
        $("#instructorPhoto").hide().attr("src", this.photo).fadeIn("slow");
        $("#instructorName").hide().text(this.name).fadeIn("slow");
        $("#instructorText").hide().text(this.text).fadeIn("slow");
    }
}

var instructors = [
    new Instructor("Peter Džardoš", "img/instructors/peter.jpg", "Inštruktor skupiny C a T."),
    new Instructor("Klaudia Nováková", "img/instructors/klaudia.jpg", "Inštruktorka skupiny B."),
    new Instructor("Vladislav Bartusek", "img/instructors/vlado.jpg", "Inštruktor skupiny B.")
];

$("#instructorSelector > li").on("click", function() {
    let index =  $(this).data("index");
    
    if(!$(this).hasClass("active")) {
        $("#instructorSelector > li.active").toggleClass("active");
        $(this).toggleClass("active");

        instructors[index].display();
    }
});

//galery
$(".galery-item").on("click", (event) => {
    const regex = /url\("(.*)"\)/gm;
    result = regex.exec(event.target.style.backgroundImage)
    let path = result[1];

    $("#fullscreenOverlay > img").attr("src", path);
    toggleOverlay();
});

$("#galerySlider").on("change", function() {
    $("#galeryCarousel").carousel(Number($(this).val()));
});

//overlay
function toggleOverlay() {
    $("#fullscreenOverlay").toggleClass("d-flex");
}

$("#fullscreenOverlay").on("click", toggleOverlay);

//onload
$(window).on("load", () => {
    instructors[0].display();
});

//content selection
var content = [$(".instructors"), $(".galery")]

$("#contentSelector button").on("click", function() {
    let target = $(this);
    let index = target.data("index");
    let selected = content[index];

    let previousButton = $("#contentSelector button.active");
    let previousIndex = previousButton.data("index")
    let previous = content[previousIndex];

    if(previousIndex == index) {
        return;
    }

    previousButton.toggleClass("active");
    target.toggleClass("active");

    $.each(previous, (index, value) => {
        if(value.classList.contains("d-flex")) {
            value.classList.toggle("d-flex");
            value.classList.toggle("d-none");
        } else {
            value.classList.toggle("d-none");
        }
    });

   $.each(selected, (index, value) => {
        if(value.classList.contains("d-flex")) {
            value.classList.toggle("d-flex");
            value.classList.toggle("d-none");
        } else {
            value.classList.toggle("d-none");
        }
   });
});
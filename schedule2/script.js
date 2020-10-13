let timetable_minutes = 12 * 60 - 6 * 15;

var time = 7 * 60 + 15;

window.addEventListener("load", function() {
    document.getElementById("highlight-lessons").addEventListener("click", highlightExcercises);
    document.getElementById("highlight-lectures").addEventListener("click", highlightLectures);
    document.getElementById("highlight-all").addEventListener("click", highlightAll);

    setInterval(updateTime, 100);
    updateTime();
});

function updateTime() {
    let now = new Date();
    document.getElementById("time-p").innerText = now.toLocaleString();
    
    let nowMinutes = now.getHours() * 60 + now.getMinutes();
    let day = now.getDay() - 1;
    
    let needle = document.getElementById("needle");
    if(day >= 5 || nowMinutes < 7 * 60 + 15 || nowMinutes > 19 * 60 + 15 ) {
        needle.style.display = "none";
        return;
    }

    let since715 = nowMinutes - (7 * 60 + 15);
    let offset = 15 * Math.floor(since715 / 105) + Math.max((since715 % 105) -90, 0); 

    since715 -= offset;

    let tableBounds = document.getElementById("timetable").getBoundingClientRect();
    let day_name_bounds = document.getElementsByClassName("day")[day].getBoundingClientRect();

    let left = ((tableBounds.width - day_name_bounds.width) / timetable_minutes) * since715 + day_name_bounds.width;
    let top = day_name_bounds.top;

    needle.style.left = (left - needle.getBoundingClientRect().width / 2) + "px";
    needle.style.top = top + "px";
    needle.style.display = "block";

    time += 1;
}

function highlightLectures() {
    let button = document.getElementById("highlight-lectures");

    if(button.classList.contains("button-active")) {
        switchClasses(".lecture", "lecture-highlighted", "lecture-regular");
        button.classList.remove("button-active");
        document.getElementById("highlight-all").classList.remove("button-active");
    } else {
        switchClasses(".lecture", "lecture-regular", "lecture-highlighted");
        button.classList.add("button-active");

        if(document.getElementById("highlight-lessons").classList.contains("button-active")) {
            document.getElementById("highlight-all").classList.add("button-active");
        }
    }
}

function switchClasses(element, replaced, replacement) {
    let elements = document.querySelectorAll(element);

    for (let item of elements) {
        item.classList.add(replacement);
         item.classList.remove(replaced);
    }
}

function highlightExcercises() {
    let button = document.getElementById("highlight-lessons");

    if(button.classList.contains("button-active")) {
        switchClasses(".excercise", "excercise-highlighted", "excercise-regular");
        button.classList.remove("button-active");
        document.getElementById("highlight-all").classList.remove("button-active");
    } else {
        switchClasses(".excercise", "excercise-regular", "excercise-highlighted");
        button.classList.add("button-active");

        if(document.getElementById("highlight-lectures").classList.contains("button-active")) {
            document.getElementById("highlight-all").classList.add("button-active");
        }
    }
}

function highlightAll() {
    let button = document.getElementById("highlight-all");

    if(button.classList.contains("button-active")) {
        switchClasses(".lecture", "lecture-highlighted", "lecture-regular");
        switchClasses(".excercise", "excercise-highlighted", "excercise-regular");
        button.classList.remove("button-active");
        document.getElementById("highlight-lessons").classList.remove("button-active");
        document.getElementById("highlight-lectures").classList.remove("button-active");
    } else {
        switchClasses(".lecture", "lecture-regular", "lecture-highlighted");
        switchClasses(".excercise", "excercise-regular", "excercise-highlighted");
        button.classList.add("button-active");
        document.getElementById("highlight-lessons").classList.add("button-active");
        document.getElementById("highlight-lectures").classList.add("button-active");
    }
}
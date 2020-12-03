class Specifics {
    constructor(price, registered, capacity, start) {
        this.price = price;
        this.registered = registered;
        this.capacity = capacity;
        this.start = start;
    }

    get isFull() {
        return this.registered >= this.capacity;
    }

    get started() {
        return (this.start - Date.now()) < 0;
    }
}

class Course {
    constructor(name, description, stdSpec, shortSpec, individualSpec) {
        this.name = name;
        this.description = description;
        this.standard = stdSpec;
        this.shortened = shortSpec;
        this.individual = individualSpec;
    }

    setSpec(id, spec) {
        let wrapper = document.getElementById(id);
        wrapper.getElementsByClassName("price")[0].innerText = spec.price + " €";
        if(wrapper.getElementsByClassName("registration").length > 0) {
            if(spec.registered && spec.capacity) {
                if(!spec.isFull) {
                    wrapper.getElementsByClassName("registered")[0].innerText = spec.registered;
                    wrapper.getElementsByClassName("capacity")[0].innerText = spec.capacity;
                    wrapper.getElementsByClassName("registration")[0].classList.remove("d-none");
                    wrapper.getElementsByClassName("register-bttn")[0].classList.remove("disabled");
                    wrapper.getElementsByClassName("registration-message")[0].classList.add("d-none");
                } else {
                    wrapper.getElementsByClassName("registration")[0].classList.add("d-none");
                    let messageelem = wrapper.getElementsByClassName("registration-message")[0];
                    messageelem.classList.remove("d-none");
                    wrapper.getElementsByClassName("register-bttn")[0].classList.add("disabled");

                    if(spec.started) {
                        messageelem.innerText = "Kurz začal, čoskoro zverejnímé nový termín kurzu.";
                    } else {
                        messageelem.innerText = "Kurz je plný!";
                    }
                }
            } else {
                wrapper.getElementsByClassName("registration")[0].classList.add("d-none");
            }
        }
    }
    
    updateCountDown(id, spec) {
        let wrapper = document.getElementById(id);
        let countdown = wrapper.getElementsByClassName("countdown")[0];

        if(!countdown) {
            return;
        }

        if(!spec.started) {
            let diff = spec.start - Date.now();

            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            countdown.innerText = "Kurz začína o " + (days > 0 ? (days + " dní ") : "") + 
                (hours > 0 ? (hours + " hodín ") : "") + (minutes > 0 ? (minutes + " minút ") : "");
            
            countdown.classList.remove("d-none");    
        } else {
            countdown.classList.add("d-none");
        }
    }

    updateCountdowns() {
        this.updateCountDown("standard", this.standard);
        this.updateCountDown("shortened", this.shortened);
        this.updateCountDown("individual", this.individual);
    }

    display() {
        document.getElementById("course-description").innerHTML = this.description;
        
        this.setSpec("standard", this.standard);
        this.setSpec("shortened", this.shortened);
        this.setSpec("individual", this.individual);

        document.getElementById("coures-header").innerText = "Vodičské oprávnenie skupiny " + this.name;
    }
};

let b_text = "Vodičské oprávnenie skupiny B oprávňuje viesť motorové vozidlá skupiny B, \
ako aj motorové vozidlá skupiny AM a B1; jazdnú súpravu podľa § 75 ods. 7 písm. b) zákona o cestnej premávke, \
ktorej najväčšia prípustná celková hmotnosť presahuje 3 500 kg a nepresahuje 4 250 kg, \
oprávňuje viesť len vodičské oprávnenie skupiny B s príslušným harmonizovaným kódom, \
ktoré možno udeliť po absolvovaní osobitného výcviku v autoškole alebo po zložení osobitnej skúšky z vedenia motorového vozidla. \
Vodičské oprávnenie skupiny B po dvoch rokoch od jeho udelenia oprávňuje viesť aj motorové vozidlá skupiny A1 s automatickou prevodovkou, \
a to len na území Slovenskej republiky. Vodičské oprávnenie skupiny B oprávňuje viesť na území Slovenskej republiky aj motorové vozidlá skupiny T, \
ktorých najväčšia prípustná celková hmotnosť nepresahuje 3 500 kg a jazdnú súpravu pozostávajúcu z motorového vozidla skupiny T \
a prípojného vozidla za predpokladu, že najväčšia prípustná celková hmotnosť jazdnej súpravy nepresahuje 3 500 kg."

let c_text = "Do skupiny motorových vozidiel skupiny C patria motorové vozidlá okrem skupiny D1 alebo D, \
ktoré sú konštruované a určené na prepravu najviac ôsmich osôb okrem vodiča a ktorých najväčšia \
prípustná celková hmotnosť presahuje 3 500 kg; k motorovému vozidlu tejto skupiny môže byť pripojené prípojné vozidlo s \
najväčšou prípustnou celkovou hmotnosťou nepresahujúcou 750 kg. Vodičské oprávnenie skupiny C oprávňuje viesť motorové vozidlá skupiny C, \
ako aj motorové vozidlá skupiny C1 a T. \
<p class=\"my-3 font-weight-bold\">\
Žiadateľovi o udelenie vodičského oprávnenia na vedenie motorových vozidiel skupiny C možno udeliť vodičské oprávnenie skupiny C, \
len ak už je držiteľom vodičského oprávnenia skupiny B.\
<\p>"

let t_text = "Do skupiny motorových vozidiel T patria poľnohospodárske traktory a lesné traktory, ako aj iné zvláštne motorové vozidlá; \
k motorovému vozidlu tejto skupiny smie byť pripojené prípojné vozidlo."

let b = new Course("B", b_text, 
    new Specifics('600', 7, 25, new Date(2020, 11, 16, 15)), 
    new Specifics('700', 11, 11, new Date(2020, 10, 30, 10)), 
    new Specifics('od 780', null, null, null)
);

let c = new Course("C", c_text, 
    new Specifics('1100', 20, 20, new Date(2021, 0, 7, 18)),
    new Specifics('1400', 12, 20, new Date(2020, 11, 9, 16)),
    new Specifics('od 1550', null, null, null)
);

let t = new Course("T", t_text, 
    new Specifics('300', 5, 10, new Date(2020, 11, 29, 10)),
    new Specifics('400', 7, 25, new Date(2020, 11, 7, 15)),
    new Specifics('od 450', null, null, null)
);

var active = undefined; 
var update = undefined;
var courses = [b, c, t];

function showCourseInfo() {
    var elements = document.getElementsByClassName("course-info");
    for(var i = 0; i < elements.length; i++) {
        elements[i].classList.remove("d-none");
    }
}

function hideCourseInfo() {
    var elements = document.getElementsByClassName("course-info");
    for(var i = 0; i < elements.length; i++) {
        elements[i].classList.add("d-none");
    }
}

function setActive(index) {
    active = courses[index];
    active.display();
    active.updateCountdowns();
    if(update) {
        clearInterval(update);
    }

    update = setInterval(() => {active.updateCountdowns();}, 1000 * 60);
    showCourseInfo();   
}

window.onload = function() {
    document.getElementById("courseTypeSelector").addEventListener("change", (event) => {
        let groupnum = event.target.value

        if(groupnum === '0') {
            hideCourseInfo();
            if(update) {
                clearInterval(update);
            }
        } else {
            setActive(groupnum - 1);
        }
    });

    const regex = /course=(\d*)/gm;
    let params = window.location.href.split("?")[1];
    if(params) {
        let result = regex.exec(params);
        let value = result[1];
        let num = Number(value);

        if(num > 0 && num <= courses.length) {
            document.getElementById("courseTypeSelector").value = value;
            setActive(num - 1);
        }
    }
}
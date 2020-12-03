
function nameValidation(event) {
    let nameRegex = /^[A-Z][a-z]*$/gm;
    let target = event.target;

    if(!nameRegex.test(target.value)) {
        target.setCustomValidity(target.placeholder + " musí obsahovať iba písmená a začínať veľkým písmenom");
    } else {
        target.setCustomValidity('');
    }
}

function emptyValidation(event) {
    let target = event.target;
    if(target.value === null || target.value.match(/^ *$/) !== null) {
        target.setCustomValidity("Zadajte prosím");
    } else {
        target.setCustomValidity('');
    }
}

function checkValidity(id) {
    return document.getElementById(id).checkValidity();
}

window.onload = function() {
    document.getElementById("inputName").addEventListener("input", nameValidation);
    document.getElementById("inputSurname").addEventListener("input", nameValidation);
    document.getElementById("inputSubject").addEventListener("input", emptyValidation);
    document.getElementById("inputMessage").addEventListener("input", emptyValidation);

    document.getElementById("contact-form").addEventListener("submit", (event) => {
        let valid = checkValidity("inputName") && checkValidity("inputSurname") && checkValidity("inputEmail") && checkValidity("inputSubject") && checkValidity("inputMessage");

        if(!valid) {
            event.preventDefault();
        }
    });
}
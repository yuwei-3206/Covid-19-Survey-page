
// #1 Show a following required question depends on the answer that the user gave from the question "Have you received a COVID-19 vaccine?"
$(document).ready(function(){
    $("#yesvaccine").click(function() { 
      $("#yesReceived").css("display", "block");
      $("#noReceived").css("display", "none");
    });
    
    $("#novaccine").click(function() { 
      $("#yesReceived").css("display", "none");
      $("#noReceived").css("display", "block");
    });

    // Show a following required question depends on the answer that the user gave from the question " Are you currently experiencing any COVID-19 symptons?"
    $("#havingSymptons").click(function() { 
      $("#yesSymptons").css("display", "block");
    });

    $("#noHavingSymptons").click(function() { 
      $("#yesSymptons").css("display", "none");
    });
});

// #4 Check and show a warning message when the email provided by user is not in a valid format

function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
}

// #5  Check and show a warning message when the phone provided by user is not with digits/in incorrect format
function validatePhone($tel) {
    var phoneReg = /\(?([0-9]{3})\)?([-]?)([0-9]{3})\2([0-9]{4})/;
    return phoneReg.test( $tel );
}

function validateInfo() {  
    var firstname = document.covidsurvey.firstname.value;
    var lastname = document.covidsurvey.lastname.value;
    var tel = document.covidsurvey.tel.value;
    var email = document.covidsurvey.email.value;

    var Boolean = true;

    // #3 Show warning messages below non-filled required fields or incorrect filled fields to remind the user that they're not filled or invalid
    if (firstname == "" || lastname == "") {
        $("#requiredName").css("display", "block");
        Boolean = false;
    }

    if (email == "" || !validateEmail(email)) {
        $("#requiredEmail").css("display", "block");
        Boolean = false;
    }

    if (!tel == "" && !validatePhone(tel)) {
        $("#requiredValidPhone").css("display", "block");
        Boolean = false;
    }

    // Show an alert to remind the user when required fields are not filled
    if (firstname == "" || lastname == "" || email == "" || !$("input[name='receiveVaccine']").is(":checked") || !$("input[name='havingSymptons']").is(":checked") || !$("input[name='closecontact']").is(":checked") || $("[name='receiveVaccine']:checked").val() == "Yes" && !$("input[name='vaccines']").is(":checked") || $("[name='receiveVaccine']:checked").val() == "No" && !$("input[name='noreceiveVaccine']").is(":checked") || $("[name='havingSymptons']:checked").val() == "Yes" && !$("input[name='symptons']").is(":checked") || !tel == "" && !validatePhone(tel)) {
        alert("You must answer the (*)requried fields before submit");
        Boolean = false;
    }

    if ($("[name='receiveVaccine']:checked").val() == "Yes" && !$("input[name='vaccines']").is(":checked")) {
        $("#requiredVaccine").css("display", "block");
        Boolean = false;
    }

    if ($("[name='receiveVaccine']:checked").val() == "No" && !$("input[name='noreceiveVaccine']").is(":checked")) {
        $("#requiredVaccinePlan").css("display", "block");
        Boolean = false;
    }

    if ($("[name='havingSymptons']:checked").val() == "Yes" && !$("input[name='symptons']").is(":checked")) {
        $("#requiredSymptons").css("display", "block");
        Boolean = false;
    }

    return Boolean;
}

function getPersonalInfo() {
    var firstname = document.covidsurvey.firstname.value;
    var lastname = document.covidsurvey.lastname.value;
    var phone = document.covidsurvey.tel.value;
    var email = document.covidsurvey.email.value;
    var print = "";

    // #6 The name showed on the "Confirmation page" should be a full name, concatenated by Capitalized first name and Capitalized last name.
    print += "<p>Name: " + firstname[0].toUpperCase() + firstname.slice(1) + " " + lastname[0].toUpperCase() + lastname.slice(1) + "</p>";

    if (phone.length > 0) {
        print += "<p>Phone: " + phone + "</p>";
    } else {
        print += "<p>Phone: No filled </p>";
    }

    print += "<p>Email: " + email + "</p>";

    return print;
}

function getVaccine(){
    var receiveVaccine = document.covidsurvey.receiveVaccine;
    var print = "";

    for (var i = 0; i < receiveVaccine.length; i++) {
        currentOption = receiveVaccine[i]
        if (currentOption.checked) {       
            print += "<p> Have received COVID-19 vaccine before: " + currentOption.value + "</p>"; 
            break;
        }
    } 
    return print;
}

function getVaccineName(){
    var vaccines = document.covidsurvey.vaccines;
    var vaccinesChosen = new Array();
    var print = "";

    for (var i = 0; i < vaccines.length; i++) {
        currentOption = vaccines[i]
        if (currentOption.checked) {          
            vaccinesChosen.push(currentOption.value);
        }
    }
    if (vaccinesChosen.length > 0) {
        print += "<p> Vaccine(s) that have received is/are: <br> - " + vaccinesChosen.join("<br> - ") + "</p>"; 
    } else {                    
        print = "<p> Unvaccinated.  </p>";   
    } 

    return print;
}

function getMedicalSymptonsCheck(){
    var havingSymptons = document.covidsurvey.havingSymptons;
    var print = "";

    for (var i = 0; i < havingSymptons.length; i++) {
        currentOption = havingSymptons[i]
        if (currentOption.checked) {       
            print += "<p> Currently having COVID-19 symptons: " + currentOption.value + "</p>"; 
            break;
        }
    } 
    return print;
}

function getMedicalSymptons(){
    var symptons = document.covidsurvey.symptons;
    var symptonsChosen = new Array();
    var print = "";

    for (var i = 0; i < symptons.length; i++) {
        currentOption = symptons[i]
        if (currentOption.checked) {          
            symptonsChosen.push(currentOption.value);
        }
    }
    if (symptonsChosen.length > 0) {
        print += "<p> Current sympton(s) is/are: <br> - " + symptonsChosen.join("<br> - ") + "</p>"; 
    } else {                    
        print += "<p> No symptons.</p>";   
    } 

    return print;
}

function getMedicalCloseContact(){
    var closecontact = document.covidsurvey.closecontact;        
    var print = "";

    for (var i = 0; i < closecontact.length; i++) {
        currentOption = closecontact[i]
        if (currentOption.checked) {       
            print += "<p> Have been in a close contact with someone diagonsed COVID-19: " + currentOption.value + "</p>"; 
            break;
        }
    } 
    return print;
}

// When all required fields are answered/selected, print out all received information on a page once the submit button is clicked. 
function receipt() {
    if (!validateInfo()) { return false; }

    var print = "";

    print += "<h1> COVID-19 Survey Receipt </h1>";
    print += "<h2> Personal Information </h2>";
    
    print += getPersonalInfo();

    print += "<h2> Vaccine History </h2>";
    print += getVaccine();
    print += getVaccineName();

    print += "<h2> Medical Condition </h2>"
    print += getMedicalSymptonsCheck();
    print += getMedicalSymptons();
    print += getMedicalCloseContact();

    document.write(print);

    document.write("<a href=''> Back </a>");
}

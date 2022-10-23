console.log("TEST");
let requiredFields = [
    "#username",
    "#lastName",
    "#firstName",
    "#e-mail",
    "#phone",
    "#fax",
    "#adults",
    "#checkin",
    "#checkout"
];
let dateFields = [
    "#checkin",
    "#checkout"  
];
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}
function submitButtonPress(){
    if(validateInput()){
        toastr["success"]("Your information has been submitted!", "Success!");
    }else{
        toastr["error"]("Please complete all required fields!", "Error!");
    }
}
function resetButtonPress(){
    requiredFields.forEach((a) => {
        $(a).val("");
        $(a).removeClass("has-error");
    });
    $('#adults').val(1);
    toastr["info"]("Your information has been reset!", "Info");
}
function validateInput(){
    let inputValid = true;
    requiredFields.forEach((a) => {
        if($(a).val() === ""){
            inputValid = false;
            $(a).addClass("has-error");
        }else{
            $(a).removeClass("has-error");
        }
    });
    let checkout = moment($("#checkout").val());
    let checkin = moment($("#checkin").val());
    if(!updateScheduleFields()){
        console.log("FUCK");
        inputValid = false;
        $("#checkout").addClass("has-error");
    }else{
        console.log("SHIT");
    }
    return inputValid;
}
function updateScheduleFields(){
    let validDate = true;
    let checkout = moment($("#checkout").val());
    let checkin = moment($("#checkin").val());
    let adults = $('#adults').val();
    console.log(checkin);
    console.log(checkout);
    dateFields.forEach( (a) => {
        if($(a).val() === ""){
            validDate = false;
            $(a).addClass("has-error");
        }else{
            $(a).removeClass("has-error");
        }
    });
    if(!validDate){
        return validDate;
    }
    if(checkin.isBefore(checkout,'days') && !checkin.isSame(checkout,'days')){
        let days = moment($("#checkout").val()).diff(moment($("#checkin").val()),"days");
        console.log("Days: " + days);
        $("#days").val(days);
        $("#cost").val(adults * days * 150);
    }else{
        toastr["error"]("Your Check-Out date cannot be before/on your Check-In date!", "Error!");
        validDate = false;
    }
    return validDate;
}
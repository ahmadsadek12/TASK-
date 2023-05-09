function toggleOtherInput() {
    var otherInput = document.getElementById('other-input');
    if (document.getElementById('other-radio').checked) {
        otherInput.style.display = 'block';
    } else {
        otherInput.style.display = 'none';
    }
}

function dateSelector() {

    const dateSelect = document.getElementById('dateSelect')
    const ts = Date.now();
    const date_ob = new Date(ts);

    var date = date_ob.getDate();
    var month = date_ob.getMonth() + 1;
    const yearMin = date_ob.getUTCFullYear() - 70;
    const yearMax = date_ob.getUTCFullYear() - 16;
    if (date < 10)
        date = "0" + date;
    if (month < 10)
        month = "0" + month;

    const maxDate = yearMax + '-' + month + '-' + date;

    const minDate = yearMin + '-' + month + '-' + date;

    dateSelect.setAttribute("max", maxDate);
    dateSelect.setAttribute("min", minDate);
}


flatpickr("#datepicker", {
    dateFormat: "d/m/Y", // specify your desired date format
    // additional options and configurations for Flatpickr can be added here
});

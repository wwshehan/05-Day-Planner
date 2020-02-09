var mySched = [
    {
        id: "0",
        hour: "09",
        time: "09",
        amPmEl: " am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        amPmEl: " am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        amPmEl: " am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        amPmEl: " pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "1",
        time: "13",
        amPmEl: " pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "2",
        time: "14",
        amPmEl: " pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "3",
        time: "15",
        amPmEl: " pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "4",
        time: "16",
        amPmEl: " pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "5",
        time: "17",
        amPmEl: " pm",
        reminder: ""
    },
    
]

// header date
function getHeaderDate() {
    var currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}

// saving to local storage as a string
function saveReminders() {
    localStorage.setItem("mySched", JSON.stringify(mySched));
}

// sets any data in localStorage to the view
function displayReminders() {
    mySched.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

// check for localstorage and views it
function loadLocal() {
    var storedDay = JSON.parse(localStorage.getItem("mySched"));

    if (storedDay) {
        mySched = storedDay;
    }

    saveReminders();
    displayReminders();
}

// loads header date
getHeaderDate();

// creates the the scheduler body
mySched.forEach(function(thisHour) {
    // creates time row
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    // creates time text field
    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.amPmEl}`)
        .attr({
            "class": "col-md-2 hour"
    });

    // creates schdeduler data
    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    // save button
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
})

// loads any existing localstorage data
loadLocal();


// saves data in localStorage
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    mySched[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    saveReminders();
    displayReminders();
    console.log(saveIndex)
})
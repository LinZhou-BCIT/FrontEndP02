dataUrl = "./working-files/schedule.json";

fetch(dataUrl)
    .then( data => {
        let promise = data.json()
        promise.then(promise =>
            generateSchedule(promise)
        )
    }).catch( error => console.log("Error fetching data."));

function generateSchedule(data){
    //console.log(data);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    let rootNode = document.getElementsByClassName("schedule")[0];
    let currentMonthNum = -1;
    let currentMonthTxt = null;
    let currentMonthNode = null;
    let scheduleGridNode = null;
    for(let day of data) {
        // console.log(day);
        let date = new Date(day.date);
        // if it's a new month
        let monthNum = date.getMonth();
        if(monthNum != currentMonthNum) {
            currentMonthNum = monthNum;
            currentMonthTxt = monthNames[monthNum];
            currentMonthNode = document.createElement('div');
            currentMonthNode.className = currentMonthTxt;
            currentMonthNode.classList.add("month");

            // month title
            let monthTitleNode = document.createElement('h2');
            monthTitleNode.appendChild(document.createTextNode(currentMonthTxt));

            // day of the week labels
            let daysOfWeekNode = document.createElement('div');
            daysOfWeekNode.className = "doW-label-container";
            for (let dayName of dayNames) {
                let labelNode = document.createElement('div');
                labelNode.className = "doW-label";
                labelNode.appendChild(document.createTextNode(dayName));
                daysOfWeekNode.appendChild(labelNode);
            }

            // new grid div
            scheduleGridNode = document.createElement('div');
            scheduleGridNode.className = "grid";

            currentMonthNode.appendChild(monthTitleNode);
            currentMonthNode.appendChild(daysOfWeekNode);
            currentMonthNode.appendChild(scheduleGridNode);

            // grid placeholder divs
            for (let i = 1; i < date.getDay(); i++) {
                let placeholderNode = document.createElement('div');
                placeholderNode.className = "grid-placeholder";
                scheduleGridNode.appendChild(placeholderNode);
            }
            rootNode.appendChild(currentMonthNode);
        }

        let dayNode = document.createElement('div');
        let dateStr = currentMonthTxt + ' ' + date.getDate() + ', ' + date.getFullYear();
        let dateSpan = document.createElement('span');
        dateSpan.appendChild(document.createTextNode(dateStr));
        dateSpan.className = "date";
        let courseSpan = document.createElement('span');
        courseSpan.appendChild(document.createTextNode(day.course));
        courseSpan.className = "course";
        let notesSpan = document.createElement('span');
        notesSpan.appendChild(document.createTextNode(day.notes));
        notesSpan.className = "notes";
        let instructorSpan = document.createElement('span');
        instructorSpan.appendChild(document.createTextNode(day.instructor));
        instructorSpan.className = "instructor";

        dayNode.appendChild(dateSpan);
        dayNode.appendChild(courseSpan);
        dayNode.appendChild(notesSpan);
        dayNode.appendChild(instructorSpan);
        dayNode.className = "day";

        scheduleGridNode.appendChild(dayNode);
    }
}
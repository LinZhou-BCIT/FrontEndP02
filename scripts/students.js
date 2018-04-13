document.addEventListener("DOMContentLoaded", function(){ 
    dataUrl = "./working-files/students.json";

    fetch(dataUrl)
    .then( data => {
        let promise = data.json()
        promise.then(promise =>
            generateStudents(promise)
        )
    }).catch( error => console.log("Error fetching data."));

    function generateStudents(data) {
        // console.log(data);
        let rootNode = document.getElementsByClassName('students')[0];
        for (let student of data) {
            let studentNode = document.createElement('div');
            studentNode.className = "student";
            let fname = document.createElement('p');
            fname.appendChild(document.createTextNode(student.firstname));
            fname.className = "fname";
            let lname = document.createElement('p');
            lname.appendChild(document.createTextNode(student.lastname));
            lname.className = "lname";
            let email = document.createElement('p');
            email.appendChild(document.createTextNode(student.email));
            email.className = "email";
            let social = document.createElement('ul');
            social.className = "social";
            if (student.github) {
                let github = document.createElement('li');
                let githubLink = document.createElement('a');
                githubLink.setAttribute('href', student.github);
                let githubIcon = document.createElement('i');
                githubIcon.className = "fa fa-github";
                githubLink.appendChild(githubIcon);
                github.appendChild(githubLink);
                github.className = "github";
                social.appendChild(github);
            }
            if (student.linkedIn) {
                let linkedin = document.createElement('li');
                let linkedinLink = document.createElement('a');
                linkedinLink.setAttribute('href', student.linkedIn);
                let linkedinIcon = document.createElement('i');
                linkedinIcon.className = "fa fa-linkedin";
                linkedinLink.appendChild(linkedinIcon);
                linkedin.appendChild(linkedinLink);
                linkedin.className = "linkedin";
                social.appendChild(linkedin);
            }

            studentNode.appendChild(fname);
            studentNode.appendChild(lname);
            studentNode.appendChild(email);
            studentNode.appendChild(social);
            rootNode.appendChild(studentNode);
        }
    }
});
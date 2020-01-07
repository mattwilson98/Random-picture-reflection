const checkEmail = document.getElementById('checkEmail');
const wrongEmailDiv = document.getElementById('wrong-email');
const imageDiv = document.getElementById('image-container')
const emailImages = []
const xhr = new XMLHttpRequest();

let tempUrl = '';

//get a random image from unsplash
// When it is resolved it sets imageDiv html to the called image

function getImage() {
    fetch(`https://source.unsplash.com/600x400/?car`).then((response)=> {
        tempUrl = response.url;
        imageDiv.innerHTML = `<img src="${tempUrl}">`
    })
}
function wrongEmail() {
    wrongEmailDiv.innerHTML = "<p>This email address is not valid </p>"
}

// Call get Image once

getImage();

checkEmail.addEventListener('click', () => {
    wrongEmailDiv.innerHTML = "";
    let email = document.getElementById('email').value;

    // Check that email contains @ and a . after
    if (email.indexOf("@") != -1) {
        if (email.indexOf("@") < email.lastIndexOf(".")) {
            // Check there are characters after the final .
            if (email.lastIndexOf('.') < email.length - 1) {
                let emailExists = false;
                for (let x = 0; x < emailImages.length; x++) {
                    // If email exists in array increment the count for the object relating to it, and store new image
                    if (email === emailImages[x].name) {
                        emailImages[x].count ++;
                        emailImages[x].pictures.push(tempUrl);
                        emailExists = true;
                        break;
                    }
                }
                // If email doesn't exist in array, create new object for it and store first image 
                if (!emailExists) {
                    const obj = {
                        name: email,
                        count: 1,
                        pictures: [tempUrl]
                    }
                    emailImages.push(obj)
                }
                // Get new image from api
                getImage();
            }
            else {
                wrongEmail();
            }
        }
        else {
            wrongEmail();
        }
    }
    else {
        wrongEmail();
    }
    // Store string that builds up to contain list of all images
    let temp = "<div class='stored'>";
    for (let i = 0; i < emailImages.length; i++) {
        temp += "<h3>" + emailImages[i].name + " currently has " + emailImages[i].pictures.length + " images saved:</h3><ul>";
        for (let j = 0; j < emailImages[i].pictures.length; j++) {
            let jreal = j + 1
            temp +="<li><a href='" + emailImages[i].pictures[j] + "'>Picture " + jreal + "</a></li>";
        }
        temp += "</ul><br>";
    }
    temp += "</div>";
    document.getElementById('stored').innerHTML = temp;
});
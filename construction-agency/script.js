let currentIndex = 0;
let images = document.querySelectorAll(".project-item img");

function openLightbox (img) {
    document.getElementById("lightbox").style.display = "block";
    document.getElementById("lightbox-img").src = img.src;
    currentIndex = Array.from(images).indexOf(img);
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function changeImage(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    document.getElementById("lightbox-img").src = images[currentIndex].src;
}

//contact page scripts
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill in the fields.");
        return;
    }

    alert("Message sent successfully!");
    this.reset();
});
// Open Settings Box

const toggler = document.querySelector(".toggle");

toggler.onclick = function () {
  document.querySelector(".settings").classList.toggle("open");
};

// Swtich Random Background

let landing = document.querySelector(".landing");
let imgsArray = [
  "01.jpeg",
  "02.jpeg",
  "03.jpeg",
  "04.jpeg",
  "05.jpeg",
  "06.jpeg",
];
let backgroundLocalStorage = localStorage.getItem("background-option");
let backgroundInterval;
let backgroundOption = true;

if (backgroundLocalStorage !== null) {
  if (backgroundLocalStorage === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  document.querySelectorAll(".random-bg span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalStorage === "true") {
    document.querySelector(".random-bg .yes").classList.add("active");
  } else {
    document.querySelector(".random-bg .no").classList.add("active");
  }
}

function randomBackground() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomBg = Math.floor(Math.random() * imgsArray.length);

      // Change Background Image Url
      landing.style.backgroundImage =
        'url("images/' + imgsArray[randomBg] + '")';
    }, 7000);
  }
}
randomBackground();

// Change Main Color
let colorsList = document.querySelectorAll(".colors-list li");

colorsList.forEach((list) => {
  list.addEventListener("click", (li) => {
    document.documentElement.style.setProperty(
      "--main-color",
      li.target.dataset.color
    );
    // Set Main Color To Root
    localStorage.setItem("colors", li.target.dataset.color);
  });
});
let mainColors = localStorage.getItem("colors");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}

// Add And Remove Active Class

colorsList.forEach((li) => {
  li.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

// Stop Random Background

let stopBackground = document.querySelectorAll(".random-bg span");
stopBackground.forEach((span) => {
  span.addEventListener("click", (element) => {
    element.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    element.target.classList.add("active");

    if (element.target.dataset.bg === "yes") {
      backgroundOption = true;
      randomBackground();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});

const mySkills = document.querySelector(".skills");

window.onscroll = function () {
  const skillsOffsetTop = mySkills.offsetTop;
  const skillsOutterHeight = mySkills.offsetHeight;
  const windowHeight = this.innerHeight;
  const windowScrollTop = this.scrollY;
  if (windowScrollTop > skillsOffsetTop + skillsOutterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(".skills .progress .skill span");

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Images Galllery
const imagesGallery = document.querySelectorAll(".gallery  img");

imagesGallery.forEach((img) => {
  img.addEventListener("click", (el) => {
    let overlay = document.createElement("div");
    overlay.className = "gallery-overlay";
    document.body.appendChild(overlay);
    let box = document.createElement("div");
    box.className = "img-box";
    let rightArrow = document.createElement("i");
    rightArrow.className = "fa-solid fa-angle-right";
    box.appendChild(rightArrow);
    let leftArrow = document.createElement("i");
    leftArrow.className = "fa-solid fa-angle-left";
    box.appendChild(leftArrow);
    let closebtn = document.createElement("div");
    let closeText = document.createTextNode("X");
    closebtn.className = "close";
    closebtn.appendChild(closeText);
    box.appendChild(closebtn);

    let image = document.createElement("img");
    image.className = "imgs";
    image.src = img.src;
    box.appendChild(image);
    document.body.appendChild(box);
  });
});

// close Button

document.addEventListener("click", (e) => {
  if (e.target.className === "close") {
    e.target.parentNode.remove();
    document.querySelector(".gallery-overlay").remove();
  }
});

// gallery Slides

// Menu links

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();

  // Toggle Class "menu-active" On Button
  this.classList.toggle("menu-active");

  // Toggle Class "open" On Links
  tLinks.classList.toggle("open");
};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // Check If Menu Is Open
    if (tLinks.classList.contains("open")) {
      // Toggle Class "menu-active" On Button
      toggleBtn.classList.toggle("menu-active");

      // Toggle Class "open" On Links
      tLinks.classList.toggle("open");
    }
  }
});

// Stop Propagation On Menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};

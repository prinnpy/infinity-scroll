const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photoArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const count = 30;
const apiKey = "PEgQ1v2lKrWmKWYDuSsY1-MGnEK-gN7Cq5T7x7fem4M";
const topic = "food";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${topic}`;

//check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// display photos
function displayPhotos() {
  imageLoaded = 0;
  totalImages = photoArray.length;
  // for each methos
  photoArray.forEach((photo) => {
    // create <a></a> to link unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // create image for photos
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // even listener to check when each finished loading
    img.addEventListener("load", imageLoaded);

    // put image inside <a> and put in container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos from unsplash api
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photoArray = await response.json();
    console.log(photoArray);
    displayPhotos();
  } catch (err) {
    // console.log(err);
  }
}

// check to see if scrolling near bottom of  page
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();

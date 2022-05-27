const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash api
let count = 5;
const apiKey = '-lU3AJ9ouM_EaUB8FzuLw_YrnPXBO0_fwmyndrTTKDA';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// image loaded function
function imageLoaded() {
	imagesLoaded++
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
		count = 30;
		apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
	}
}


// set attributes function
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key])
	}
}


// create elements 

function displayImages() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	photosArray.forEach((photo) => {
		const link = document.createElement('a');
		setAttributes(link, 
			{
				href: photo.links.html,
				target: '_blank'
			});

		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description
		});

		img.addEventListener('load', imageLoaded);

		// append
		link.appendChild(img);
		imageContainer.appendChild(link);
	});
}

// get photos
async function getImages() {
	try {
		const response = await fetch(apiUrl)
		photosArray = await response.json();
		displayImages();
	} catch(error) {
		// catch error here
	}
}

// check to see if scrolling near bottom of page, load more image
window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready) {
		ready = false;
		getImages();
	}
});

// on load
getImages();

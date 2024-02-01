function handleImageInputChange() {
  const imageInput = document.getElementById('imageInput');
  const selectedImage = imageInput.files[0];
  const imagePreviewContainer = document.getElementById('imagePreviewContainer');

  // Clear previous previews
  imagePreviewContainer.innerHTML = '';

  if (selectedImage) {
    // Display the selected image preview
    displayImagePreview(selectedImage, imagePreviewContainer);
  } else {
    // Display a random image preview
    displayRandomImage(imagePreviewContainer);
  }
}

function displayImagePreview(imageFile, container) {
  const reader = new FileReader();

  reader.onload = function (e) {
    const imagePreview = document.createElement('img');
    imagePreview.src = e.target.result;
    imagePreview.style.maxWidth = '100%';
    container.appendChild(imagePreview);
  };

  reader.readAsDataURL(imageFile);
}

function displayRandomImage(container) {
  const randomImages = [
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300/0000FF/808080?text=Random+Image',
    // Add more random image URLs as needed
  ];

  const randomImageUrl = randomImages[Math.floor(Math.random() * randomImages.length)];
  const randomImage = document.createElement('img');
  randomImage.src = randomImageUrl;
  randomImage.style.maxWidth = '100%';
  container.appendChild(randomImage);
}
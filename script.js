

let like = false;

function changeLikeImage() {
    var likeButton = document.querySelector('.like-btn');
    var msg = document.querySelector('.msg');
    var countLike = document.querySelector('.count-like');
   let  count = 0;

    if (!like) {
        likeButton.src = 'like.png';
        likeButton.style.transform = 'rotate(360deg)';
        like = true;

        // increase count the like
         countLike.innerText = count+1;
        

        // Display the message and add fade-in animation
        msg.innerText = 'You liked The Post';
        msg.classList.add('fade-in');

        // Set a timeout to remove the message and add fade-out animation
        setTimeout(function () {
            msg.classList.remove('fade-in');
            msg.classList.add('fade-out');
        }, 3000);

        // Reset message after animations complete
        setTimeout(function () {
            msg.innerText = '';
            msg.classList.remove('fade-out');
        }, 4000);

    } else {
        likeButton.src = 'greylike.png';
        likeButton.style.transform = 'none';
        like = false;


          // Decrease count the like
          countLike.innerText = count;

        // Display the message and add fade-in animation
        msg.innerText = 'You Unliked The Post';
        msg.classList.add('fade-in');

        // Set a timeout to remove the message and add fade-out animation
        setTimeout(function () {
            msg.classList.remove('fade-in');
            msg.classList.add('fade-out');
        }, 3000);

        // Reset message after animations complete
        setTimeout(function () {
            msg.innerText = '';
            msg.classList.remove('fade-out');
        }, 4000);
    }
}





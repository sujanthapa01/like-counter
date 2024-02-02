const follower = document.getElementById('follower');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Show the follower
  follower.style.opacity = 1;
});

document.addEventListener('click', (e) => {
  // Reduce opacity when hovering over any element
  follower.classList.add("follower-click");
});

document.addEventListener('mouseout', (e) => {
  // Restore opacity when leaving any element
  follower.style.opacity = 1;
});

function animate() {
  const targetX = mouseX - follower.clientWidth / 2;
  const targetY = mouseY - follower.clientHeight / 2;

  const dx = targetX - follower.offsetLeft;
  const dy = targetY - follower.offsetTop;

  const ax = dx * .1;
  const ay = dy * .1;

  follower.style.left = `${follower.offsetLeft + ax}px`;
  follower.style.top = `${follower.offsetTop + ay}px`;

  // Check if follower is outside the window
  if (
    follower.offsetLeft < 0 ||
    follower.offsetTop < 0 ||
    follower.offsetLeft + follower.clientWidth > window.innerWidth ||
    follower.offsetTop + follower.clientHeight > window.innerHeight
  ) {
    // Hide the follower
    follower.style.opacity = 0;
  }

  requestAnimationFrame(animate);
}

animate();

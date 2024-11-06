/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction(){
  let menuBtn = document.getElementById("myNavMenu");

  if(menuBtn.className === "nav-menu"){
    menuBtn.className += " responsive";
  } else {
    menuBtn.className = "nav-menu";
  }
}

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function() {headerShadow()};

function headerShadow() {
  const navHeader =document.getElementById("header");

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop >  50) {

    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";

  } else {

    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";

  }
}

/* ----- TYPING EFFECT ----- */
let typingEffect = new Typed(".typedText",{
  strings : ["Game Developer", "Web Developer", "Programmer", "Web Designer"],
  loop : true,
  typeSpeed : 100, 
  backSpeed : 80,
  backDelay : 2000
})

/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
const sr = ScrollReveal({
      origin: 'top',
      distance: '80px',
      duration: 2000,
      reset: true     
})

/* -- HOME -- */
sr.reveal('.featured-text-card',{})
sr.reveal('.featured-name',{delay: 100})
sr.reveal('.featured-text-info',{delay: 200})
sr.reveal('.featured-text-btn',{delay: 200})
sr.reveal('.social_icons',{delay: 200})
sr.reveal('.featured-image',{delay: 300})

/* -- PROJECT BOX -- */
sr.reveal('.project-box',{interval: 200})

/* -- HEADINGS -- */
sr.reveal('.top-header',{})

/* ----- ## -- SCROLL REVEAL LEFT_RIGHT ANIMATION -- ## ----- */

/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
origin: 'left',
distance: '80px',
duration: 2000,
reset: true
})

srLeft.reveal('.about-info',{delay: 100})
srLeft.reveal('.contact-info',{delay: 100})

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
origin: 'right',
distance: '80px',
duration: 2000,
reset: true
})

srRight.reveal('.skills-box',{delay: 100})
srRight.reveal('.form-control',{delay: 100})

/* ----- CHANGE ACTIVE LINK ----- */

const sections = document.querySelectorAll('section[id]')
function scrollActive() {
const scrollY = window.scrollY;

sections.forEach(current =>{
  const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 50,
    sectionId = current.getAttribute('id')

  if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 

      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')

  }  else {

    document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')

  }
})
}

window.addEventListener('scroll', scrollActive)

let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun'); // Toggle sun icon
    document.body.classList.toggle('dark-mode'); // Toggle dark mode
};


let balls = []; // Array to store the balls
let clickCount = 0; // Counter for clicks
const numBalls = 50; // Number of balls to create

function createMovingBalls() {
    if (clickCount < 3) { // Check if clicks are less than 3
        for (let i = 0; i < numBalls; i++) {
            const ball = document.createElement('div');
            ball.classList.add('color-ball');

            // Set a random color for each ball (different shades)
            const hue = Math.random() * 360;
            const lightness = Math.random() * 40 + 30; // Lightness between 30% and 70%
            ball.style.backgroundColor = `hsl(${hue}, 100%, ${lightness}%)`;

            // Set a random size for each ball (larger sizes)
            const size = Math.random() * 40 + 20; // Size between 20px and 60px
            ball.style.width = `${size}px`;
            ball.style.height = `${size}px`;

            // Set initial random position within the viewport
            const randomX = Math.random() * (window.innerWidth - size);
            const randomY = Math.random() * (window.innerHeight - size);
            ball.style.left = `${randomX}px`;
            ball.style.top = `${randomY}px`;

            // Set random speed and direction
            const speedX = (Math.random() * 2 + 0.5) * (Math.random() < 0.5 ? 1 : -1); // Speed in the X direction (0.5 to 2.5)
            const speedY = (Math.random() * 2 + 0.5) * (Math.random() < 0.5 ? 1 : -1); // Speed in the Y direction (0.5 to 2.5)
            ball.dataset.speedX = speedX;
            ball.dataset.speedY = speedY;

            // Append the ball to the body and store it in the array
            document.body.appendChild(ball);
            balls.push(ball);

            // Start moving the ball
            moveBall(ball);
        }
        clickCount++; // Increment click counter
    }

    if (clickCount === 3) { // If clicks reach 3
        setTimeout(removeBalls, 1000); // Optional: Wait for 1 second before removing
    }
}

// Function to move the ball
function moveBall(ball) {
    const animate = () => {
        const rect = ball.getBoundingClientRect();

        // Get current position
        let posX = parseFloat(ball.style.left);
        let posY = parseFloat(ball.style.top);
        const speedX = parseFloat(ball.dataset.speedX);
        const speedY = parseFloat(ball.dataset.speedY);

        // Update position
        posX += speedX;
        posY += speedY;

        // Reset position if the ball moves off screen
        if (posX > window.innerWidth) {
            posX = -rect.width; // Move to the left of the screen
        } else if (posX < -rect.width) {
            posX = window.innerWidth; // Move to the right of the screen
        }

        if (posY > window.innerHeight) {
            posY = -rect.height; // Move to the top of the screen
        } else if (posY < -rect.height) {
            posY = window.innerHeight; // Move to the bottom of the screen
        }

        // Update ball's position in the DOM
        ball.style.left = `${posX}px`;
        ball.style.top = `${posY}px`;

        requestAnimationFrame(animate); // Recursively call animate
    };

    animate(); // Start the animation
}

// Function to remove all balls
function removeBalls() {
    balls.forEach(ball => {
        ball.remove(); // Remove each ball from the DOM
    });
    balls = []; // Clear the array of balls
}

// Hide balls when not hovering over the image
function hideBalls() {
    balls.forEach(ball => {
        ball.style.opacity = 0; // Fade out balls
    });
}

// Show balls when hovering over the image
function showBalls() {
    balls.forEach(ball => {
        ball.style.opacity = 1; // Fade in balls
    });
}

document.querySelector('.image img').addEventListener('click', createMovingBalls);
document.querySelector('.image img').addEventListener('mouseover', showBalls);
document.querySelector('.image img').addEventListener('mouseout', hideBalls);


//modal box 
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalImage = document.getElementById('modal-image');
  const closeBtn = document.querySelector('.close');
  const projectBoxes = document.querySelectorAll('.project-container .project-box');

  // Data for each project box (title, description, and image)
  const projectData = [
    {
      title: 'Exam Generator (E-GEN)',
      description: `This project is a standalone application designed to assist professors and teachers in creating exam templates for various types of assessments. 
      During my time in college, my team and I developed this application with the goal of alleviating the stress associated with exam preparation. 
      The application was conceived to streamline the process of creating examination templates, enabling educators to efficiently design and manage different types of assessments. 
      This tool aims to save time and reduce the workload for teachers, allowing them to focus more on delivering quality education.`,
      image: 'images/E-GEN.png' // Path to your image
  },

  {
    title: 'Jarvis (Prototype)',
    url: 'https://jarvis-two-delta.vercel.app/', // The link URL
    description: `During my time in college, I worked on developing a prototype similar to Jarvis, 
    which utilized voice commands for interaction. This project aimed to create an intelligent assistant capable of processing voice inputs 
    to perform various tasks and respond to user queries. The experience allowed me to explore natural language processing, voice recognition 
    technologies, and the integration of different software components to build a responsive system.`,
    image: 'images/jarvis.png' // Path to your image
  },
  
  {
      title: 'Tab Indicator',
      description: `When I was learning web development, I would create and develop basic components and functions, such as tab indicators. 
      These projects helped me build foundational skills in web programming and better understand how to implement interactive elements on web pages.`,
      image: 'images/tab.png' // Path to your image
  }
  ];

  

  projectBoxes.forEach((box, index) => {
      box.addEventListener('click', () => {
          modalTitle.textContent = projectData[index].title;
          modalDescription.textContent = projectData[index].description;

          // Check if an image exists for the project and display it
          if (projectData[index].image) {
              modalImage.src = projectData[index].image;
              modalImage.style.display = 'block';
          } else {
              modalImage.style.display = 'none';
          }

          modal.style.display = 'block';
      });
  });

  closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });
});



document.getElementById("hireButton").addEventListener("click", function(event) {
    let balloonContainer = document.getElementById("balloonContainer");

    // Get the button's position and size
    let buttonRect = event.target.getBoundingClientRect();
    let buttonX = buttonRect.left + buttonRect.width / 2;  // Center of button horizontally
    let buttonY = buttonRect.top + buttonRect.height / 2;  // Center of button vertically

    // Create balloons animation
    for (let i = 0; i < 10; i++) {
        let balloon = document.createElement("div");
        balloon.classList.add("balloon");

        // Randomize the balloon position horizontally
        let randomPosition = Math.random() * 100; // 0 to 100 percentage
        balloon.style.left = `${randomPosition}%`;

        // Randomize balloon color
        let randomColor = `hsl(${Math.random() * 360}, 100%, 60%)`; // Random color (hue: 0 to 360, saturation: 100%, lightness: 60%)
        balloon.style.backgroundColor = randomColor;

        // Append balloon to the container
        balloonContainer.appendChild(balloon);

        // Animation: Move the balloon up
        balloon.style.animation = `moveUp 3s ease-out forwards`;

        // Remove the balloon after animation completes (3s in this case)
        setTimeout(() => {
            balloon.remove();
        }, 3000); // Balloon disappears after 3s
    }
});

















// Birthday configuration
const MY_BIRTHDAY_MONTH = 11;
const MY_BIRTHDAY_DAY = 11;

// DOM elements
const headingDisplay = document.getElementById('headingDisplay');
const daysDisplay = document.getElementById('daysDisplay');
const hoursDisplay = document.getElementById('hoursDisplay');
const minutesDisplay = document.getElementById('minutesDisplay');
const secondsDisplay = document.getElementById('secondsDisplay');
const container = document.querySelector('.container');
const emoji = document.querySelector('.emoji');

// Audio context for sound effects
let audioContext;
let birthdaySong;

// Initialize audio
function initAudio() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) {
    console.log('Audio not supported');
  }
}

// Play birthday song (simple beep sequence)
function playBirthdaySong() {
  if (!audioContext) return;
  
  const frequencies = [523, 659, 784, 523, 784, 880]; // C, E, G, C, G, A
  let noteIndex = 0;
  
  function playNote() {
    if (noteIndex >= frequencies.length) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequencies[noteIndex], audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
    
    noteIndex++;
    setTimeout(playNote, 600);
  }
  
  playNote();
}

// Create confetti effect
function createConfetti() {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '1000';
    
    document.body.appendChild(confetti);
    
    const animation = confetti.animate([
      { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
      { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
      duration: Math.random() * 3000 + 2000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => confetti.remove();
  }
}

// Update display with animation
function updateDisplay(element, newValue, oldValue) {
  if (newValue !== oldValue) {
    element.style.animation = 'none';
    element.offsetHeight; // Trigger reflow
    element.style.animation = 'numberPulse 0.5s ease-out';
    element.textContent = newValue;
  }
}

// Calculate time until birthday
function calculateTimeUntilBirthday() {
  const now = new Date();
  const thisYear = now.getFullYear();
  let myBirthday = new Date(thisYear, MY_BIRTHDAY_MONTH - 1, MY_BIRTHDAY_DAY);

  // If birthday has passed this year, set it to next year
  if (myBirthday.getTime() < now.getTime()) {
    myBirthday = new Date(thisYear + 1, MY_BIRTHDAY_MONTH - 1, MY_BIRTHDAY_DAY);
  }

  return myBirthday - now;
}

// Format time values
function formatTime(milliseconds) {
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  const remainderHours = milliseconds % (1000 * 60 * 60 * 24);
  const hours = Math.floor(remainderHours / (1000 * 60 * 60));
  const remainderMinutes = milliseconds % (1000 * 60 * 60);
  const minutes = Math.floor(remainderMinutes / (1000 * 60));
  const remainderSeconds = milliseconds % (1000 * 60);
  const seconds = Math.floor(remainderSeconds / 1000);

  return { days, hours, minutes, seconds };
}

// Store previous values for animation
let previousValues = { days: -1, hours: -1, minutes: -1, seconds: -1 };

// Main countdown function
function updateCountdown() {
  const timeUntilBirthday = calculateTimeUntilBirthday();
  const timeValues = formatTime(timeUntilBirthday);

  // Update displays with animation
  updateDisplay(daysDisplay, timeValues.days, previousValues.days);
  updateDisplay(hoursDisplay, timeValues.hours, previousValues.hours);
  updateDisplay(minutesDisplay, timeValues.minutes, previousValues.minutes);
  updateDisplay(secondsDisplay, timeValues.seconds, previousValues.seconds);

  // Store current values
  previousValues = { ...timeValues };

  // Check if it's birthday time
  if (timeValues.days === 0 && timeValues.hours === 0 && 
      timeValues.minutes === 0 && timeValues.seconds === 0) {
    celebrateBirthday();
  }
}

// Birthday celebration
function celebrateBirthday() {
  clearInterval(countDownInterval);
  
  // Update heading and emoji
  headingDisplay.textContent = "🎉 Happy Birthday to Me! 🎉";
  headingDisplay.classList.add('birthday-celebration');
  emoji.textContent = "🎂🎈🎁";
  emoji.style.animation = 'celebrate 1s ease-out infinite';
  
  // Add celebration class to container
  container.classList.add('birthday-celebration');
  
  // Play birthday song
  playBirthdaySong();
  
  // Create confetti
  createConfetti();
  
  // Continue confetti for a while
  const confettiInterval = setInterval(createConfetti, 2000);
  setTimeout(() => clearInterval(confettiInterval), 10000);
}

// Add interactive features
function addInteractivity() {
  // Add click effect to time boxes
  const timeBoxes = document.querySelectorAll('.time-box');
  timeBoxes.forEach(box => {
    box.addEventListener('click', () => {
      box.style.transform = 'scale(0.95)';
      setTimeout(() => {
        box.style.transform = '';
      }, 150);
    });
  });

  // Add hover sound effect (optional)
  timeBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
      if (audioContext) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      }
    });
  });
}

// Global interval variable
let countDownInterval;

// Initialize the app
function init() {
  initAudio();
  addInteractivity();
  
  // Start countdown
  updateCountdown();
  countDownInterval = setInterval(updateCountdown, 1000);
  
  // Add some initial animation
  setTimeout(() => {
    container.style.animation = 'slideIn 1s ease-out';
  }, 100);
}

// Start the application
document.addEventListener('DOMContentLoaded', init);

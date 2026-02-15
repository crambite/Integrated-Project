// -------------------------
// Mobile nav toggle
// -------------------------
const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when clicking a link (mobile)
  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// -------------------------
// Reviews carousel
// -------------------------
const reviews = [
  {
    text: "“One thing I am able to do now, that I could not do before, is actually believe I can code.”",
    name: "Middle School Student",
    sub: "Classroom Pilot Program",
    avatar: "AD"
  },
  {
    text: "“The puzzles felt like a game, but I still learned real logic. It didn't feel like homework.”",
    name: "Student",
    sub: "After-school Coding Club",
    avatar: "RL"
  },
  {
    text: "“Clear progression, strong engagement. I started using Blackbox Protocol in my lessons and students have never been more engaged.”",
    name: "Teacher",
    sub: "Secondary School",
    avatar: "LJ"
  },
  {
    text: "“The story hooks them. They ask to replay levels just to optimize their code.”",
    name: "Facilitator",
    sub: "Enrichment Program",
    avatar: "DT"
  },
];

let reviewIndex = 0;

const reviewText = document.getElementById("reviewText");
const reviewName = document.getElementById("reviewName");
const reviewSub = document.getElementById("reviewSub");
const dotButtons = document.querySelectorAll('.dots .dot');
const avatar = document.getElementById("avatar");

function setActiveDot(i){
  dotButtons.forEach(d => d.classList.remove("is-active"));
  const current = document.querySelector(`.dots .dot[data-dot="${i}"]`);
  if (current) current.classList.add("is-active");
}

function renderReview(i){
  const r = reviews[i];
  if (!r) return;
  reviewText.textContent = r.text;
  reviewName.textContent = r.name;
  reviewSub.textContent = r.sub;
  avatar.textContent = r.avatar;
  setActiveDot(i);
}

const reviewsCarousel = document.querySelector('[data-carousel="reviews"]');
if (reviewsCarousel) {
  const prevBtn = reviewsCarousel.querySelector("[data-prev]");
  const nextBtn = reviewsCarousel.querySelector("[data-next]");

  prevBtn?.addEventListener("click", () => {
    reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length;
    renderReview(reviewIndex);
  });

  nextBtn?.addEventListener("click", () => {
    reviewIndex = (reviewIndex + 1) % reviews.length;
    renderReview(reviewIndex);
  });

  dotButtons.forEach(d => {
    d.addEventListener("click", () => {
      reviewIndex = Number(d.dataset.dot);
      renderReview(reviewIndex);
    });
  });

  renderReview(reviewIndex);
}

// -------------------------
// Updates carousel (date slider)
// -------------------------
const updates = [
  {
    date: "Feb 15, 2026",
    title: "Friend Referral Program",
    text: "We launched a referral flow that lets creators reward players for inviting friends to their experience.",
  },
  {
    date: "May 11, 2026",
    title: "Voucher Management Screen",
    text: "Users can view and manage their vouchers.",
  },
  {
    date: "Jun 02, 2026",
    title: "Smart Enemy AI",
    text: "Enemies now have a smarter AI an can actively search for and shoot the player on their turn.",
  },
  {
    date: "Sep 18, 2026",
    title: "Procedurally Generated Mazes",
    text: "Players can now access an infinite level after completing the main game.",
  },
];

let updateIndex = 0;
const updateDate = document.getElementById("updateDate");
const updateTitle = document.getElementById("updateTitle");
const updateText = document.getElementById("updateText");
const updateBar = document.getElementById("updateBar");

function renderUpdate(i){
  const u = updates[i];
  if (!u) return;

  updateDate.textContent = u.date;
  updateTitle.textContent = u.title;
  updateText.textContent = u.text;

  // progress bar reflects position
  const pct = ((i + 1) / updates.length) * 100;
  updateBar.style.width = `${pct}%`;
}

const updatesPanel = document.querySelector('[data-carousel="updates"]');
if (updatesPanel) {
  const prevBtn = updatesPanel.querySelector("[data-prev]");
  const nextBtn = updatesPanel.querySelector("[data-next]");

  prevBtn?.addEventListener("click", () => {
    updateIndex = (updateIndex - 1 + updates.length) % updates.length;
    renderUpdate(updateIndex);
  });

  nextBtn?.addEventListener("click", () => {
    updateIndex = (updateIndex + 1) % updates.length;
    renderUpdate(updateIndex);
  });

  renderUpdate(updateIndex);
}

// -------------------------
// Footer year
// -------------------------
document.getElementById("year").textContent = new Date().getFullYear();

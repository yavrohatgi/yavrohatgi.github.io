// Project data
const projectData = [
  {
    id: 1,
    title: "Sign Detection Gloves",
    technologies: [
      "Machine Learning",
      "Python",
      "C++",
      "TensorFlow",
      "Inertial Measurement Unit (IMU)",
      "BeagleBone Black"
    ],
    description:
      "Smart gloves designed to recognize sign language gestures using machine learning and IMU sensors, developed under the guidance of <a href='https://www.umass.edu/engineering/about/directory/hossein-pishro-nik' target='_blank'>Professor Hossein Pishro-Nik</a>.",
    achievements: [
      "Captured high-frequency motion signals from 6-axis IMU sensors on each finger to enable fine-grained gesture input",
      "Processed motion data into discrete-time series timestamped via MCU clock to recognize sequential hand signs",
      "Reached 92% real-time classification accuracy by training a lightweight model with TensorFlow Lite"
    ]
  },
  {
    id: 2,
    title: "AI Assisted Approach to Math Tutoring",
    technologies: ["LangChain", "Prompt Engineering", "Hugging Face"],
    description:
      "Research project under <a href='https://www.umass.edu/engineering/about/directory/lixin-gao' target='_blank'>Professor Lixin Gao</a> focused on enhancing mathematical reasoning capabilities in large language models.",
    achievements: [
      "Achieved 90% accuracy on 5k+ math problems by integrating N-shot prompting, Chain-of-Thought reasoning, and symbolic reasoning using Wolfram Alpha to improve multi-step reasoning",
      "Deployed a RAG system that helped improve BLEU by 11.6% for lecture-style question generation",
      "Discovered that 18% of generated problems were unsolvable, revealing internal failures in LLM reasoning"
    ]
  },
  {
    id: 3,
    title: "Compact LLM Architecture",
    technologies: ["Machine Learning", "JAX"],
    description:
      "Efficient implementation of language prediction models using JAX for optimized computation.",
    achievements: [
      "Built sequence prediction models (constant, linear, MLP, double-layer) to evaluate accuracy and architecture tradeoffs",
      "Reduced loss by 66% by fine-tuning double MLP networks with SGD and improved text clarity",
      "Evaluated model depth, width, and learning rates to identify configurations that optimized speed and accuracy"
    ]
  },
  {
    id: 4,
    title: "Thread Library & Disk Scheduler",
    technologies: ["Operating Systems", "C++", "Multi-Threading"],
    description:
      "Low-level implementation of threading and disk scheduling systems in C++.",
    achievements: [
      "Developed a thread library for multiple threads with ucontext, FIFO scheduling, Mesa-style condition variables, and interrupts",
      "Built a disk scheduler using SSTF, synchronizing multiple threads with monitors while managing a bounded queue of 1000 requests"
    ]
  },
  {
    id: 5,
    title: "Token Manager and Holder Contracts",
    technologies: ["Solidity", "Ethereum Smart Contracts"],
    description:
      "Ethereum smart contracts for secure token management with ERC223 compliance.",
    achievements: [
      "Architected ERC223-compliant contracts to mint, melt, and transfer 100K+ tokens, ensuring secure token management",
      "Established token sales and remittance processes, facilitating 1,000+ secure on-chain transactions with zero security breaches"
    ]
  },
  {
    id: 6,
    title: "Mixed Reality Research",
    timeline: "Sept 2023 – Dec 2023",
    technologies: ["C", "C++", "Unity", "HoloLens 2", "MRTK"],
    description:
      "Research project exploring collaborative interaction patterns in Mixed Reality environments using HoloLens 2 at the Embedded Systems Lab",
    achievements: [
      "Implemented shared object movements with multiple users using HoloLens 2 in Unity via MRTK with 7% improved accuracy",
      "Recording these movements to enable in-depth analysis to enhance understanding of user interaction patterns"
    ]
  },
  {
    id: 7,
    title: "Secure Communication System",
    timeline: "Sept 2023 – Dec 2023",
    technologies: [
      "Python",
      "DE1-SoC",
      "Quartus Prime",
      "RSA",
      "DES",
      "LFSR-based PRNG",
      "Ring Oscillator-based TRNG"
    ],
    description:
      "FPGA-based implementation of cryptographic systems with true random number generation for enhanced security.",
    achievements: [
      "Designed and implemented a secure communication system using RSA and DES encryption on DE1-SoC boards",
      "Implemented LFSR-based PRNG and Ring Oscillator-based TRNG for true randomness for enhanced security"
    ]
  },
  {
    id: 8,
    title: "CPU Simulation and Cache Optimization",
    timeline: "Sept 2023 – Dec 2023",
    technologies: ["RISC-V Assembly", "Ripes", "Cache Architecture", "Performance Optimization"],
    description:
      "Architectural simulation focusing on cache optimization for RISC-V based processors to improve system performance.",
    achievements: [
      "Developed a CPU simulation incorporating an ALU, registers, and data memory for data manipulation",
      "Engineered enhancements in cache architecture using Ripes, achieving a significant increase in cache hit rate which led to a measurable improvement in system performance and throughput"
    ]
  }
];

// -----------------------------
// MAIN SCRIPT STARTS HERE
// -----------------------------

document.addEventListener("DOMContentLoaded", function () {
  // ---------- LOADING SCREEN SETUP ----------
  document.body.classList.add("loading-active");

  const loadingScreen = document.getElementById("loadingScreen");
  const progressBar = document.getElementById("progressBar");
  const loadingPercentage = document.getElementById("loadingPercentage");
  const loadingMessage = document.getElementById("loadingMessage");

  const messages = [
    "Initializing...",
    "Loading projects...",
    "Setting up AI models...",
    "Configuring cloud systems...",
    "Almost ready..."
  ];

  let progress = 0;

  // Start loading simulation
  const loadingInterval = setInterval(simulateLoading, 50);

  function simulateLoading() {
    progress += 7;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);
      loadingComplete();
    }

    progressBar.style.width = `${progress}%`;
    loadingPercentage.textContent = `${Math.round(progress)}%`;

    if (progress < 20) {
      loadingMessage.textContent = messages[0];
    } else if (progress < 40) {
      loadingMessage.textContent = messages[1];
    } else if (progress < 60) {
      loadingMessage.textContent = messages[2];
    } else if (progress < 80) {
      loadingMessage.textContent = messages[3];
    } else {
      loadingMessage.textContent = messages[4];
    }
  }

  function loadingComplete() {
    setTimeout(() => {
      // fade out
      loadingScreen.style.opacity = "0";

      setTimeout(() => {
        // hide after fade completes
        loadingScreen.style.display = "none";
        document.body.classList.remove("loading-active");
      }, 800);
    }, 300); // small delay so the user sees 100% briefly
  }

  // ---------- AFTER LOADING, PAGE SCRIPTS ----------
  
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
    startEvent: "DOMContentLoaded"
  });

  // Typed.js
  new Typed("#typing-text", {
    strings: ["generative AI.  ", "machine learning.  "],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    startDelay: 500,
    loop: true
  });

  // ---------- SKILLS SECTION HOVER EFFECT ----------
  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const randomX = Math.random() * 5 - 2.5;
      const randomY = Math.random() * 5 - 2.5;
      this.style.transform = `translateY(-3px) translateX(${randomX}px)`;
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) translateX(0)";
    });
  });

  // ---------- FILTER FUNCTIONALITY ----------
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      projectCards.forEach((card) => {
        if (filter === "all") {
          // show all
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 10);
        } else {
          // check if card category includes the filter
          if (card.dataset.category.includes(filter)) {
            card.style.display = "block";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "scale(1)";
            }, 10);
          } else {
            card.style.opacity = "0";
            card.style.transform = "scale(0.8)";
            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        }
      });
    });
  });

  // ---------- PROJECT MODAL FUNCTIONALITY ----------
  const projectModal = document.getElementById("projectModal");
  const modalClose = document.getElementById("modalClose");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const projectId = parseInt(card.dataset.projectId);
      const project = projectData.find((p) => p.id === projectId);

      if (project) {
        modalTitle.textContent = project.title;

        let content = `
          <div class="modal-section">
            <h4>Technologies</h4>
            <div class="modal-tech-tags">
              ${project.technologies
                .map((tech) => `<div class="modal-tech-tag">${tech}</div>`)
                .join("")}
            </div>
          </div>
        `;

        if (project.subtitle) {
          content += `
            <div class="modal-section">
              <h4>Details</h4>
              <p>${project.subtitle}</p>
            </div>
          `;
        }

        content += `
          <div class="modal-section">
            <h4>Description</h4>
            <p>${project.description}</p>
          </div>

          <div class="modal-section">
            <h4>Key Achievements</h4>
            <ul class="modal-list">
              ${project.achievements
                .map((achievement) => `<li>${achievement}</li>`)
                .join("")}
            </ul>
          </div>
        `;

        modalContent.innerHTML = content;
        projectModal.classList.add("active");
        document.body.style.overflow = "hidden"; // prevent scrolling behind modal
      }
    });
  });

  // close modal
  modalClose.addEventListener("click", () => {
    projectModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // close modal if user clicks outside
  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) {
      projectModal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // ESC key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectModal.classList.contains("active")) {
      projectModal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // ---------- BACK TO TOP BUTTON ----------
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // ---------- SCROLL PROGRESS BAR ----------
  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    document.getElementById("scrollProgress").style.width = scrollPercent + "%";
  });

  // ---------- THEME TOGGLE ----------
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");

  const savedTheme = localStorage.getItem("theme") || "dark";
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  } else {
    document.body.classList.remove("light-theme");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("light-theme")) {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
    } else {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
    }
  });

  // ---------- NAVBAR TOGGLE / MOBILE MENU ----------
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // close mobile menu when clicking a link
  const navLinksElements = navLinks.querySelectorAll("a");
  navLinksElements.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  // navbar scroll effect
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // ---------- CONTACT FORM ----------
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", function (e) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !message) {
      e.preventDefault(); // block submit
      alert("Please fill in all fields");
      return;
    }

    // optional AJAX (fetch)
    e.preventDefault();
    const formData = new FormData(contactForm);

    fetch(contactForm.getAttribute("action"), {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        alert("Thanks for your message! I'll get back to you soon.");
        contactForm.reset();
      })
      .catch((error) => {
        alert("There was a problem sending your message. Please try again.");
        console.error(error);
      });
  });

  // ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        // close mobile nav if open
        navLinks.classList.remove("active");
      }
    });
  });
});
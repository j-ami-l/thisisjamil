/**
 * MD HASAN JAMIL — PORTFOLIO & TRACKING SYSTEM
 * Main Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initGrowthLab();
  initProjectFilters();
  initCaseStudyModals();
  initCollabPlanner();
  initModals();
  initFAQ();
  initScrollSpy();
});

/* ==========================================================================
   1. Interactive "Engineering & Research" Metrics Lab
   ========================================================================== */
function initGrowthLab() {
  const growthToggle = document.getElementById('growth-toggle');
  const metricCgpa = document.getElementById('metric-cgpa-val');
  const metricProjects = document.getElementById('metric-projects-val');
  const metricCp = document.getElementById('metric-cp-val');
  const chartPathOrange = document.getElementById('chart-path-orange');
  const chartPathGreen = document.getElementById('chart-path-green');
  const chartAreaOrange = document.getElementById('chart-area-orange');

  if (!growthToggle) return;

  // Overview vs Deep Research Mode
  const standardState = {
    cgpa: '3.98',
    projects: 8,
    cp: 1100,
    cpLabel: '1000–1100 Codeforces',
    pathOrange: 'M 0 160 C 180 150, 320 130, 500 110 C 680 90, 840 70, 1000 60',
    areaOrange: 'M 0 160 C 180 150, 320 130, 500 110 C 680 90, 840 70, 1000 60 L 1000 220 L 0 220 Z',
    pathGreen: 'M 0 180 C 200 170, 380 145, 550 130 C 720 115, 880 95, 1000 85'
  };

  const deepState = {
    cgpa: '3.98',
    projects: 14,
    cp: 1350,
    cpLabel: 'Target 1400+ Specialist',
    pathOrange: 'M 0 160 C 150 145, 300 120, 480 80 C 640 40, 820 18, 1000 8',
    areaOrange: 'M 0 160 C 150 145, 300 120, 480 80 C 640 40, 820 18, 1000 8 L 1000 220 L 0 220 Z',
    pathGreen: 'M 0 180 C 180 160, 340 125, 520 85 C 700 45, 860 30, 1000 20'
  };

  growthToggle.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const targetData = isChecked ? deepState : standardState;

    if (metricProjects) {
      animateValue(metricProjects, parseInt(metricProjects.innerText) || 8, targetData.projects, 700, '+ Systems');
    }
    if (metricCp) {
      animateValue(metricCp, parseInt(metricCp.innerText) || 1100, targetData.cp, 700, ' Rating');
    }

    const cpTag = document.getElementById('metric-cp-tag');
    if (cpTag) {
      cpTag.innerText = targetData.cpLabel;
    }

    // Animate SVG trajectories
    if (chartPathOrange) chartPathOrange.setAttribute('d', targetData.pathOrange);
    if (chartAreaOrange) chartAreaOrange.setAttribute('d', targetData.areaOrange);
    if (chartPathGreen) chartPathGreen.setAttribute('d', targetData.pathGreen);
  });
}

function animateValue(elem, start, end, duration, suffix = '', prefix = '') {
  if (!elem) return;
  const range = end - start;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + range * ease);

    elem.innerText = `${prefix}${current}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ==========================================================================
   2. Project Filtering System
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   3. Case Study Details Data & Modal (Md Hasan Jamil's Authentic Projects)
   ========================================================================== */
const caseStudiesData = {
  'persocanv': {
    title: 'ExcellentNotes (PersoCanv) — Multimodal Spatial Knowledge OS',
    category: 'Spatial Systems & Knowledge Architecture',
    metric: 'Infinite Spatial Canvas',
    description: 'A cutting-edge multimodal spatial workspace and knowledge operating system for visual learning, research, and system architecture. Bridges non-linear mind mapping with dynamic document nodes, YouTube lecture ingestion, point-to-node relationships, and contextual AI synthesis.',
    stack: ['Next.js 14', 'React 19', 'TypeScript', 'Infinite Canvas API', 'PostgreSQL (Neon)', 'Prisma', 'AI Integration'],
    results: [
      'Engineered a high-performance 60fps infinite canvas with sub-pixel node pan & zoom',
      'Designed point-to-node directional connectors for complex system design modeling',
      'Integrated LLM context synthesis allowing direct question-answering against canvas nodes',
      'Structured relational graph database schema linking skills, notes, and milestones'
    ],
    client: 'Personal Flagship Project (Active Research & Development)'
  },
  'bangla-disaster': {
    title: 'Multimodal Bangla Disaster Severity Detection',
    category: 'Multimodal AI & Computer Vision Research',
    metric: '8-Class Multimodal Fusion',
    description: 'A comprehensive multimodal research project combining disaster satellite/ground imagery with raw Bangla situational reports to accurately classify disaster severity across 8 distinct disaster categories. Designed to assist emergency response operations in disaster-prone regions of Bangladesh.',
    stack: ['Python', 'TensorFlow', 'OpenCV', 'Bangla NLP Tokenization', 'Multimodal Fusion', 'Pandas/NumPy'],
    results: [
      'Curated and preprocessed multi-source dataset spanning 8 disaster classifications',
      'Built a dual-branch neural architecture extracting visual features via CNNs and textual semantics via Bangla NLP',
      'Implemented late-fusion decision layer producing unified disaster severity risk scores',
      'Generated extensive evaluation confusion matrices and research documentation'
    ],
    client: 'Academic & AI Research Project @ IIUC'
  },
  'codeummah': {
    title: 'CodeUmmah — NextGen Hackathon 2nd Runner-Up',
    category: 'Hackathon Award Winner',
    metric: '2nd Runner-up (Award Winner)',
    description: 'Developed under intense hackathon sprint conditions, CodeUmmah is a collaborative platform designed to unify tech volunteers, open-source contributors, and humanitarian initiatives. Rapidly prototyped full-stack authentication, project matchmaking, and real-time community resource allocation.',
    stack: ['Next.js', 'React', 'Node.js', 'REST APIs', 'TailwindCSS', 'Authentication'],
    results: [
      'Awarded 2nd Runner-up out of competitive nationwide university teams at NextGen Hackathon',
      'Architected and deployed full functional prototype within 24 hours',
      'Delivered live technical presentation and demo to industry judging panel',
      'Verified with official certificate of achievement'
    ],
    client: 'NextGen Hackathon Award'
  },
  'asteroid-3d': {
    title: '3D Asteroid Interactive Web Game',
    category: '3D Graphics & WebGL Physics',
    metric: '60 FPS 3D Physics',
    description: 'An immersive 3D web application exploring procedural asteroid fields, spaceship inertial movement, real-time particle collision detection, and performant WebGL rendering in the browser using React Three Fiber and Next.js.',
    stack: ['Next.js', 'React', 'React Three Fiber', 'Three.js', 'WebGL', 'TailwindCSS'],
    results: [
      'Optimized 3D asset geometry and lighting to sustain rock-solid 60 FPS on mobile and desktop',
      'Implemented custom camera lerping and inertia physics for responsive spaceship handling',
      'Engineered procedural asteroid spawning with spatial partitioning to avoid memory spikes',
      'Integrated spatial 3D audio triggers and score tracking'
    ],
    client: 'Interactive 3D Engineering Showcase'
  },
  'gardenbook': {
    title: 'GardenBook — Full-Stack Community & Plant Care Platform',
    category: 'Full-Stack Web Application',
    metric: 'PostgreSQL Relational DB',
    description: 'A feature-rich web application connecting botanical enthusiasts and home gardeners with botanical diagnosis guides, community journal logs, personalized watering schedules, and interactive plant care repositories.',
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'RESTful API', 'JWT Auth'],
    results: [
      'Built normalized relational database schemas for plant taxonomies and user care logs',
      'Implemented secure JWT session management and role-based access control',
      'Engineered responsive image upload and optimization pipeline',
      'Documented complete API endpoints with Postman collections'
    ],
    client: 'Full-Stack Development Project'
  },
  'yt-pipeline': {
    title: 'YouTube Educational Intelligence Pipeline',
    category: 'AI Pipeline & Autonomous Tooling',
    metric: '5-Min Chunk Video OCR',
    description: 'An automated pipeline engineered to transform dense, long-form technical lectures into structured, searchable study materials. Performs autonomous audio transcription, video slide OCR extraction, and multimodal LLM synthesis.',
    stack: ['Node.js', 'yt-dlp', 'FFmpeg', 'faster-whisper', 'Tesseract OCR', 'Gemini API / Qwen3-VL'],
    results: [
      'Automated video segment chunking into manageable 5-minute processing windows',
      'Integrated local faster-whisper for accurate, low-cost technical term transcription',
      'Extracted visual code snippets and diagrams directly from video keyframes via OCR',
      'Generated structured markdown and exportable DOCX study briefs with memory checkpoints'
    ],
    client: 'Autonomous Learning & Tooling Project'
  }
};

function initCaseStudyModals() {
  const caseStudyDialog = document.getElementById('case-study-dialog');
  const triggerBtns = document.querySelectorAll('.btn-view-case-study');

  if (!caseStudyDialog) return;

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      const data = caseStudiesData[projectId] || caseStudiesData['persocanv'];

      document.getElementById('modal-case-title').innerText = data.title;
      document.getElementById('modal-case-category').innerText = data.category;
      document.getElementById('modal-case-metric').innerText = data.metric;
      document.getElementById('modal-case-description').innerText = data.description;
      document.getElementById('modal-case-client').innerText = data.client;

      const stackList = document.getElementById('modal-case-stack');
      if (stackList) {
        stackList.innerHTML = data.stack.map(s => `<span class="project-tag">${s}</span>`).join('');
      }

      const resultsList = document.getElementById('modal-case-results');
      if (resultsList) {
        resultsList.innerHTML = data.results.map(r => `<li>✦ ${r}</li>`).join('');
      }

      caseStudyDialog.showModal();
    });
  });
}

/* ==========================================================================
   4. Interactive Collaboration / Opportunity Planner
   ========================================================================== */
function initCollabPlanner() {
  const typeCards = document.querySelectorAll('.option-card[data-type]');
  const scopeCards = document.querySelectorAll('.option-card[data-scope]');
  const speedCards = document.querySelectorAll('.option-card[data-speed]');
  const roleDisplay = document.getElementById('estimate-price-value');
  const timelineDisplay = document.getElementById('estimate-timeline-value');
  const lockBtn = document.getElementById('btn-lock-estimate');

  let selectedType = 'fullstack';
  let selectedScope = 'internship';
  let selectedSpeed = 'summer';

  const typeLabels = {
    'fullstack': 'Full-Stack Software Engineering',
    'aiml': 'AI / ML & Computer Vision Research',
    'spatial': 'Spatial Systems & 3D Interactive Web',
    'hackathon': 'Hackathon & Rapid Prototyping Team'
  };

  const scopeLabels = {
    'internship': 'Software / AI Engineering Internship',
    'collab': 'Research & Open Source Collaboration',
    'freelance': 'Custom Web Application Build'
  };

  const speedLabels = {
    'summer': 'Summer / Fall 2026 Engagement',
    'immediate': 'Immediate / Part-Time Collaborative Sprint'
  };

  function updatePlanner() {
    if (roleDisplay) {
      roleDisplay.innerHTML = `${typeLabels[selectedType]}`;
    }
    if (timelineDisplay) {
      timelineDisplay.innerText = `Focus: ${scopeLabels[selectedScope]} • ${speedLabels[selectedSpeed]}`;
    }
  }

  function setupOptionGroup(cards, onSelect) {
    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        onSelect(card);
        updatePlanner();
      });
    });
  }

  setupOptionGroup(typeCards, (c) => selectedType = c.getAttribute('data-type'));
  setupOptionGroup(scopeCards, (c) => selectedScope = c.getAttribute('data-scope'));
  setupOptionGroup(speedCards, (c) => selectedSpeed = c.getAttribute('data-speed'));

  if (lockBtn) {
    lockBtn.addEventListener('click', () => {
      const bookingDialog = document.getElementById('booking-dialog');
      const projectNoteInput = document.getElementById('booking-notes');

      if (projectNoteInput) {
        projectNoteInput.value = `Collaboration Interest: ${typeLabels[selectedType]} (${scopeLabels[selectedScope]}, ${speedLabels[selectedSpeed]}). Looking forward to connecting!`;
      }

      if (bookingDialog) {
        bookingDialog.showModal();
      }
    });
  }

  updatePlanner();
}

/* ==========================================================================
   5. Booking & Contact Modal Handlers
   ========================================================================== */
function initModals() {
  const bookingDialog = document.getElementById('booking-dialog');
  const caseStudyDialog = document.getElementById('case-study-dialog');
  const openBookingBtns = document.querySelectorAll('.open-booking-modal');
  const closeBtns = document.querySelectorAll('.modal-close-btn');
  const bookingForm = document.getElementById('project-booking-form');

  openBookingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (bookingDialog) bookingDialog.showModal();
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (bookingDialog && bookingDialog.open) bookingDialog.close();
      if (caseStudyDialog && caseStudyDialog.open) caseStudyDialog.close();
    });
  });

  [bookingDialog, caseStudyDialog].forEach(dialog => {
    if (!dialog) return;
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        dialog.close();
      }
    });
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = bookingForm.querySelector('.btn-submit-modal');
      const successMsg = document.getElementById('booking-success-msg');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending message...';
      }

      setTimeout(() => {
        if (bookingForm) bookingForm.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';

        setTimeout(() => {
          if (bookingDialog && bookingDialog.open) {
            bookingDialog.close();
            setTimeout(() => {
              if (bookingForm) {
                bookingForm.reset();
                bookingForm.style.display = 'block';
              }
              if (successMsg) successMsg.style.display = 'none';
              if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = 'Send Message ✦';
              }
            }, 300);
          }
        }, 2200);
      }, 800);
    });
  }
}

/* ==========================================================================
   6. FAQ & Knowledge Accordion
   ========================================================================== */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   7. Smooth Navigation ScrollSpy
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// PM Internship Recommendation Engine - Main Application Logic

// Global state management
window.AppState = {
    currentLanguage: 'en',
    currentScreen: 'welcome',
    currentStep: 1,
    userProfile: {
        fullName: '',
        age: '',
        state: '',
        education: '',
        skills: [],
        sectors: []
    },
    applications: [],
    recommendations: []
};

// Internship data
const INTERNSHIPS = [
    {
        id: "PMIS0001",
        company: "Tata Consultancy Services",
        role: "Customer Service Executive",
        sector: "IT Services",
        location: "Mumbai, Maharashtra",
        state: "Maharashtra",
        education: "12th Pass",
        skills: ["Communication Skills", "Computer Basics"],
        description: "Join TCS as a Customer Service Executive. Handle customer queries and provide excellent service.",
        stipend: 5000,
        spots: 25,
        priority: 0.9
    },
    {
        id: "PMIS0002", 
        company: "Reliance Industries",
        role: "Sales Associate",
        sector: "Retail",
        location: "Delhi, Delhi",
        state: "Delhi",
        education: "10th Pass",
        skills: ["Sales Skills", "Customer Service"],
        description: "Work with Reliance Retail team to assist customers and drive sales.",
        stipend: 5000,
        spots: 15,
        priority: 0.85
    },
    {
        id: "PMIS0003",
        company: "HDFC Bank", 
        role: "Banking Associate",
        sector: "Banking & Financial Services",
        location: "Bengaluru, Karnataka",
        state: "Karnataka",
        education: "12th Pass",
        skills: ["Basic Accounting", "Communication Skills"],
        description: "Support banking operations and customer service at HDFC Bank branches.",
        stipend: 5000,
        spots: 30,
        priority: 0.88
    },
    {
        id: "PMIS0004",
        company: "Mahindra Group",
        role: "Mechanic Trainee", 
        sector: "Automobile",
        location: "Chennai, Tamil Nadu",
        state: "Tamil Nadu",
        education: "ITI",
        skills: ["Technical Skills", "Equipment Handling"],
        description: "Learn vehicle maintenance and repair techniques with Mahindra's expert team.",
        stipend: 5000,
        spots: 20,
        priority: 0.92
    },
    {
        id: "PMIS0005",
        company: "Maruti Suzuki",
        role: "Production Assistant",
        sector: "Automobile", 
        location: "Gurgaon, Haryana",
        state: "Haryana",
        education: "ITI",
        skills: ["Machine Operation", "Quality Control"],
        description: "Work in automotive manufacturing and learn production processes.",
        stipend: 5000,
        spots: 40,
        priority: 0.86
    },
    {
        id: "PMIS0006",
        company: "Larsen & Toubro",
        role: "Junior Engineer",
        sector: "Construction",
        location: "Hyderabad, Telangana", 
        state: "Telangana",
        education: "Diploma",
        skills: ["Technical Drawing", "Project Management"],
        description: "Support engineering projects and learn construction industry practices.",
        stipend: 5000,
        spots: 18,
        priority: 0.89
    },
    {
        id: "PMIS0007",
        company: "Asian Paints",
        role: "Quality Inspector",
        sector: "Manufacturing",
        location: "Kolkata, West Bengal",
        state: "West Bengal", 
        education: "Diploma",
        skills: ["Quality Control", "Technical Skills"],
        description: "Ensure product quality standards in paint manufacturing processes.",
        stipend: 5000,
        spots: 12,
        priority: 0.84
    },
    {
        id: "PMIS0008",
        company: "ITC Limited",
        role: "Management Trainee",
        sector: "FMCG",
        location: "Pune, Maharashtra",
        state: "Maharashtra",
        education: "Graduate", 
        skills: ["Leadership", "Business Analytics"],
        description: "Rotate across departments and learn business operations in FMCG sector.",
        stipend: 5000,
        spots: 8,
        priority: 0.93
    },
    {
        id: "PMIS0009",
        company: "Wipro",
        role: "IT Support Associate", 
        sector: "IT Services",
        location: "Ahmedabad, Gujarat",
        state: "Gujarat",
        education: "12th Pass",
        skills: ["Computer Basics", "Problem Solving"],
        description: "Provide technical support and learn IT service management.",
        stipend: 5000,
        spots: 35,
        priority: 0.87
    },
    {
        id: "PMIS0010",
        company: "Bharti Airtel",
        role: "Customer Care Executive",
        sector: "Telecommunications",
        location: "Jaipur, Rajasthan",
        state: "Rajasthan",
        education: "12th Pass",
        skills: ["Communication Skills", "Customer Service"],
        description: "Handle customer queries and provide telecommunication service support.", 
        stipend: 5000,
        spots: 22,
        priority: 0.83
    }
];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initializeApp();
    setupAllEventListeners();
});

function initializeApp() {
    console.log('Initializing app...');
    showScreen('welcomeScreen');
    updateLanguageDisplay();
}

// Language management
function updateLanguageDisplay() {
    const elements = document.querySelectorAll('[class*="lang-"]');
    elements.forEach(el => {
        if (el.classList.contains(`lang-${window.AppState.currentLanguage}`)) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
}

function toggleLanguage() {
    window.AppState.currentLanguage = window.AppState.currentLanguage === 'en' ? 'hi' : 'en';
    updateLanguageDisplay();
}

// Screen management
function showScreen(screenId) {
    console.log('Showing screen:', screenId);
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        window.AppState.currentScreen = screenId;
    } else {
        console.error('Screen not found:', screenId);
    }
}

function startApplication() {
    showScreen('profileScreen');
    showStep(1);
}

function showWelcomeScreen() {
    showScreen('welcomeScreen');
    resetProfileData();
}

function showRecommendations() {
    showScreen('recommendationsScreen');
}

// Step management
function showStep(stepNumber) {
    console.log('Showing step:', stepNumber);
    // Update progress bar
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = `${(stepNumber / 4) * 100}%`;
    }
    
    // Update step indicators
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < stepNumber) {
            step.classList.add('completed');
        } else if (index + 1 === stepNumber) {
            step.classList.add('active');
        }
    });
    
    // Show correct form step
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    const targetStep = document.getElementById(`step${stepNumber}`);
    if (targetStep) {
        targetStep.classList.add('active');
    }
    
    window.AppState.currentStep = stepNumber;
}

function nextStep(stepNumber) {
    if (validateCurrentStep()) {
        collectCurrentStepData();
        showStep(stepNumber);
    }
}

function prevStep(stepNumber) {
    showStep(stepNumber);
}

// Form validation
function validateCurrentStep() {
    switch (window.AppState.currentStep) {
        case 1:
            return validatePersonalDetails();
        case 2:
            return validateEducation();
        case 3:
            return true; // Skills are optional
        case 4:
            return true; // Preferences are optional
        default:
            return true;
    }
}

function validatePersonalDetails() {
    const fullName = document.getElementById('fullName')?.value.trim();
    const age = document.getElementById('age')?.value;
    const state = document.getElementById('state')?.value;
    
    if (!fullName) {
        showError('Please enter your full name / कृपया अपना पूरा नाम दर्ज करें');
        return false;
    }
    if (!age) {
        showError('Please select your age / कृपया अपनी आयु चुनें');
        return false;
    }
    if (!state) {
        showError('Please select your state / कृपया अपना राज्य चुनें');
        return false;
    }
    return true;
}

function validateEducation() {
    const selectedEducation = document.querySelector('.option-card.selected');
    if (!selectedEducation) {
        showError('Please select your education level / कृपया अपनी शिक्षा का स्तर चुनें');
        return false;
    }
    return true;
}

function showError(message) {
    alert(message);
}

// Data collection
function collectCurrentStepData() {
    switch (window.AppState.currentStep) {
        case 1:
            window.AppState.userProfile.fullName = document.getElementById('fullName')?.value.trim() || '';
            window.AppState.userProfile.age = document.getElementById('age')?.value || '';
            window.AppState.userProfile.state = document.getElementById('state')?.value || '';
            break;
        case 2:
            const selectedEducation = document.querySelector('.option-card.selected');
            if (selectedEducation) {
                window.AppState.userProfile.education = selectedEducation.dataset.value;
            }
            break;
        case 3:
            window.AppState.userProfile.skills = Array.from(document.querySelectorAll('.skill-tag.selected'))
                .map(tag => tag.dataset.skill);
            break;
        case 4:
            window.AppState.userProfile.sectors = Array.from(document.querySelectorAll('.sector-card.selected'))
                .map(card => card.dataset.sector);
            break;
    }
}

function resetProfileData() {
    window.AppState.userProfile = {
        fullName: '',
        age: '',
        state: '',
        education: '',
        skills: [],
        sectors: []
    };
    window.AppState.applications = [];
    window.AppState.recommendations = [];
    
    // Reset form
    const fullNameInput = document.getElementById('fullName');
    const ageInput = document.getElementById('age');
    const stateInput = document.getElementById('state');
    
    if (fullNameInput) fullNameInput.value = '';
    if (ageInput) ageInput.value = '';
    if (stateInput) stateInput.value = '';
    
    // Reset selections
    document.querySelectorAll('.option-card, .skill-tag, .sector-card').forEach(el => {
        el.classList.remove('selected');
    });
}

// Event listeners setup
function setupAllEventListeners() {
    console.log('Setting up all event listeners...');
    
    // Language toggle
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Main navigation buttons
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', startApplication);
    }
    
    const startOverBtn = document.getElementById('startOverBtn');
    if (startOverBtn) {
        startOverBtn.addEventListener('click', showWelcomeScreen);
    }
    
    const trackBtn = document.getElementById('trackBtn');
    if (trackBtn) {
        trackBtn.addEventListener('click', trackApplications);
    }
    
    const backToRecsBtn = document.getElementById('backToRecsBtn');
    if (backToRecsBtn) {
        backToRecsBtn.addEventListener('click', showRecommendations);
    }
    
    // Step navigation buttons
    const step1Next = document.getElementById('step1Next');
    if (step1Next) {
        step1Next.addEventListener('click', () => nextStep(2));
    }
    
    const step2Back = document.getElementById('step2Back');
    if (step2Back) {
        step2Back.addEventListener('click', () => prevStep(1));
    }
    
    const step2Next = document.getElementById('step2Next');
    if (step2Next) {
        step2Next.addEventListener('click', () => nextStep(3));
    }
    
    const step3Back = document.getElementById('step3Back');
    if (step3Back) {
        step3Back.addEventListener('click', () => prevStep(2));
    }
    
    const step3Next = document.getElementById('step3Next');
    if (step3Next) {
        step3Next.addEventListener('click', () => nextStep(4));
    }
    
    const step4Back = document.getElementById('step4Back');
    if (step4Back) {
        step4Back.addEventListener('click', () => prevStep(3));
    }
    
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateRecommendations);
    }
    
    // Education option cards
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            const nextButton = document.getElementById('step2Next');
            if (nextButton) {
                nextButton.disabled = false;
            }
        });
    });
    
    // Skill tags
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
    
    // Sector cards
    document.querySelectorAll('.sector-card').forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
}

// AI Recommendation Engine
function generateRecommendations() {
    collectCurrentStepData();
    showScreen('loadingScreen');
    
    // Simulate AI processing time
    setTimeout(() => {
        const recommendations = calculateRecommendations();
        window.AppState.recommendations = recommendations;
        displayRecommendations(recommendations);
        showScreen('recommendationsScreen');
    }, 3000);
}

function calculateRecommendations() {
    const scoredInternships = INTERNSHIPS.map(internship => {
        const score = calculateMatchScore(internship, window.AppState.userProfile);
        return {
            ...internship,
            matchScore: score,
            matchDetails: getMatchDetails(internship, window.AppState.userProfile)
        };
    });
    
    // Sort by match score and return top 4 recommendations
    return scoredInternships
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 4);
}

function calculateMatchScore(internship, profile) {
    let score = 0;
    const weights = {
        education: 0.4,
        location: 0.2,
        skills: 0.3,
        sector: 0.1
    };
    
    // Education match (exact match gets full points)
    if (internship.education === profile.education) {
        score += weights.education * 100;
    } else if (isEducationCompatible(internship.education, profile.education)) {
        score += weights.education * 70;
    }
    
    // Location match (same state gets full points)
    if (internship.state === profile.state) {
        score += weights.location * 100;
    } else {
        score += weights.location * 30; // Other states get some points
    }
    
    // Skills match
    const skillMatchPercent = calculateSkillMatch(internship.skills, profile.skills);
    score += weights.skills * skillMatchPercent;
    
    // Sector match
    if (profile.sectors.length === 0 || profile.sectors.includes(internship.sector)) {
        score += weights.sector * 100;
    }
    
    // Add company priority bonus
    score = score * internship.priority;
    
    return Math.round(score);
}

function isEducationCompatible(required, userEducation) {
    const educationHierarchy = {
        "10th Pass": 1,
        "12th Pass": 2,
        "ITI": 2,
        "Diploma": 3,
        "Graduate": 4
    };
    
    return educationHierarchy[userEducation] >= educationHierarchy[required];
}

function calculateSkillMatch(requiredSkills, userSkills) {
    if (userSkills.length === 0) return 50; // Default score if no skills selected
    
    const matchedSkills = requiredSkills.filter(skill => userSkills.includes(skill));
    return (matchedSkills.length / requiredSkills.length) * 100;
}

function getMatchDetails(internship, profile) {
    const educationMatch = internship.education === profile.education ? "Perfect" : 
                          isEducationCompatible(internship.education, profile.education) ? "Compatible" : "Partial";
    
    const locationMatch = internship.state === profile.state ? "Same State" : "Other State";
    
    const skillMatchPercent = profile.skills.length > 0 ? 
                             calculateSkillMatch(internship.skills, profile.skills) : 50;
    
    const skillMatch = skillMatchPercent >= 80 ? "Excellent" : 
                      skillMatchPercent >= 50 ? "Good" : "Basic";
    
    return {
        education: educationMatch,
        location: locationMatch,
        skills: skillMatch,
        skillPercent: Math.round(skillMatchPercent)
    };
}

// Display recommendations
function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendationCards');
    if (!container) return;
    
    container.innerHTML = '';
    
    recommendations.forEach((internship, index) => {
        const card = createRecommendationCard(internship, index);
        container.appendChild(card);
    });
}

function createRecommendationCard(internship, index) {
    const card = document.createElement('div');
    card.className = 'recommendation-card';
    
    const matchBadgeColor = internship.matchScore >= 80 ? '#4CAF50' : 
                           internship.matchScore >= 60 ? '#FF9800' : '#2196F3';
    
    card.innerHTML = `
        <div class="match-score" style="background-color: ${matchBadgeColor}">
            ${internship.matchScore}% Match
        </div>
        
        <div class="company-info">
            <h3 class="company-name">${internship.company}</h3>
            <div class="role-title">${internship.role}</div>
        </div>
        
        <div class="internship-details">
            <div class="detail-item">
                <span class="detail-icon">📍</span>
                <span>${internship.location}</span>
            </div>
            <div class="detail-item">
                <span class="detail-icon">🎓</span>
                <span>${internship.education} Required</span>
            </div>
            <div class="detail-item">
                <span class="detail-icon">💰</span>
                <span>₹${internship.stipend}/month</span>
            </div>
            <div class="detail-item">
                <span class="detail-icon">👥</span>
                <span>${internship.spots} positions available</span>
            </div>
        </div>
        
        <div class="match-indicators">
            <div class="match-indicator">
                <div class="match-label">Education</div>
                <div class="match-value">${internship.matchDetails.education}</div>
            </div>
            <div class="match-indicator">
                <div class="match-label">Location</div>
                <div class="match-value">${internship.matchDetails.location}</div>
            </div>
            <div class="match-indicator">
                <div class="match-label">Skills</div>
                <div class="match-value">${internship.matchDetails.skillPercent}%</div>
            </div>
        </div>
        
        <p style="color: var(--color-text-secondary); margin-bottom: var(--space-16); font-size: var(--font-size-sm);">
            ${internship.description}
        </p>
        
        <button class="btn btn--primary btn--lg apply-button" data-internship-id="${internship.id}">
            <span class="lang-en">🚀 Apply Now</span>
            <span class="lang-hi hidden">🚀 अभी आवेदन करें</span>
        </button>
    `;
    
    // Add event listener to the apply button
    const applyButton = card.querySelector('.apply-button');
    applyButton.addEventListener('click', function() {
        applyForInternship(internship.id, this);
    });
    
    return card;
}

function applyForInternship(internshipId, buttonElement) {
    // Check if already applied
    if (window.AppState.applications.includes(internshipId)) {
        return;
    }
    
    // Add to applications
    window.AppState.applications.push(internshipId);
    
    // Update button state
    buttonElement.classList.add('applied');
    buttonElement.innerHTML = `
        <span class="lang-en">✅ Applied Successfully</span>
        <span class="lang-hi hidden">✅ सफलतापूर्वक आवेदन किया गया</span>
    `;
    buttonElement.disabled = true;
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <span class="lang-en">🎉 Application submitted! You will be contacted within 3-5 business days.</span>
        <span class="lang-hi hidden">🎉 आवेदन जमा कर दिया गया! आपसे 3-5 व्यावसायिक दिनों में संपर्क किया जाएगा।</span>
    `;
    
    buttonElement.parentNode.appendChild(successMsg);
    
    // Update language display for new elements
    updateLanguageDisplay();
    
    // Auto scroll to success message
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function trackApplications() {
    showScreen('trackingScreen');
    displayApplicationStatus();
}

function displayApplicationStatus() {
    const container = document.querySelector('.tracking-content');
    if (!container) return;
    
    if (window.AppState.applications.length === 0) {
        container.innerHTML = `
            <p class="tracking-empty">
                <span class="lang-en">🔍 No applications yet. Apply for internships to track your progress!</span>
                <span class="lang-hi hidden">🔍 अभी तक कोई आवेदन नहीं। अपनी प्रगति ट्रैक करने के लिए इंटर्नशिप के लिए आवेदन करें!</span>
            </p>
        `;
    } else {
        const applicationsHtml = window.AppState.applications.map(appId => {
            const internship = INTERNSHIPS.find(i => i.id === appId);
            const statusOptions = ['Under Review', 'Shortlisted', 'Interview Scheduled'];
            const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
            
            return `
                <div class="application-item" style="padding: var(--space-16); border: 1px solid var(--color-card-border); border-radius: var(--radius-base); margin-bottom: var(--space-16); background: var(--color-surface);">
                    <h4 style="margin-bottom: var(--space-8); color: var(--color-text);">${internship.company}</h4>
                    <p style="margin-bottom: var(--space-8); color: var(--color-text-secondary);">${internship.role}</p>
                    <div class="status status--info">${randomStatus}</div>
                </div>
            `;
        }).join('');
        
        container.innerHTML = `
            <div class="applications-list">
                <h3 style="margin-bottom: var(--space-16); text-align: center; color: var(--color-text);">
                    <span class="lang-en">Your Applications (${window.AppState.applications.length})</span>
                    <span class="lang-hi hidden">आपके आवेदन (${window.AppState.applications.length})</span>
                </h3>
                ${applicationsHtml}
            </div>
        `;
    }
    
    updateLanguageDisplay();
}

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    // ESC key to go back
    if (e.key === 'Escape') {
        if (window.AppState.currentScreen === 'profileScreen' && window.AppState.currentStep > 1) {
            prevStep(window.AppState.currentStep - 1);
        } else if (window.AppState.currentScreen !== 'welcomeScreen') {
            showWelcomeScreen();
        }
    }
    
    // Enter key to proceed
    if (e.key === 'Enter') {
        const activeButton = document.querySelector('.btn--primary:not(:disabled)');
        if (activeButton) {
            activeButton.click();
        }
    }
});

console.log('App script loaded successfully');
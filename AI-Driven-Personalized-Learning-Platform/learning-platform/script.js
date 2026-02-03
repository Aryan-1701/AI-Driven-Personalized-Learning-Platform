// Landing Page Functions
function showLandingPage() {
    document.getElementById('landing-page').classList.remove('hidden');
    document.getElementById('auth-page').classList.add('hidden');
    document.getElementById('dashboard').classList.add('hidden');
}

function showAuthPage(tab) {
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('auth-page').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    
    // Switch to the appropriate tab
    if (tab === 'signup') {
        switchTab('signup');
    } else {
        switchTab('login');
    }
}

function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Authentication Functions
function switchTab(tab) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(btn => btn.classList.remove('active'));
    
    if (tab === 'login') {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        tabs[0].classList.add('active');
    } else {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
        tabs[1].classList.add('active');
    }
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simulate authentication
    if (email && password) {
        // Store user session (in real app, this would be handled by backend)
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        
        // Show dashboard
        document.getElementById('landing-page').classList.add('hidden');
        document.getElementById('auth-page').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
    } else {
        alert('Please enter email and password');
    }
}

function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const userType = document.getElementById('user-type').value;
    
    // Simulate signup
    if (name && email && password) {
        // Store user session
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', name);
        localStorage.setItem('userType', userType);
        
        // Show dashboard
        document.getElementById('landing-page').classList.add('hidden');
        document.getElementById('auth-page').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
    } else {
        alert('Please fill in all fields');
    }
}

function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userType');
    
    document.getElementById('landing-page').classList.remove('hidden');
    document.getElementById('auth-page').classList.add('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    
    // Reset forms
    document.getElementById('login-form').querySelector('form').reset();
    document.getElementById('signup-form').querySelector('form').reset();
}

// Module Navigation
function showModule(moduleName) {
    // Hide all modules
    const allModules = document.querySelectorAll('.module-content');
    allModules.forEach(module => module.classList.remove('active'));
    
    // Show selected module
    const moduleMap = {
        'home': 'home-module',
        'progress': 'progress-module',
        'difficulty': 'difficulty-module',
        'analytics': 'analytics-module',
        'mock-test': 'mock-test-module',
        'study-path': 'study-path-module',
        'dashboard-view': 'dashboard-view-module',
        'reports': 'reports-module',
        'matchmaker': 'matchmaker-module',
        'privacy': 'privacy-module'
    };
    
    const moduleId = moduleMap[moduleName];
    if (moduleId) {
        document.getElementById(moduleId).classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Dashboard Tab Switching
function switchDashboardTab(tab) {
    const studentDashboard = document.getElementById('student-dashboard');
    const teacherDashboard = document.getElementById('teacher-dashboard');
    const tabs = document.querySelectorAll('.dashboard-tabs .tab-btn');
    
    tabs.forEach(btn => btn.classList.remove('active'));
    
    if (tab === 'student') {
        studentDashboard.classList.add('active');
        teacherDashboard.classList.remove('active');
        tabs[0].classList.add('active');
    } else {
        studentDashboard.classList.remove('active');
        teacherDashboard.classList.add('active');
        tabs[1].classList.add('active');
    }
}

// Report Generation
function generateReport() {
    alert('Report generation initiated! This would typically generate a comprehensive report with AI insights.');
    // In a real application, this would make an API call to generate the report
}

// Check if user is logged in on page load
window.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn === 'true') {
        document.getElementById('landing-page').classList.add('hidden');
        document.getElementById('auth-page').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
    } else {
        document.getElementById('landing-page').classList.remove('hidden');
        document.getElementById('auth-page').classList.add('hidden');
        document.getElementById('dashboard').classList.add('hidden');
    }
});

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
    });
});

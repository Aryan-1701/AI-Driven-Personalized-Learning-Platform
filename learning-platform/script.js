import { authAPI, progressAPI, lessonsAPI, analyticsAPI, mockTestsAPI, studyPathAPI, dashboardAPI, reportsAPI, matchesAPI } from './api.js';

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

async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        alert('Please enter email and password');
        return;
    }

    try {
        const response = await authAPI.login(email, password);
        
        // Store token and user data
        localStorage.setItem('token', response.token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', response.user.email);
        localStorage.setItem('userName', response.user.name);
        localStorage.setItem('userType', response.user.userType);
        localStorage.setItem('userId', response.user.id);
        
        // Show dashboard
        document.getElementById('landing-page').classList.add('hidden');
        document.getElementById('auth-page').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        
        // Load dashboard data
        loadDashboardData();
    } catch (error) {
        const errorMessage = error.message || 'Login failed. Please try again.';
        if (errorMessage.includes('Backend server') || errorMessage.includes('Unable to connect')) {
            alert(`⚠️ ${errorMessage}\n\nTo fix this:\n1. Open START_BACKEND.bat in the project root\n2. Make sure MongoDB is running (use START_MONGODB.bat if needed)\n3. Try again`);
        } else {
            alert(`❌ ${errorMessage}`);
        }
    }
}

async function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const userType = document.getElementById('user-type').value;
    
    if (!name || !email || !password) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await authAPI.register({ name, email, password, userType });
        
        // Store token and user data
        localStorage.setItem('token', response.token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', response.user.email);
        localStorage.setItem('userName', response.user.name);
        localStorage.setItem('userType', response.user.userType);
        localStorage.setItem('userId', response.user.id);
        
        // Show dashboard
        document.getElementById('landing-page').classList.add('hidden');
        document.getElementById('auth-page').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        
        // Load dashboard data
        loadDashboardData();
    } catch (error) {
        const errorMessage = error.message || 'Signup failed. Please try again.';
        if (errorMessage.includes('Backend server') || errorMessage.includes('Unable to connect')) {
            alert(`⚠️ ${errorMessage}\n\nTo fix this:\n1. Open START_BACKEND.bat in the project root\n2. Make sure MongoDB is running (use START_MONGODB.bat if needed)\n3. Try again`);
        } else {
            alert(`❌ ${errorMessage}`);
        }
    }
}

function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    
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
        
        // Load module-specific data
        loadModuleData(moduleName);
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Load module-specific data
async function loadModuleData(moduleName) {
    try {
        switch(moduleName) {
            case 'progress':
                await loadProgressData();
                break;
            case 'difficulty':
                await loadDifficultyData();
                break;
            case 'analytics':
                await loadAnalyticsData();
                break;
            case 'dashboard-view':
                await loadDashboardViewData();
                break;
            case 'study-path':
                await loadStudyPathData();
                break;
            case 'mock-test':
                await loadMockTestsData();
                break;
            case 'reports':
                await loadReportsData();
                break;
            case 'matchmaker':
                await loadMatchesData();
                break;
        }
    } catch (error) {
        console.error('Error loading module data:', error);
    }
}

// Load Progress Data
async function loadProgressData() {
    try {
        const response = await progressAPI.getProgress();
        const progress = response.data;
        
        // Update UI with progress data
        const progressBar = document.querySelector('#progress-module .progress-bar');
        if (progressBar) {
            const progressValue = progress.overallProgress || 0;
            progressBar.style.width = `${progressValue}%`;
            const span = progressBar.querySelector('span');
            if (span) span.textContent = `${progressValue}%`;
        }
        
        // Update subject performance
        const subjectList = document.querySelector('#progress-module .subject-list');
        if (subjectList) {
            if (progress.subjectPerformance && progress.subjectPerformance.length > 0) {
                subjectList.innerHTML = progress.subjectPerformance.map(subj => `
                    <div class="subject-item">
                        <span>${subj.subject}</span>
                        <div class="progress-bar-container">
                            <div class="progress-bar-small" style="width: ${subj.score || 0}%"></div>
                        </div>
                        <span>${subj.score || 0}%</span>
                    </div>
                `).join('');
            } else {
                subjectList.innerHTML = '<p style="color: var(--text-secondary); padding: 20px; text-align: center;">No subject data yet. Complete some lessons to see your progress!</p>';
            }
        }
        
        // Update learning gaps
        const gapList = document.querySelector('#progress-module .gap-list');
        if (gapList) {
            if (progress.learningGaps && progress.learningGaps.length > 0) {
                gapList.innerHTML = progress.learningGaps.map(gap => `
                    <li>${gap.subject}: ${gap.topic} - ${gap.severity === 'high' ? 'Needs Review' : gap.severity === 'medium' ? 'Requires Practice' : 'Needs Improvement'}</li>
                `).join('');
            } else {
                gapList.innerHTML = '<li style="color: var(--text-secondary); font-style: italic;">No learning gaps identified yet. Keep learning!</li>';
            }
        }
    } catch (error) {
        console.error('Error loading progress:', error);
        // Show error message
        const subjectList = document.querySelector('#progress-module .subject-list');
        if (subjectList) {
            const errorMsg = error.message || 'Unknown error';
            if (errorMsg.includes('Backend server') || errorMsg.includes('Unable to connect')) {
                subjectList.innerHTML = '<p style="color: var(--danger-color); padding: 20px; text-align: center;"><strong>⚠️ Backend server is not running.</strong><br>Please start the backend server using START_BACKEND.bat</p>';
            } else {
                subjectList.innerHTML = `<p style="color: var(--danger-color); padding: 20px;">Error loading progress data: ${errorMsg}</p>`;
            }
        }
    }
}

// Identify Learning Gaps (real-time generation)
async function identifyLearningGaps() {
    try {
        await progressAPI.identifyGaps();
        await loadProgressData();
        // Refresh downstream modules that depend on gaps/progress
        await loadAnalyticsData();
        await loadStudyPathData();
        alert('✅ Learning gaps updated based on your latest performance.');
    } catch (error) {
        const errorMessage = error.message || 'Unknown error occurred';
        if (errorMessage.includes('Backend server') || errorMessage.includes('Unable to connect')) {
            alert(`⚠️ ${errorMessage}\n\nPlease ensure the backend server is running.`);
        } else {
            alert(`❌ Error identifying gaps: ${errorMessage}`);
        }
    }
}

// Load Analytics Data
async function loadAnalyticsData() {
    try {
        const response = await analyticsAPI.getAnalytics();
        const analytics = response.data;
        
        // Update insights
        const insightsList = document.querySelector('#analytics-module .insights-list');
        if (insightsList) {
            if (analytics.insights && analytics.insights.length > 0) {
                insightsList.innerHTML = analytics.insights.map(insight => `
                    <div class="insight-item ${insight.type}">
                        <strong>${insight.type === 'positive' ? '✅' : insight.type === 'warning' ? '⚠️' : '📊'} ${insight.type === 'positive' ? 'Strength' : insight.type === 'warning' ? 'Improvement' : 'Pattern'}:</strong> ${insight.message}
                    </div>
                `).join('');
            } else {
                insightsList.innerHTML = '<div class="insight-item neutral"><strong>📊 Getting Started:</strong> Complete lessons and take tests to generate insights about your learning patterns.</div>';
            }
        }
        
        // Update breakdown
        const breakdownGrid = document.querySelector('#analytics-module .breakdown-grid');
        if (breakdownGrid) {
            if (analytics.breakdown) {
                const strongAreas = analytics.breakdown.strongAreas || [];
                const areasToImprove = analytics.breakdown.areasToImprove || [];
                
                breakdownGrid.innerHTML = `
                    <div class="breakdown-item">
                        <span>Strong Areas</span>
                        <ul>
                            ${strongAreas.length > 0 ? strongAreas.map(area => `<li>${area}</li>`).join('') : '<li style="color: var(--text-secondary); font-style: italic;">No data yet</li>'}
                        </ul>
                    </div>
                    <div class="breakdown-item">
                        <span>Areas to Improve</span>
                        <ul>
                            ${areasToImprove.length > 0 ? areasToImprove.map(area => `<li>${area}</li>`).join('') : '<li style="color: var(--text-secondary); font-style: italic;">Start learning to identify areas for improvement</li>'}
                        </ul>
                    </div>
                `;
            } else {
                breakdownGrid.innerHTML = `
                    <div class="breakdown-item">
                        <span>Strong Areas</span>
                        <ul><li style="color: var(--text-secondary); font-style: italic;">No data yet</li></ul>
                    </div>
                    <div class="breakdown-item">
                        <span>Areas to Improve</span>
                        <ul><li style="color: var(--text-secondary); font-style: italic;">No data yet</li></ul>
                    </div>
                `;
            }
        }
    } catch (error) {
        console.error('Error loading analytics:', error);
        const insightsList = document.querySelector('#analytics-module .insights-list');
        if (insightsList) {
            const errorMsg = error.message || 'Unknown error';
            if (errorMsg.includes('Backend server') || errorMsg.includes('Unable to connect')) {
                insightsList.innerHTML = '<div class="insight-item warning"><strong>⚠️ Backend server is not running.</strong> Please start the backend server using START_BACKEND.bat</div>';
            } else {
                insightsList.innerHTML = `<div class="insight-item warning"><strong>⚠️ Error:</strong> ${errorMsg}</div>`;
            }
        }
    }
}

// Load Dashboard View Data
async function loadDashboardViewData() {
    try {
        const userType = localStorage.getItem('userType');
        let response;
        
        if (userType === 'teacher') {
            response = await dashboardAPI.getTeacherDashboard();
        } else {
            response = await dashboardAPI.getStudentDashboard();
        }
        
        const data = response.data;
        
        if (userType === 'teacher') {
            // Update teacher dashboard
            const teacherDashboard = document.getElementById('teacher-dashboard');
            if (teacherDashboard) {
                const bigNumbers = teacherDashboard.querySelectorAll('.big-number');
                if (bigNumbers[0]) bigNumbers[0].textContent = data.totalStudents || 0;
                if (bigNumbers[1]) bigNumbers[1].textContent = `${data.averagePerformance || 0}%`;
                if (bigNumbers[2]) bigNumbers[2].textContent = data.studentsNeedingAttention || 0;
                if (bigNumbers[3]) bigNumbers[3].textContent = `${data.completionRate || 0}%`;
            }
        } else {
            // Update student dashboard
            const studentDashboard = document.getElementById('student-dashboard');
            if (studentDashboard) {
                const progressCircle = studentDashboard.querySelector('.progress-circle');
                if (progressCircle) {
                    const progress = data.overallProgress || 0;
                    progressCircle.textContent = `${progress}%`;
                    progressCircle.setAttribute('data-percent', progress);
                    // Update the conic gradient
                    progressCircle.style.background = `conic-gradient(var(--primary-color) 0% ${progress}%, var(--border-color) ${progress}% 100%)`;
                }
                
                const bigNumbers = studentDashboard.querySelectorAll('.big-number');
                if (bigNumbers[0]) bigNumbers[0].textContent = data.lessonsCompleted || 0;
                if (bigNumbers[1]) bigNumbers[1].textContent = `${data.averageScore || 0}%`;
                if (bigNumbers[2]) bigNumbers[2].textContent = data.studyStreak || 0;
            }
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
        const errorMsg = error.message || 'Unknown error';
        if (errorMsg.includes('Backend server') || errorMsg.includes('Unable to connect')) {
            console.warn('Backend server is not running. Please start it using START_BACKEND.bat');
        }
    }
}

// Load Study Path Data
async function loadStudyPathData() {
    try {
        const response = await studyPathAPI.getStudyPath(false);
        const studyPath = response.data;
        
        // Update timeline
        const timeline = document.querySelector('#study-path-module .path-timeline');
        if (timeline && studyPath.phases && studyPath.phases.length > 0) {
            // Clear existing timeline items
            const existingItems = timeline.querySelectorAll('.timeline-item');
            existingItems.forEach(item => item.remove());
            
            // Create timeline items from data
            studyPath.phases.forEach((phase, index) => {
                const timelineItem = document.createElement('div');
                timelineItem.className = `timeline-item ${phase.status}`;
                timelineItem.innerHTML = `
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                        <h3>${phase.title}</h3>
                        <p>${phase.description || ''}</p>
                        <span class="status-badge ${phase.status}">${phase.status === 'completed' ? 'Completed' : phase.status === 'active' ? 'In Progress' : 'Upcoming'}</span>
                    </div>
                `;
                timeline.appendChild(timelineItem);
            });
        }
        
        // Update stats
        const statCards = document.querySelectorAll('#study-path-module .stat-value');
        if (statCards[0]) statCards[0].textContent = `${studyPath.progress || 0}%`;
        if (statCards[1]) {
            // Calculate days remaining (simplified)
            const daysRemaining = studyPath.phases && studyPath.phases.length > 0 ? 
                (studyPath.phases.length - (studyPath.currentPhase || 0)) * 7 : 0;
            statCards[1].textContent = `${daysRemaining} days`;
        }
    } catch (error) {
        console.error('Error loading study path:', error);
    }
}

// Refresh Study Path (real-time generation)
async function refreshStudyPath() {
    try {
        await studyPathAPI.getStudyPath(true);
        await loadStudyPathData();
        alert('✅ Study path refreshed based on your current progress and gaps.');
    } catch (error) {
        const errorMessage = error.message || 'Unknown error occurred';
        if (errorMessage.includes('Backend server') || errorMessage.includes('Unable to connect')) {
            alert(`⚠️ ${errorMessage}\n\nPlease ensure the backend server is running.`);
        } else {
            alert(`❌ Error refreshing study path: ${errorMessage}`);
        }
    }
}

// Load Mock Tests Data
async function loadMockTestsData() {
    try {
        const response = await mockTestsAPI.getMockTests();
        const tests = response.data || [];
        
        // Update test list
        const testListCard = document.querySelector('#mock-test-module .test-list-card');
        if (testListCard) {
            const testList = testListCard.querySelector('div:last-child') || testListCard;
            if (tests.length > 0) {
                testList.innerHTML = `
                    <h3>Recent Mock Tests</h3>
                    ${tests.slice(0, 5).map(test => `
                        <div class="test-item">
                            <div class="test-info">
                                <h4>${test.subject} Mock Test</h4>
                                <p>${test.completed ? `Completed: ${new Date(test.completedAt).toLocaleDateString()} | Score: ${test.score || 0}/100` : 'Not completed yet'}</p>
                            </div>
                            <button class="btn-secondary" onclick="viewTest('${test._id}')">${test.completed ? 'View Results' : 'Continue Test'}</button>
                        </div>
                    `).join('')}
                `;
            } else {
                testList.innerHTML = `
                    <h3>Recent Mock Tests</h3>
                    <p style="color: var(--text-secondary); padding: 20px; text-align: center;">No mock tests created yet. Create your first test above!</p>
                `;
            }
        }
    } catch (error) {
        console.error('Error loading mock tests:', error);
        const testListCard = document.querySelector('#mock-test-module .test-list-card');
        if (testListCard) {
            const testList = testListCard.querySelector('div:last-child') || testListCard;
            const errorMsg = error.message || 'Unknown error';
            if (errorMsg.includes('Backend server') || errorMsg.includes('Unable to connect')) {
                testList.innerHTML = `
                    <h3>Recent Mock Tests</h3>
                    <p style="color: var(--danger-color); padding: 20px; text-align: center;"><strong>⚠️ Backend server is not running.</strong><br>Please start the backend server using START_BACKEND.bat</p>
                `;
            } else {
                testList.innerHTML = `
                    <h3>Recent Mock Tests</h3>
                    <p style="color: var(--danger-color); padding: 20px;">Error loading tests: ${errorMsg}</p>
                `;
            }
        }
    }
}

// Create Mock Test
async function createMockTest(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const subject = form.querySelector('select').value;
    const difficulty = form.querySelectorAll('select')[1].value;
    const numberOfQuestions = parseInt(form.querySelector('input[type="number"]').value);
    
    try {
        const response = await mockTestsAPI.createMockTest({
            subject,
            difficulty,
            numberOfQuestions
        });
        
        alert('Mock test created successfully!');
        form.reset();
        await loadMockTestsData();
    } catch (error) {
        const errorMessage = error.message || 'Unknown error occurred';
        if (errorMessage.includes('Backend server') || errorMessage.includes('Unable to connect')) {
            alert(`⚠️ ${errorMessage}\n\nPlease ensure the backend server is running.`);
        } else {
            alert(`❌ Error creating test: ${errorMessage}`);
        }
    }
}

// Load Reports Data
async function loadReportsData() {
    try {
        const response = await reportsAPI.getReports();
        const reports = response.data || [];
        
        // Update report preview with latest report
        if (reports.length > 0) {
            const latestReport = reports[0];
            const reportPreview = document.querySelector('#reports-module .report-preview .report-content');
            if (reportPreview) {
                reportPreview.innerHTML = `
                    <div class="report-section">
                        <h4>Performance Summary</h4>
                        <p>Overall Grade: <strong>${latestReport.summary.overallGrade || 'N/A'}</strong></p>
                        <p>Total Lessons Completed: <strong>${latestReport.summary.lessonsCompleted || 0}/${latestReport.summary.totalLessons || 0}</strong></p>
                        <p>Average Score: <strong>${latestReport.summary.averageScore || 0}%</strong></p>
                    </div>
                    <div class="report-section">
                        <h4>Subject-wise Breakdown</h4>
                        <ul>
                            ${latestReport.subjectBreakdown && latestReport.subjectBreakdown.length > 0 ? 
                                latestReport.subjectBreakdown.map(subj => `<li>${subj.subject}: ${subj.score}% (${subj.grade})</li>`).join('') : 
                                '<li>No subject data available</li>'}
                        </ul>
                    </div>
                    <div class="report-section">
                        <h4>AI Recommendations</h4>
                        <ul>
                            ${latestReport.recommendations && latestReport.recommendations.length > 0 ? 
                                latestReport.recommendations.map(rec => `<li>${rec}</li>`).join('') : 
                                '<li>Complete more lessons to get recommendations</li>'}
                        </ul>
                    </div>
                `;
            }
        } else {
            const reportPreview = document.querySelector('#reports-module .report-preview .report-content');
            if (reportPreview) {
                reportPreview.innerHTML = `
                    <div class="report-section">
                        <h4>Performance Summary</h4>
                        <p>No reports generated yet. Click "Generate New Report" to create your first report!</p>
                    </div>
                `;
            }
        }
        
        // Update report history
        const reportHistory = document.querySelector('#reports-module .report-history');
        if (reportHistory) {
            const historyList = reportHistory.querySelector('div:last-child') || reportHistory;
            if (reports.length > 0) {
                historyList.innerHTML = `
                    <h3>Report History</h3>
                    ${reports.map(report => `
                        <div class="report-item">
                            <span>${report.reportType} Report - ${new Date(report.generatedAt).toLocaleDateString()}</span>
                            <button class="btn-link" onclick="viewReport('${report._id}')">View</button>
                        </div>
                    `).join('')}
                `;
            } else {
                historyList.innerHTML = `
                    <h3>Report History</h3>
                    <p style="color: var(--text-secondary); padding: 20px; text-align: center;">No reports generated yet.</p>
                `;
            }
        }
    } catch (error) {
        console.error('Error loading reports:', error);
    }
}

// Load Matches Data
async function loadMatchesData() {
    try {
        // Load user profile first
        try {
            const userResponse = await authAPI.getMe();
            const user = userResponse.user;
            
            // Update profile tags
            const profileTags = document.getElementById('user-profile-tags');
            if (profileTags) {
                const tags = [];
                if (user.learningStyle) tags.push(`${user.learningStyle.charAt(0).toUpperCase() + user.learningStyle.slice(1)} Learner`);
                if (user.studyPreferences?.groupStudy) tags.push('Group Study');
                if (user.studyPreferences?.morning) tags.push('Morning Learner');
                if (user.studyPreferences?.afternoon) tags.push('Afternoon Learner');
                if (user.studyPreferences?.evening) tags.push('Evening Learner');
                if (tags.length === 0) tags.push('General Learner');
                
                profileTags.innerHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            }
        } catch (error) {
            console.error('Error loading user profile:', error);
        }
        
        const response = await matchesAPI.getMatches();
        const matches = response.data;
        
        // Update matches list
        const matchesList = document.querySelector('#matchmaker-module .matches-list');
        if (matchesList) {
            if (matches.matchedUsers && matches.matchedUsers.length > 0) {
                matchesList.innerHTML = `
                    <h3>Recommended Study Partners</h3>
                    ${matches.matchedUsers.map(match => {
                        const user = match.matchedUserId || {};
                        return `
                        <div class="match-card">
                            <div class="match-avatar">👤</div>
                            <div class="match-info">
                                <h4>${user.name || 'Student'}</h4>
                                <p>Match Score: ${match.matchScore || 0}%</p>
                                <div class="match-tags">
                                    ${match.commonSubjects && match.commonSubjects.length > 0 ? 
                                        match.commonSubjects.map(subj => `<span class="tag small">${subj}</span>`).join('') : 
                                        '<span class="tag small">No common subjects</span>'}
                                </div>
                            </div>
                            <button class="btn-primary" onclick="connectMatch('${match._id}')">${match.status === 'connected' ? 'Connected' : 'Connect'}</button>
                        </div>
                    `;
                    }).join('')}
                `;
            } else {
                matchesList.innerHTML = `
                    <h3>Recommended Study Partners</h3>
                    <p style="color: var(--text-secondary); padding: 20px; text-align: center;">No study partners found yet. More students need to join for matching!</p>
                `;
            }
        }
    } catch (error) {
        console.error('Error loading matches:', error);
        const matchesList = document.querySelector('#matchmaker-module .matches-list');
        if (matchesList) {
            const errorMsg = error.message || 'Unknown error';
            if (errorMsg.includes('Backend server') || errorMsg.includes('Unable to connect')) {
                matchesList.innerHTML = `
                    <h3>Recommended Study Partners</h3>
                    <p style="color: var(--danger-color); padding: 20px; text-align: center;"><strong>⚠️ Backend server is not running.</strong><br>Please start the backend server using START_BACKEND.bat</p>
                `;
            } else {
                matchesList.innerHTML = `
                    <h3>Recommended Study Partners</h3>
                    <p style="color: var(--danger-color); padding: 20px;">Error loading matches: ${errorMsg}</p>
                `;
            }
        }
    }
}

// Load Difficulty Data
async function loadDifficultyData() {
    try {
        const lessons = await lessonsAPI.getLessons();
        const lessonData = lessons.data || [];
        
        // Load and display lessons list
        await loadLessonsList();
        
        // Calculate average metrics
        if (lessonData.length > 0) {
            const completedLessons = lessonData.filter(l => l.completed);
            const avgAccuracy = completedLessons.length > 0 
                ? completedLessons.reduce((sum, l) => sum + (l.performance?.accuracy || 0), 0) / completedLessons.length 
                : 0;
            const avgCompletion = completedLessons.length > 0
                ? completedLessons.reduce((sum, l) => sum + (l.performance?.completionRate || 0), 0) / completedLessons.length
                : 0;
            const avgTime = completedLessons.length > 0
                ? completedLessons.reduce((sum, l) => sum + (l.performance?.timePerLesson || 0), 0) / completedLessons.length
                : 0;
            
            // Get current difficulty from latest lesson
            const currentLesson = lessonData.find(l => !l.completed) || lessonData[lessonData.length - 1];
            const currentDifficulty = currentLesson?.currentDifficulty || 'medium';
            
            // Update UI
            const difficultyBadge = document.querySelector('#difficulty-module .level-badge');
            if (difficultyBadge) {
                difficultyBadge.className = `level-badge ${currentDifficulty}`;
                difficultyBadge.textContent = currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1);
            }
            
            const metricValues = document.querySelectorAll('#difficulty-module .metric-value');
            if (metricValues[0]) metricValues[0].textContent = `${Math.round(avgAccuracy)}%`;
            if (metricValues[1]) metricValues[1].textContent = `${Math.round(avgCompletion)}%`;
            if (metricValues[2]) metricValues[2].textContent = `${Math.round(avgTime)} min`;
            
            // Update recommendation based on performance
            const recommendation = document.getElementById('difficulty-recommendation');
            if (recommendation && completedLessons.length > 0) {
                if (avgAccuracy >= 85) {
                    recommendation.textContent = 'Excellent performance! The AI recommends increasing difficulty to challenge yourself further.';
                } else if (avgAccuracy < 60) {
                    recommendation.textContent = 'Consider practicing more at the current level before moving to harder lessons.';
                } else {
                    recommendation.textContent = 'You\'re progressing well! Continue at this difficulty level.';
                }
            }
        } else {
            // New user - show default
            const difficultyBadge = document.querySelector('#difficulty-module .level-badge');
            if (difficultyBadge) {
                difficultyBadge.className = 'level-badge medium';
                difficultyBadge.textContent = 'Medium';
            }
            
            const metricValues = document.querySelectorAll('#difficulty-module .metric-value');
            if (metricValues[0]) metricValues[0].textContent = '0%';
            if (metricValues[1]) metricValues[1].textContent = '0%';
            if (metricValues[2]) metricValues[2].textContent = '0 min';
            
            const description = document.getElementById('difficulty-description');
            if (description) {
                description.textContent = 'Start completing lessons to get personalized difficulty adjustments based on your performance.';
            }
            
            const recommendation = document.getElementById('difficulty-recommendation');
            if (recommendation) {
                recommendation.textContent = 'Complete lessons to get AI-powered difficulty recommendations.';
            }
        }
    } catch (error) {
        console.error('Error loading difficulty data:', error);
        const errorMsg = error.message || 'Unknown error';
        if (errorMsg.includes('Backend server') || errorMsg.includes('Unable to connect')) {
            const lessonsContainer = document.getElementById('lessons-list-container');
            if (lessonsContainer) {
                lessonsContainer.innerHTML = '<p style="color: var(--danger-color); text-align: center;"><strong>⚠️ Backend server is not running.</strong><br>Please start the backend server using START_BACKEND.bat</p>';
            }
        }
    }
}

// Load Lessons List
async function loadLessonsList() {
    try {
        const response = await lessonsAPI.getLessons();
        const lessons = response.data || [];
        const container = document.getElementById('lessons-list-container');
        
        if (!container) return;
        
        if (lessons.length === 0) {
            container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 20px;">No lessons yet. Create your first lesson to get started!</p>';
            return;
        }
        
        container.innerHTML = lessons.map(lesson => `
            <div class="lesson-item ${lesson.completed ? 'completed' : ''}">
                <div class="lesson-info">
                    <h4>${lesson.subject} - ${lesson.topic}</h4>
                    <p>Difficulty: <span class="lesson-badge ${lesson.currentDifficulty || lesson.difficulty}">${(lesson.currentDifficulty || lesson.difficulty).charAt(0).toUpperCase() + (lesson.currentDifficulty || lesson.difficulty).slice(1)}</span></p>
                    ${lesson.completed ? `
                        <p>Completed: ${new Date(lesson.completedAt).toLocaleDateString()}</p>
                        ${lesson.performance?.accuracy ? `<p>Accuracy: ${lesson.performance.accuracy}%</p>` : ''}
                    ` : '<p>Status: In Progress</p>'}
                    ${lesson.completed ? '<span class="lesson-badge completed">Completed</span>' : ''}
                </div>
                <div class="lesson-actions">
                    ${!lesson.completed ? `
                        <button class="btn-primary" onclick="showCompleteLessonModal('${lesson._id}')">Complete</button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading lessons list:', error);
        const container = document.getElementById('lessons-list-container');
        if (container) {
            const errorMsg = error.message || 'Unknown error';
            container.innerHTML = `<p style="color: var(--danger-color); text-align: center;">Error loading lessons: ${errorMsg}</p>`;
        }
    }
}

// Show Create Lesson Modal
function showCreateLessonForm() {
    const modal = document.getElementById('create-lesson-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

// Close Create Lesson Modal
function closeCreateLessonModal() {
    const modal = document.getElementById('create-lesson-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.getElementById('create-lesson-form').reset();
    }
}

// Handle Create Lesson
async function handleCreateLesson(event) {
    event.preventDefault();
    
    const subject = document.getElementById('lesson-subject').value;
    const topic = document.getElementById('lesson-topic').value;
    const difficulty = document.getElementById('lesson-difficulty').value;
    
    try {
        await lessonsAPI.createLesson({
            subject,
            topic,
            difficulty
        });
        
        alert('✅ Lesson created successfully!');
        closeCreateLessonModal();
        await loadDifficultyData(); // Reload to show new lesson
        await loadProgressData(); // Update progress
    } catch (error) {
        const errorMessage = error.message || 'Unknown error occurred';
        if (errorMessage.includes('Backend server') || errorMessage.includes('Unable to connect')) {
            alert(`⚠️ ${errorMessage}\n\nPlease ensure the backend server is running.`);
        } else {
            alert(`❌ Error creating lesson: ${errorMessage}`);
        }
    }
}

// Show Complete Lesson Modal
function showCompleteLessonModal(lessonId) {
    const modal = document.getElementById('complete-lesson-modal');
    const lessonIdInput = document.getElementById('complete-lesson-id');
    if (modal && lessonIdInput) {
        lessonIdInput.value = lessonId;
        modal.classList.remove('hidden');
    }
}

// Close Complete Lesson Modal
function closeCompleteLessonModal() {
    const modal = document.getElementById('complete-lesson-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.getElementById('complete-lesson-form').reset();
    }
}

// Handle Complete Lesson
async function handleCompleteLesson(event) {
    event.preventDefault();
    
    const lessonId = document.getElementById('complete-lesson-id').value;
    const accuracy = parseInt(document.getElementById('lesson-accuracy').value);
    const completionRate = parseInt(document.getElementById('lesson-completion-rate').value);
    const timePerLesson = parseInt(document.getElementById('lesson-time').value);
    
    try {
        await lessonsAPI.completeLesson(lessonId, {
            accuracy,
            completionRate,
            timePerLesson
        });
        
        alert('✅ Lesson completed successfully! Your progress has been updated.');
        closeCompleteLessonModal();
        
        // Reload all relevant data
        await loadDifficultyData();
        await loadProgressData();
        await loadAnalyticsData();
        await loadDashboardViewData();
    } catch (error) {
        const errorMessage = error.message || 'Unknown error occurred';
        if (errorMessage.includes('Backend server') || errorMessage.includes('Unable to connect')) {
            alert(`⚠️ ${errorMessage}\n\nPlease ensure the backend server is running.`);
        } else {
            alert(`❌ Error completing lesson: ${errorMessage}`);
        }
    }
}

// Load Dashboard Data
async function loadDashboardData() {
    await loadDashboardViewData();
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
        loadDashboardViewData();
    } else {
        studentDashboard.classList.remove('active');
        teacherDashboard.classList.add('active');
        tabs[1].classList.add('active');
        loadDashboardViewData();
    }
}

// Report Generation
async function generateReport() {
    try {
        const response = await reportsAPI.generateReport('monthly');
        alert('Report generated successfully!');
        await loadReportsData();
    } catch (error) {
        const errorMessage = error.message || 'Unknown error occurred';
        if (errorMessage.includes('Backend server') || errorMessage.includes('Unable to connect')) {
            alert(`⚠️ ${errorMessage}\n\nPlease ensure the backend server is running.`);
        } else {
            alert(`❌ Error generating report: ${errorMessage}`);
        }
    }
}

// Connect Match
async function connectMatch(matchId) {
    try {
        await matchesAPI.connectMatch(matchId);
        alert('Connected successfully!');
        await loadMatchesData();
    } catch (error) {
        const errorMessage = error.message || 'Unknown error occurred';
        if (errorMessage.includes('Backend server') || errorMessage.includes('Unable to connect')) {
            alert(`⚠️ ${errorMessage}\n\nPlease ensure the backend server is running.`);
        } else {
            alert(`❌ Error connecting: ${errorMessage}`);
        }
    }
}

// View Test
async function viewTest(testId) {
    try {
        const response = await mockTestsAPI.getMockTest(testId);
        alert(`Test Score: ${response.data.score}%\nCompleted: ${response.data.completed ? 'Yes' : 'No'}`);
    } catch (error) {
        const errorMessage = error.message || 'Unknown error occurred';
        if (errorMessage.includes('Backend server') || errorMessage.includes('Unable to connect')) {
            alert(`⚠️ ${errorMessage}\n\nPlease ensure the backend server is running.`);
        } else {
            alert(`❌ Error loading test: ${errorMessage}`);
        }
    }
}

// View Report
async function viewReport(reportId) {
    try {
        const response = await reportsAPI.getReport(reportId);
        const report = response.data;
        alert(`Report Type: ${report.reportType}\nOverall Grade: ${report.summary.overallGrade}\nAverage Score: ${report.summary.averageScore}%`);
    } catch (error) {
        const errorMessage = error.message || 'Unknown error occurred';
        if (errorMessage.includes('Backend server') || errorMessage.includes('Unable to connect')) {
            alert(`⚠️ ${errorMessage}\n\nPlease ensure the backend server is running.`);
        } else {
            alert(`❌ Error loading report: ${errorMessage}`);
        }
    }
}

// Check if user is logged in on page load
window.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (token && isLoggedIn === 'true') {
        try {
            // Verify token is still valid
            await authAPI.getMe();
            
            document.getElementById('landing-page').classList.add('hidden');
            document.getElementById('auth-page').classList.add('hidden');
            document.getElementById('dashboard').classList.remove('hidden');
            
            // Load dashboard data
            await loadDashboardData();
        } catch (error) {
            // Token invalid, logout
            handleLogout();
        }
    } else {
        document.getElementById('landing-page').classList.remove('hidden');
        document.getElementById('auth-page').classList.add('hidden');
        document.getElementById('dashboard').classList.add('hidden');
    }
    
    // Close modals when clicking outside
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });
});

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
    });
});

// Make functions globally available
window.showLandingPage = showLandingPage;
window.showAuthPage = showAuthPage;
window.scrollToFeatures = scrollToFeatures;
window.switchTab = switchTab;
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.handleLogout = handleLogout;
window.showModule = showModule;
window.switchDashboardTab = switchDashboardTab;
window.generateReport = generateReport;
window.connectMatch = connectMatch;
window.viewTest = viewTest;
window.viewReport = viewReport;
window.createMockTest = createMockTest;
window.showCreateLessonForm = showCreateLessonForm;
window.closeCreateLessonModal = closeCreateLessonModal;
window.handleCreateLesson = handleCreateLesson;
window.showCompleteLessonModal = showCompleteLessonModal;
window.closeCompleteLessonModal = closeCompleteLessonModal;
window.handleCompleteLesson = handleCompleteLesson;
window.identifyLearningGaps = identifyLearningGaps;
window.refreshStudyPath = refreshStudyPath;

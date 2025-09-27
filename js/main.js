/**
 * Learn Bitcoin By Doing - Main JavaScript
 * Integrates with Bitcoin MCP Agent Kit for dynamic content
 */

// Global state management
const appState = {
    currentModule: null,
    generatedCourses: [],
    simulationActive: false,
    networkData: {},
    intelligenceData: {}
};

// Initialize application
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Initializing Learn Bitcoin By Doing...');
    
    // Setup navigation
    setupNavigation();
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Initialize MCP Client connection
    await initializeMCPConnection();
    
    // Load live Bitcoin data
    await loadBitcoinData();
    
    // Setup periodic data updates
    setupDataUpdates();
    
    // Initialize interactive features
    initializeInteractiveFeatures();
    
    console.log('✅ Application initialized successfully');
});

/**
 * Setup smooth scrolling navigation
 */
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const headerHeight = document.querySelector('#header').offsetHeight;
            
            if (targetSection) {
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                document.querySelector('.nav-links').classList.remove('active');
            }
        });
    });
    
    // Add active class to current navigation item
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const headerHeight = document.querySelector('#header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 10;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Setup mobile menu toggle
 */
function setupMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
}

/**
 * Initialize MCP connection
 */
async function initializeMCPConnection() {
    const overlay = document.getElementById('loading-overlay');
    const message = document.getElementById('loading-message');
    
    overlay.classList.add('active');
    
    // Wait for MCP client to initialize
    if (window.mcpClient) {
        window.mcpClient.on('connected', () => {
            console.log('✅ Connected to MCP Agent Kit');
            message.textContent = 'Connected! Loading Bitcoin data...';
        });
        
        window.mcpClient.on('disconnected', () => {
            console.log('⚠️ MCP Agent Kit disconnected, using fallback mode');
            message.textContent = 'Using cached data...';
        });
    }
    
    // Hide overlay after initialization
    setTimeout(() => {
        overlay.classList.remove('active');
    }, 2000);
}

/**
 * Load Bitcoin network data
 */
async function loadBitcoinData() {
    if (!window.mcpClient) return;
    
    try {
        // Get network data
        const networkData = await window.mcpClient.getBitcoinNetworkData();
        appState.networkData = networkData;
        
        // Update dashboard
        updateDashboard(networkData);
        
        // Get price data
        const priceData = await window.mcpClient.getBitcoinPrice();
        updatePrice(priceData);
        
        // Get fee estimates
        const feeData = await window.mcpClient.getFeeEstimates();
        updateFees(feeData);
        
    } catch (error) {
        console.error('Error loading Bitcoin data:', error);
        // Use fallback data
        updateDashboard(window.mcpClient.getFallbackNetworkData());
    }
}

/**
 * Update dashboard with live data
 */
function updateDashboard(data) {
    const elements = {
        'block-height': data.blockHeight,
        'mempool-size': data.mempoolSize,
        'fee-estimate': data.feeEstimate,
        'difficulty': data.difficulty
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            // Add animation
            element.style.opacity = '0';
            element.textContent = value;
            setTimeout(() => {
                element.style.transition = 'opacity 0.5s';
                element.style.opacity = '1';
            }, 100);
        }
    });
    
    // Update status indicator
    const statusIndicator = document.getElementById('network-status');
    if (statusIndicator) {
        statusIndicator.style.background = '#27ae60'; // Green for connected
    }
}

/**
 * Update Bitcoin price display
 */
function updatePrice(priceData) {
    const priceElement = document.getElementById('btc-price');
    if (priceElement && priceData.usd !== 'N/A') {
        const formattedPrice = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(priceData.usd);
        
        const changeIndicator = priceData.change24h > 0 ? '↑' : '↓';
        const changeColor = priceData.change24h > 0 ? '#27ae60' : '#e74c3c';
        
        priceElement.innerHTML = `${formattedPrice} <span style="color: ${changeColor}">${changeIndicator}</span>`;
    }
}

/**
 * Update fee estimates
 */
function updateFees(feeData) {
    const feeElement = document.getElementById('fee-estimate');
    if (feeElement && feeData.fast !== 'N/A') {
        feeElement.textContent = `${feeData.fast} sats/vB`;
    }
}

/**
 * Setup periodic data updates
 */
function setupDataUpdates() {
    // Update every 60 seconds
    setInterval(async () => {
        await loadBitcoinData();
        await updateIntelligence();
    }, 60000);
    
    // Update latest transaction preview every 30 seconds
    setInterval(async () => {
        await updateLatestTransaction();
    }, 30000);
}

/**
 * Initialize interactive features
 */
function initializeInteractiveFeatures() {
    // Initialize module previews
    updateModulePreviews();
    
    // Setup interactive tool handlers
    setupTools();
}

/**
 * Update module previews with dynamic content
 */
async function updateModulePreviews() {
    // Update latest transaction in preview
    updateLatestTransaction();
}

/**
 * Update latest transaction display
 */
async function updateLatestTransaction() {
    const txElement = document.getElementById('latest-transaction');
    if (txElement) {
        txElement.innerHTML = `
            <span style="color: #3498db;">TX:</span> ${generateSampleTxId()}<br>
            <span style="color: #27ae60;">Amount:</span> ${(Math.random() * 10).toFixed(8)} BTC<br>
            <span style="color: #f7931a;">Fee:</span> ${Math.floor(Math.random() * 50 + 10)} sats/vB
        `;
    }
}

/**
 * Generate sample transaction ID
 */
function generateSampleTxId() {
    const chars = '0123456789abcdef';
    let txid = '';
    for (let i = 0; i < 16; i++) {
        txid += chars[Math.floor(Math.random() * chars.length)];
    }
    return txid + '...';
}

// === INTERACTIVE LEARNING FUNCTIONS ===

/**
 * Start interactive learning
 */
window.startInteractiveLearning = async function() {
    console.log('Starting interactive learning...');
    
    // Scroll to learning modules
    const learningSection = document.getElementById('learn');
    const headerHeight = document.querySelector('#header').offsetHeight;
    
    if (learningSection) {
        window.scrollTo({
            top: learningSection.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    }
    
    // Highlight first module
    const firstModule = document.querySelector('.module-card');
    if (firstModule) {
        firstModule.style.transform = 'scale(1.05)';
        setTimeout(() => {
            firstModule.style.transform = '';
        }, 500);
    }
};

/**
 * Explore simulations
 */
window.exploreSimulations = function() {
    console.log('Exploring simulations...');
    
    const simulationSection = document.getElementById('simulate');
    const headerHeight = document.querySelector('#header').offsetHeight;
    
    if (simulationSection) {
        window.scrollTo({
            top: simulationSection.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    }
};

/**
 * Start a learning module
 */
window.startModule = async function(moduleName) {
    console.log(`Starting module: ${moduleName}`);
    
    appState.currentModule = moduleName;
    
    const modal = document.getElementById('learning-modal');
    const content = document.getElementById('learning-content');
    
    if (modal && content && window.mcpClient) {
        // Get module data from MCP
        const moduleData = await window.mcpClient.getSocraticModule(moduleName);
        
        // Build module content
        content.innerHTML = `
            <h2>${moduleData.title}</h2>
            <div class="module-section">
                <h3>Socratic Questions</h3>
                <ul class="socratic-questions-list">
                    ${moduleData.questions.map(q => `<li>${q}</li>`).join('')}
                </ul>
            </div>
            <div class="module-section">
                <h3>Hands-On Activities</h3>
                <ul class="activities-list">
                    ${moduleData.activities.map(a => `<li>${a}</li>`).join('')}
                </ul>
            </div>
            <button class="cta-primary" onclick="closeLearningModal()">Start Learning</button>
        `;
        
        modal.classList.add('active');
    }
};

/**
 * Close learning modal
 */
window.closeLearningModal = function() {
    const modal = document.getElementById('learning-modal');
    if (modal) {
        modal.classList.remove('active');
    }
};

// === SIMULATIONS ===

/**
 * Load a simulation
 */
window.loadSimulation = async function(type) {
    console.log(`Loading ${type} simulation...`);
    
    if (!window.mcpClient) return;
    
    const simulationData = await window.mcpClient.loadSimulation(type);
    
    const modal = document.getElementById('learning-modal');
    const content = document.getElementById('learning-content');
    
    if (modal && content) {
        content.innerHTML = `
            <h2>${simulationData.title}</h2>
            <p>${simulationData.description}</p>
            <div class="simulation-interface">
                ${getSimulationInterface(type)}
            </div>
            <button class="cta-secondary" onclick="closeLearningModal()">Close</button>
        `;
        
        modal.classList.add('active');
    }
};

/**
 * Get simulation interface HTML
 */
function getSimulationInterface(type) {
    const interfaces = {
        'transaction': `
            <div class="tx-builder-interface">
                <h3>Build Your Transaction</h3>
                <input type="text" placeholder="From Address" class="sim-input">
                <input type="text" placeholder="To Address" class="sim-input">
                <input type="number" placeholder="Amount (BTC)" class="sim-input">
                <input type="number" placeholder="Fee (sats/vB)" class="sim-input">
                <button class="cta-primary" onclick="simulateTransaction()">Build Transaction</button>
                <div id="sim-result"></div>
            </div>
        `,
        'fees': `
            <div class="fee-calc-interface">
                <h3>Calculate Optimal Fee</h3>
                <label>Transaction Size (bytes):</label>
                <input type="number" id="tx-size" value="250" class="sim-input">
                <label>Target Confirmation Time:</label>
                <select id="confirmation-time" class="sim-input">
                    <option value="fastest">Next Block (~10 min)</option>
                    <option value="fast">3 Blocks (~30 min)</option>
                    <option value="medium">6 Blocks (~1 hour)</option>
                    <option value="slow">Economy (>1 hour)</option>
                </select>
                <button class="cta-primary" onclick="calculateFee()">Calculate</button>
                <div id="fee-result"></div>
            </div>
        `,
        'security': `
            <div class="security-interface">
                <h3>Security Scenario</h3>
                <p>You received an email claiming to be from a Bitcoin exchange asking you to verify your wallet. What do you do?</p>
                <button class="cta-secondary" onclick="securityChoice('ignore')">Ignore the email</button>
                <button class="cta-secondary" onclick="securityChoice('verify')">Verify directly on the exchange website</button>
                <button class="cta-secondary" onclick="securityChoice('click')">Click the link in the email</button>
                <div id="security-result"></div>
            </div>
        `
    };
    
    return interfaces[type] || '<p>Simulation loading...</p>';
}

// === AI COURSE GENERATION ===

/**
 * Generate new course
 */
window.generateNewCourse = async function() {
    console.log('Generating new AI course...');
    
    const topic = document.getElementById('course-topic').value;
    const level = document.getElementById('course-level').value;
    
    if (!window.mcpClient) return;
    
    // Show loading
    const coursesGrid = document.getElementById('generated-courses');
    coursesGrid.innerHTML = '<div class="course-placeholder">Generating your personalized course...</div>';
    
    try {
        const course = await window.mcpClient.generateCourse({ topic, level });
        appState.generatedCourses.push(course);
        
        // Display the generated course
        displayGeneratedCourse(course);
    } catch (error) {
        console.error('Error generating course:', error);
        coursesGrid.innerHTML = '<div class="course-placeholder">Failed to generate course. Please try again.</div>';
    }
};

/**
 * Display generated course
 */
function displayGeneratedCourse(course) {
    const coursesGrid = document.getElementById('generated-courses');
    
    const courseHTML = `
        <div class="module-card generated-course">
            <div class="module-header">
                <h3>${course.title}</h3>
                <div class="module-status">
                    <span class="difficulty">${course.difficulty}</span>
                    <span class="duration">${course.duration}</span>
                </div>
            </div>
            <p>${course.description}</p>
            <ul class="learning-objectives">
                ${course.modules.map(m => `<li>${m}</li>`).join('')}
            </ul>
            <button class="module-start" onclick="startGeneratedCourse('${course.id}')">Start Course</button>
        </div>
    `;
    
    coursesGrid.innerHTML = courseHTML;
}

// === BITCOIN INTELLIGENCE ===

/**
 * Update intelligence dashboard
 */
window.updateIntelligence = async function() {
    console.log('Updating Bitcoin intelligence...');
    
    if (!window.mcpClient) return;
    
    try {
        const intelligence = await window.mcpClient.getIntelligenceSummary();
        appState.intelligenceData = intelligence;
        
        // Update summary
        const summaryContent = document.getElementById('summary-content');
        if (summaryContent) {
            summaryContent.innerHTML = `
                <p><strong>Total Alerts:</strong> ${intelligence.totalAlerts}</p>
                <p><strong>Last Updated:</strong> ${new Date(intelligence.lastUpdated).toLocaleString()}</p>
            `;
        }
        
        // Update security alerts
        const alertsList = document.getElementById('security-alerts');
        if (alertsList) {
            if (intelligence.criticalAlerts.length > 0) {
                alertsList.innerHTML = intelligence.criticalAlerts.map(alert => `
                    <div class="alert-item">
                        <strong>${alert.title}</strong>
                        <p>${alert.description || 'Monitor for updates'}</p>
                    </div>
                `).join('');
            } else {
                alertsList.textContent = 'No current security alerts';
            }
        }
        
        // Update educational opportunities
        const eduList = document.getElementById('edu-opportunities');
        if (eduList) {
            eduList.innerHTML = intelligence.educationalOpportunities.map(opp => `
                <div class="opportunity-item">
                    <strong>${opp.title}</strong>
                    <p>Source: ${opp.source}</p>
                </div>
            `).join('');
        }
        
        // Update market intelligence
        const marketData = document.getElementById('market-data');
        if (marketData) {
            marketData.innerHTML = intelligence.marketIntelligence.map(item => `
                <div class="market-item">
                    <strong>${item.title}</strong>
                    <span class="sentiment ${item.sentiment}">${item.sentiment}</span>
                </div>
            `).join('');
        }
        
    } catch (error) {
        console.error('Error updating intelligence:', error);
    }
};

// === TOOLS ===

/**
 * Setup interactive tools
 */
function setupTools() {
    // Tool functions are defined globally for onclick handlers
}

/**
 * Validate Bitcoin address
 */
window.validateAddress = async function() {
    const input = document.getElementById('address-input').value;
    const result = document.getElementById('address-result');
    
    if (!input) {
        result.textContent = 'Please enter an address';
        return;
    }
    
    if (window.mcpClient) {
        const validation = await window.mcpClient.validateAddress(input);
        
        if (validation.isValid) {
            result.innerHTML = `
                <span style="color: #27ae60;">✓ Valid ${validation.type} address</span><br>
                <small>Network: ${validation.network}</small>
            `;
        } else {
            result.innerHTML = '<span style="color: #e74c3c;">✗ Invalid address</span>';
        }
    }
};

/**
 * Convert Bitcoin units
 */
window.convertUnits = function() {
    const amount = parseFloat(document.getElementById('amount-input').value);
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;
    const result = document.getElementById('conversion-result');
    
    if (isNaN(amount)) {
        result.textContent = 'Please enter a valid amount';
        return;
    }
    
    if (window.mcpClient) {
        const converted = window.mcpClient.convertUnits(amount, fromUnit, toUnit);
        result.textContent = `${amount} ${fromUnit} = ${converted} ${toUnit}`;
    }
};

/**
 * Explore transaction
 */
window.exploreTx = async function() {
    const txid = document.getElementById('txid-input').value;
    const result = document.getElementById('tx-result');
    
    if (!txid) {
        result.textContent = 'Please enter a transaction ID';
        return;
    }
    
    if (window.mcpClient) {
        result.textContent = 'Loading transaction data...';
        const txData = await window.mcpClient.exploreTransaction(txid);
        
        if (txData.error) {
            result.textContent = txData.error;
        } else {
            result.innerHTML = `
                <strong>Transaction Details:</strong><br>
                Block: ${txData.blockHeight}<br>
                Fee: ${txData.fee}<br>
                Size: ${txData.size} bytes<br>
                Confirmations: ${txData.confirmations}
            `;
        }
    }
};

// === SIMULATION HANDLERS ===

/**
 * Simulate transaction building
 */
window.simulateTransaction = function() {
    const result = document.getElementById('sim-result');
    if (result) {
        result.innerHTML = `
            <div style="color: #27ae60; margin-top: 1rem;">
                <strong>Transaction Built Successfully!</strong><br>
                <small>This is a simulated transaction for learning purposes.</small>
            </div>
        `;
    }
};

/**
 * Calculate fee simulation
 */
window.calculateFee = function() {
    const size = document.getElementById('tx-size').value;
    const time = document.getElementById('confirmation-time').value;
    const result = document.getElementById('fee-result');
    
    const fees = {
        'fastest': 50,
        'fast': 30,
        'medium': 20,
        'slow': 10
    };
    
    const totalFee = size * fees[time];
    
    if (result) {
        result.innerHTML = `
            <div style="margin-top: 1rem;">
                <strong>Recommended Fee:</strong> ${fees[time]} sats/vB<br>
                <strong>Total Fee:</strong> ${totalFee} satoshis
            </div>
        `;
    }
};

/**
 * Handle security choice
 */
window.securityChoice = function(choice) {
    const result = document.getElementById('security-result');
    
    const responses = {
        'ignore': {
            correct: true,
            message: '✅ Correct! Always be suspicious of unsolicited emails asking for wallet information.'
        },
        'verify': {
            correct: true,
            message: '✅ Good choice! Always verify directly through official channels, never through email links.'
        },
        'click': {
            correct: false,
            message: '❌ Never click links in suspicious emails! This could lead to phishing attacks and loss of funds.'
        }
    };
    
    const response = responses[choice];
    
    if (result) {
        result.innerHTML = `
            <div style="color: ${response.correct ? '#27ae60' : '#e74c3c'}; margin-top: 1rem;">
                ${response.message}
            </div>
        `;
    }
};

/**
 * Start generated course
 */
window.startGeneratedCourse = function(courseId) {
    const course = appState.generatedCourses.find(c => c.id == courseId);
    if (course) {
        console.log(`Starting generated course: ${course.title}`);
        // In a real implementation, this would load the full course interface
        alert(`Starting course: ${course.title}\n\nThis would load the full interactive course experience.`);
    }
};

// Initialize intelligence on load
setTimeout(() => {
    updateIntelligence();
}, 3000);
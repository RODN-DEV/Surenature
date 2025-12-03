/**
 * MAIN SCRIPT
 * Handles Navigation, History, Drawer Logic, and View Rendering
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize DOM Elements
    const drawer = document.getElementById('drawer');
    const overlay = document.getElementById('drawer-overlay');
    const contentDiv = document.getElementById('content');
    const headerTitle = document.getElementById('header-title');
    const passwordModal = document.getElementById('password-modal');
    const passwordInput = document.getElementById('password-input');
    const submitPasswordBtn = document.getElementById('submit-password');
    const cancelPasswordBtn = document.getElementById('cancel-password');
    const passwordError = document.getElementById('password-error');
    const menuToggle = document.getElementById('menu-toggle');
    const closeDrawerBtn = document.getElementById('close-drawer');

    // 2. App State
    const validPasswords = ['rtechug', 'modhub', 'modhublte'];
    const vipViews = ['top-secret', 'ultimate', 'over-under', 'btts'];
    let isAuthenticated = false;
    let currentView = 'home';

    // Security: Prevent browser from remembering passwords
    if (passwordInput) {
        passwordInput.setAttribute('autocomplete', 'off');
        passwordInput.setAttribute('name', 'hidden-password-field');
    }

    // 3. Navigation & History Logic
    
    // Function to handle page changes
    const navigate = (view, addToHistory = true) => {
        // Close drawer if open
        closeDrawer();

        window.scrollTo(0, 0);

        // Security: Reset authentication if leaving VIP areas
        // This ensures "history" is not saved. User must login again if they leave.
        if (!vipViews.includes(view)) {
            isAuthenticated = false;
        }

        // Authentication Check
        if (vipViews.includes(view) && !isAuthenticated) {
            if (passwordModal) {
                passwordModal.classList.remove('hidden');
                passwordInput.value = ''; // Clear input
                // Save the view we wanted to go to
                passwordModal.dataset.targetView = view; 
            }
            return;
        }

        // Update History
        if (addToHistory) {
            history.pushState({ view: view }, '', `#${view}`);
        }

        currentView = view;
        renderView(view);
    };

    // Render the specific HTML for a view
    const renderView = (view) => {
        if (!contentDiv) return;

        switch(view) {
            case 'home': contentDiv.innerHTML = renderHome(); break;
            case 'free-tips': contentDiv.innerHTML = renderFreeTips(); break;
            case 'top-secret': contentDiv.innerHTML = renderTopSecret(); break;
            case 'ultimate': contentDiv.innerHTML = renderUltimate(); break;
            case 'over-under': contentDiv.innerHTML = renderOverUnder(); break;
            case 'btts': contentDiv.innerHTML = renderBTTS(); break;
            case 'support': contentDiv.innerHTML = renderSupport(); break;
            case 'privacy-policy': contentDiv.innerHTML = renderPrivacyPolicy(); break;
            default: contentDiv.innerHTML = renderHome();
        }
    };

    // Listen for Browser Back Button
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.view) {
            navigate(event.state.view, false);
        } else {
            navigate('home', false);
        }
    });

    // 4. Drawer Logic (Fixed Visibility)
    const openDrawer = () => {
        if (drawer && overlay) {
            // Remove the tailwind class that hides it
            drawer.classList.remove('-translate-x-full');
            
            // Add custom open class (if needed by CSS) or rely on removal of translate
            drawer.classList.remove('drawer-closed');
            drawer.classList.add('drawer-open');
            
            // Show overlay
            overlay.classList.remove('hidden');
        }
    };

    const closeDrawer = () => {
        if (drawer && overlay) {
            // Add back the tailwind class to hide it
            drawer.classList.add('-translate-x-full');
            
            // Add custom closed class
            drawer.classList.remove('drawer-open');
            drawer.classList.add('drawer-closed');
            
            // Hide overlay
            overlay.classList.add('hidden');
        }
    };

    const populateNavigationDrawer = () => {
        const navLinksContainer = document.getElementById('nav-links');
        if (!navLinksContainer) return;

        const navItems = [
            { id: 'home', label: 'Home', icon: 'fas fa-home', color: 'text-blue-400' },
            { id: 'free-tips', label: 'Daily Free Tips', icon: 'fas fa-gift', color: 'text-emerald-400' },
            { id: 'ultimate', label: 'Ultimate VIP', icon: 'fas fa-crown', color: 'text-yellow-400' },
            { id: 'top-secret', label: 'Top Special VIP', icon: 'fas fa-user-secret', color: 'text-rose-400' },
            { id: 'over-under', label: 'VIP O/U Tips', icon: 'fas fa-sort-amount-up', color: 'text-violet-400' },
            { id: 'btts', label: 'VIP BTTS Tips', icon: 'fas fa-exchange-alt', color: 'text-orange-400' },
            { id: 'support', label: 'Contact Support', icon: 'fas fa-headset', color: 'text-cyan-400' },
            { id: 'privacy-policy', label: 'Privacy Policy', icon: 'fas fa-shield-alt', color: 'text-gray-400' }
        ];

        navLinksContainer.innerHTML = '';

        navItems.forEach(item => {
            const button = document.createElement('button');
            button.className = 'flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-slate-700 transition text-left group';
            button.innerHTML = `
                <div class="w-8 text-center"><i class="${item.icon} ${item.color} text-lg group-hover:scale-110 transition"></i></div>
                <span class="text-gray-200 font-medium group-hover:text-white">${item.label}</span>
            `;
            button.addEventListener('click', () => {
                navigate(item.id);
            });
            navLinksContainer.appendChild(button);
        });
    };

    // 5. Event Listeners
    if (menuToggle) menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent immediate closing
        openDrawer();
    });
    
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    // Password Modal Logic
    if (submitPasswordBtn && passwordInput) {
        submitPasswordBtn.addEventListener('click', () => {
            const password = passwordInput.value.trim();
            if (validPasswords.includes(password)) {
                isAuthenticated = true;
                passwordModal.classList.add('hidden');
                passwordInput.value = '';
                passwordError.classList.add('hidden');
                
                const target = passwordModal.dataset.targetView;
                if (target) navigate(target);
            } else {
                passwordError.classList.remove('hidden');
                passwordInput.value = '';
            }
        });
    }

    if (cancelPasswordBtn) {
        cancelPasswordBtn.addEventListener('click', () => {
            passwordModal.classList.add('hidden');
            passwordInput.value = '';
            passwordError.classList.add('hidden');
        });
    }

    if (passwordModal) {
        passwordModal.addEventListener('click', (e) => {
            if (e.target === passwordModal) {
                passwordModal.classList.add('hidden');
                passwordInput.value = '';
                passwordError.classList.add('hidden');
            }
        });
    }

    // 6. View Templates
    
    const renderHome = () => {
        if (headerTitle) headerTitle.innerText = "FOOTBALL SIMPLE";
        window.handleNavClick = (view) => navigate(view);

        return `
            <div class="flex flex-col gap-5 mt-4 fade-in">
                <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-2">
                    <p class="text-gray-600 text-sm">Welcome back!</p>
                    <h2 class="text-2xl font-bold text-slate-800">Choose Your Games</h2>
                </div>
                
                <button onclick="handleNavClick('free-tips')" class="menu-btn w-full py-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xl flex items-center justify-between px-6 relative overflow-hidden group">
                    <div class="absolute right-0 top-0 h-full w-24 bg-white opacity-10 skew-x-12 transform translate-x-12 group-hover:translate-x-0 transition duration-500"></div>
                    <span class="z-10 tracking-wide drop-shadow-md">DAILY FREE TIPS</span>
                    <i class="fas fa-gift text-2xl z-10 animate-pulse"></i>
                </button>

                <button onclick="handleNavClick('ultimate')" class="menu-btn w-full py-6 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-bold text-xl flex items-center justify-between px-6 border border-blue-400/30">
                    <div class="flex items-center gap-3">
                        <i class="fas fa-crown text-yellow-400"></i>
                        <span class="tracking-wide">ULTIMATE VIP</span>
                    </div>
                    <i class="fas fa-lock text-white/50 text-sm"></i>
                </button>

                <button onclick="handleNavClick('top-secret')" class="menu-btn w-full py-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-700 text-white font-bold text-xl flex items-center justify-between px-6 border border-red-400/30">
                    <div class="flex items-center gap-3">
                        <i class="fas fa-user-secret text-rose-200"></i>
                        <span class="tracking-wide">TOP SPECIAL VIP</span>
                    </div>
                    <i class="fas fa-lock text-white/50 text-sm"></i>
                </button>

                 <button onclick="handleNavClick('over-under')" class="menu-btn w-full py-6 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-bold text-xl flex items-center justify-between px-6 border border-purple-400/30">
                    <div class="flex items-center gap-3">
                        <i class="fas fa-sort-amount-up text-purple-200"></i>
                        <span class="tracking-wide">VIP O/U TIPS</span>
                    </div>
                    <i class="fas fa-lock text-white/50 text-sm"></i>
                </button>

                <button onclick="handleNavClick('btts')" class="menu-btn w-full py-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-xl flex items-center justify-between px-6 border border-orange-400/30">
                    <div class="flex items-center gap-3">
                        <i class="fas fa-exchange-alt text-orange-200"></i>
                        <span class="tracking-wide">VIP BTTS TIPS</span>
                    </div>
                    <i class="fas fa-lock text-white/50 text-sm"></i>
                </button>

                <button onclick="handleNavClick('support')" class="menu-btn w-full py-5 rounded-2xl bg-white text-slate-700 font-bold text-lg flex justify-center items-center gap-2 uppercase mt-4">
                    <i class="fas fa-headset text-blue-500"></i>
                    <span>Contact Support</span>
                </button>
            </div>
        `;
    };

    const renderFreeTips = () => {
        if (headerTitle) headerTitle.innerText = "DAILY FREE TIPS";
        
        let html = `<div class="bg-gradient-to-b from-slate-900 to-slate-800 min-h-full p-4 -m-4 pt-6 fade-in pb-24">`;
        html += `<div class="text-center mb-6"><span class="bg-yellow-400 text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">High Confidence</span></div>`;

        if (typeof gamesData !== 'undefined' && gamesData.free) {
            gamesData.free.forEach(game => {
                html += `
                    <div class="card-gradient-free rounded-2xl p-4 mb-4 text-white relative shadow-xl transform transition hover:scale-[1.01]">
                        <div class="flex justify-between items-center mb-3 border-b border-white/20 pb-2">
                            <div class="flex items-center gap-2">
                                <i class="far fa-futbol text-xs text-yellow-300"></i>
                                <span class="text-xs font-bold uppercase tracking-wider text-gray-100">${game.league}</span>
                            </div>
                            <span class="text-xs font-mono bg-black/30 px-2 py-0.5 rounded">${game.time}</span>
                        </div>
                        <div class="flex items-center justify-between mb-3">
                            <div class="font-bold text-lg leading-tight w-5/12 text-right">${game.teamA}</div>
                            <div class="w-2/12 flex justify-center"><div class="vs-circle text-xs">VS</div></div>
                            <div class="font-bold text-lg leading-tight w-5/12 text-left">${game.teamB}</div>
                        </div>
                        <div class="bg-black/20 rounded-lg p-2 flex justify-between items-center backdrop-blur-sm">
                            <div>
                                <div class="text-[10px] text-gray-300 uppercase">Prediction</div>
                                <div class="text-yellow-300 font-bold text-sm">${game.prediction}</div>
                            </div>
                             <div class="text-right">
                                <div class="text-[10px] text-gray-300 uppercase">Odds</div>
                                <div class="text-white font-bold text-xl">${game.odds}</div>
                            </div>
                        </div>
                        ${game.status === 'won' ? 
                        `<div class="absolute -top-2 -right-2 bg-white text-green-600 w-8 h-8 rounded-full flex items-center justify-center shadow-lg font-bold border-2 border-green-500"><i class="fas fa-check"></i></div>` : ''}
                    </div>
                `;
            });
        }
        html += `</div>`;
        return html;
    };

    const renderOverUnder = () => {
        if (headerTitle) headerTitle.innerText = "VIP O/U TIPS";
        let html = `<div class="bg-slate-100 min-h-full p-2 fade-in pb-20">`;
        html += `<div class="bg-violet-600 text-white text-center py-2 rounded-lg mb-4 shadow-md font-bold text-sm">PREMIUM OVER/UNDER MARKET</div>`;

        if (typeof gamesData !== 'undefined' && gamesData.overUnder) {
            gamesData.overUnder.forEach(game => {
                const isWon = game.status === 'won';
                html += `
                    <div class="bg-white rounded-xl shadow-md p-0 mb-4 overflow-hidden border border-violet-100">
                        <div class="bg-violet-50 p-3 flex justify-between items-center border-b border-violet-100">
                            <span class="text-xs font-bold text-violet-700 uppercase">${game.league}</span>
                            <span class="text-xs text-violet-400 font-mono">${game.time}</span>
                        </div>
                        <div class="p-4">
                             <div class="flex items-center justify-between mb-4">
                                <span class="font-bold text-gray-800 text-sm w-2/5 truncate text-right">${game.teamA}</span>
                                <span class="text-xs text-gray-400 font-black px-2">VS</span>
                                <span class="font-bold text-gray-800 text-sm w-2/5 truncate text-left">${game.teamB}</span>
                            </div>
                            <div class="flex gap-2">
                                <div class="flex-1 bg-violet-600 rounded-lg p-2 text-center text-white shadow-sm">
                                    <div class="text-[10px] opacity-80 uppercase">Pick</div>
                                    <div class="font-bold text-sm">${game.prediction}</div>
                                </div>
                                <div class="w-20 bg-gray-800 rounded-lg p-2 text-center text-white shadow-sm flex flex-col justify-center">
                                    <div class="text-[10px] text-yellow-400 uppercase">Odds</div>
                                    <div class="font-bold">${game.odds}</div>
                                </div>
                                <div class="w-12 ${isWon ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'} rounded-lg flex items-center justify-center text-lg">
                                    ${isWon ? '<i class="fas fa-check"></i>' : '<i class="fas fa-hourglass-half"></i>'}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        html += `</div>`;
        return html;
    };

    const renderTopSecret = () => {
        if (headerTitle) headerTitle.innerText = "TOP SPECIAL VIP";
        let html = `<div class="bg-gray-100 min-h-full pb-20 fade-in">`;
        html += `<div class="bg-black text-white text-center font-bold py-4 text-xl mb-4 tracking-widest uppercase shadow-lg">FOTBET FIXED</div>`;

        if (typeof gamesData !== 'undefined' && gamesData.topSecret) {
            gamesData.topSecret.forEach(game => {
                const isWon = game.status === "won";
                html += `
                <div class="bg-white mx-3 mb-4 rounded-lg shadow-md border-l-4 ${isWon ? 'border-green-500' : 'border-gray-300'} overflow-hidden flex min-h-[90px]">
                    <div class="w-14 flex flex-col items-center justify-center bg-gray-50 border-r border-gray-100">
                         <i class="fas fa-lock text-gray-300 mb-1"></i>
                         <span class="text-[10px] font-bold text-gray-400">${game.time}</span>
                    </div>
                    <div class="flex-1 flex flex-col justify-between py-2">
                        <div class="px-3">
                             <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">${game.league}</div>
                             <div class="text-sm font-bold text-gray-800 leading-tight">${game.teamA} <span class="text-gray-400 font-normal">vs</span> ${game.teamB}</div>
                        </div>
                        <div class="mt-2 px-3 flex items-center gap-2">
                             <span class="bg-gray-800 text-white text-xs px-2 py-1 rounded font-bold">${game.prediction}</span>
                             <span class="text-yellow-600 font-bold text-sm">@ ${game.odds}</span>
                        </div>
                    </div>
                    <div class="w-12 ${isWon ? 'bg-green-500' : 'bg-gray-800'} flex items-center justify-center text-white">
                        <i class="${isWon ? 'fas fa-check' : 'fas fa-clock'} text-lg"></i>
                    </div>
                </div>
                `;
            });
        }
        html += `</div>`;
        return html;
    };

    const renderUltimate = () => {
        if (headerTitle) headerTitle.innerText = "ULTIMATE VIP";
        let html = `<div class="flex flex-col gap-4 p-4 fade-in pb-20">`;
        
        if (typeof gamesData !== 'undefined' && gamesData.ultimate) {
            gamesData.ultimate.forEach(game => {
                const isWon = game.status === 'won';
                const statusText = isWon ? 'WON' : (game.isLive ? 'LIVE' : 'PENDING');
                const statusClass = isWon ? 'badge-won' : (game.isLive ? 'badge-live' : 'badge-pending');
                
                html += `
                <div class="bg-white rounded-xl p-5 shadow-lg border border-blue-100 relative overflow-hidden">
                    ${game.isLive ? '<div class="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-1 font-bold animate-pulse">LIVE</div>' : ''}
                    <div class="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                        <i class="fas fa-trophy text-blue-600"></i>
                        <span class="text-xs font-bold text-blue-900 uppercase tracking-wide">${game.league}</span>
                        <span class="ml-auto text-xs font-mono text-gray-400">${game.time}</span>
                    </div>
                    <div class="mb-4">
                        <h3 class="text-lg font-black text-slate-800 leading-tight">${game.teamA}</h3>
                        <p class="text-xs text-gray-400 font-bold my-1">VS</p>
                        <h3 class="text-lg font-black text-slate-800 leading-tight">${game.teamB}</h3>
                    </div>
                    <div class="bg-blue-50 rounded-lg p-3 flex justify-between items-center">
                        <div class="flex flex-col">
                            <span class="text-[10px] text-blue-400 uppercase font-bold">Tip</span>
                            <span class="text-blue-900 font-bold text-sm">${game.prediction}</span>
                        </div>
                        <div class="flex flex-col items-end">
                            <span class="text-[10px] text-blue-400 uppercase font-bold">Odds</span>
                            <span class="text-blue-900 font-black text-lg">${game.odds}</span>
                        </div>
                    </div>
                    <div class="mt-3 flex items-center justify-end gap-2">
                         <span class="text-xs font-bold text-gray-400">Status:</span>
                         <span class="${statusClass} text-[10px] font-bold px-2 py-0.5 rounded uppercase">${statusText}</span>
                    </div>
                </div>
                `;
            });
        }
        html += `</div>`;
        return html;
    };

    const renderBTTS = () => {
        if (headerTitle) headerTitle.innerText = "VIP BTTS TIPS";
        let html = `<div class="bg-amber-50 min-h-full p-4 -m-4 fade-in pb-24">`;
        html += `<div class="bg-orange-600 text-white text-center py-3 rounded-t-lg mb-4 shadow-md font-bold text-lg tracking-wider">BOTH TEAMS TO SCORE</div>`;

        if (typeof gamesData !== 'won' && gamesData.btts) {
            gamesData.btts.forEach(game => {
                const isWon = game.status === 'won';
                html += `
                    <div class="bg-white rounded-xl shadow-lg p-0 mb-4 overflow-hidden border border-orange-200">
                        <div class="bg-orange-100 p-3 flex justify-between items-center border-b border-orange-200">
                            <span class="text-xs font-bold text-orange-700 uppercase">${game.league}</span>
                            <span class="text-xs text-orange-500 font-mono">${game.time}</span>
                        </div>
                        <div class="p-4">
                            <div class="flex items-center justify-between mb-4">
                                <span class="font-bold text-gray-800 text-sm w-2/5 truncate text-right">${game.teamA}</span>
                                <span class="text-xs text-gray-400 font-black px-2">VS</span>
                                <span class="font-bold text-gray-800 text-sm w-2/5 truncate text-left">${game.teamB}</span>
                            </div>
                            <div class="flex gap-2 mb-3">
                                <div class="flex-1 bg-orange-600 rounded-lg p-2 text-center text-white shadow-sm">
                                    <div class="text-[10px] opacity-80 uppercase">Prediction</div>
                                    <div class="font-bold text-sm">${game.prediction}</div>
                                </div>
                                <div class="w-20 bg-gray-800 rounded-lg p-2 text-center text-white shadow-sm flex flex-col justify-center">
                                    <div class="text-[10px] text-yellow-400 uppercase">Odds</div>
                                    <div class="font-bold">${game.odds}</div>
                                </div>
                            </div>
                            ${isWon ? `
                            <div class="bg-green-50 border border-green-200 rounded-lg p-2 flex justify-between items-center">
                                <div class="text-green-700 text-xs font-bold">RESULT</div>
                                <div class="text-green-800 font-bold">${game.score} ✔</div>
                            </div>
                            ` : `
                            <div class="bg-gray-100 border border-gray-200 rounded-lg p-2 text-center">
                                <div class="text-gray-500 text-xs font-bold">PENDING</div>
                            </div>
                            `}
                        </div>
                    </div>
                `;
            });
        }
        html += `</div>`;
        return html;
    };

    const renderSupport = () => {
        if (headerTitle) headerTitle.innerText = "SUPPORT / CONTACT";
        return `
            <div class="flex flex-col items-center justify-center mt-6 p-4 fade-in">
                <div class="bg-white p-6 rounded-3xl shadow-xl w-full text-center border border-gray-100">
                    <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3">
                        <i class="fas fa-headset text-3xl text-blue-600"></i>
                    </div>
                    <h2 class="text-xl font-bold text-gray-800 mb-2">Customer Support</h2>
                    <p class="text-gray-500 mb-6 text-sm">Tap a platform below to contact us directly.</p>
                    <div class="space-y-3 text-left">
                        <a href="https://t.me/V2_0X1" class="flex items-center p-4 bg-blue-50 rounded-xl border border-blue-100 hover:bg-blue-100 transition group">
                            <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white mr-4 shadow-md group-hover:scale-110 transition">
                                <i class="fab fa-telegram-plane"></i>
                            </div>
                            <div>
                                <div class="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Telegram</div>
                                <div class="font-bold text-gray-800 text-sm">@V2_0X1</div>
                            </div>
                        </a>
                        <a href="https://wa.me/256745430208" class="flex items-center p-4 bg-green-50 rounded-xl border border-green-100 hover:bg-green-100 transition group">
                            <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white mr-4 shadow-md group-hover:scale-110 transition">
                                <i class="fab fa-whatsapp"></i>
                            </div>
                            <div>
                                <div class="text-[10px] text-green-600 font-bold uppercase tracking-wider">Whatsapp</div>
                                <div class="font-bold text-gray-800 text-sm">+256745430208</div>
                            </div>
                        </a>
                        <a href="mailto:masterbetrealfixed@gmail.com" class="flex items-center p-4 bg-red-50 rounded-xl border border-red-100 hover:bg-red-100 transition group">
                            <div class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white mr-4 shadow-md group-hover:scale-110 transition">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <div>
                                <div class="text-[10px] text-red-600 font-bold uppercase tracking-wider">Email</div>
                                <div class="font-bold text-gray-800 text-xs">masterbetrealfixed@gmail.com</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        `;
    };

    const renderPrivacyPolicy = () => {
        if (headerTitle) headerTitle.innerText = "PRIVACY POLICY";
        return `
            <div class="flex flex-col gap-5 mt-4 fade-in pb-20">
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mx-2">
                    <div class="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                        <div class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-user-shield text-slate-600 text-lg"></i>
                        </div>
                        <h2 class="text-2xl font-bold text-slate-800">Privacy Policy</h2>
                    </div>
                    <div class="space-y-6 text-slate-600 text-sm leading-relaxed">
                        <section>
                            <h3 class="text-slate-900 font-bold text-base mb-2">1. Introduction</h3>
                            <p>Welcome to Football Simple. We are committed to protecting your personal information and your right to privacy. This policy explains how we handle your data.</p>
                        </section>
                        <section>
                            <h3 class="text-slate-900 font-bold text-base mb-2">2. Information We Collect</h3>
                            <p>We do not collect personal identifiable information (PII) such as your name, email, or phone number unless you voluntarily provide it when contacting support. We may use local storage to save your app preferences.</p>
                        </section>
                        <section>
                            <h3 class="text-slate-900 font-bold text-base mb-2">3. Use of Information</h3>
                            <p>Any information collected is used solely to improve the functionality of the app, provide customer support, and ensure a seamless user experience.</p>
                        </section>
                        <section>
                            <h3 class="text-slate-900 font-bold text-base mb-2">4. Third-Party Links</h3>
                            <p>Our application may contain links to external sites (e.g., WhatsApp, Telegram). We are not responsible for the content or privacy practices of these third-party platforms.</p>
                        </section>
                        <div class="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
                            <p class="text-blue-800 font-medium text-xs">By using this app, you agree to the terms outlined in this policy. Updates may be made periodically.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    // 7. Initialize
    populateNavigationDrawer();
    
    // Check hash for initial view
    const initialView = window.location.hash.substring(1) || 'home';
    
    // Set initial history state
    history.replaceState({ view: initialView }, '', `#${initialView}`);
    
    // Render initial view
    navigate(initialView, false); 
});

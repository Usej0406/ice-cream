// ==================== State Management ====================
let flavors = [];
let currentFilter = 'all';
let currentCategory = 'sweet';

// ==================== Local Storage ====================
const STORAGE_KEY = 'scoopsai_flavors';
const THEME_KEY = 'scoopsai_theme';

function saveFlavors() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(flavors));
}

function loadFlavors() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    flavors = JSON.parse(saved);
    updateUI();
  }
}

// ==================== Theme Management ====================
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
}

// ==================== Flavor Data ====================
const sweetFlavors = [
  "Vanilla", "Chocolate", "Strawberry", "Mint", "Coffee", "Cookie Dough", 
  "Pistachio", "Caramel", "Cookies and Cream", "Neapolitan", "Raspberry", 
  "Lemon", "Mango", "Butterscotch", "Rocky Road", "Blackberry", "Peach", 
  "Maple Pecan", "Cotton Candy", "Tiramisu", "Salted Caramel", "Almond Joy",
  "Toffee Crunch", "Banana Split", "S'mores", "Cherry Garcia", "Pumpkin Spice",
  "Butter Pecan", "Blueberry Cheesecake", "Apple Cinnamon", "Lemon Meringue",
  "Orange Sorbet", "Matcha", "Brown Sugar Cinnamon", "Cinnamon Roll",
  "Coconut Crunch", "Pineapple Paradise", "Caramel Pecan", "Tropical Fruit",
  "Peach Cobbler", "Cinnamon Apple", "Basil Honey", "Honey Lavender",
  "Chocolate Chip Cookie", "Coconut Cream Pie", "Toasted Almond", "Maple Walnut",
  "Chocolate Mint", "Peach Melba", "Chocolate Fudge Swirl", "Apple Pie",
  "Carrot Cake", "Chocolate Brownie", "Cookie Butter", "Maple Bacon",
  "White Chocolate Raspberry", "Red Velvet", "Churros", "Lemon Curd"
];

const weirdFlavors = [
  "Bacon", "Pickle", "Spaghetti", "Wasabi", "Sriracha", "Garlic", "Curry",
  "Bubblegum with Cheese", "Chocolate and Chili", "Mustard", "Cucumber",
  "Olive", "Eggplant", "Cauliflower", "Vinegar", "Mochi", "Coconut Curry",
  "Cheddar Cheese", "Hot Sauce", "Anchovy", "Ranch", "Cotton Candy and Popcorn",
  "Ketchup", "Maple Syrup", "Chili with Lime", "Potato Chips", "Salami",
  "Squid Ink", "Durian", "Caviar", "Cheese Pizza", "Spaghetti Bolognese",
  "Avocado", "Miso Soup", "Hot Dog", "Black Licorice", "Truffle",
  "Pickled Beets", "Sweet Corn", "Celery", "Pickled Ginger", "Raw Meat",
  "Fish Sauce", "Sweet Pickles", "Olive Oil", "Radish", "Pickled Cabbage",
  "Peanut Butter and Jelly", "Sauerkraut", "Chocolate Bacon", "Dill Pickle",
  "Hot Pepper Jelly", "Spicy Mango", "Salmon with Lemon", "Garlic Parmesan",
  "Sweet Potato", "Gorgonzola Cheese", "Curry Pineapple", "Tuna Fish",
  "Blue Cheese and Berries", "Bacon-wrapped Dates", "Sweet Onion", "Beef Jerky",
  "Seaweed", "Cheese Curds", "Brussels Sprouts", "Chicken Teriyaki",
  "Clam Chowder", "Pork Belly", "Gorgonzola and Pear", "Roasted Garlic"
    ];

    const addIns = [
  "Chocolate Chips", "Peanut Butter Swirl", "Oreos", "Brownie Chunks",
  "Fruit Swirl", "Marshmallows", "Nuts", "Coconut Flakes", "Fudge Sauce",
  "Candy Pieces", "Crushed Graham Crackers", "Caramel Swirl",
  "White Chocolate Chips", "Rainbow Sprinkles", "Chopped Almonds",
  "Biscotti Pieces", "Toffee Crunch", "Cookie Dough Chunks", "Pretzel Bits",
  "Honeycomb Crunch", "Raspberry Ribbons", "Salted Caramel Drizzle"
];

// ==================== Flavor Generation ====================
function generateFlavor(category) {
  const baseList = category === 'sweet' ? sweetFlavors : weirdFlavors;
  const randomBase = baseList[Math.floor(Math.random() * baseList.length)];
  const randomAddIn = addIns[Math.floor(Math.random() * addIns.length)];
  
  const flavorName = `${randomBase} ${randomAddIn}`;
  
  const flavor = {
    id: Date.now() + Math.random(),
    name: flavorName,
    category: category,
    isFavorite: false,
    timestamp: new Date().toISOString(),
    colorClass: category === 'sweet' ? `color-${Math.floor(Math.random() * 10) + 1}` : ''
  };
  
  flavors.unshift(flavor);
  saveFlavors();
  updateUI();
  updateHeroTitle(flavorName, category);
  
  // Animate the hero title
  animateHeroTitle();
  
  // Create confetti effect
  createConfetti();
}

function updateHeroTitle(title, category = 'sweet') {
  const heroTitle = document.getElementById('currentFlavor');
  const heroBadge = document.querySelector('.hero-badge');
  
  heroTitle.style.opacity = '0';
  heroTitle.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    heroTitle.textContent = title;
    heroTitle.style.opacity = '1';
    heroTitle.style.transform = 'translateY(0)';
    
    // Update badge text based on category
    if (category === 'weird') {
      heroBadge.textContent = '⚠️ WARNING: WEIRD FLAVOR';
      heroBadge.style.background = 'linear-gradient(135deg, #3d1f3a 0%, #9b7ee6 100%)';
      heroBadge.style.color = '#c8b3ff';
    } else {
      heroBadge.textContent = 'FRESHLY CHURNED';
      heroBadge.style.background = 'var(--badge-bg)';
      heroBadge.style.color = 'var(--badge-text)';
    }
  }, 200);
}

function animateHeroTitle() {
  const heroTitle = document.getElementById('currentFlavor');
  heroTitle.style.animation = 'none';
  setTimeout(() => {
    heroTitle.style.animation = 'fadeInUp 0.6s ease';
  }, 10);
}

// ==================== Favorites Management ====================
function toggleFavorite(id) {
  const flavor = flavors.find(f => f.id === id);
  if (flavor) {
    flavor.isFavorite = !flavor.isFavorite;
    saveFlavors();
    updateUI();
    
    // Create floating heart animation if favorited
    if (flavor.isFavorite) {
      const favoriteBtn = document.querySelector(`[data-id="${id}"] .favorite-btn`);
      if (favoriteBtn) {
        createFloatingHearts(favoriteBtn);
      }
    }
  }
}

function createFloatingHearts(element) {
  const rect = element.getBoundingClientRect();
  const container = document.getElementById('heartsContainer');
  
  // Create 5 floating hearts
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.innerHTML = '❤️';
      heart.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 40}px`;
      heart.style.top = `${rect.top + rect.height / 2}px`;
      container.appendChild(heart);
      
      setTimeout(() => {
        heart.remove();
      }, 2000);
    }, i * 100);
  }
}

// ==================== Delete Flavor ====================
function deleteFlavor(id) {
  flavors = flavors.filter(f => f.id !== id);
  saveFlavors();
  updateUI();
}

// ==================== Filter Management ====================
function setFilter(filter) {
  currentFilter = filter;
  updateUI();
}

function filterFlavors() {
  if (currentFilter === 'all') {
    return flavors;
  } else if (currentFilter === 'favorites') {
    return flavors.filter(f => f.isFavorite);
  } else if (currentFilter === 'sweet') {
    return flavors.filter(f => f.category === 'sweet');
  } else if (currentFilter === 'weird') {
    return flavors.filter(f => f.category === 'weird');
  } else if (currentFilter === 'safe') {
    return flavors.filter(f => f.category === 'sweet');
  }
  return flavors;
}

// ==================== UI Rendering ====================
function updateUI() {
  const flavorGrid = document.getElementById('flavorGrid');
  const emptyState = document.getElementById('emptyState');
  const historyCount = document.getElementById('historyCount');
  
  const filteredFlavors = filterFlavors();
  
  // Update count
  historyCount.textContent = filteredFlavors.length;
  
  // Clear grid
  flavorGrid.innerHTML = '';
  
  // Show empty state if no flavors
  if (filteredFlavors.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }
  
  emptyState.classList.add('hidden');
  
  // Render flavor cards
  filteredFlavors.forEach(flavor => {
    const card = createFlavorCard(flavor);
    flavorGrid.appendChild(card);
  });
  
  // Update filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === currentFilter);
  });
}

function createFlavorCard(flavor) {
  const card = document.createElement('div');
  card.className = 'flavor-card';
  card.dataset.id = flavor.id;
  
  const timeAgo = getTimeAgo(flavor.timestamp);
  
  // Determine the color class for the flavor name
  const colorClass = flavor.category === 'sweet' ? flavor.colorClass : 'weird';
  
  card.innerHTML = `
    <div class="flavor-card-header">
      <div class="flavor-badge ${flavor.category}">
        ${flavor.category === 'sweet' ? `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ` : `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
          </svg>
        `}
        ${flavor.category === 'sweet' ? 'SWEET' : 'WEIRD'}
      </div>
      <span class="flavor-time">${timeAgo}</span>
    </div>
    <div class="flavor-name ${colorClass}">${flavor.name}</div>
    <div class="flavor-card-footer">
      <button class="favorite-btn ${flavor.isFavorite ? 'active' : ''}" onclick="toggleFavorite(${flavor.id})" aria-label="Toggle favorite">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="${flavor.isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
      <button class="delete-btn" onclick="deleteFlavor(${flavor.id})" aria-label="Delete flavor">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          <line x1="10" y1="11" x2="10" y2="17"/>
          <line x1="14" y1="11" x2="14" y2="17"/>
        </svg>
      </button>
    </div>
  `;
  
  return card;
}

// ==================== Time Formatting ====================
function getTimeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const seconds = Math.floor((now - past) / 1000);
  
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}d`;
}

// ==================== Download History ====================
function downloadHistory() {
  if (flavors.length === 0) {
    alert('No flavors to download!');
    return;
  }
  
  let content = '🍦 Ice Cream Flavor History\n';
  content += '=====================================\n\n';
  
  const sweetFlavors = flavors.filter(f => f.category === 'sweet');
  const weirdFlavors = flavors.filter(f => f.category === 'weird');
  const favorites = flavors.filter(f => f.isFavorite);
  
  if (favorites.length > 0) {
    content += '❤️ FAVORITES:\n';
    favorites.forEach(f => {
      content += `  • ${f.name}\n`;
    });
    content += '\n';
  }
  
  if (sweetFlavors.length > 0) {
    content += '🍨 SWEET & SAFE:\n';
    sweetFlavors.forEach(f => {
      const fav = f.isFavorite ? '❤️ ' : '';
      content += `  ${fav}• ${f.name}\n`;
    });
    content += '\n';
  }
  
  if (weirdFlavors.length > 0) {
    content += '🤪 WEIRD & WILD:\n';
    weirdFlavors.forEach(f => {
      const fav = f.isFavorite ? '❤️ ' : '';
      content += `  ${fav}• ${f.name}\n`;
    });
    content += '\n';
  }
  
  content += `\nGenerated: ${new Date().toLocaleString()}\n`;
  content += 'Total Flavors: ' + flavors.length + '\n';
  
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `scoopsai-flavors-${Date.now()}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

// ==================== Clear History ====================
function clearHistory() {
  if (flavors.length === 0) {
    alert('No flavors to clear!');
    return;
  }
  
  if (confirm('Are you sure you want to clear all flavor history? This cannot be undone.')) {
    flavors = [];
    saveFlavors();
    updateUI();
    updateHeroTitle('Velvety Chocolate Fruit');
  }
}

// ==================== Confetti Effect ====================
function createConfetti() {
  const colors = ['#10d97f', '#ff6b9d', '#b847d9', '#47d9ff', '#ff9f47', '#9b7ee6'];
  const shapes = ['star', 'circle', 'line'];
  
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = `confetti ${shapes[Math.floor(Math.random() * shapes.length)]}`;
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = '-20px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
      
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 4000);
    }, i * 30);
  }
}

// ==================== Info Modal ====================
function showInfo() {
  alert('🍦 AI Ice Cream Generator\n\n' +
        'Generate creative ice cream flavors!\n\n' +
        '🍨 Sweet & Safe: Classic delicious flavors\n' +
        '🤪 Weird & Wild: Adventurous combinations\n\n' +
        '❤️ Click the heart to favorite flavors\n' +
        '🗑️ Click the trash to delete flavors\n\n' +
        'Made with ❤️');
}

// ==================== Event Listeners ====================
function initEventListeners() {
  // Theme toggle
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  
  // Info button
  document.getElementById('infoButton').addEventListener('click', showInfo);
  
  // Category buttons
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      currentCategory = category;
      
      // Update active state
      document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Generate flavor
      generateFlavor(category);
    });
  });
  
  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setFilter(btn.dataset.filter);
    });
  });
  
  // Download history
  document.getElementById('downloadHistory').addEventListener('click', downloadHistory);
  
  // Clear history
  document.getElementById('clearHistory').addEventListener('click', clearHistory);
}

// ==================== Initialization ====================
function init() {
  initTheme();
  loadFlavors();
  initEventListeners();
  
  // If no flavors, show default title
  if (flavors.length === 0) {
    updateHeroTitle('Velvety Chocolate Fruit');
  } else {
    // Show the most recent flavor
    updateHeroTitle(flavors[0].name);
  }
}

// Start the app
document.addEventListener('DOMContentLoaded', init);

// Auto-update time ago every minute
setInterval(() => {
  updateUI();
}, 60000);

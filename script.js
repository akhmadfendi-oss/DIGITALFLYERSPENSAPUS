// Configuration & State
let config = {
    eventName: "PELEPASAN SISWA KELAS IX",
    schoolName: "SMP NEGERI 1 BANYUBIRU",
    eventDate: "2024-06-15T08:00:00",
    gallery: []
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadConfig();
    updateUI();
    startCountdown();
    handleRecipient();
});

// Load config from LocalStorage
function loadConfig() {
    const saved = localStorage.getItem('undangan_config');
    if (saved) {
        config = JSON.parse(saved);
    }
}

// Update UI elements based on config
function updateUI() {
    document.title = `${config.eventName} - ${config.schoolName}`;
    const heroTitle = document.querySelector('.hero h1');
    const heroSub = document.querySelector('.hero h3');
    if (heroTitle) heroTitle.innerText = config.schoolName;
    if (heroSub) heroSub.innerText = config.eventName;
    
    // Update Logo
    const logo = document.getElementById('school-logo');
    if (logo && config.logo) logo.src = config.logo;
    
    // Update Gallery
    const track = document.getElementById('slider-track');
    if (track && config.gallery.length > 0) {
        track.innerHTML = config.gallery.map(img => `
            <div class="slide">
                <img src="${img}" alt="Gallery Image">
            </div>
        `).join('');
    }
}

// Countdown Logic
function startCountdown() {
    const target = new Date(config.eventDate).getTime();
    
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;
        
        const d_elem = document.getElementById('days');
        if (!d_elem) return;

        if (diff <= 0) {
            clearInterval(interval);
            return;
        }
        
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        
        d_elem.innerText = d.toString().padStart(2, '0');
        document.getElementById('hours').innerText = h.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = s.toString().padStart(2, '0');
    }, 1000);
}

// Admin Panel Logic
const adminTrigger = document.getElementById('admin-trigger');
if (adminTrigger) {
    adminTrigger.addEventListener('click', () => {
        const pin = prompt("Masukkan PIN Admin:");
        if (pin === "1234") {
            showAdminModal();
        } else {
            alert("PIN Salah!");
        }
    });
}

function showAdminModal() {
    const modal = document.createElement('div');
    modal.className = 'admin-modal glass active';
    modal.innerHTML = `
        <div class="admin-content">
            <h2 class="text-gold-gradient mb-6">Panel Admin</h2>
            <div class="admin-form">
                <label>Nama Sekolah</label>
                <input type="text" id="edit-school" value="${config.schoolName}">
                
                <label>Nama Acara</label>
                <input type="text" id="edit-event" value="${config.eventName}">
                
                <label>Tanggal Acara (YYYY-MM-DDTHH:MM)</label>
                <input type="datetime-local" id="edit-date" value="${config.eventDate}">
                
                <label>Logo Sekolah</label>
                <input type="file" id="edit-logo" accept="image/*">
                
                <div class="mt-8 flex gap-4">
                    <button class="btn-gold" onclick="saveAdminChanges()">Simpan</button>
                    <button class="btn-gold" style="background: #333; color: #fff" onclick="this.parentElement.parentElement.parentElement.remove()">Batal</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

window.saveAdminChanges = () => {
    config.schoolName = document.getElementById('edit-school').value;
    config.eventName = document.getElementById('edit-event').value;
    config.eventDate = document.getElementById('edit-date').value;
    
    const logoFile = document.getElementById('edit-logo').files[0];
    if (logoFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            config.logo = e.target.result;
            finalizeSave();
        };
        reader.readAsDataURL(logoFile);
    } else {
        finalizeSave();
    }
};

function finalizeSave() {
    localStorage.setItem('undangan_config', JSON.stringify(config));
    alert("Perubahan disimpan!");
    location.reload();
}

// Handle Recipient Name from URL (?to=Name)
function handleRecipient() {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) {
        document.getElementById('recipient-name').innerText = decodeURIComponent(to);
    }
}

// Gallery Logic (Basic Placeholder)
let currentSlide = 0;
function moveSlide(direction) {
    // Implementation for gallery slider
}

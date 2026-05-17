import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🚀 Memulai proses perbaikan otomatis...");

const publicDir = path.join(__dirname, 'public');

// 1. Buat folder public jika belum ada
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
    console.log("✅ Folder 'public' berhasil dibuat.");
}

// 2. Pindahkan file media
const filesToMove = [
    'DVS00232.jpg', 'DVS00234.jpg', 'DVS00236.jpg', 
    'DVS00257.jpg', 'DVS00266.jpg', 'DVS00277.jpg', 
    'DVS00290.jpg', 'logo pringaus.jpg.jpeg', 
    'Sampai Jumpa - Endank Soekamti ( Emotional Piano Cover ).mp3'
];

let movedCount = 0;
filesToMove.forEach(file => {
    const oldPath = path.join(__dirname, file);
    const newPath = path.join(publicDir, file);
    if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
        movedCount++;
    }
});
if (movedCount > 0) console.log(`✅ Berhasil memindahkan ${movedCount} file media ke folder public.`);

// 3. Hapus file sampah
const filesToDelete = ['script.js', 'style.css', 'index_preview.html'];
let deletedCount = 0;
filesToDelete.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        deletedCount++;
    }
});
if (deletedCount > 0) console.log(`✅ Berhasil menghapus ${deletedCount} file yang tidak terpakai.`);

// 4. Git Push
console.log("\n⏳ Sedang meng-upload ke GitHub... Mohon tunggu...");
try {
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Memperbaiki struktur Vite dan Actions"', { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });
    console.log("\n🎉 BERHASIL! Semua perbaikan telah di-upload ke GitHub.");
    console.log("👉 Silakan tunggu 1-2 menit, lalu cek link website Anda.");
} catch (error) {
    console.error("\n❌ Gagal saat melakukan Git Push. Pastikan Anda sudah login GitHub di VS Code.");
}

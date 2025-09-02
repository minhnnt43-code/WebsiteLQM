import { kv } from '@vercel/kv';

// Đây là "tên sổ" duy nhất để lưu dữ liệu của bạn trên Vercel
const DATA_KEY = 'minhWebsiteData_VercelKV_Final';

export default async function handler(request, response) {
    try {
        // --- HÀNH ĐỘNG: LẤY DỮ LIỆU ---
        if (request.method === 'GET') {
            let data = await kv.get(DATA_KEY);

            // Nếu chưa có dữ liệu nào trong "kho", tạo dữ liệu mẫu
            if (!data) {
                data = {
                    achievements: [
                        {id: Date.now() + 1, title: 'Chiến sĩ hoàn thành xuất sắc nhiệm vụ Chiến dịch Mùa hè xanh 2025', description: 'Được khen thưởng vì đã hoàn thành xuất sắc các nhiệm vụ được giao trong chiến dịch tình nguyện Mùa Hè Xanh.', imageId: '12-wT41fQ47KypmgXKvSAi7PjA8MvWnUv'},
                        {id: Date.now() + 2, title: 'Học bổng Khuyến khích học tập', description: 'Đạt thành tích tốt và nhận học bổng từ nhà trường cho những nỗ lực trong học tập và rèn luyện.', imageId: '1eM9Y-gNusx5aT6MvMv4-0aY_iO7bIq_W'}
                    ],
                    messages: [
                        {id: Date.now() + 3, name: 'Một người bạn giấu tên', text: 'Chúc Minh luôn giữ vững ngọn lửa nhiệt huyết và thành công trên con đường đã chọn nhé!'}
                    ]
                };
                // Lưu lại dữ liệu mẫu vào "kho"
                await kv.set(DATA_KEY, data);
            }
            return response.status(200).json(data);
        }

        // --- HÀNH ĐỘNG: LƯU (CẬP NHẬT) DỮ LIỆU ---
        if (request.method === 'POST') {
            const newData = request.body;
            
            // Kiểm tra an toàn, đảm bảo dữ liệu gửi lên là hợp lệ
            if (!newData || !Array.isArray(newData.achievements) || !Array.isArray(newData.messages)) {
                 return response.status(400).json({ error: 'Dữ liệu không hợp lệ.' });
            }
            
            // Ghi đè dữ liệu mới vào "kho"
            await kv.set(DATA_KEY, newData);
            return response.status(200).json({ message: 'Lưu dữ liệu thành công' });
        }
        
        // Nếu không phải GET hoặc POST, báo lỗi
        return response.status(405).json({ error: 'Phương thức không được phép.' });

    } catch (error) {
        console.error('API Error:', error);
        return response.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
    }
}```

---

### **Bước 3: Cập nhật `index.html` (Bản hoàn chỉnh cuối cùng)**

Bây giờ, xóa toàn bộ nội dung trong tệp `index.html` của bạn và thay thế bằng **TOÀN BỘ** mã nguồn này. Nó đã bao gồm đầy đủ tất cả các tính năng bạn yêu cầu.

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lâm Quốc Minh - Trang Cá Nhân</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; scroll-behavior: smooth; }
        .card-style { background-color: #ffffff; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05); }
        .section-title { font-weight: 800; font-size: 2.25rem; color: #1e3a8a; }
        .nav-link:hover { color: #2563eb; }
    </style>
</head>
<body class="bg-slate-50 text-slate-700">

    <!-- PHẦN TRANG CÔNG KHAI -->
    <div id="public-page">
        <header class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
            <div class="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#" class="text-xl font-bold text-blue-800">Lâm Quốc Minh</a>
                <nav class="hidden md:flex space-x-8 text-slate-600 font-semibold">
                    <a href="#about" class="nav-link">Thông tin</a>
                    <a href="#achievements" class="nav-link">Thành tích</a>
                    <a href="#moments" class="nav-link">Khoảnh khắc</a>
                    <a href="#messages" class="nav-link">Lời tâm sự</a>
                    <a href="#quotes" class="nav-link">Quotes</a>
                </nav>
            </div>
        </header>

        <main class="container mx-auto px-6 py-12 md:py-20">
            <section id="about" class="min-h-[80vh] flex flex-col md:flex-row items-center justify-center gap-12 text-center md:text-left">
                <img src="https://drive.google.com/uc?id=1I5sJ9yGGKlrIFyjQMmLmRqETNSTfQwXM" alt="Ảnh Lâm Quốc Minh" class="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-2xl">
                <div>
                    <h1 class="text-4xl md:text-6xl font-extrabold text-blue-900">Lâm Quốc Minh</h1>
                    <p class="mt-4 text-lg md:text-xl text-slate-600">Sinh viên khoa Luật, Trường Đại học Kinh tế - Luật, ĐHQG-HCM</p>
                </div>
            </section>
            
            <section id="achievements" class="py-20">
                <h2 class="section-title text-center mb-12">Hoạt động & Thành tích</h2>
                <div id="achievements-list-public" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"></div>
            </section>
            
            <section id="moments" class="py-20">
                <h2 class="section-title text-center mb-12">Những khoảnh khắc đáng nhớ</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="group relative overflow-hidden rounded-lg"><img src="https://drive.google.com/uc?id=1G8aQ5q4bS_CgY-uJ2p9X3R7f6wK8d5wH" class="w-full h-full object-cover"/></div>
                    <div class="group relative overflow-hidden rounded-lg col-span-2"><img src="https://drive.google.com/uc?id=1oN0tI8hJ_m-c-W3eI9fP7V6R5vY9s-gK" class="w-full h-full object-cover"/></div>
                    <div class="group relative overflow-hidden rounded-lg"><img src="https://drive.google.com/uc?id=1T7rV6zX4O8uI_gL2aD_tX9uP_bN0mE3d" class="w-full h-full object-cover"/></div>
                </div>
            </section>

            <section id="messages" class="py-20 bg-white -mx-6 px-6 rounded-lg">
                <h2 class="section-title text-center mb-12">Lời tâm sự chia sẻ</h2>
                <div id="messages-list-public" class="max-w-2xl mx-auto space-y-6 mb-12"></div>
                <form id="message-form" class="max-w-xl mx-auto border-t border-slate-200 pt-8">
                    <h3 class="text-xl font-bold text-center text-slate-800 mb-4">Gửi lời nhắn của bạn</h3>
                    <div id="form-feedback" class="mb-4 text-center h-5"></div>
                    <div class="mb-4"><label for="name" class="block mb-2 font-semibold">Tên của bạn</label><input type="text" id="name" class="w-full px-4 py-2 border rounded-lg" required></div>
                    <div class="mb-6"><label for="message" class="block mb-2 font-semibold">Lời nhắn</label><textarea id="message" rows="4" class="w-full px-4 py-2 border rounded-lg" required></textarea></div>
                    <div class="text-center"><button type="submit" class="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg">Gửi lời nhắn</button></div>
                </form>
            </section>
            
            <section id="quotes" class="py-20 text-center">
                 <div class="max-w-3xl mx-auto">
                    <svg class="w-12 h-12 mx-auto text-blue-200" fill="currentColor" viewBox="0 0 16 16"><path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/> </svg>
                    <blockquote class="mt-4 text-2xl font-semibold italic text-slate-800">Trên bước đường thành công không có dấu chân của kẻ lười biếng.</blockquote>
                </div>
            </section>
        </main>
        
        <footer class="border-t border-slate-200"><div class="container mx-auto px-6 py-6 text-center text-slate-500">&copy; 2025 Lâm Quốc Minh. <a href="/#admin" class="hover:text-blue-600">Admin</a></div></footer>
    </div>

    <!-- PHẦN TRANG QUẢN TRỊ -->
    <div id="admin-page" class="hidden">
        <div id="login-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-200">
            <div class="card-style rounded-lg p-8 w-full max-w-sm z-10">
                <h2 class="text-2xl font-bold text-slate-900 mb-6 text-center">Đăng nhập Quản trị</h2>
                <form id="login-form">
                    <div class="mb-4"><label for="username" class="block">Tài khoản</label><input type="text" id="username" class="w-full bg-slate-100 border-slate-300 rounded-md p-2" required></div>
                    <div class="mb-6"><label for="password" class="block">Mật khẩu</label><input type="password" id="password" class="w-full bg-slate-100 border-slate-300 rounded-md p-2" required></div>
                    <button type="submit" class="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg">Đăng nhập</button>
                    <p id="login-error" class="text-red-500 text-sm mt-4 text-center h-5"></p>
                </form>
            </div>
        </div>
        <div id="app-container" class="min-h-screen hidden bg-white">
            <header class="flex justify-between items-center p-4 sm:p-6 bg-white border-b"><h1 class="text-xl font-bold">Trang Quản lý</h1><button id="logout-btn" class="bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm">Đăng xuất</button></header>
            <main class="p-4 sm:p-6 lg:p-8">
                 <div class="mb-6 border-b"><nav class="flex space-x-4"><button data-tab="thanh-tich" class="tab-btn active">Thành tích</button><button data-tab="loi-nhan" class="tab-btn">Lời nhắn</button></nav></div>
                 <div id="admin-tab-content">
                    <div id="thanh-tich-content" class="tab-pane">
                         <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div class="card-style p-6 rounded-lg">
                                <h2 class="text-2xl font-bold">Thêm / Sửa Thành tích</h2>
                                <form id="achievement-form" class="mt-4 space-y-4">
                                    <input type="hidden" id="achievement-id">
                                    <div><label for="achievement-title" class="block">Tiêu đề</label><input type="text" id="achievement-title" class="w-full bg-slate-100 rounded-md p-2" required></div>
                                    <div><label for="achievement-description" class="block">Mô tả</label><textarea id="achievement-description" rows="4" class="w-full bg-slate-100 rounded-md p-2" required></textarea></div>
                                    <div><label for="achievement-image-url" class="block">Link Ảnh Google Drive</label><input type="url" id="achievement-image-url" class="w-full bg-slate-100 rounded-md p-2" placeholder="Dán link chia sẻ vào đây" required><p class="text-xs text-slate-500 mt-1">Lưu ý: Quyền truy cập ảnh phải là "Bất kỳ ai có đường liên kết".</p></div>
                                    <div class="flex gap-4"><button type="submit" class="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg">Lưu Thành tích</button><button type="button" id="clear-form-btn" class="w-full bg-slate-200 font-bold py-2.5 rounded-lg">Tạo mới</button></div>
                                </form>
                            </div>
                            <div class="card-style p-6 rounded-lg"><h2 class="text-2xl font-bold">Danh sách Hiện có</h2><div id="achievements-list-admin" class="mt-4 space-y-2 max-h-[60vh] overflow-y-auto"></div></div>
                        </div>
                    </div>
                    <div id="loi-nhan-content" class="tab-pane hidden"><h2 class="text-2xl font-bold">Quản lý Lời nhắn</h2><div id="messages-list-admin" class="mt-4 space-y-2"></div></div>
                 </div>
            </main>
        </div>
    </div>
    
    <script>
    document.addEventListener('DOMContentLoaded', () => {
        const publicPage = document.getElementById('public-page'); const adminPage = document.getElementById('admin-page'); const loginModal = document.getElementById('login-modal'); const loginForm = document.getElementById('login-form'); const usernameInput = document.getElementById('username'); const passwordInput = document.getElementById('password'); const loginError = document.getElementById('login-error'); const appContainer = document.getElementById('app-container'); const logoutBtn = document.getElementById('logout-btn'); const achievementsListPublic = document.getElementById('achievements-list-public'); const achievementsListAdmin = document.getElementById('achievements-list-admin'); const achievementForm = document.getElementById('achievement-form'); const achievementIdInput = document.getElementById('achievement-id'); const achievementTitleInput = document.getElementById('achievement-title'); const achievementDescriptionInput = document.getElementById('achievement-description'); const achievementImageUrlInput = document.getElementById('achievement-image-url'); const clearFormBtn = document.getElementById('clear-form-btn'); const messagesListPublic = document.getElementById('messages-list-public'); const messagesListAdmin = document.getElementById('messages-list-admin'); const messageForm = document.getElementById('message-form'); const formFeedback = document.getElementById('form-feedback'); const adminTabBtns = document.querySelectorAll('#admin-page .tab-btn'); const adminTabPanes = document.querySelectorAll('#admin-page .tab-pane');
        let appState = { achievements: [], messages: [] };
        
        const loadData = async () => { try { const res = await fetch('/api/data'); if (!res.ok) throw new Error('Network response was not ok'); const data = await res.json(); appState.achievements = data.achievements || []; appState.messages = data.messages || []; } catch (error) { console.error("Could not load data. Using local.", error); } renderAll(); };
        const saveData = async () => { try { const res = await fetch('/api/data', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(appState) }); if (!res.ok) throw new Error('Failed to save data'); alert('Lưu thành công!'); } catch (error) { console.error("Could not save data.", error); alert('Lỗi: Không thể lưu dữ liệu.'); } };
        const renderAll = () => { renderAchievements(); renderMessages(); };
        const checkRoute = () => { if (window.location.hash === '#admin') { publicPage.style.display = 'none'; adminPage.style.display = 'block'; if (sessionStorage.getItem('isAdminLoggedIn_Final') === 'true') { loginModal.style.display = 'none'; appContainer.style.display = 'block'; } else { loginModal.style.display = 'flex'; appContainer.style.display = 'none'; } } else { publicPage.style.display = 'block'; adminPage.style.display = 'none'; } loadData(); };
        const handleLogin = (e) => { e.preventDefault(); if (usernameInput.value === 'lamquocminh' && passwordInput.value === 'lamquocminh') { sessionStorage.setItem('isAdminLoggedIn_Final', 'true'); checkRoute(); } else { loginError.textContent = 'Sai tài khoản hoặc mật khẩu.'; } };
        const handleLogout = () => { sessionStorage.removeItem('isAdminLoggedIn_Final'); window.location.hash = ''; checkRoute(); };
        const extractId = (url) => { const match = url.match(/drive\.google\.com\/(?:file\/d\/|uc\?id=)([a-zA-Z0-9_-]{28,})/); return match ? match[1] : null; };
        
        const renderAchievements = () => { achievementsListPublic.innerHTML = ''; achievementsListAdmin.innerHTML = ''; if (appState.achievements.length === 0) { const p = '<div class="col-span-full text-center py-8">Chưa có thành tích nào.</div>'; achievementsListPublic.innerHTML = p; achievementsListAdmin.innerHTML = p; return; } appState.achievements.forEach(ach => { const id = ach.imageId; if (!id) return; const url = `https://drive.google.com/uc?id=${id}`; achievementsListPublic.innerHTML += `<div class="card-style rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"> <img src="${url}" class="w-full h-56 object-cover"><div class="p-6"><h3 class="text-xl font-bold">${ach.title}</h3><p class="mt-2 text-slate-500">${ach.description}</p></div></div>`; achievementsListAdmin.innerHTML += `<div class="flex items-start gap-4 p-2 border-b"> <img src="${url}" class="w-16 h-16 rounded object-cover"><div class="flex-grow"><h4 class="font-semibold">${ach.title}</h4></div><button data-id="${ach.id}" class="edit-btn p-1 text-blue-600">Sửa</button><button data-id="${ach.id}" class="delete-btn p-1 text-red-600">Xóa</button></div>`; }); };
        const renderMessages = () => { messagesListPublic.innerHTML = ''; messagesListAdmin.innerHTML = ''; if (appState.messages.length === 0) { const p = '<div class="col-span-full text-center py-8">Chưa có lời nhắn nào.</div>'; messagesListAdmin.innerHTML = p; return; } appState.messages.forEach(msg => { messagesListPublic.innerHTML += `<div class="card-style p-4 rounded-lg"><p class="italic">"${msg.text}"</p><p class="text-right font-semibold mt-2">- ${msg.name}</p></div>`; messagesListAdmin.innerHTML += `<div class="flex justify-between items-start p-2 border-b"><div class="flex-grow"><p>"${msg.text}"</p><p class="text-sm font-semibold">- ${msg.name}</p></div><button data-id="${msg.id}" class="delete-btn p-1 text-red-600">Xóa</button></div>`; }); };
        
        achievementForm.addEventListener('submit', async (e) => { e.preventDefault(); const id = parseInt(achievementIdInput.value); const imageId = extractId(achievementImageUrlInput.value); if (!imageId) { alert('Link ảnh không hợp lệ.'); return; } const achievementData = { title: achievementTitleInput.value, description: achievementDescriptionInput.value, imageId: imageId }; if (id) { const index = appState.achievements.findIndex(a => a.id === id); appState.achievements[index] = { ...achievementData, id: id }; } else { appState.achievements.unshift({ ...achievementData, id: Date.now() }); } await saveData(); renderAchievements(); achievementForm.reset(); });
        clearFormBtn.addEventListener('click', () => achievementForm.reset());
        achievementsListAdmin.addEventListener('click', async e => { const id = parseInt(e.target.dataset.id); if (e.target.classList.contains('delete-btn')) { if (confirm('Bạn chắc chắn muốn xóa?')) { appState.achievements = appState.achievements.filter(a => a.id !== id); await saveData(); renderAchievements(); } } if (e.target.classList.contains('edit-btn')) { const ach = appState.achievements.find(a => a.id === id); achievementIdInput.value = ach.id; achievementTitleInput.value = ach.title; achievementDescriptionInput.value = ach.description; achievementImageUrlInput.value = `https://drive.google.com/uc?id=${ach.imageId}`; } });
        messagesListAdmin.addEventListener('click', async e => { if (e.target.classList.contains('delete-btn')) { if (confirm('Bạn chắc chắn muốn xóa?')) { const id = parseInt(e.target.dataset.id); appState.messages = appState.messages.filter(m => m.id !== id); await saveData(); renderMessages(); } } });
        messageForm.addEventListener('submit', async e => { e.preventDefault(); const form = e.target; const newMessage = { id: Date.now(), name: form.elements.name.value, text: form.elements.message.value }; appState.messages.unshift(newMessage); await saveData(); renderMessages(); form.reset(); formFeedback.textContent = "Cảm ơn bạn đã gửi lời nhắn!"; });
        adminTabBtns.forEach(btn => btn.addEventListener('click', e => { const tabId = e.currentTarget.dataset.tab; adminTabBtns.forEach(b => b.classList.remove('active')); adminTabPanes.forEach(p => p.classList.add('hidden')); e.currentTarget.classList.add('active'); document.getElementById(`${tabId}-content`).classList.remove('hidden'); }));

        loginForm.addEventListener('submit', handleLogin);
        logoutBtn.addEventListener('click', handleLogout);
        window.addEventListener('hashchange', checkRoute);
        checkRoute();
    });
    </script>
</body>
</html>

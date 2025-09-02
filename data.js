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
        <!-- Header và các mục khác giữ nguyên -->

        <!-- SECTION LỜI TÂM SỰ (Công khai) -->
        <section id="contact" class="py-20 bg-white -mx-6 px-6 rounded-lg">
            <h2 class="section-title text-center mb-12">Lời tâm sự chia sẻ</h2>
            <!-- Danh sách lời nhắn -->
            <div id="messages-list-public" class="max-w-2xl mx-auto space-y-6 mb-12">
                <!-- Lời nhắn sẽ được tải vào đây -->
            </div>
            <!-- Form gửi lời nhắn -->
            <form id="message-form" class="max-w-xl mx-auto border-t border-slate-200 pt-8">
                <h3 class="text-xl font-bold text-center text-slate-800 mb-4">Gửi lời nhắn của bạn</h3>
                <div id="form-feedback" class="mb-4 text-center"></div>
                <div class="mb-4"><label for="name" class="block mb-2 font-semibold">Tên của bạn</label><input type="text" name="name" id="name" class="w-full px-4 py-2 border rounded-lg" required></div>
                <div class="mb-6"><label for="message" class="block mb-2 font-semibold">Lời nhắn</label><textarea name="message" id="message" rows="4" class="w-full px-4 py-2 border rounded-lg" required></textarea></div>
                <div class="text-center"><button type="submit" class="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg">Gửi lời nhắn</button></div>
            </form>
        </section>

        <!-- SECTION KHOẢNH KHẮC & QUOTES -->
        <!-- (Đã được thêm vào) -->
    </div>

    <!-- PHẦN TRANG QUẢN TRỊ -->
    <div id="admin-page" class="hidden">
        <!-- ... Toàn bộ giao diện Admin giữ nguyên ... -->
        <!-- Quản lý Thành tích (đã sửa) -->
        <!-- Quản lý Lời nhắn (MỚI) -->
        <div id="quan-ly-loi-nhan" class="tab-pane hidden card-style p-6 rounded-lg">
            <h2 class="text-2xl font-bold">Quản lý Lời nhắn</h2>
            <div id="messages-list-admin" class="mt-4 space-y-2 max-h-[70vh] overflow-y-auto"></div>
        </div>
    </div>

    <script>
    document.addEventListener('DOMContentLoaded', () => {
        // ... (Khai báo các DOM element, bao gồm các element mới cho Lời nhắn)
        
        let appState = { achievements: [], messages: [] };

        // --- CÁC HÀM API MỚI ---
        const loadDataFromServer = async () => {
            try {
                const response = await fetch('/api/data');
                const data = await response.json();
                appState.achievements = data.achievements || [];
                appState.messages = data.messages || [];
                renderAll();
            } catch (error) { console.error("Lỗi tải dữ liệu:", error); }
        };

        const saveDataToServer = async () => {
            try {
                await fetch('/api/data', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(appState)
                });
            } catch (error) { console.error("Lỗi lưu dữ liệu:", error); }
        };

        const renderAll = () => {
            renderAchievements();
            renderMessages();
        };

        // --- CÁC HÀM RENDER VÀ XỬ LÝ LỜI NHẮN ---
        const renderMessages = () => {
            const publicContainer = document.getElementById('messages-list-public');
            const adminContainer = document.getElementById('messages-list-admin');
            publicContainer.innerHTML = '';
            adminContainer.innerHTML = '';

            appState.messages.forEach(msg => {
                // Render ra trang công khai
                const publicHtml = `<div class="card-style p-4 rounded-lg"><p class="italic text-slate-600">"${msg.text}"</p><p class="text-right font-semibold text-blue-800 mt-2">- ${msg.name}</p></div>`;
                publicContainer.innerHTML += publicHtml;

                // Render ra trang quản trị
                const adminHtml = `<div class="flex justify-between items-start p-2 border-b"><div class="flex-grow"><p>"${msg.text}"</p><p class="text-sm font-semibold text-slate-500">- ${msg.name}</p></div><button data-id="${msg.id}" class="delete-message-btn text-red-500">Xóa</button></div>`;
                adminContainer.innerHTML += adminHtml;
            });
        };

        const handleAddMessage = async (e) => {
            e.preventDefault();
            const form = e.target;
            const name = form.elements['name'].value;
            const text = form.elements['message'].value;

            const newMessage = { id: Date.now(), name: name, text: text };
            appState.messages.unshift(newMessage);
            await saveDataToServer();
            renderMessages();
            form.reset();
            document.getElementById('form-feedback').textContent = "Cảm ơn bạn đã gửi lời nhắn!";
        };
        
        const handleDeleteMessage = async (messageId) => {
            if (confirm('Bạn có chắc muốn xóa lời nhắn này?')) {
                appState.messages = appState.messages.filter(msg => msg.id !== messageId);
                await saveDataToServer();
                renderMessages();
            }
        };

        // --- CÁC HÀM XỬ LÝ KHÁC ---
        // (handleLogin, handleLogout, renderAchievements, handleAddAchievement, v.v... giữ nguyên)

        // --- GÁN SỰ KIỆN ---
        // (Thêm sự kiện cho form lời nhắn và nút xóa lời nhắn)
        document.getElementById('message-form').addEventListener('submit', handleAddMessage);
        document.getElementById('messages-list-admin').addEventListener('click', e => {
            if (e.target.classList.contains('delete-message-btn')) {
                handleDeleteMessage(parseInt(e.target.dataset.id));
            }
        });

        // Tải trang lần đầu
        checkRoute();
    });
    </script>
</body>
</html>

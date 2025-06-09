document.addEventListener('DOMContentLoaded', function() {
    
    // --- PHẦN LOGIC CHO MENU DI ĐỘNG ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        const menuLinks = mobileMenu.querySelectorAll('a');
        function toggleMenu() { mobileMenu.classList.toggle('hidden'); }
        mobileMenuButton.addEventListener('click', toggleMenu);
        menuLinks.forEach(link => { link.addEventListener('click', toggleMenu); });
    }

    // --- PHẦN LOGIC CHO LỊCH SỬ GIAO DỊCH CHUẨN THỜI GIAN ---
    const historyListContainer = document.getElementById('history-list');

    if (historyListContainer) {
        // Dữ liệu mẫu để random
        const usernames = ['baonam', 'minhtuan', 'hoanglong', 'anhtuan', 'quocviet', 'thanhtung', 'ducmanh'];
        const maxHistoryItems = 7; // Số lượng mục lịch sử hiển thị
        let historyData = []; // Mảng chứa dữ liệu lịch sử {user, amount, time}

        // --- CÁC HÀM TIỆN ÍCH ---
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const formatNumber = (num) => num.toLocaleString('vi-VN');
        const censorUsername = (name) => '*****' + name.slice(-2);

        // --- HÀM TÍNH TOÁN VÀ ĐỊNH DẠNG THỜI GIAN ---
        function formatTimeAgo(date) {
            const now = new Date();
            const seconds = Math.round((now - date) / 1000);

            if (seconds < 10) return "vài giây trước";
            if (seconds < 60) return `${seconds} giây trước`;
            
            const minutes = Math.round(seconds / 60);
            if (minutes < 60) return `${minutes} phút trước`;

            const hours = Math.round(minutes / 60);
            if (hours < 24) return `${hours} giờ trước`;

            return `hơn 1 ngày trước`;
        }
        
        // --- HÀM TẠO HTML CHO TOÀN BỘ LỊCH SỬ ---
        function renderHistory() {
            historyListContainer.innerHTML = ''; // Xóa list cũ
            historyData.forEach(item => {
                const timeAgo = formatTimeAgo(item.time);
                const entryDiv = document.createElement('div');
                // Bố cục được tối ưu cho điện thoại
                entryDiv.className = 'flex items-center justify-between p-3 bg-brand-bg rounded-md';
                entryDiv.innerHTML = `
                    <div class="flex items-center flex-1 min-w-0">
                        <svg class="w-5 h-5 text-brand-green mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" /></svg>
                        <p class="text-sm text-brand-text-secondary truncate">
                            <span class="font-bold text-white">${item.user}</span>
                            đã bán
                            <span class="font-bold text-brand-blue">${item.amount} xu</span>
                        </p>
                    </div>
                    <span class="text-xs text-brand-text-secondary flex-shrink-0 ml-3">${timeAgo}</span>
                `;
                historyListContainer.appendChild(entryDiv);
            });
        }
        
        // --- HÀM THÊM MỘT GIAO DỊCH MỚI ---
        function addNewHistoryEntry() {
            // Tạo dữ liệu mới
            const newEntry = {
                user: censorUsername(usernames[getRandomInt(0, usernames.length - 1)]),
                amount: formatNumber(getRandomInt(1000000, 15000000)), // Tối thiểu 1 triệu
                time: new Date()
            };

            // Thêm vào đầu mảng
            historyData.unshift(newEntry);

            // Giữ cho mảng không quá dài
            if (historyData.length > maxHistoryItems) {
                historyData.pop();
            }
        }
        
        // --- KHỞI TẠO VÀ CHẠY VÒNG LẶP ---
        
        // 1. Tạo một vài mục lịch sử ban đầu với thời gian lùi dần
        for (let i = 0; i < maxHistoryItems; i++) {
            const timeOffset = (i * 45 + getRandomInt(5, 20)) * 1000; // Lùi thời gian
            const entry = {
                user: censorUsername(usernames[getRandomInt(0, usernames.length - 1)]),
                amount: formatNumber(getRandomInt(1000000, 15000000)),
                time: new Date(Date.now() - timeOffset)
            };
            historyData.push(entry);
        }
        
        // 2. Render lần đầu tiên
        renderHistory();

        // 3. Cứ mỗi 5-8 giây, thêm 1 giao dịch mới
        setInterval(addNewHistoryEntry, getRandomInt(5000, 8000));
        
        // 4. Cứ mỗi 2 giây, cập nhật lại toàn bộ hiển thị thời gian
        setInterval(renderHistory, 2000);
    }
});

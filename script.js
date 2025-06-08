// Chờ cho toàn bộ nội dung trang được tải xong rồi mới thực thi script
document.addEventListener('DOMContentLoaded', function() {
    
    // Lấy các phần tử cần thiết từ DOM
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Kiểm tra xem các phần tử có tồn tại không để tránh lỗi
    if (mobileMenuButton && mobileMenu) {
        const menuLinks = mobileMenu.querySelectorAll('a');

        // Hàm để bật/tắt menu
        function toggleMenu() {
            mobileMenu.classList.toggle('hidden');
        }
        
        // Bắt sự kiện click vào nút hamburger để mở/đóng menu
        mobileMenuButton.addEventListener('click', toggleMenu);

        // Bắt sự kiện click vào các link trong menu (để tự động đóng menu sau khi chọn)
        menuLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }
});
// DOM Elements
const sidebar = document.getElementById('sidebar');
const toggleSidebarBtn = document.getElementById('toggle-sidebar');
const closeSidebarBtn = document.getElementById('close-sidebar');
const navItems = document.querySelectorAll('.sidebar-nav li a');
const notificationBtn = document.getElementById('notification-btn');
const profileDropdownContainer = document.getElementById('profile-dropdown-container');
const profilePhotoInput = document.getElementById('profile-photo-input');
const headerProfileImg = document.getElementById('header-profile-img');
const dropdownProfileImg = document.getElementById('dropdown-profile-img');
const notificationSettingsModal = document.getElementById('notification-settings-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');

// Toggle sidebar on mobile
toggleSidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Close sidebar on mobile
closeSidebarBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

// Handle navigation item clicks
navItems.forEach(item => {
    item.addEventListener('click', function(event) {
        // Remove active class from all items
        navItems.forEach(navItem => {
            navItem.parentElement.classList.remove('active');
        });
        
        // Add active class to clicked item
        this.parentElement.classList.add('active');
        
        // Close sidebar on mobile after navigation
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
        
        // Prevent default link behavior for demo
        event.preventDefault();
    });
});

// Toggle notification dropdown
notificationBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    notificationBtn.classList.toggle('active');
    
    // Close profile dropdown if open
    profileDropdownContainer.classList.remove('active');
});

// Toggle profile dropdown
profileDropdownContainer.addEventListener('click', (event) => {
    event.stopPropagation();
    profileDropdownContainer.classList.toggle('active');
    
    // Close notification dropdown if open
    notificationBtn.classList.remove('active');
});

// Close dropdowns when clicking outside
document.addEventListener('click', () => {
    notificationBtn.classList.remove('active');
    profileDropdownContainer.classList.remove('active');
});

// Prevent dropdown from closing when clicking inside it
document.querySelector('.notification-dropdown').addEventListener('click', (event) => {
    event.stopPropagation();
});

document.querySelector('.profile-dropdown-menu').addEventListener('click', (event) => {
    event.stopPropagation();
});

// Handle profile photo change
profilePhotoInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Update both profile images with the new image
            headerProfileImg.src = e.target.result;
            dropdownProfileImg.src = e.target.result;
        }
        
        reader.readAsDataURL(file);
    }
});

// Mark all notifications as read
document.querySelector('.mark-all-read').addEventListener('click', () => {
    const unreadNotifications = document.querySelectorAll('.notification-list li.unread');
    unreadNotifications.forEach(notification => {
        notification.classList.remove('unread');
    });
    
    // Remove the notification dot
    document.querySelector('.notification-dot').style.display = 'none';
});

// Open notification settings modal
document.querySelector('.dropdown-footer a').addEventListener('click', (event) => {
    event.preventDefault();
    notificationSettingsModal.classList.add('active');
    notificationBtn.classList.remove('active');
});

// Close modals
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        notificationSettingsModal.classList.remove('active');
    });
});

// Close modal when clicking outside
notificationSettingsModal.addEventListener('click', (event) => {
    if (event.target === notificationSettingsModal) {
        notificationSettingsModal.classList.remove('active');
    }
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (event) => {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnToggleBtn = toggleSidebarBtn.contains(event.target);
    
    if (!isClickInsideSidebar && !isClickOnToggleBtn && window.innerWidth <= 768) {
        sidebar.classList.remove('active');
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active'); // Reset sidebar state
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Title text array
    const titles = [
        "⭐ Yoghurt1337 ⭐",
        "⭐ Welcome to my page ⭐",
        "⭐ Bio Page ⭐"
    ];
    
    let titleIndex = 0;
    
    // Function to change the page title
    function changeTitle() {
        document.title = titles[titleIndex];
        titleIndex = (titleIndex + 1) % titles.length;
    }
    
    // Change title every 3 seconds
    setInterval(changeTitle, 3000);
    
    // Set initial title
    changeTitle();
    
    // Update title from admin panel settings if available
    if (localStorage.getItem('username')) {
        titles[0] = `⭐ ${localStorage.getItem('username')} ⭐`;
    }
});

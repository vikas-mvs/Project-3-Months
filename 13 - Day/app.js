document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-bar span");
    const profileBtn = document.getElementById("profile-btn");
    const sections = document.querySelectorAll(".content-section");
    const currentPageTitle = document.querySelector(".current-page");

    const sectionIds = [
        "home-section",
        "classes-section",
        "quiz-section",
        "aichat-section",
        "profile-section"
    ];

    function changeTab(targetSectionId, activeElement, titleText) {

        menuItems.forEach(item => item.classList.remove("active"));
        if (profileBtn) profileBtn.classList.remove("active");

        activeElement.classList.add("active");

        sections.forEach(section => section.classList.remove("active"));

        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
            targetSection.classList.add("active");
        }

        if (currentPageTitle) {
            currentPageTitle.textContent = titleText;
        }
    }

    menuItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            const targetId = sectionIds[index];
            const cleanText = item.textContent.trim();
            changeTab(targetId, item, cleanText);
        });
    });

    if (profileBtn) {
        profileBtn.addEventListener("click", () => {
            changeTab("profile-section", profileBtn, "Profile");
        });
    }
});

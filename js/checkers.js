function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("checker");
    checkAut();
}

function checkAut() {
    let currentUser = JSON.parse(localStorage.getItem("user"));
    let currentChecker = JSON.parse(localStorage.getItem("checker"));
    if (currentUser == null || currentChecker == null || currentUser.token == null) {
        window.location.href = "/Casestudy4_Checker_Duy_FrontEnd/index.html"
    }

}
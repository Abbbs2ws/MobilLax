async function register(event) {
    event.preventDefault(); // 폼 기본 제출 방지

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let message = document.getElementById("message");

    if (password !== confirmPassword) {
        message.innerText = "비밀번호가 일치하지 않습니다.";
        message.style.color = "red";
        return;
    }

    let requestData = {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    };

    try {
        let response = await fetch("http://localhost:8080/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData)
        });

        let result = await response.json();
        message.innerText = result.message;
        message.style.color = result.success ? "green" : "red";

    } catch (error) {
        message.innerText = "서버 오류: 회원가입 실패";
        message.style.color = "red";
    }
}
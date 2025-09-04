let users = JSON.parse(localStorage.getItem("users")) || [
    {id: "BA2025", first_name: "Behzodbek", last_name: "Abdumutalov", email: "bek.abdumutalov@gmail.com", password: "isagi11"},
    {id: "IM2025", first_name: "Ibroxim", last_name: "Meliqulov", email: "ibroxim@gmail.com", password: "nagi11"},
    {id: "KE2025", first_name: "Elyorbek", last_name: "Khatanboyev", email: "elyor05@gmail.com", password: "elyor05"},
    {id: "XX2025", first_name: "Xamidullo", last_name: "Xudoyberdiyev", email: "xamidullo@gmail.com", password: "xamidull0"}
];





const loginForm = document.querySelector(".login_form")
const sighnupForm = document.querySelector(".signup_form")
const myProfile = document.getElementById("myProfile")

document.getElementById("showSignup").addEventListener("click", () => {
    loginForm.style.display = "none"
    sighnupForm.style.display = "flex"
})

document.getElementById("showLogin").addEventListener("click", () => {
    sighnupForm.style.display = "none"
    loginForm.style.display = "flex"
})

sighnupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const first_name = document.getElementById("first_name").value
    const last_name = document.getElementById("last_name").value
    const userEmail = document.getElementById("email").value
    const password = document.getElementById("newpassword").value
    const confirm = document.getElementById("confirmpassword").value
    const error = document.getElementById("error")
    const acc_cr = document.getElementById("acc_cr")

    const userId = getID(first_name, last_name)

    function getID(first_name, last_name){
        let str = first_name[0].toUpperCase() + last_name[0].toUpperCase()
        for (let i = 0; i < 4; i++ ){
            str += Math.floor(Math.random()* 9) +1
        }
        return str
    }


    for (let user of users){
        if (user.email === userEmail){
            error.textContent = "Email In Use!"
            error.style.display = "block"
            return
        }
    }

    if (password !== confirm) {
        error.style.display = "block"
    } else {
        fetch("https://682f107d746f8ca4a47fa71c.mockapi.io/products", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            firstname: first_name,
            lastname: last_name,
            email: userEmail,
            password: password,
            id: userId
        })
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data)
        })

        acc_cr.style.display = "block"
        error.style.display = "none"

        setTimeout(() => {
            sighnupForm.style.display = "none"
            loginForm.style.display = "flex"
        }, 2000);
    }

    
        

    async function sendUserId(email, userId) {
    let res = await fetch("http://localhost:3000/send-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, userId })
    });

    let data = await res.json();
    if (data.success) {
        console.log("✅ Email yuborildi foydalanuvchiga!");
    } else {
        console.log("❌ Xato:", data.error);
    }
}

sendUserId(userEmail, userId)

})

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const userEmail = document.getElementById("email_login").value.trim()
    const userPassword = document.getElementById("password").value.trim()

    console.log(userEmail)
    console.log(userPassword)

    const res = await fetch("https://682f107d746f8ca4a47fa71c.mockapi.io/products")
    const users_api = await res.json()

    console.log(users)

    const found = users_api.find(user => user.email === userEmail && user.password === userPassword)



    console.log(found)

    if (found) {
        localStorage.setItem("currentUser", JSON.stringify(found))
        window.location.href = "main.html"
    }else{
        alert("Username Or Password Incorrect!")
    }

    
})


const k_password = document.querySelector(".restore_pass")

document.querySelector(".fb").addEventListener("click", () => {
    k_password.style.display = "flex"
    loginForm.style.display = "none"
})

document.getElementById("show_login").addEventListener("click", () => {
    k_password.style.display = "none"
    loginForm.style.display = "flex"
})

k_password.addEventListener("submit", (e) => {
    e.preventDefault()

    const userid = document.getElementById("id_pass").value

    console.log(userid)

    const found = users.find(user => user.id === userid)
    if (found) {
        alert(`Your Password: ${found.password}`)
    } else {
        alert("User not found!")
    }
})


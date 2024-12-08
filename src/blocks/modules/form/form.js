const Form = {
    form: document.getElementById('form'),
    chat: document.getElementById('chatContainer'),
    clearErrorFields() {
        const errors = document.querySelectorAll(".form__error");
        errors.forEach((error) => (error.textContent = ""));
    },
    show() {
        const form = `
            <form id="form" class="form" action="">
                <div class="form__name">
                    <label for="name" id="nameError" class="form__error"></label>
                    <input id="name" class="form__inp" name="name" type="text" placeholder="Ім'я">
                </div>
                <div class="form__surname">
                    <label for="surname" id="surnameError" class="form__error"></label>
                    <input id="surname" class="form__inp" name="surname" type="text" placeholder="Прізвище">
                </div>
                <div class="form__email">
                    <label for="email" id="emailError" class="form__error"></label>
                    <input id="email" class="form__inp" name="email" type="email" placeholder="Пошта">
                </div>
                <div class="form__phone">
                    <label for="phone" id="phoneError" class="form__error"></label>
                    <input id="phone" class="form__inp" name="phone" type="tel" placeholder="Телефон">
                </div>
                <input id="submit" class="form__button" type="submit" value="Надіслати">
            </form>
        `;

        this.chat.insertAdjacentHTML('beforeend', form);
    },
    submit() {
        this.form = document.getElementById('form');
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const surname = document.getElementById("surname").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();

            let isValid = true;

            this.clearErrorFields();

            if (name === "" || !/^[a-zA-Z\u0400-\u04FF\u0500-\u052F\s'-]+$/u.test(name)) {
                document.getElementById("nameError").textContent = "Ім'я має містити лише літери";
                isValid = false;
            }

            if (surname === "" || !/^[a-zA-Z\u0400-\u04FF\u0500-\u052F\s'-]+$/u.test(surname)) {
                document.getElementById("surnameError").textContent = "Прізвище має містити лише літери";
                isValid = false;
            }

            if (email === "" || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                document.getElementById("emailError").textContent = "Введіть дійсну електронну пошту";
                isValid = false;
            }

            if (phone === "" || !/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(phone)) {
                document.getElementById("phoneError").textContent = "Введіть дійсний номер телефону";
                isValid = false;
            }

            if (isValid) {
                localStorage.setItem("formData", JSON.stringify({ name, surname, email, phone }));
                window.location.href = "pages/success.html";
            }
        });
    },
    init() {
        this.show();
        this.submit();
    }
};

export { Form };
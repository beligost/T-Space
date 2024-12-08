const Success = {
    formData: JSON.parse(localStorage.getItem("formData")),
    insertData() {
        if (this.formData) {
            console.log("Submitted Data:", this.formData);
        
            document.querySelector('.success__name').innerHTML = this.formData.name;
            document.querySelector('.success__surname').innerHTML = this.formData.surname;
            document.querySelector('.success__email').innerHTML = this.formData.email;
            document.querySelector('.success__phone').innerHTML = this.formData.phone;
        } else {
            console.log("No form data found.");
        }
    },
    init() {
        if (document.querySelector('.success')) {
            this.insertData();
        }
    }
}

Success.init();
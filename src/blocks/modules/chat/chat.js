import { showVisible } from '../../../js/index.js';
import { Form } from '../form/form.js';

const Chat = {
    chat: document.querySelector('#chatContainer'),
    getDate(date) {
        if (date) {
            return `0${date.getHours()}`.slice(-2) + ':' + `0${date.getMinutes()}`.slice(-2);
        } else {
            return '';
        }
    },
    showOnScroll() {
        this.chat.addEventListener('scroll', function() {
            showVisible();
        });
    },
    scrollDown() {
        this.chat.scrollIntoView({
            block: 'end',
            behavior: "smooth"
        });

        setTimeout(() => {
            this.scrollDown();
            showVisible();
        }, 0);
    },
    removeEvents(questionsList) {
        for (let i = 0; i < questionsList.length; i++) {
            questionsList[i].removeEventListener('click', );
        }
    },
    async setEvents(questions) {
        const questionsList = document.querySelectorAll('.question');
        const lastQuestionsList = questionsList[questionsList.length - 1];
        
        return new Promise((resolve, reject) => {
            lastQuestionsList.addEventListener('click', (event) => {
                const target = event.target.closest('.question__btn');
    
                if (target) {
                    let answer = target.innerHTML;

                    if (questions.order === 'first') {

                        if (answer === 'Так') {
                            resolve(answer);
                        } else {
                            this.createMessage(`${answer}`, `right`, 0, 0);
                            this.createMessage(`Дякую за вашу відповідь, чекаємо на ваше повернення`, `left`, new Date(), .5);
                            
                            reject(false);
                        }
                    }

                    if (questions.order === 'second') {
                        if (answer) {
                            resolve(answer);
                        }
                    }

                    lastQuestionsList.replaceWith(lastQuestionsList.cloneNode(true));
                }
            });
        });
    },
    createMessage(text, position, date, delay) {
        let messageHTML = `
            <div class="message message--${position} animate-visible" style="transition-delay: ${delay}s">
                <div class="message__container">
                    <p class="message__text">${text}</p>
                    <footer class="message__footer">
                        <time class="message__time">${this.getDate(date)}</time>
                    </footer>
                </div>
            </div>
        `;

        this.showMessage(messageHTML);
    },
    async createQuestion(text, position, date, delay, questions) {
        let questionList = '';

        for (let question of questions.list) {
            questionList += `<button class="question__btn">${question}</button>`;
        }

        let questionHTML = `
            <div class="question animate-visible" style="transition-delay: ${delay}s">
                ${questionList}
            </div>
        `;

        let messageHTML = `
            <div class="message message--${position} message--bold animate-visible" style="transition-delay: ${delay}s">
                <div class="message__container">
                    <p class="message__text">${text}</p>
                    <footer class="message__footer">
                        <time class="message__time">${this.getDate(date)}</time>
                    </footer>
                </div>
            </div>
            ${questionHTML}
        `;

        this.showMessage(messageHTML);
        let result = await this.setEvents(questions);

        return result;
    },
    showMessage(message) {
        this.chat.insertAdjacentHTML('beforeend', message);

        showVisible();
        this.scrollDown();
    },
    init() {
        if (document.querySelector('#chatContainer')) {
            this.createMessage(`Запускаємо курс з арбітражу трафіку! Отримайте цінні знання від експертів. Поглиблене вивчення сучасних стратегій.`, `left`, new Date(), 0);
            this.createMessage(`Приєднуйтесь до нашого нового курсу! Інтерактивні заняття, практичні завдання, сертифікат. Відмінна можливість підвищити кваліфікацію.`, `left`, new Date(), .5);
            this.createMessage(`Учасники отримають доступ до ексклюзивних матеріалів, консультацій та мережі контактів. Вивчайте нові тенденції арбітражу трафіку.`, `left`, new Date(), 1);
            this.createQuestion(`Хочете дізнатись більше?`, `left`, new Date(), 1.5, {order: 'first', list: ['Так', 'Ні']}).then(result => {
                this.createMessage(`Так`, `right`, 0, 0);
                this.createQuestion(`Чи був у вас досвід пов'язаний із Арбітражем трафіку?`, `left`, new Date(), .5, {order: 'second', list: ['Так', 'Ні', 'Чув про таке']}).then(result => {
                    this.createMessage(`${result}`, `right`, 0, 0);
                    this.createQuestion(`Скільки часу ви могли б приділяти на день?`, `left`, new Date(), .5, {order: 'second', list: ['Одна година', '2-3 години', '5 і більше']}).then(result => {
                        this.createMessage(`${result}`, `right`, 0, 0);
                        this.createMessage(`Дякую! Наша компанія дуже зацікавлена ​​вами, для подальшої підтримки зв'язку, будь ласка, заповніть форму`, `left`, new Date(), .5);
    
                        Form.init();
                    });
                });
            });
        }
    }
};

Chat.init();
document.addEventListener('DOMContentLoaded', () => {
    const chatbotHTML = `
        <div class="chatbot-container">
            <button class="chatbot-toggler" id="chat-toggler">
                <i class="fa-solid fa-message"></i>
            </button>
            <div class="chatbot-window" id="chat-window">
                <div class="chatbot-header">
                    <h3><i class="fa-solid fa-robot"></i> Sanchili Bot</h3>
                    <button class="chatbot-close" id="chat-close"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="chatbot-messages" id="chat-messages">
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    const toggler = document.getElementById('chat-toggler');
    const closeBtn = document.getElementById('chat-close');
    const windowEl = document.getElementById('chat-window');
    const messagesContainer = document.getElementById('chat-messages');

    let chatOpen = false;

    toggler.addEventListener('click', () => {
        chatOpen = !chatOpen;
        windowEl.classList.toggle('active', chatOpen);
        if (chatOpen && messagesContainer.children.length === 0) {
            initChat();
        }
    });

    closeBtn.addEventListener('click', () => {
        chatOpen = false;
        windowEl.classList.remove('active');
    });

    const qaPairs = {
        "shipping": {
            question: "Mennyibe kerül a szállítás?",
            answer: "A szállítás díja 1490 Ft. 15.000 Ft feletti rendelés esetén a szállítás ingyenes!"
        },
        "spicy": {
            question: "Melyik a legcsípősebb szószotok?",
            answer: "Jelenleg a Kólás BBQ szósz a legcsípősebb szószunk, vigyázz vele!"
        },
        "storage": {
            question: "Hogyan tároljam a szószokat?",
            answer: "Felbontás előtt száraz, hűvös helyen elállnak. Felbontás után érdemes hűtőben tartani őket, így tovább megőrzik friss ízüket."
        },
        "contact": {
            question: "Hogyan tudom felvenni veletek a kapcsolatot?",
            answer: "Írj nekünk az info@sanchili.hu e-mail címre, vagy keress minket Facebookon és Instagramon!"
        }
    };

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-bubble chat-${sender}`;
        msgDiv.innerHTML = text;
        messagesContainer.appendChild(msgDiv);
        scrollToBottom();
    }

    function appendOptions() {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'chat-options';

        Object.keys(qaPairs).forEach(key => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.textContent = qaPairs[key].question;
            btn.onclick = () => handleOptionSelect(key);
            optionsDiv.appendChild(btn);
        });

        messagesContainer.appendChild(optionsDiv);
        scrollToBottom();
    }

    function handleOptionSelect(key) {
        const currentOptions = messagesContainer.querySelectorAll('.chat-options');
        currentOptions.forEach(opt => opt.remove());

        appendMessage(qaPairs[key].question, 'user');

        setTimeout(() => {
            appendMessage(qaPairs[key].answer, 'bot');

            setTimeout(() => {
                appendMessage("Miben segíthetek még?", 'bot');
                appendOptions();
            }, 1000);

        }, 600);
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function initChat() {
        setTimeout(() => {
            appendMessage("Szia! Én a Sanchili chatbotja vagyok. Miben segíthetek?", 'bot');
            appendOptions();
        }, 300);
    }
});

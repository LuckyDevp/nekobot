document.addEventListener('DOMContentLoaded', function() {
    const botChat = document.getElementById('botChat');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    
    // Conexión WebSocket al bot (simulada)
    function connectToBot() {
        // En una implementación real, aquí iría la conexión al backend
        console.log("Conectando al bot de NekoxPrime...");
        
        // Mostrar mensaje inicial del bot
        addBotMessage("¡Hola! Soy el bot oficial de NekoxPrime. Escribe /start para comenzar.");
        
        // Cargar estadísticas (simuladas)
        updateBotStats();
    }
    
    // Función para añadir mensaje del bot
    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'bot-message received';
        messageDiv.textContent = text;
        botChat.appendChild(messageDiv);
        botChat.scrollTop = botChat.scrollHeight;
    }
    
    // Función para añadir mensaje del usuario
    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'bot-message sent';
        messageDiv.textContent = text;
        botChat.appendChild(messageDiv);
        botChat.scrollTop = botChat.scrollHeight;
    }
    
    // Función para actualizar estadísticas
    function updateBotStats() {
        // En una implementación real, esto vendría de una API
        fetch('/api/bot/stats')
            .then(response => response.json())
            .then(data => {
                document.getElementById('totalUsers').textContent = data.totalUsers;
                document.getElementById('startCount').textContent = data.startCount;
                document.getElementById('successAuth').textContent = data.successAuth;
            })
            .catch(() => {
                // Valores simulados para demostración
                document.getElementById('totalUsers').textContent = "124";
                document.getElementById('startCount').textContent = "356";
                document.getElementById('successAuth').textContent = "89";
            });
    }
    
    // Manejar envío de mensajes
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addUserMessage(message);
            
            // Aquí iría el envío real al backend
            if (message === '/start') {
                setTimeout(() => {
                    addBotMessage("Por favor, escribe tu nombre completo para autenticarte.");
                }, 1000);
            } else if (message === "Angelo Rodriguez") {
                setTimeout(() => {
                    addBotMessage("✅ Aceptado. Ahora tienes acceso a los servicios exclusivos de NekoxPrime.");
                }, 1000);
            } else {
                setTimeout(() => {
                    addBotMessage("❌ Nombre incorrecto. Por favor, intenta nuevamente.");
                }, 1000);
            }
            
            userInput.value = '';
        }
    }
    
    // Iniciar conexión
    connectToBot();
});
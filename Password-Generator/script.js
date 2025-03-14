// DOM Elements
const elements = {
  result: document.getElementById('result'),
  length: document.getElementById('length'),
  uppercase: document.getElementById('uppercase'),
  lowercase: document.getElementById('lowercase'),
  numbers: document.getElementById('numbers'),
  symbols: document.getElementById('symbols'),
  generate: document.getElementById('generate'),
  clipboard: document.getElementById('clipboard')
}

// Character generators
const charGenerators = {
  lower: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
  upper: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
  number: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
  symbol: () => '!@#$%^&*(){}[]=<>/,.'[Math.floor(Math.random() * 19)]
}

// Copy password to clipboard
elements.clipboard.addEventListener('click', () => {
  const password = elements.result.innerText
  if (!password) return
  
  navigator.clipboard.writeText(password)
  showToast('Password copied!')
})

// Generate password
elements.generate.addEventListener('click', () => {
  const config = {
    length: +elements.length.value,
    lower: elements.lowercase.checked,
    upper: elements.uppercase.checked,
    number: elements.numbers.checked,
    symbol: elements.symbols.checked
  }

  elements.result.innerText = generatePassword(config)
})

// Generate password based on config
function generatePassword({ length, ...config }) {
  // Get selected types
  const selectedTypes = Object.entries(config)
    .filter(([_, enabled]) => enabled)
    .map(([type]) => type)

  if (selectedTypes.length === 0) return ''

  // Generate password
  let password = ''
  for (let i = 0; i < length; i++) {
    const type = selectedTypes[i % selectedTypes.length]
    password += charGenerators[type]()
  }

  return password
}

// Show toast notification
function showToast(message) {
  const toast = document.createElement('div')
  toast.className = 'notification'
  toast.textContent = message
  document.body.appendChild(toast)
  
  setTimeout(() => toast.remove(), 3000)
}

// Toast notification styles
document.head.appendChild(Object.assign(document.createElement('style'), {
  textContent: `
    .notification {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #2ecc71;
      color: white;
      padding: 15px 25px;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      animation: slideUp 0.5s ease-out;
    }

    @keyframes slideUp {
      0% {
        transform: translate(-50%, 100%);
        opacity: 0;
      }
      100% {
        transform: translate(-50%, 0);
        opacity: 1;
      }
    }
  `
}))

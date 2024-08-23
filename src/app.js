// Dirección de destino para la donación
const donationAddress = '0xC09eBB35c4861315144B72043060D819820B4B7A'; // Reemplaza con la dirección real

const donateButton = document.getElementById('donateButton');
const amountInput = document.getElementById('amount');
const reasonInput = document.getElementById('reason');
const statusDiv = document.getElementById('status');

function setStatus(message, isError = false) {
    statusDiv.textContent = message;
    statusDiv.style.color = isError ? 'red' : 'green';
}

async function sendDonation() {
    const amount = amountInput.value;
    const reason = reasonInput.value.trim();

    if (!amount || isNaN(amount) || amount <= 0) {
        setStatus('Por favor, ingresa un monto válido para donar.', true);
        return;
    }

    if (!reason) {
        setStatus('Por favor, escribe el motivo de tu donación.', true);
        return;
    }

    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        try {
            // Solicita la conexión a MetaMask
            await provider.send("eth_requestAccounts", []);

            // Obtén el firmante (la cuenta del usuario en MetaMask)
            const signer = provider.getSigner();

            // Verifica si MetaMask está conectado a la red Holesky
            const network = await provider.getNetwork();
            if (network.chainId !== 17000) {
                setStatus('Por favor, conecta MetaMask a la red Ethereum Holesky.', true);
                return;
            }

            // Convierte el monto ingresado a Wei (la unidad mínima de Ether)
            const etherAmount = ethers.utils.parseEther(amount);

            // Envía la transacción
            setStatus(`Enviando donación para "${reason}"...`);
            const tx = await signer.sendTransaction({
                to: donationAddress,
                value: etherAmount
            });

            // Espera a que la transacción sea confirmada
            await tx.wait();

            setStatus(`¡Donación de ${amount} ETH para "${reason}" enviada con éxito! Gracias por tu apoyo.`);
        } catch (error) {
            console.error('Error al enviar la donación:', error);
            setStatus('Ocurrió un error al enviar la donación. Por favor, intenta de nuevo.', true);
        }
    } else {
        setStatus('MetaMask no está instalado. Por favor, instálalo para continuar.', true);
    }
}

// Agrega un evento al botón para enviar la donación
donateButton.addEventListener('click', sendDonation);

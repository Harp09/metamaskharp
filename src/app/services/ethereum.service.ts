import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class EthereumService {
  private readonly donationAddress = '0xC09eBB35c4861315144B72043060D819820B4B7A'; // Reemplaza con tu dirección real

  constructor() {}

  async sendTransaction(amount: string) {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask no está instalado. Por favor, instálalo para continuar.');
    }

    // Crear proveedor y solicitar cuentas
    const provider = new ethers.BrowserProvider(window.ethereum as any);
    await provider.send('eth_requestAccounts', []);

    // Crear firmante y asegurarse de que se resuelva el Promise
    const signer = await provider.getSigner(); // Asegúrate de usar await aquí

    // Verificar red
    const network = await provider.getNetwork();
    const chainId = network.chainId;

    // Convertir el Chain ID a número para la comparación
    const holeskyChainId = 17000; // Reemplaza con el Chain ID de Holesky
    if (Number(chainId) !== holeskyChainId) {
      throw new Error('Por favor, conecta MetaMask a la red Ethereum Holesky.');
    }

    // Crear transacción
    const etherAmount = ethers.parseEther(amount);
    const tx = await signer.sendTransaction({
      to: this.donationAddress,
      value: etherAmount
    });

    // Esperar a que se confirme la transacción
    await tx.wait();
  }
}

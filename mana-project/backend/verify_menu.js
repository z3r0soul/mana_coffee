// import fetch from 'node-fetch'; // Usar fetch nativo de Node.js

const verifyMenu = async () => {
    try {
        const response = await fetch('https://subtemporal-conception-brusquely.ngrok-free.dev/api/menu-client');
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        console.log('Endpoint /api/menu-client responde correctamente.');
        console.log('Items recibidos:', data.length);
        if (data.length > 0) {
            console.log('Ejemplo de item:', data[0]);
            console.log('Tiene campo tipo:', 'tipo' in data[0] ? 'SÍ' : 'NO');
        } else {
            console.log('La base de datos parece vacía, pero el endpoint funciona.');
        }
    } catch (error) {
        console.error(' Error verificando endpoint:', error.message);
    }
};

verifyMenu();

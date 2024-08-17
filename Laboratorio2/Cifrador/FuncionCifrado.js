function Encriptar() {
    processFile(true);
}

function Desencriptar() {
    processFile(false);
}
        
function processFile(isEncrypt) {
    const fileInput = document.getElementById('fileInput');
    const keyInput = document.getElementById('keyInput').value;
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const fileData = new Uint8Array(event.target.result);
        const processedData = xorEncrypt(fileData, keyInput);
        const blob = new Blob([processedData], { type: 'application/octet-stream' });
        const downloadLink = document.getElementById('downloadLink');

        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = isEncrypt ? file.name + ".encrypted" : file.name.replace(".encrypted", "");
        downloadLink.style.display = 'block';
        downloadLink.textContent = "Descargar Archivo " + (isEncrypt ? "Cifrado" : "Descifrado");
    };
    
    reader.readAsArrayBuffer(file);
}

function xorEncrypt(data, key) {
    const processedData = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
        processedData[i] = data[i] ^ key.charCodeAt(i % key.length);
    }
    return processedData;
}
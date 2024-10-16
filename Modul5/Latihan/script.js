async function convertCurrency() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('amount').value;

    if (amount === '' || isNaN(amount)) {
        document.getElementById('result').innerHTML = 'Silakan masukkan jumlah yang valid.';
        return;
    }

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();

    if (!data || !data.rates) {
        document.getElementById('result').innerHTML = 'Gagal mengambil nilai tukar.';
        return;
    }

    const rate = data.rates[toCurrency];

    if (!rate) {
        document.getElementById('result').innerHTML = `Tidak ada nilai tukar yang tersedia untuk ${toCurrency}.`;
        return;
    }

    const result = amount * rate;

    document.getElementById('result').innerHTML = `Hasil Konversi:<br/>${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
}

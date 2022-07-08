const convertBulan = (m: number) => {
    let bulan: string = "";
    switch (m) {
        case 0: bulan = "Januari"; break;
        case 1: bulan = "Februari"; break;
        case 2: bulan = "Maret"; break;
        case 3: bulan = "April"; break;
        case 4: bulan = "Mei"; break;
        case 5: bulan = "Juni"; break;
        case 6: bulan = "Juli"; break;
        case 7: bulan = "Agustus"; break;
        case 8: bulan = "September"; break;
        case 9: bulan = "Oktober"; break;
        case 10: bulan = "November"; break;
        case 11: bulan = "Desember"; break;
    }
    return bulan;
}
export function getWaktu(dateRaw: string) {
    const date = new Date(dateRaw.split(" ")[0]);
    let result: string = "";
    result += date.getDate() > 9 ? date.getDate().toString() : "0" + date.getDate().toString();
    result += " " + convertBulan(date.getMonth());
    result += " " + date.getFullYear().toString()
    return result;
}
export const convertToRupiah = (angka: number) => {
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
    return 'Rp' + rupiah.split('', rupiah.length - 1).reverse().join('');
}
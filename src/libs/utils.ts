export const formatNumber = (val: any) => {
    const floatValue = parseFloat(val);

    if (!isNaN(floatValue)) {
        const stringValue = floatValue.toString();
        const decimalIndex = stringValue.indexOf('.');

        if (decimalIndex !== -1) {
            const decimalPart = stringValue.substring(decimalIndex + 1);

            const truncatedDecimalPart = decimalPart.substring(0, 2);

            const formattedValue = stringValue.substring(0, decimalIndex) + '.' + truncatedDecimalPart;

            return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        } else {
            return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
    }

    // Jika bukan angka, kembalikan nilai asli
    return val;
};

export const getRandomValue = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
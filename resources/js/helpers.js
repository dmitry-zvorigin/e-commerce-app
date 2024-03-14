
export function declineProductCount(count) {
    if (count % 10 === 1 && count % 100 !== 11) {
        return `${count} товар`;
    } else if (2 <= count % 10 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
        return `${count} товара`;
    } else {
        return `${count} товаров`;
    }
}
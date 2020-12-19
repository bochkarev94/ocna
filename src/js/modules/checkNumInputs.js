/**
 * Created by пк on 28.11.2020.
 */

const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector);

    numInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
            //D - ищем все не цифры
        });
    });
};

export default checkNumInputs;
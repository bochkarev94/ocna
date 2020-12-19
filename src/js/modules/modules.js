/**
 * Created by пк on 27.11.2020.
 */
//triggerSelector - кнопка вызывает  модальное окно
//modalSelector - само модальное окно
//closeSelector - закрывает модальное окно


const modals = (state) => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]');
            scroll = calcScroll(); // при откурытие модального окна не прыгает


        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();//отменяет стандартное поведение странциы
                }

                showModel();

                function showModel() {
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }

                function hiddenModel() {
                    windows.forEach(item => {
                        item.style.display = 'none';
                    });
                }

                document.body.style.marginRight = `${scroll}px`;



                if(modal.classList.contains('popup_calc_profile')) {
                    if(!state.width || !state.height) {
                        modal.style.display = 'none';
                    } else {
                        hiddenModel();
                        showModel();
                    }

                }

                if (modal.classList.contains('popup_calc_end')) {
                    if (!state.type || !state.profile) {
                        modal.style.display = 'none';
                    } else {
                        hiddenModel();
                        showModel();
                    }
                }

            });
        });



        close.addEventListener('click', () => {

            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {

                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(() => {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height ='50px';
        div.style.overflow = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close');
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    //showModalByTime('.popup', 60000);
};

export default modals;


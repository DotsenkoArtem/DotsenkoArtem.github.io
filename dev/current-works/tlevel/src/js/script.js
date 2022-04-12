"use strict"

// window.onload = function (){

    // Intro Why Collapse
    whyBtn.onclick = function () {
        if(why.classList.contains('open')) {
            why.classList.remove('open');
            why.classList.add('close');
        } else {
            why.classList.remove('close');
            why.classList.add('open');
        }
    }
// ------------------------------------------------

    // MODALS
    const modalOpenBtns = document.querySelectorAll('.modal-trigger');

    if(modalOpenBtns){
        for(let i = 0; i < modalOpenBtns.length; i++){
            let modalOpenBtn    = modalOpenBtns[i];
            modalOpenBtn.addEventListener('click', ()=>{
                openModal(modalOpenBtn);
            });
        }
    }

    // Functions
    function openModal(modalOpenBtn){
        let modal = document.getElementById(modalOpenBtn.dataset.target);
        modal.classList.remove('closed');
        modal.classList.add('opened');
        let modalCloseBtns = modal.getElementsByClassName('modal-close');

        for(let i = 0; i < modalCloseBtns.length; i++){
            let modalCloseBtn    = modalCloseBtns[i];
            modalCloseBtn.addEventListener('click', ()=>{
                closeModal(modal);
            });
        }
    }

    function closeModal(modal){
        modal.classList.remove('opened');
        modal.classList.add('closed');
    }
// ================================================

    // FORMS
    // Массив всех форм
    let forms = document.forms;
    for(let i = 0; i < forms.length; i++){

        let form                = forms[i];
        let attach              = form.querySelector('[type="file"]');
        let selectedFile        = form.querySelector('.form__file_selected');

        if(attach) {
            attach.addEventListener('change', function(){
                if (this.files.length < 1) {
                    selectedFile.innerHTML = ``;
                } else if (this.files.length == 1) {
                    selectedFile.innerHTML = `Выбран файл:<br>${this.files[0].name} `;
                } else {
                    selectedFile.innerHTML = `Выбранно файлов: ${this.files.length} `;
                }
                // console.log(this.files);
                // console.log(this.files.length);
            })
        }

        form.addEventListener('submit', function (event){
            send(event, form.dataset.action);
        });
    
        function send(event, php){
            // Отключаю поля формы на врем отправки данных - тогда не работает отправка вложений
            // for (let i = 0; i < form.elements.length; i++) {
            //   form.elements[i].disabled = true;
            // }
    
            setupLoader(form);
    
            // console.log("Отправка запроса");
    
            // if(attach){
            //     // Вычисляю объем выбранных файлов - чисто для себя - в консоль
            //     let fSizes = 0;
            //     for(let i = 0; i < userFile5.files.length; i++) {
            //     fSizes += userFile5.files[i].size;
            //     }
            //     console.log(`fSizes: ${fSizes} байт`);
            //     console.log(`userFile5.files.length: ${userFile5.files.length} файлов`);
            // }
            
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
            var req = new XMLHttpRequest();
            req.open('POST', php, true);
            
            req.onload = function() {
                // Определение переменных для оповещения
                let thanks                  = document.createElement('div');
                let thanksContent           = document.createElement('div');
                let thanksClose             = document.createElement('div');
                let messageSuccessful   = '<h3><span>Спасибо</span>Мы перезвоним Вам в ближайшее время!</h3>';
                let limitExceeded       = '<h3><span>Ошибка.</span>Превышен максимальный размер прикрепляемых файлов (10мб).</h3>';
                let messageError        = '<h3><span>Ошибка</span>Сообщение не отправлено</h3>';
                
                // Установка окна оповещения
                setupThanks();
                function setupThanks(){
                    thanks.className        = 'thanks';
                    thanksContent.className = 'thanks__content';
                    thanksClose.className   = 'thanks__close';
                    thanks.append(thanksContent, thanksClose);
                    wrapper.append(thanks);
                    // Закрытие окна оповещения
                    thanksClose.onclick = function() {
                        removeThanks(thanks);
                    };
                }
    
                removeLoader(form);

                if (req.status >= 200 && req.status < 400) {
                    let json = JSON.parse(this.response);
                    // console.log(json);
                  
                    if (json.result == "success") {
                    // Текстовое содержимое для окна оповещения в зависимости от результата
                    thanksContent.innerHTML = messageSuccessful;
                    } 
                    else if (json.result == "limitExceeded") {
                    // Текстовое содержимое для окна оповещения в зависимости от результата
                    thanksContent.innerHTML = limitExceeded;
                    } 
                    else {
                    // Текстовое содержимое для окна оповещения в зависимости от результата
                    thanksContent.innerHTML = messageError;
                    }
                    // Если не удалось связаться с php файлом
                }
                else {
                    alert("Ошибка сервера. Номер: "+req.status);
                }
                
                //   Вывод окна оповещения на страницу
                thanks.classList.add('active');

                // Очистка формы после отправки
                form.reset();
                if(attach){
                    selectedFile.innerHTML = ``;
                }
                
                //   Включаю поля формы после отправки данных
                for (let i = 0; i < form.elements.length; i++) {
                    form.elements[i].disabled = false;
                }
    
                //   Автоудаление окна оповещения
                setTimeout(function() {
                    removeThanks();
                }, 6500);
    
                //   Удаление окна оповещения
                function removeThanks() {
                    thanks.classList.remove('active');
                    thanks.remove();
                    // console.log('Выполнено: removeThanks()');
                    // console.log(`А это thanks: ${thanks}`);
                }
            }; 
    
            // Если не удалось отправить запрос. Стоит блок на хостинге
            req.onerror = function() {alert("Ошибка отправки запроса");};
            req.send(new FormData(event.target));
        }
    }

    // Функции установки, удаления лоадера кнопки формы
    function setupLoader(form){
        let loader            = document.createElement('div');
            loader.className  = 'submit-loader';
            form.querySelector('.loader-container').appendChild(loader);
            // form.appendChild(loader);
    }
    
    function removeLoader(form){
        let loader            = form.querySelector('.submit-loader');
        loader.remove();
    }
// ================================================


    // SLIDERS 
    // Expert-slider
    const expertSlider = new Swiper('.expert__slider', {
        loop: true,
        slidesPerView: 4,
        speed: 300,
        draggable: true,
        // spaceBetween: 20,
        // autoplay: {
        //     delay: 5000,
        // },
        navigation: {
        nextEl: '.swiper-button-next.expert__button.expert__button_next',
        prevEl: '.swiper-button-prev.expert__button.expert__button_prev',
        },
        pagination: {
            el: ".expert__pagination",
            type: "fraction",
          },
        // breakpoints: {
        //     992: {
        //         slidesPerView: "auto",
        //         centeredSlides: true,
        //     }
        // }
    });
// ------------------------------------------------


    // Client-slider
    const clientSlider = new Swiper('.client__slider', {
        loop: true,
        slidesPerView: 6,
        speed: 500,
        draggable: true,
        spaceBetween: 20,
        autoplay: {
            delay: 5000,
        },
        navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        },
        // pagination: {
        //     el: ".swiper-pagination",
        //     type: "fraction",
        //   },
        // breakpoints: {
        //     992: {
        //         slidesPerView: "auto",
        //         centeredSlides: true,
        //     }
        // }
    });
// ------------------------------------------------
    // Advantages-slider
    //Swiper plugin initialization on window resize
    var advSwiper = undefined;
    function initSwiper() {
        // var screenWidth = $(window).width();
        var screenWidth = document.documentElement.clientWidth;
        const advSlideContainer = document.querySelector('.adv__slider-container');
        const advSlides = document.querySelectorAll('.adv-slide');

        // console.log(advSlides);
        if(screenWidth < 576 && advSwiper == undefined) {
            advSwiper = new Swiper('.adv__slider', {
                // direction: 'horizontal',
                loop: true,
                slidesPerView: 1,
                speed: 500,
                spaceBetween: 20,
                // autoplay: {
                //     delay: 5000,
                // },
                navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    480: {
                        slidesPerView: "auto",
                        centeredSlides: true,
                        spaceBetween: 40,
                    },
                }
            });
        } else if (screenWidth >= 576 && advSwiper != undefined) {
            advSwiper.destroy();
            advSwiper = undefined;

            advSlideContainer.removeAttribute('style');
            for(let i = 0; i < advSlides.length; i++) {
                advSlides[i].removeAttribute('style');
            }
        }
    }

    //Swiper plugin initialization
    initSwiper();

    //Swiper plugin initialization on window resize
    // $(window).on('resize', function(){
    //     initSwiper();
    // });
    window.onresize = function(){
        initSwiper();
    };

// ------------------------------------------------
    // Reviews-slider
    const revSlider = new Swiper('.rev__slider ', {
        loop: true,
        slidesPerView: 5,
        speed: 500,
        draggable: true,
        spaceBetween: 20,
        autoplay: {
            delay: 5000,
        },


        navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
          },


        // breakpoints: {
        //     992: {
        //         slidesPerView: "auto",
        //         centeredSlides: true,
        //     }
        // }
    });
// = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// };


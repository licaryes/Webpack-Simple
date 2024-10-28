import { el, setChildren } from 'redom';

export function createDOM() {

// Контейнер для покупки
    const buyContainer = el('div.buy.d-flex.flex-column', [
        el('label', { for: 'email' }, 'Почта: '),
        el('input', { type: 'email', name: 'email', id: 'email' }),
        el('button.btn.btn-dark', { id: 'buy', disabled: true }, 'Оплатить покупку')
    ]);

// Основной контейнер с картой
    const cardContainer = el('div.card-container', [
        el('div.card', { id: 'card-front' }, [
            el('div.card-body.d-flex.flex-column', [
                el('div#bank_container', [
                    el('h6', 'Номер карты'),
                    el('div', { id: 'bank' })
                ]),
                el('input.number', { type: 'text', id: 'number', max: 19, value: '____ ____ ____ ____' }),
                el('div.date.d-flex', [
                    el('div', [
                        el('h6', 'Действует до'),
                        el('div.d-flex.align-items-center', [
                            el('input', { id: 'month' }),
                            el('span.d-block', '/'),
                            el('input', { id: 'year' })
                        ])
                    ]),
                    el('div', { id: 'brand' })
                ])
            ])
        ]),
        el('div.card', { id: 'card-back' }, [
            el('div.card-body.d-flex.align-items-end.justify-content-end', [
                el('div.d-flex.align-items-center.justify-content-end', [
                    el('div', [
                        el('h6.mx-4', 'CVV/CVC')
                    ]),
                    el('input.cvv', { id: 'cvv' })
                ])
            ])
        ])
    ]);

// Основной контейнер страницы
    const mainContainer = el('main.d-flex.flex-column.justify-content-center.p-5.align-items-center', cardContainer);

// Добавляем всё в тело страницы
    setChildren(document.body, [buyContainer, mainContainer]);
}
function filtraJson() {
    let html = ''
    const url = './assets/products.json'
    fetch(url)
        .then(resp => resp.json())
        .then(obj => {
            $(obj).each((i,el) => {
                const img = el.images[0].imageUrl;
                const nome = el.name
                const valor = el.Value.toString().replace('.',',')
                console.log()
                html = html+`<li><img src="${img}" alt="Imagem do produto ${nome}" />
                <div>
                    <span class="nome" title="${nome}">${nome}</span>
                    <span class="preco">R$ ${valor}</span>
                </div></li>` 
            })
        })
        .then( _ => {
            // console.log(html)
            $('[vitrinecontent]').append(html)

        })
}

function menuMobile() {
    $('.header__mobile-bt').click(e => {
        const header = $('.header');
        if (header.attr('menuopen') === '0') {
            header.attr('menuopen','1')
            // console.log(header.attr('menuopen'))
        } else {
            header.attr('menuopen','0');
            // console.log(header.attr('menuopen'))
        }        
    })
}




$(document).ready(() => {
    filtraJson();
    menuMobile();
})

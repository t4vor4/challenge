function filtraJson() {
    let html = ''
    const url = './assets/products.json'
    const lista = [];
    fetch(url)
        .then(resp => resp.json())
        .then(obj => {
            $(obj).each((i,el) => {
                lista.push(el)
                const img = el.images[0].imageUrl;
                const nome = el.name
                const valor = el.Value.toString().replace('.',',')
            
                html = html+`<li id="${i}" value="${el.Value}" price="R$ ${valor}" title="${nome}"><img src="${img}" alt="Imagem do produto ${nome}" />
                <div>
                    <span class="nome">${nome}</span>
                    <span class="preco">R$ ${valor}</span>
                </div></li>` 
            })
        })
        .then( _ => {
            $('[vitrinecontent]').append(html);
        })
        .then(addAoCarrinho)
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


function addAoCarrinho() {
    
    const cart = []

    const montaCarrinho = (arr) => {
        let html = ''
        $(arr).each((i,el) => {
            html = html + `<li class="listcart" id="${el.id}">
            <img src="${el.img}"/>
            <span class="nome">${el.nome}</span>
            <span class="qtd">1 <small>itens</small></span>
            <span class="preco">R$ ${el.price}</span>
            </li>`;
        })

        return html        
    }

    const avisoCarrinho = _ => {
        $('.smallcall').addClass('show')
        setTimeout( _ => $('.smallcall').removeClass('show'), 2000);
    }

    const montaValorAtual = (arr) => {
        const values = arr.map((e) => parseFloat(e.value))
        const soma = (ac,cu) => (ac*1)+(cu*1)
        const total = values.reduce(soma,'').toFixed(2).replace('.',',')
        return total        
    }

    

    $('.vitrine_content li').each((i,el) => {
        $(el).click((e) => {
            const obj  = {
                img: $(el).find('img').attr('src'),
                id: $(el).attr('id'),
                nome: $(el).attr('title'),
                price: $(el).attr('price'),
                value: $(el).attr('value')
            }
            cart.push(obj)
            
            const neoCart = montaCarrinho(cart);

            $('.cart__valor').text(`R$ ${montaValorAtual(cart)}`)         
            $('.cartitens').html(`<ul>${neoCart}</ul>`);
            avisoCarrinho();

        })
    })
}



$(document).ready(() => {
    filtraJson();
    menuMobile();
})

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

export const generateRandom = () =>  (Math.random() + 1).toString(36).substring(7);

export const toSlug = string => string.toString().toLowerCase().trim().replace(/\s+/g,'-').replace(/[áàäâã]/g,'a').replace(/[éèëê]/g,'e').replace(/[íìîï]/g,'i').replace(/[óòöôõ]/g,'o').replace(/[úùüû]/g,'u').replace(/ñ/g,'n').replace(/ç/g,'c').replace(/[^\a-z0-9\-]+/g, '' ).replace(/\-\-+/g,'-');

export const fetch_get = async url => {
    const feth = await fetch (url, {'method': 'GET',"headers": {}})
    return await feth.json();
}

export const addLocalStorage = (product) => {
    const last_prods = localStorage.getItem("cart");
    if (last_prods != null) {
        let json_prod = JSON.parse(last_prods);
        let inArray = false;
        for (const jp of json_prod) {
            if (product.id == jp.id) {
                inArray = true;
                const newCount = parseInt(jp.count) + parseInt(product.count);
                if (newCount > product.count_total) {
                    return false;
                } else {
                    jp.count = newCount;
                }
            }
        }
        !inArray ? json_prod.push(product) : '';
        localStorage.setItem("cart", JSON.stringify(json_prod));
    } else {
        localStorage.setItem("cart", JSON.stringify([product]));
    }
    return true;
}

export const addMessage = (message, success) => {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }    
    success ? toastr.success(message) : toastr.error(message);
}
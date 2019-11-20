document.getElementById('inner').style.height = '100rem';

let images_per_page = 30
let page = 1
let block = '';

function run(page) {
    fetch('https://api.unsplash.com/photos?&page=' + page + '&per_page=' + images_per_page + '&order_by=latest&client_id=cf49c08b444ff4cb9e4d126b7e9f7513ba1ee58de7906e4360afc1a33d1bf4c0')
    .then((response) => response.json())
    .then((responseJson) => {
        block = '';
        document.getElementById('inner').style.height = 'auto';
        for(i = 0; i < responseJson.length; i++) {
            block += '<div class="block" onclick="full_image(\'' + responseJson[i].urls.full + '\')">' +
            '<img class="images" src= ' + responseJson[i].urls.small +'></img>' +
            '</div>';

            document.getElementById('inner').innerHTML = block;
            document.getElementById('page').innerHTML = '<button onclick="return next_page(' + page + ')">Следующая страница</button>' +
            '<div> ' + page + '</div>' +
            '<button onclick="return prev_page(' + page + ')">Предыдущая страница</button>';
        }
        
    })
    .catch((error) => {
    console.error(error);
    });
}

function next_page(this_page) {
return run(this_page + 1);
}

function prev_page(this_page) {
this_page <= 0 ? this_page = 1 : this_page = this_page
return run(this_page - 1);
}

function full_image(src) {
if (document.getElementById('full_photo') != null) {
    document.getElementById('full_photo').remove();
}
let block = document.createElement('div');
block.id = 'full_photo'
block.style.cssText  = 
    'position: fixed' +
    'width: 90%;' +
    'right: 5%;' +
    'top: 5%;' +
    'left: 5%;' +
    'bottom: 5%;' +
    'position: fixed;' +
    'background-color: #333;' +
    'border-radius: 5px;' +
    'height: 90%;';
block.innerHTML = '<div class="head_fullPhoto"> Full Page Photo </div>' +
 '<div class="body_fullPhoto"><img src="' + src + '"></div>' +
 '<button onclick="document.getElementById(\'full_photo\').remove()">Закрыть</button>';
document.body.appendChild(block)
console.log(src)
}

run(page);
// onclick="return next_page()"

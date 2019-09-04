const static = require('koa-static');

module.exports = function (router, options) {
    //options不存在的时候
    options = options || {};
    //当options中没有给image这个属性时，就默认为30，如果给了image属性，则使用image属性值
    options.image = options.image || 30;
    options.html = options.html || 1;
    options.script = options.script || 1;
    options.styles = options.styles || 30;
    options.others = options.others || 7;


    router.all(/((\.jpg)|(\.png)|(\.gif))$/i, static('./static', {
        maxage: options.image * 86400 * 1000
    }));

    router.all(/((\.js)|(\.jsx))$/i, static('./static', {
        maxage: options.script * 86400 * 1000
    }));

    router.all(/(\.css)$/i, static('./static', {
        maxage: options.styles * 86400 * 1000
    }));

    router.all(/((\.html)|(\.htm))$/i, static('./static', {
        maxage: options.html * 86400 * 1000
    }));

    router.all('*', static('./static', {
        maxage: options.others * 86400 * 1000
    }));
};

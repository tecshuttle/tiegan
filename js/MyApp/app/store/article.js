Ext.define('MyApp.store.Article', {
    extend: 'Ext.data.ArrayStore',
    alias: 'store.article',
    model: 'MyApp.model.Article',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/users.json',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
}, function (cls) {
    var data = cls.prototype.config.data;

    for (var i = 0; i < data.length; i++) {
        data[i].push('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. ');
    }
});

Ext.ns('Tomtalk.gallery');

Ext.define('Tomtalk.gallery.GridUI', {extend: 'Ext.Panel',
    constructor: function (config) {
        var me = this;
        config = Ext.apply({
            title: '图库',
            bodyStyle: 'padding:10px;',
            layout: 'anchor'
        }, config);

        me.COMPONENTS = {};

        Tomtalk.gallery.GridUI.superclass.constructor.call(me, config);
    },

    initComponent: function () {
        var me = this;

        me.items = [
            me._grid()
        ];

        Tomtalk.gallery.GridUI.superclass.initComponent.call(me);
    },

    _grid: function () {
        ImageModel = Ext.define('ImageModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'name'},
                {name: 'url'},
                {name: 'download'},
                {name: 'size', type: 'float'},
                {name: 'lastmod', type: 'date', dateFormat: 'timestamp'}
            ]
        });

        var store = Ext.create('Ext.data.Store', {
            model: 'ImageModel',
            proxy: {
                type: 'ajax',
                url: '/gallery/getList',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });
        //store.load();

        var grid = Ext.create('Ext.view.View', {
            store: store,
            id: 'images-view',
            tpl: [
                '<tpl for=".">',
                '<div class="thumb-wrap" id="{name:stripTags}">',
                '<div class="thumb"><img width=100 src="/uploads/{download}" title="{name:htmlEncode}"></div>',
                '<span class="x-editable">{shortName:htmlEncode}</span>',
                '</div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
            multiSelect: true,
            autoScroll: true,
            //height: 310,
            trackOver: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: 'No images to display',
            prepareData: function (data) {
                Ext.apply(data, {
                    shortName: Ext.util.Format.ellipsis(data.name, 18),
                    sizeString: Ext.util.Format.fileSize(data.size),
                    dateString: Ext.util.Format.date(data.lastmod, "m/d/Y g:i a")
                });
                return data;
            }
        });

        this.COMPONENTS.grid = grid;

        return grid;
    }
});

Ext.define('Tomtalk.gallery.GridAction', {extend: 'Tomtalk.gallery.GridUI',
    constructor: function (config) {
        Tomtalk.gallery.GridAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Tomtalk.gallery.GridAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            saveBtn: Ext.getCmp(this.id + '_save'),
            returnBtn: Ext.getCmp(this.id + '_return'),
            grid: Ext.getCmp('images-view')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Tomtalk.gallery.GridAction.superclass.initEvents.call(me);

        $c.grid.on('select', me._select, me);
        //$c.returnBtn.on('click', me._return, me);
    },

    //取图库的store
    getStore: function () {
        return this.COMPONENTS.grid.getStore();
    },


    _select: function (grid, rec, opt) {
        this.up().up()._edit(rec);
    }

});

Tomtalk.gallery.Grid = Tomtalk.gallery.GridAction;

//end file
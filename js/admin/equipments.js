Ext.define('MyApp.overrides.grid.column.Action', {
    override: 'Ext.grid.column.Action',

    // overridden to implement
    defaultRenderer: function (v, meta, record, rowIdx, colIdx, store, view) {
        var me = this,
            prefix = Ext.baseCSSPrefix,
            scope = me.origScope || me,
            items = me.items,
            len = items.length,
            i = 0,
            item, ret, disabled, tooltip, glyph, glyphParts, glyphFontFamily;

        // Allow a configured renderer to create initial value (And set the other values in the "metadata" argument!)
        // Assign a new variable here, since if we modify "v" it will also modify the arguments collection, meaning
        // we will pass an incorrect value to getClass/getTip
        ret = Ext.isFunction(me.origRenderer) ? me.origRenderer.apply(scope, arguments) || '' : '';

        meta.tdCls += ' ' + Ext.baseCSSPrefix + 'action-col-cell';
        for (; i < len; i++) {
            item = items[i];

            disabled = item.disabled || (item.isDisabled ? item.isDisabled.call(item.scope || scope, view, rowIdx, colIdx, item, record) : false);
            tooltip = disabled ? null : (item.tooltip || (item.getTip ? item.getTip.apply(item.scope || scope, arguments) : null));
            glyph = item.glyph;

            // Only process the item action setup once.
            if (!item.hasActionConfiguration) {

                // Apply our documented default to all items
                item.stopSelection = me.stopSelection;
                item.disable = Ext.Function.bind(me.disableAction, me, [i], 0);
                item.enable = Ext.Function.bind(me.enableAction, me, [i], 0);
                item.hasActionConfiguration = true;
            }

            if (glyph) {
                if (typeof glyph === 'string') {
                    glyphParts = glyph.split('@');
                    glyph = glyphParts[0];
                    glyphFontFamily = glyphParts[1];
                } else {
                    glyphFontFamily = Ext._glyphFontFamily;
                }

                /*
                 ret += '<span role="button" title="' + (item.altText || me.altText) + '" class="' + prefix + 'action-col-icon ' + prefix + 'action-col-glyph ' + prefix + 'action-col-' + String(i) + ' ' + (disabled ? prefix + 'item-disabled' : ' ') +
                 ' ' + (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope || scope, arguments) : (item.iconCls || me.iconCls || '')) + '"' +
                 ' style="font-family:' + glyphFontFamily + '"' +
                 (tooltip ? ' data-qtip="' + tooltip + '"' : '') + '>&#' + glyph + ';</span>';
                 */

                ret += '<span role="button" title="' + (item.altText || me.altText) + '" class="' + prefix + 'action-col-icon ' + prefix + 'action-col-glyph ' + prefix + 'action-col-' + String(i) + ' ' + (disabled ? prefix + 'item-disabled' : ' ') +
                    ' ' + (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope || scope, arguments) : (item.iconCls || me.iconCls || '')) + '"' +
                    (tooltip ? ' data-qtip="' + tooltip + '"' : '') + '>' + glyph + '</span>';
            } else {
                ret += '<img role="button" alt="' + (item.altText || me.altText) + '" src="' + (item.icon || Ext.BLANK_IMAGE_URL) +
                    '" class="' + prefix + 'action-col-icon ' + prefix + 'action-col-' + String(i) + ' ' + (disabled ? prefix + 'item-disabled' : ' ') +
                    ' ' + (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope || scope, arguments) : (item.iconCls || me.iconCls || '')) + '"' +
                    (tooltip ? ' data-qtip="' + tooltip + '"' : '') + ' />';
            }
        }
        return ret;
    }
});


Ext.ns('Color.admin');

var tag_store = Ext.create('Ext.data.Store', {
    fields: ['id', 'name'],
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/equipments/getTagList',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        }
    }
});


/*  START 器材编辑表单  */
Ext.define('Color.admin.EditFormUI', {extend: 'Ext.form.Panel',
    title: '器材编辑',
    bodyStyle: 'padding:10px;',
    layout: 'anchor',
    COMPONENTS: {},
    initComponent: function () {
        var me = this;

        me.items = [
            {
                xtype: 'hiddenfield',
                name: 'id',
                value: 0
            },
            {
                xtype: 'textfield',
                fieldLabel: '产品名称',
                allowBlank: false,
                anchor: '50%',
                name: 'name',
                emptyText: '请输入…'
            },
            {
                xtype: 'textfield',
                fieldLabel: '封面图',
                anchor: '50%',
                name: 'cover',
                emptyText: '示例: /uploads/14201863264972.jpg'
            },
            {
                xtype: 'textfield',
                fieldLabel: '价格',
                anchor: '50%',
                name: 'price',
                emptyText: '请输入…'
            },
            {
                xtype: 'textfield',
                fieldLabel: '行程天数',
                anchor: '50%',
                name: 'travel_long',
                emptyText: '示例: 7天5晚'
            },
            {
                xtype: 'textfield',
                fieldLabel: '出发日期',
                anchor: '50%',
                name: 'travel_begin',
                emptyText: '格式: 2015-12-30'
            },
            {
                xtype: 'textfield',
                fieldLabel: '行程概览',
                anchor: '50%',
                name: 'brief',
                emptyText: '示例: 中国——巴黎——巴黎（购物）'
            },
            {
                xtype: 'textfield',
                fieldLabel: '相关产品',
                anchor: '50%',
                name: 'relative',
                emptyText: '填写产品尖,示例: 23, 453, 21'
            },
            {
                xtype: 'combo',
                fieldLabel: '分类',
                store: tag_store,
                anchor: '50%',
                name: 'tag_id',
                displayField: 'name',
                valueField: 'id',
                typeAhead: true
            },
            {
                xtype: 'textarea',
                fieldLabel: '价格表',
                anchor: '50%',
                name: 'price_table',
                height: 120,
                emptyText: "数据格式\n土豪2人人均, 土豪1人单价, 小资2人人均, 小资1人单价, 屌丝2人人均, 屌丝1人单价" +
                    "\n5999, 7699, 3999, 4999, 2899, 3599" +
                    "\n3999, 5699, 2599, 3599, 1999, 2699" +
                    "\n3699, 5399, 2399, 3399, 1699, 2399"
            },
            {
                xtype: 'htmleditor',
                anchor: '100%',
                height: 300,
                fieldLabel: '产品简介',
                name: 'desc',
                allowBlank: false,
                emptyText: '请输入…'
            },
            {
                xtype: 'htmleditor',
                anchor: '100%',
                height: 300,
                fieldLabel: '产品详情',
                name: 'content',
                allowBlank: false,
                emptyText: '请输入…'
            }
        ];

        me.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    {
                        text: '保存',
                        width: 100,
                        id: this.id + '_save'
                    },
                    {
                        text: '返回',
                        style: 'margin-left: 50px;',
                        width: 100,
                        id: this.id + '_return'
                    }
                ]
            }
        ];

        Color.admin.EditFormUI.superclass.initComponent.call(me);
    }
});

Ext.define('Color.admin.EditFormAction', {extend: 'Color.admin.EditFormUI',
    constructor: function (config) {
        Color.admin.EditFormAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Color.admin.EditFormAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            saveBtn: Ext.getCmp(this.id + '_save'),
            returnBtn: Ext.getCmp(this.id + '_return')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Color.admin.EditFormAction.superclass.initEvents.call(me);

        $c.saveBtn.on('click', me._save, me);
        $c.returnBtn.on('click', me._return, me);
    },

    _return: function () {
        this.getForm().reset();

        if (this.up().up()) {
            this.up().up()._returnFrom();
        }
    },

    _save: function () {
        var me = this;
        var form = me;

        if (form.isValid()) {
            form.getForm().submit({
                url: '/equipments/save',//后台处理的页面
                waitMsg: '保存数据……',
                submitEmptyText: false,
                success: function (fp, o) {
                    //console.log(res);
                    var result = Ext.decode(o.response.responseText);

                    if (result.success) {
                        me._return();
                    } else {
                        alert('See error info by console.');
                        console.log(result);
                    }
                }
            });
        }
    }
});

Color.admin.EditForm = Color.admin.EditFormAction;

/*  END 器材编辑表单  */


/*  START 器材列表  */

var store = Ext.create('Ext.data.Store', {
    pageSize: 20,
    fields: ['id', 'code', 'name', 'desc', 'relative', 'cover', 'content', 'download', 'is_hot', 'ctime', 'keywords', 'picture_gallery'],
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/equipments/getList',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        }
    }
});

Ext.define('Color.admin.GridUI', {
    extend: 'Ext.grid.GridPanel',
    id: this.id + '_gridList',
    title: '产品列表',
    columnLines: true,

    store: store,
    COMPONENTS: {},
    initComponent: function () {
        var me = this;

        me.columns = [
            {
                header: "ID", dataIndex: 'id', hidden: true
            },
            {
                header: "产品名称", dataIndex: 'name'
            },
            {
                header: "规格数", dataIndex: 'classes'
            },
            {
                header: "总库存数", dataIndex: 'stock',
                renderer: function (v) {
                    return (v == null ? 0 : v);
                }
            },
            {
                header: "活动日期", dataIndex: 'ctime',
                renderer: function (v) {
                    var date = new Date(v * 1000);
                    return moment(date).format('YYYY-MM-DD');
                }
            },
            {
                header: "操作",
                dataIndex: 'id',
                align: 'center',
                width: 130,
                xtype: 'actioncolumn',
                name: 'opertation',
                items: [
                    {
                        glyph: '编辑',
                        handler: function (grid, rowIndex, colIndex) {
                            var record = grid.getStore().getAt(rowIndex);
                            me._edit(record);
                        }
                    },
                    {
                        glyph: '规格',
                        handler: function (grid, rowIndex, colIndex) {
                            var record = grid.getStore().getAt(rowIndex);
                            me._editSize(record);
                        }
                    },
                    {
                        glyph: '删除',
                        handler: function (grid, rowIndex, colIndex) {
                            var record = grid.getStore().getAt(rowIndex);
                            me._delete(record.get('id'));
                        }
                    }
                ]
            }
        ];

        me.dockedItems = [
            {
                xtype: 'toolbar',
                items: [
                    {
                        text: '新增产品',
                        id: this.id + '_add'
                    }
                ]
            }
        ];

        Color.admin.GridUI.superclass.initComponent.call(me);
    },

    bbar: {
        xtype: 'pagingtoolbar',
        store: store,
        displayInfo: true,
        beforePageText: '页',
        afterPageText: '/ {0}',
        displayMsg: "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
        emptyMsg: "没有记录"
    },
    forceFit: true,
    viewConfig: {
        stripeRows: true,
        enableRowBody: true,
        showPreview: true
    }
});


Ext.define('Color.admin.GridAction', {extend: 'Color.admin.GridUI',
    constructor: function (config) {
        Color.admin.GridAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Color.admin.GridAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            addBtn: Ext.getCmp(this.id + '_add')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Color.admin.GridAction.superclass.initEvents.call(me);

        $c.addBtn.on('click', me._showForm, me);
    },

    _showForm: function () {
        var me = this;
        var $c = me.up().up().COMPONENTS;

        $c.grid.hide();
        $c.productForm.show();
    },

    _edit: function (record) {
        var me = this;

        var form = me.up().up().COMPONENTS.productForm.getForm();

        me._showForm();

        //record.raw.ctime = new Date(record.raw.ctime * 1000);
        form.setValues(record.data);
    },

    _editSize: function (record) {
        var me = this;
        me._showSizeGrid(record.id);
    },

    _showSizeForm: function () {
        var me = this;
        var $c = me.up().up().COMPONENTS;

        $c.grid.hide();
        $c.sizeForm.show();
    },

    _showSizeGrid: function (pid) {
        var me = this;
        var $c = me.up().up().COMPONENTS;

        $c.grid.hide();
        $c.sizeGrid.show();

        //加载产品规格
        var proxy = $c.sizeGrid.getStore().getProxy();
        proxy.extraParams['pid'] = pid;

        $c.sizeGrid.getStore().reload();
    },

    _delete: function (id) {
        var me = this;

        Ext.Ajax.request({
            url: '/equipments/delete',
            params: {
                id: id
            },
            success: function (res) {
                var result = Ext.decode(res.responseText);
                me.getStore().reload();
            }
        });
    }

});

Color.admin.Grid = Color.admin.GridAction;

/*  END 器材列表  */


Color.ViewportUI = Ext.extend(Ext.Viewport, {
    style: 'padding:10px;background-color: white;',
    COMPONENTS: {},
    layout: 'fit',
    initComponent: function () {
        var me = this;
        me.items = [
            me._centerPanel()
        ];

        Color.ViewportUI.superclass.initComponent.call(me);
    },

    _centerPanel: function () {
        return  Ext.create('Ext.panel.Panel', {
            autoScroll: true,
            border: false,
            //layout: 'fit',
            items: [
                this._productForm(),
                this._gridList(),
                this._sizeForm(),
                this._sizeGrid()
            ]
        });
    },

    _gridList: function () {
        var grid = Ext.create('Color.admin.Grid');
        this.COMPONENTS.grid = grid;

        return grid;
    },

    _productForm: function () {
        var form = Ext.create('Color.admin.EditForm', {
            hidden: true
        });

        this.COMPONENTS.productForm = form;

        return form;
    },

    _sizeGrid: function () {
        var grid = Ext.create('Color.admin.SizeGrid', {
            hidden: true
        });

        this.COMPONENTS.sizeGrid = grid;

        return grid;
    },

    _sizeForm: function () {
        var form = Ext.create('Color.admin.SizeForm', {
            hidden: true
        });

        this.COMPONENTS.sizeForm = form;

        return form;
    }
});

Color.ViewportAction = Ext.extend(Color.ViewportUI, {
    constructor: function (config) {
        Color.ViewportAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Color.ViewportAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            //addBtn: Ext.getCmp(this.id + '_add'),
            //saveBtn: Ext.getCmp(this.id + '_save'),
            //grid: Ext.getCmp(this.id + '_gridList'),
            //btnProductForm: Ext.getCmp(this.id + '_btn_product_form')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Color.ViewportAction.superclass.initEvents.call(me);

        //$c.addBtn.on('click', me._showProductForm, me);
    },

    _afterrender: function () {
        var $c = this.COMPONENTS;
    },


    _returnGrid: function () {
        var $c = this.COMPONENTS;

        $c.grid.show();
        $c.productForm.hide();
    },

    _returnFrom: function () {
        var $c = this.COMPONENTS;

        $c.productForm.hide();
        $c.grid.show();
        $c.grid.getStore().reload();
    },

    _reset: function () {
        this.COMPONENTS.addForm.getForm().reset();
    }
});

Color.Viewport = Color.ViewportAction;

Ext.onReady(function () {
    new Color.Viewport({
        renderTo: Ext.getBody()
    });
});

//end file
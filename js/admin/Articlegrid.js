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


var articleStore = Ext.create('Ext.data.Store', {
    pageSize: 20,
    fields: ['id', 'name', 'code', 'desc', 'cover', 'content', 'download', 'is_hot', 'tag', 'mtime','ctime', 'keywords', 'picture_gallery'],
    proxy: {
        type: 'ajax',
        url: '/articles/getList',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    },
    autoLoad: true
});

Ext.define('MyApp.view.main.Articlegrid', {
    extend: 'Ext.grid.GridPanel',
    id: 'article_grid',
    title: '文章列表',
    xtype: 'articlegrid',
    requires: [],
    border: false,
    COMPONENTS: {},
    frame: true,
    columnLines: true,
    store: articleStore,
    columns: [
        {
            header: "ID", dataIndex: 'id'
        },
        {
            header: "名称", dataIndex: 'name'

        },
        {
            header: "首页推荐", dataIndex: 'is_hot',
            renderer: function (v, b, rec) {
                if (v == 0) {
                    return 'NO';
                }

                console.log(rec.data.tag);
                if (rec.data.tag == null || rec.data.tag.trim() == '') {
                    return '标签未设';
                }

                return rec.data.tag;
            }
        },
        {
            header: "简介", dataIndex: 'desc'
        },
        {
            header: "SEO Keywords", dataIndex: 'keywords'
        },
        {
            header: "封面图片", dataIndex: 'cover'
        },
        {
            header: "生成时间", dataIndex: 'ctime',
            renderer: function (v) {
                var date = new Date(v * 1000);
                return moment(date).format('YYYY-MM-DD');
            }
        },
        {
            header: "最后编辑时间", dataIndex: 'mtime',
            renderer: function (v) {
                var date = new Date(v * 1000);
                return moment(date).format('YYYY-MM-DD');
            }
        },
        {
            header: "操作",
            dataIndex: 'id',
            xtype: 'actioncolumn',
            name: 'opertation',
            menuDisabled: true,
            sortable: false,
            width: 130,
            items: [
                {
                    glyph: '编辑',
                    handler: function (grid, rowIndex, colIndex) {
                        var record = grid.getStore().getAt(rowIndex);
                        grid.up()._edit(record); //alert("Terminate " + rec.get('title'));
                    }
                },
                {
                    glyph: '删除',
                    handler: function (grid, rowIndex, colIndex) {
                        var record = grid.getStore().getAt(rowIndex);

                        Ext.MessageBox.confirm('操作', '真的要删除文件吗?', function (btn, text) {
                            if (btn === 'yes') {
                                grid.up()._delete(record.get('id'));
                            }
                        }, this);
                    }
                }
            ]
        }
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        store: articleStore,
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
    },
    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;


        Ext.apply(this.COMPONENTS, {
            typeTree: Ext.getCmp('type_tree'),
            panelWest: Ext.getCmp('panel_west'),
            typeInfoForm: Ext.getCmp('type_info_form'),
            articleForm: Ext.getCmp('article_form'),
            grid: Ext.getCmp('article_grid')
        });

        /*
         $c.saveBtn.on('click', me._saveTypeInfo, me);
         $c.addBtn.on('click', me._showArticleForm, me);
         */
    },

    _showArticleForm: function () {
        var $c = this.COMPONENTS;

        $c.grid.hide();
        $c.panelWest.hide();
        $c.typeInfoForm.hide();
        $c.articleForm.show();
    },


    _edit: function (record) {
        var me = this;
        var form = this.COMPONENTS.articleForm.getForm();

        me._showArticleForm();

        record.data.ctime = new Date(record.data.ctime * 1000);
        record.data.content_markdown = record.data.content;
        form.setValues(record.data);

        var $c = this.COMPONENTS;
        var KE = $c.typeInfoForm.KE;

        if (KE) {
            KE.data("kendoEditor").value(record.data.content);
        } else {
            $c.typeInfoForm.KE = $("#kendoeditor-inputEl").kendoEditor(ke_config);
        }
    },

    _delete: function (id) {
        var me = this;

        Ext.Ajax.request({
            url: '/articles/delete',
            params: {
                id: id
            },
            success: function (res) {
                var result = Ext.decode(res.responseText);
                me.COMPONENTS.grid.getStore().reload();
            }
        });
    }

});

//end file
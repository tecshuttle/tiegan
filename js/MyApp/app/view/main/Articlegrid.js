Ext.define('MyApp.view.main.Articlegrid', {
    extend: 'Ext.grid.GridPanel',
    id: 'article_grid',
    title: '文章列表',
    xtype: 'articlegrid',
    requires: [
        'Ext.grid.column.Action'
    ],
    //header: false,
    COMPONENTS: {},
    frame: true,
    columnLines: true,
    store: Ext.create('Ext.data.Store', {
        pageSize: 20,
        fields: ['id', 'name', 'code', 'desc', 'cover', 'content', 'download', 'is_hot', 'ctime', 'keywords', 'picture_gallery'],
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
    }),
    columns: [
        {
            header: "ID", dataIndex: 'id'
        },
        {
            header: "名称", dataIndex: 'name'

        },
        {
            header: "URL短名", dataIndex: 'code'
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
            header: "建立时间", dataIndex: 'ctime',
            renderer: function (v) {
                return v;
                //return new Date(v * 1000).format('yyyy-MM-dd hh:mm:ss');
            }
        },
        {
            header: "操作",
            dataIndex: 'id',
            xtype: 'actioncolumn',
            name: 'opertation',
            menuDisabled: true,
            sortable: false,
            width: 50,
            items: [
                {
                    tooltip: '编辑',
                    icon: '/js/MyApp/ext/classic/theme-crisp-touch/resources/images/shared/icon-info.png',
                    handler: function (grid, rowIndex, colIndex) {
                        var record = grid.getStore().getAt(rowIndex);
                        grid.up()._edit(record); //alert("Terminate " + rec.get('title'));
                    }
                },
                {
                    xtype: 'panel',
                    html: ''
                },
                {
                    icon: '/js/MyApp/ext/classic/theme-crisp-touch/resources/images/shared/icon-error.png',
                    tooltip: '删除',
                    handler: function (grid, rowIndex, colIndex) {
                        var record = grid.getStore().getAt(rowIndex);
                        grid.up()._delete(record.get('id'));
                    }
                }
            ]
        }
    ],
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
    },
    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;


        Ext.apply(this.COMPONENTS, {
            typeTree: Ext.getCmp('type_tree'),
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
        $c.typeInfoForm.hide();
        $c.articleForm.show();
    },


    _edit: function (record) {
        var me = this;
        var form = this.COMPONENTS.articleForm.getForm();

        me._showArticleForm();

        record.data.ctime = new Date(record.data.ctime * 1000);
        form.setValues(record.data);
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
    },

});

//end file
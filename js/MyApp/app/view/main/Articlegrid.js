Ext.define('MyApp.view.main.Articlegrid', {
    extend: 'Ext.grid.GridPanel',
    id: 'article_grid',
    title: '分类信息',
    xtype: 'articlegrid',
    header: false,
    columnLines: true,
    store: Ext.create('Ext.data.Store', {
        pageSize: 20,
        fields: ['id', 'name', 'desc', 'cover', 'content', 'download', 'is_hot', 'ctime', 'keywords', 'picture_gallery'],
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
            header: "简介", dataIndex: 'desc'
        },
        {
            header: "SEO Keywords", dataIndex: 'keywords'
        },
        {
            header: "封面图片", dataIndex: 'cover'
        },
        {
            header: "首页推荐", dataIndex: 'is_hot',
            renderer: function (v) {
                return (v == 1 ? '是' : '不是');

            }
        },
        {
            header: "建立时间", dataIndex: 'ctime',
            renderer: function (v) {
                return v;
                //return new Date(v * 1000).format('yyyy-MM-dd hh:mm:ss');

            }
        },

        {
            header: "下载", dataIndex: 'download'
        },
        {
            header: "操作",
            dataIndex: 'id',
            align: 'left',
            xtype: 'actioncolumn',
            name: 'opertation',
            items: [
                {
                    text: '编辑',
                    handler: function (grid, rowIndex, colIndex) {
                        var record = grid.getStore().getAt(rowIndex);
                        grid.up()._edit(record); //alert("Terminate " + rec.get('title'));
                    }
                },
                {
                    text: '删除',
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

        /*

         Ext.apply(this.COMPONENTS, {
         typeTree: Ext.getCmp('type_tree'),
         typeInfoForm: Ext.getCmp('type_info_form'),
         articleForm: Ext.getCmp('article_form'),
         grid: Ext.getCmp('article_grid'),
         saveBtn: Ext.getCmp('type_info_save'),
         addBtn: Ext.getCmp('add_article_btn')
         });

         $c.saveBtn.on('click', me._saveTypeInfo, me);
         $c.addBtn.on('click', me._showArticleForm, me);
         */
    },

    _edit: function (a) {
        console.log(1);
    },

    _delete: function (a) {
        console.log(2);
    }

});

//end file
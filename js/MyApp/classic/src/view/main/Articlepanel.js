var typeInfoPanel = function () {
    //var me = this;

    var queryPanel = new Ext.form.Panel({
        id: 'type_info_form',
        title: '分类信息',
        bodyStyle: 'padding: 10px;',
        style: 'margin-bottom: 10px;',
        collapsible: true,
        items: [
            {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'table',
                    columns: 2,
                    tableAttrs: {
                        style: {
                            width: '100%'
                        }
                    }
                },
                defaults: {frame: true, margin: '2px'},
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'id',
                        value: 0
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '名称',
                        name: 'name',
                        width: 400,
                        emptyText: ''
                    },
                    {
                        xtype: 'button',
                        id: this.id + '_type_info_save',
                        width: 100,
                        text: '保存'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '封面图',
                        width: 400,
                        name: 'cover',
                        emptyText: ''
                    },
                    {
                        xtype: 'button',
                        id: this.id + '_btn_product_form',
                        width: 100,
                        text: '增加所属'
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: '排序权重',
                        width: 400,
                        colspan: 2,
                        name: 'weight',
                        emptyText: ''
                    },
                    {
                        xtype: 'button',
                        id: this.id + '_btn_gallery_batch_add',
                        width: 100,
                        hidden: true,
                        text: '批量增加图片'
                    },
                    {
                        xtype: 'textarea',
                        colspan: 2,
                        width: 600,
                        fieldLabel: '说明',
                        name: 'desc',
                        emptyText: ''
                    }
                ]
            }
        ]
    });

    return queryPanel;
}

var gridList = function () {

    var store = Ext.create('Ext.data.Store', {
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
    });

    var grid = Ext.create('Ext.grid.GridPanel', {
        id: 'article_grid',
        header: false,
        columnLines: true,
        store: store,
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
                            me._edit(record); //alert("Terminate " + rec.get('title'));
                        }
                    },
                    {
                        text: '删除',
                        handler: function (grid, rowIndex, colIndex) {
                            var record = grid.getStore().getAt(rowIndex);
                            me._delete(record.get('id'));
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
        }
    });

    return grid;
}


var productForm = function () {
    var form = Ext.create('Ext.panel.Panel', {
        module: this.module,
        hidden: true
    });

    //this.COMPONENTS.productForm = form;

    return form;
}


Ext.define('MyApp.view.main.Articlepanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'layout-border-doc',
    requires: [
        'Ext.layout.container.Border',
        'MyApp.view.main.Articletree'
    ],
    layout: 'border',
    width: 900,
    height: 600,

    //bodyBorder: false,

    defaults: {
        collapsible: true,
        split: true,
        bodyPadding: 10
    },

    items: [
        {
            title: '文章分类',
            region: 'west',
            floatable: false,
            margin: '0 0 0 0',
            width: 250,
            minWidth: 250,
            maxWidth: 250,
            layout: 'fit',
            items: [{
                xtype: 'articletree'
            }]
        },
        {
            //title: 'Main Content',
            collapsible: false,
            region: 'center',
            margin: '0 0 0 0',
            items: [
                typeInfoPanel(),
                gridList(),
                productForm()
            ]
        }
    ]
});
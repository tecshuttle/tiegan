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


Ext.define('MyApp.view.main.Articlepanel', {
    extend: 'Ext.panel.Panel',
    id: 'article_panel',
    xtype: 'layout-border-doc',
    requires: [
        'Ext.layout.container.Border',
        'MyApp.view.main.Articletree',
        'MyApp.view.main.Typeinfo',
        'MyApp.view.main.Articleform'
    ],
    layout: 'border',
    width: 1000,
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
                {
                    xtype: 'typeinfo'
                },
                gridList(),
                {
                    xtype: 'articleform'
                }
            ]
        }
    ]
});

//end file
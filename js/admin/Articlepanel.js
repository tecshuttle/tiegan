Ext.define('MyApp.view.main.Articlepanel', {
    extend: 'Ext.panel.Panel',
    id: 'article_panel',

    xtype: 'layout-border-doc',
    requires: [
    ],
    layout: 'border',
    defaults: {
        collapsible: false
    },
    items: [
        {
            title: '文章分类',
            region: 'west',
            padding: '0 0 0 0',
            width: 250,
            id: 'panel_west',
            border: false,
            frame: true,
            layout: 'fit',
            items: [
                {
                    xtype: 'articletree'
                }
            ]
        },
        {
            region: 'center',
            style: 'background-color: white;',
            padding: '0 0 0 10',
            scrollable: 'y',
            border: false,
            items: [
                {
                    xtype: 'typeinfo'
                },
                {
                    xtype: 'articleform'
                },
                {
                    xtype: 'articlegrid'
                }
            ]
        }
    ]
});

//end file
Ext.define('MyApp.view.main.Articlepanel', {
    extend: 'Ext.panel.Panel',
    id: 'article_panel',
    xtype: 'layout-border-doc',
    requires: [
        'Ext.layout.container.Border',
        'MyApp.view.main.Articletree',
        'MyApp.view.main.Typeinfo',
        'MyApp.view.main.Articleform',
        'MyApp.view.main.Articlegrid'
    ],
    layout: 'border',

    defaults: {
        collapsible: false,
        bodyPadding: '0 0 0 10'
    },
    items: [{
        title: '文章分类',
        region: 'west',
        margin: '0 0 0 0',
        width: 250,
        frame: true,
        layout: 'fit',
        items: [{
            xtype: 'articletree'
        }]
    }, {
        region: 'center',
        margin: '0 0 0 0',
        scrollable: 'y',
        items: [{
            xtype: 'typeinfo'
        }, {
            xtype: 'articleform'
        }, {
            xtype: 'articlegrid'
        }]
    }]
});

//end file
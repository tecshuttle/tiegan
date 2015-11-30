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
    //layout: 'border',
    layout: 'fit',

    //width: 1000,
    //height: 600,

    //bodyBorder: false,

    defaults: {
        collapsible: true,
        split: true,
        bodyPadding: 10
    },

    items: [
        {
            xtype: 'container',
            layout: 'column',
            items: [
                {
                    title: '文章分类',
                    //region: 'west',
                    //columnWidth: 0.3,
                    floatable: false,
                    margin: '0 0 0 0',
                    width: 250,
                    frame: true,
                    minWidth: 250,
                    maxWidth: 250,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'articletree'
                        }
                    ]
                },
                {
                    //title: 'Main Content',
                    collapsible: false,
                    //region: 'center',
                    columnWidth: 1,
                    margin: '0 0 0 10',
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
        }
    ]
});

//end file
/**
 * This view is an example list of people.
 */
Ext.define('MyApp.view.main.Articlelist', {
    extend: 'Ext.grid.Panel',
    requires: [
        //'Ext.grid.column.Action'
        //'MyApp.store.Article',
        //'MyApp.model.Article'
    ],
    xtype: 'articlelist',
    //store: {type: 'article'},
    stateful: true,
    collapsible: true,
    multiSelect: true,
    stateId: 'stateGrid',
    //height: 350,
    title: 'Array Grid',
    headerBorders: false,
    viewConfig: {
        enableTextSelection: true
    },

    initComponent: function () {
        var me = this;

        //me.width = 750;
        me.columns = [
            {
                text: 'Company',
                flex: 1,
                sortable: false,
                dataIndex: 'name'
            },
            {
                text: 'Price',
                width: 95,
                sortable: true,
                formatter: 'usMoney',
                dataIndex: 'price'
            },
            {
                text: 'Change',
                width: 80,
                sortable: true,
                renderer: function (val) {
                    var out = Ext.util.Format.number(val, '0.00');
                    if (val > 0) {
                        return '<span style="color:' + "#73b51e" + ';">' + out + '</span>';
                    } else if (val < 0) {
                        return '<span style="color:' + "#cf4c35" + ';">' + out + '</span>';
                    }
                    return out;
                },
                dataIndex: 'change'
            },
            {
                text: '% Change',
                width: 100,
                sortable: true,
                renderer: function (val) {
                    var out = Ext.util.Format.number(val, '0.00%');
                    if (val > 0) {
                        return '<span style="color:' + "#73b51e" + ';">' + out + '</span>';
                    } else if (val < 0) {
                        return '<span style="color:' + "#cf4c35" + ';">' + out + '</span>';
                    }
                    return out;
                },
                dataIndex: 'pctChange'
            },
            {
                text: 'Last Updated',
                width: 115,
                sortable: true,
                formatter: 'date("m/d/Y")',
                dataIndex: 'lastChange'
            },
            {
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                items: [{
                    iconCls: 'array-grid-sell-col',
                    tooltip: 'Sell stock',
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        Ext.Msg.alert('Sell', 'Sell ' + rec.get('name'));
                    }
                }, {
                    getClass: function (v, meta, rec) {
                        if (rec.get('change') < 0) {
                            return 'array-grid-alert-col';
                        } else {
                            return 'array-grid-buy-col';
                        }
                    },
                    getTip: function (v, meta, rec) {
                        if (rec.get('change') < 0) {
                            return 'Hold stock';
                        } else {
                            return 'Buy stock';
                        }
                    },
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex),
                            action = (rec.get('change') < 0 ? 'Hold' : 'Buy');

                        Ext.Msg.alert(action, action + ' ' + rec.get('name'));
                    }
                }]
            }
        ];

        me.callParent();
    }
});

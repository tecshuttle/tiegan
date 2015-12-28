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
Ext.define('Color.admin.EditFormUI', {
    extend: 'Ext.form.Panel',
    title: '球队编辑',
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
                xtype: 'fieldset',
                title: '基本信息',
                collapsible: true,
                defaults: {
                    anchor: '100%'
                },
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: '产品名称',
                                allowBlank: false,
                                flex: 1,
                                margin: '0 10 0 0',
                                name: 'name',
                                emptyText: '请输入…'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: '价格',
                                anchor: '50%',
                                flex: 1,
                                name: 'price',
                                emptyText: '请输入…'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                flex: 1,
                                margin: '0 10 0 0',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: '封面图',
                                        name: 'cover',
                                        flex: 1,
                                        emptyText: '示例: /uploads/14201863264972.jpg'
                                    },
                                    {
                                        xtype: 'filefield',
                                        buttonOnly: true,
                                        hideLabel: true,
                                        width: 100,
                                        name: 'file_cover',
                                        buttonText: '上传文件'
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                flex: 1,
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: '球队海报1',
                                        name: 'cover1',
                                        flex: 1,
                                        emptyText: '示例: /uploads/14201863264972.jpg'
                                    },
                                    {
                                        xtype: 'filefield',
                                        buttonOnly: true,
                                        hideLabel: true,
                                        width: 100,
                                        name: 'file_cover1',
                                        buttonText: '上传文件'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                flex: 1,
                                margin: '0 10 0 0',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: '球队海报2',
                                        name: 'cover2',
                                        flex: 1,
                                        emptyText: '示例: /uploads/14201863264972.jpg'
                                    },
                                    {
                                        xtype: 'filefield',
                                        buttonOnly: true,
                                        hideLabel: true,
                                        width: 100,
                                        name: 'file_cover2',
                                        buttonText: '上传文件'
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                flex: 1,
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: '球队海报3',
                                        name: 'cover3',
                                        flex: 1,
                                        emptyText: '示例: /uploads/14201863264972.jpg'
                                    },
                                    {
                                        xtype: 'filefield',
                                        buttonOnly: true,
                                        hideLabel: true,
                                        width: 100,
                                        name: 'file_cover3',
                                        buttonText: '上传文件'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: '行程天数',
                                flex: 1,
                                margin: '0 10 0 0',
                                name: 'travel_long',
                                emptyText: '示例: 7天5晚'
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: '出发日期',
                                flex: 1,
                                name: 'travel_begin',
                                format: 'Y-m-d',
                                value: new Date(),
                                emptyText: '格式: 2015-12-30'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: '行程概览',
                                flex: 1,
                                name: 'brief',
                                margin: '0 10 0 0',
                                emptyText: '示例: 中国——巴黎——巴黎（购物）'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: '相关主题',
                                store: tag_store,
                                flex: 1,
                                name: 'tag_id',
                                displayField: 'name',
                                valueField: 'id',
                                typeAhead: true
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: '相关产品',
                                flex: 1,
                                margin: '0 10 0 0',
                                name: 'relative',
                                emptyText: '填写产品尖,示例: 23, 453, 21'
                            },
                            {
                                xtype: 'displayfield',
                                flex: 1,
                                value: ''
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '服务列表',
                collapsible: true,
                collapsed: true,
                items: [
                    {
                        xtype: 'textarea',
                        anchor: '100%',
                        height: 430,
                        id: 'service_list',
                        name: 'service_list',
                        emptyText: '请输入…'
                    },
                    {
                        xtype: 'fieldcontainer',
                        combineErrors: true,
                        msgTarget: 'under',
                        layout: 'hbox',
                        defaults: {
                            hideLabel: true,
                            width: 60,
                            margin: '0 10 0 0'
                        },
                        items: [
                            {xtype: 'displayfield', value: '土豪', margin: '0 0 0 260'},
                            {xtype: 'displayfield', value: '小资', margin: '0 120 0 120'},
                            {xtype: 'displayfield', value: '屌丝'}
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: '价格表',
                        combineErrors: true,
                        msgTarget: 'under',
                        layout: 'hbox',
                        defaults: {
                            hideLabel: true,
                            width: 80,
                            margin: '0 10 0 0'
                        },
                        items: [
                            {xtype: 'displayfield', value: 'S级赛事', margin: '0 2 0 0'},
                            {xtype: 'textfield', name: 'prices1', emptyText: '2人价'},
                            {xtype: 'textfield', name: 'prices2', emptyText: '1人价'},
                            {xtype: 'textfield', name: 'prices3', emptyText: '2人价'},
                            {xtype: 'textfield', name: 'prices4', emptyText: '1人价'},
                            {xtype: 'textfield', name: 'prices5', emptyText: '2人价'},
                            {xtype: 'textfield', name: 'prices6', emptyText: '1人价'}
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        combineErrors: true,
                        msgTarget: 'under',
                        layout: 'hbox',
                        defaults: {
                            hideLabel: true,
                            width: 80,
                            margin: '0 10 0 0'
                        },
                        items: [
                            {xtype: 'displayfield', value: 'A级赛事', margin: '0 2 0 105'},
                            {xtype: 'textfield', name: 'pricea1', emptyText: '2人价'},
                            {xtype: 'textfield', name: 'pricea2', emptyText: '1人价'},
                            {xtype: 'textfield', name: 'pricea3', emptyText: '2人价'},
                            {xtype: 'textfield', name: 'pricea4', emptyText: '1人价'},
                            {xtype: 'textfield', name: 'pricea5', emptyText: '2人价'},
                            {xtype: 'textfield', name: 'pricea6', emptyText: '1人价'}
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        combineErrors: true,
                        msgTarget: 'under',
                        layout: 'hbox',
                        defaults: {
                            hideLabel: true,
                            width: 80,
                            margin: '0 10 0 0'
                        },
                        items: [
                            {xtype: 'displayfield', value: 'B级赛事', margin: '0 2 0 105'},
                            {xtype: 'textfield', name: 'priceb1', emptyText: '2人价'},
                            {xtype: 'textfield', name: 'priceb2', emptyText: '1人价'},
                            {xtype: 'textfield', name: 'priceb3', emptyText: '2人价'},
                            {xtype: 'textfield', name: 'priceb4', emptyText: '1人价'},
                            {xtype: 'textfield', name: 'priceb5', emptyText: '2人价'},
                            {xtype: 'textfield', name: 'priceb6', emptyText: '1人价'}
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '赛程图',
                collapsible: true,
                collapsed: true,
                items: [
                    {
                        xtype: 'textarea',
                        anchor: '100%',
                        height: 430,
                        id: 'schedule',
                        name: 'schedule',
                        emptyText: '请输入…'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '球票位置介绍',
                collapsible: true,
                collapsed: true,
                items: [
                    {
                        xtype: 'textarea',
                        anchor: '100%',
                        height: 130,
                        name: 'seat_position',
                        id: 'seat_position',
                        emptyText: '请输入…'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '座位等级示图',
                        anchor: '100%',
                        name: 'seat0',
                        emptyText: '示例: /uploads/14201863264972.jpg'
                    },
                    {
                        xtype: 'textarea',
                        fieldLabel: '座位等级说明',
                        anchor: '100%',
                        name: 'seat_desc'
                    },
                    {
                        xtype: 'fieldcontainer',
                        combineErrors: true,
                        msgTarget: 'under',
                        fieldLabel: '土豪级座位视野',
                        layout: 'hbox',
                        defaults: {
                            hideLabel: true,
                            flex: 1,
                            margin: '0 10 0 0'
                        },
                        items: [
                            {xtype: 'textfield', name: 'seat1', emptyText: '示例: /uploads/14201863264972.jpg'},
                            {xtype: 'textfield', name: 'seat2', emptyText: '示例: /uploads/14201863264972.jpg'},
                            {xtype: 'textfield', name: 'seat3', emptyText: '示例: /uploads/14201863264972.jpg', margin: '0 0 0 0'}
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        combineErrors: true,
                        msgTarget: 'under',
                        fieldLabel: '小资级座位视野',
                        layout: 'hbox',
                        defaults: {
                            hideLabel: true,
                            flex: 1,
                            margin: '0 10 0 0'
                        },
                        items: [
                            {xtype: 'textfield', name: 'seat4', emptyText: '示例: /uploads/14201863264972.jpg'},
                            {xtype: 'textfield', name: 'seat5', emptyText: '示例: /uploads/14201863264972.jpg'},
                            {xtype: 'textfield', name: 'seat6', emptyText: '示例: /uploads/14201863264972.jpg', margin: '0 0 0 0'}
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        combineErrors: true,
                        msgTarget: 'under',
                        fieldLabel: '屌丝级座位视野',
                        layout: 'hbox',
                        defaults: {
                            hideLabel: true,
                            flex: 1,
                            margin: '0 10 0 0'
                        },
                        items: [
                            {xtype: 'textfield', name: 'seat7', emptyText: '示例: /uploads/14201863264972.jpg'},
                            {xtype: 'textfield', name: 'seat8', emptyText: '示例: /uploads/14201863264972.jpg'},
                            {xtype: 'textfield', name: 'seat9', emptyText: '示例: /uploads/14201863264972.jpg', margin: '0 0 0 0'}
                        ]
                    }

                ]
            },
            {
                xtype: 'fieldset',
                title: '住宿介绍',
                collapsible: true,
                collapsed: true,
                items: [
                    {
                        xtype: 'textarea',
                        anchor: '100%',
                        height: 430,
                        name: 'hotel_condition',
                        id: 'hotel_condition',
                        emptyText: '请输入…'
                    },
                    {
                        xtype: 'fieldcontainer',
                        combineErrors: true,
                        msgTarget: 'under',
                        fieldLabel: '屌丝酒店图',
                        layout: 'hbox',
                        defaults: {
                            hideLabel: true,
                            flex: 1,
                            margin: '0 10 0 0'
                        },
                        items: [
                            {xtype: 'textfield', name: 'hotel1', emptyText: '示例: /uploads/14201863264972.jpg'},
                            {xtype: 'textfield', name: 'hotel2', emptyText: '示例: /uploads/14201863264972.jpg'},
                            {xtype: 'textfield', name: 'hotel3', emptyText: '示例: /uploads/14201863264972.jpg', margin: '0 0 0 0'}
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        combineErrors: true,
                        msgTarget: 'under',
                        fieldLabel: '小资酒店图',
                        layout: 'hbox',
                        defaults: {
                            hideLabel: true,
                            flex: 1,
                            margin: '0 10 0 0'
                        },
                        items: [
                            {xtype: 'textfield', name: 'hotel4', emptyText: '示例: /uploads/14201863264972.jpg'},
                            {xtype: 'textfield', name: 'hotel5', emptyText: '示例: /uploads/14201863264972.jpg'},
                            {xtype: 'textfield', name: 'hotel6', emptyText: '示例: /uploads/14201863264972.jpg', margin: '0 0 0 0'}
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        combineErrors: true,
                        msgTarget: 'under',
                        fieldLabel: '土豪酒店图',
                        layout: 'hbox',
                        defaults: {
                            hideLabel: true,
                            flex: 1,
                            margin: '0 10 0 0'
                        },
                        items: [
                            {xtype: 'textfield', name: 'hotel7', emptyText: '示例: /uploads/14201863264972.jpg'},
                            {xtype: 'textfield', name: 'hotel8', emptyText: '示例: /uploads/14201863264972.jpg'},
                            {xtype: 'textfield', name: 'hotel9', emptyText: '示例: /uploads/14201863264972.jpg', margin: '0 0 0 0'}
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '推荐行程',
                collapsible: true,
                collapsed: true,
                items: [
                    {
                        xtype: 'textarea',
                        anchor: '100%',
                        height: 430,
                        name: 'trip_recommend',
                        id: 'trip_recommend',
                        emptyText: '请输入…'
                    }
                ]
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

Ext.define('Color.admin.EditFormAction', {
    extend: 'Color.admin.EditFormUI',
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

//end file
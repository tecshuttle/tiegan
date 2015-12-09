Ext.define('MyApp.view.main.Articleform', {
    extend: 'Ext.form.Panel',
    id: 'article_form',
    title: '文章编辑',
    hidden: true,
    xtype: 'articleform',
    frame: true,
    bodyStyle: 'padding: 10px;',
    style: 'margin-bottom: 10px;',
    collapsible: true,
    constructor: function (config) {
        var me = this;
        config = Ext.apply({}, config);
        me.COMPONENTS = {};

        MyApp.view.main.Articleform.superclass.constructor.call(me, config);
    },
    initComponent: function () {
        var me = this;

        this.items = [
            {
                xtype: 'hiddenfield',
                name: 'id',
                value: 0
            },
            {
                xtype: 'hiddenfield',
                name: 'type_id',
                value: 0
            },
            {
                xtype: 'textfield',
                fieldLabel: '标题',
                allowBlank: false,
                anchor: '50%',
                name: 'name',
                emptyText: '请输入…'
            },{
                xtype: 'textfield',
                fieldLabel: 'URL短名',
                allowBlank: false,
                anchor: '50%',
                name: 'code',
                emptyText: '请输入…'
            },
            {
                xtype: 'container',
                anchor: '50%',
                layout: {
                    type: 'hbox',
                    padding: '0 0 5px 0'
                },
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: '封面图',
                        name: 'cover',
                        flex: 4,
                        emptyText: '直接输入图片URL或上传文件(尺寸107*107)，文件类型：gif | jpg | png'
                    },
                    {
                        xtype: 'filefield',
                        id: 'product_cover',
                        buttonOnly: true,
                        hideLabel: true,
                        style: 'margin-left: 5px;',
                        flex: 1,
                        name: 'product_cover',
                        buttonText: '上传文件'
                    }
                ]
            },
            {
                xtype: 'textfield',
                fieldLabel: 'SEO Keywords',
                anchor: '50%',
                name: 'keywords',
                emptyText: '请输入…'
            },
            {
                xtype: 'textarea',
                fieldLabel: '简介',
                anchor: '50%',
                name: 'desc',
                emptyText: '请输入…'
            },
            {
                xtype: 'htmleditor',
                anchor: '100%',
                height: 200,
                fieldLabel: '内容',
                name: 'content',
                allowBlank: false,
                emptyText: '请输入…'
            },
            {
                xtype: 'button',
                text: '保存',
                id: this.id + '_save',
                width: 100
            },
            {
                xtype: 'button',
                text: '返回',
                id: this.id + '_return',
                style: 'margin-left: 50px;',
                width: 100
            }
        ];

        MyApp.view.main.Articleform.superclass.initComponent.call(me);
    },
    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Ext.apply(this.COMPONENTS, {
            typeInfoForm: Ext.getCmp('type_info_form'),
            grid: Ext.getCmp('article_grid'),
            saveBtn: Ext.getCmp(this.id + '_save'),
            returnBtn: Ext.getCmp(this.id + '_return')
        });

        $c.saveBtn.on('click', me._save, me);
        $c.returnBtn.on('click', me._return, me);
    },

    _return: function () {
        this.getForm().reset();
        this.hide();

        var $c = this.COMPONENTS;

        $c.typeInfoForm.show();
        $c.grid.show();
        $c.grid.getStore().reload();
    },

    _save: function () {
        var me = this;
        var form = me;
        var $c = this.COMPONENTS;

        var type_id = $c.typeInfoForm.getValues().id;

        //从父组件取分类信息，没有则默认分类为0
        if (type_id === 0) {
            Ext.Msg.alert('error', '请选择' + (me.module == 'products' ? '产品' : '文章'), +'分类');
            return false;
        }

        me.down('hidden[name=type_id]').setValue(type_id);

        if (form.isValid()) {
            form.getForm().submit({
                url: '/articles/save',//后台处理的页面
                waitMsg: 'hard work to saving ...',
                submitEmptyText: false,
                success: function (fp, o) {
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
    },

    _getValue: function () {
        var me = this;
        var $c = this.COMPONENTS;
        var addForm = me.getForm();
        if (!addForm.isValid()) {
            return false;
        }

        return addForm.getValues();
    }
});


//end file
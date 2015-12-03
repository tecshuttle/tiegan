Ext.ns('Tomtalk');

Tomtalk.IdcUI = Ext.extend(Ext.Viewport, {
    constructor: function (config) {
        var me = this;
        config = Ext.apply({
            border: false,
            style: 'padding:10px;background-color: white;',
            layout: 'border'
        }, config);

        me.COMPONENTS = {};

        me.lang = {
            products: '产品',
            articles: '文章',
            gallery: '图片'
        };

        Tomtalk.IdcUI.superclass.constructor.call(me, config);
    },

    initComponent: function () {
        var me = this;
        me.items = [
            me._typeTree(),
            me._centerPanel()
        ];

        Tomtalk.IdcUI.superclass.initComponent.call(me);
    },

    _typeTree: function () {
        var me = this;

        var tree = Ext.create('Tomtalk.typeTree', {
            module: this.module
        });

        var panel = new Ext.form.Panel({
            region: 'west',
            layout: 'fit',
            border: false,
            style: 'margin-right: 10px;',
            items: tree
        });

        me.COMPONENTS.typeTree = tree;

        return panel;
    },

    _centerPanel: function () {
        var me = this;
        var items = '';

        if (me.module == 'gallery') {
            items = [
                //this._typeInfoPanel(),
                this._galleryGrid(),
                this._galleryBatch()
            ];
        } else {
            items = [
                //this._typeInfoPanel(),
                this._gridList(),
                this._productForm()
            ];
        }

        var center = Ext.create('Ext.panel.Panel', {
            region: 'center',
            autoScroll: true,
            border: false,
            items: items
        });

        return center;
    },

    _typeInfoPanel: function () {
        var me = this;

        var queryPanel = new Ext.form.Panel({
            id: this.id + '_type_info_form',
            title: me.lang[me.module] + '分类信息',
            hidden: true,
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
                            text: '增加所属' + me.lang[me.module]
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: '排序权重',
                            colspan: 2,
                            width: 400,
                            name: 'weight',
                            emptyText: ''
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
    },

    _gridList: function () {
        var me = this;

        var store = Ext.create('Ext.data.Store', {
            pageSize: 20,
            fields: ['id', 'name', 'desc', 'cover', 'content', 'download', 'is_hot', 'ctime', 'keywords', 'picture_gallery'],
            proxy: {
                type: 'ajax',
                url: '/' + me.module + '/getList',
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'total'
                }
            }
        });

        var grid = Ext.create('Ext.grid.GridPanel', {
            id: this.id + '_gridList',
            title: me.lang[me.module],
            //header: false,
            hidden: true,
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
                        return new Date(v * 1000).format('yyyy-MM-dd hh:mm:ss');

                    }
                },

                {
                    header: "下载", dataIndex: 'download'
                },
                {
                    header: "操作",
                    dataIndex: 'id',
                    align: 'left',
                    xtype: 'linkcolumn',
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
    },

    _galleryGrid: function () {
        var grid = Ext.create('Tomtalk.gallery.Grid', {
            module: this.module,
            hidden: true,
            id: this.id + '_gridList'
        });

        return grid;
    },

    _productForm: function () {
        var form = Ext.create('Tomtalk.product.EditForm', {
            module: this.module,
            hidden: true
        });

        this.COMPONENTS.productForm = form;

        return form;
    },

    _galleryForm: function () {
        var form = Ext.create('Tomtalk.gallery.EditForm', {
            module: this.module,
            hidden: true
        });

        this.COMPONENTS.productForm = form;

        return  form;
    },

    _galleryBatch: function () {
        var batch = Ext.create('Tomtalk.gallery.Batch', {
            module: this.module,
            hidden: true
        });

        this.COMPONENTS.galleryBatch = batch;

        return  batch;
    }
});

Tomtalk.IdcAction = Ext.extend(Tomtalk.IdcUI, {
    constructor: function (config) {
        Tomtalk.IdcAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Tomtalk.IdcAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            typeInfoForm: Ext.getCmp(this.id + '_type_info_form'),
            grid: Ext.getCmp(this.id + '_gridList'),

            typeInfoSaveBtn: Ext.getCmp(this.id + '_type_info_save'),
            btnProductForm: Ext.getCmp(this.id + '_btn_product_form')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Tomtalk.IdcAction.superclass.initEvents.call(me);

        //$c.btnProductForm.on('click', me._showEditForm, me);
        //$c.typeInfoSaveBtn.on('click', me._saveTypeInfo, me);
    },


    _isSelectedType: function () {
        var form = this.COMPONENTS.typeTree.COMPONENTS.form;
        var values = form.getForm().getValues();

        if (values.id == 0) {
            Ext.Msg.alert('提示', '请先选择一个分类!');
            return false;
        } else {
            return true;
        }
    },

    _showEditForm: function () {
        var me = this;

        if (me.module == 'gallery') {
            me._showGalleryBatchPanel();
        } else {
            me._showProductForm();
        }
    },

    _showProductForm: function () {
        var me = this;


        if (!me._isSelectedType()) {
            return false;
        }

        var $c = this.COMPONENTS;

        $c.grid.hide();
        //$c.typeInfoForm.hide();
        $c.productForm.show();
    },

    _showGalleryBatchPanel: function () {
        var me = this;

        if (!me._isSelectedType()) {
            return false;
        }

        var form = this.COMPONENTS.typeTree.COMPONENTS.form;
        var values = form.getForm().getValues();

        var $c = this.COMPONENTS;

        $c.grid.hide();
        //$c.typeInfoForm.hide();
        $c.galleryBatch.show();

        $('#fileupload').fileupload({
            dataType: 'json',
            add: function (e, data) {
                data.submit();
            },
            done: function (e, data) {
                $.each(data.result.files, function (index, file) {
                    $('<p/>').text(file.name).appendTo($('#uploads_msg'));
                });

                me.doLayout();
            },
            formData: [
                {
                    name: 'type_id',
                    value: values.id
                }
            ],
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('#progress .bar').css('width', progress + '%');
            }
        });
    },

    _returnGrid: function () {
        var $c = this.COMPONENTS;

        $c.grid.show();
        //$c.typeInfoForm.show();

        if ($c.productForm) {
            $c.productForm.hide();
        }

        if ($c.galleryBatch) {
            $c.galleryBatch.hide();
        }
    },

    _returnFrom: function () {
        var $c = this.COMPONENTS;

        if ($c.productForm) {
            $c.productForm.hide();
        }

        $c.grid.show();
        $c.grid.getStore().reload();
        //$c.typeInfoForm.show();

    },

    _edit: function (record) {
        var me = this;
        var form = this.COMPONENTS.productForm.getForm();

        me._showProductForm();

        record.raw.ctime = new Date(record.raw.ctime * 1000);
        form.setValues(record.raw);
    },

    _delete: function (id) {
        var me = this;

        Ext.Ajax.request({
            url: '/' + me.module + '/delete',
            params: {
                id: id
            },
            success: function (res) {
                var result = Ext.decode(res.responseText);
                me.COMPONENTS.grid.getStore().reload();
            }
        });
    }
});

Tomtalk.Idc = Tomtalk.IdcAction;

//end file
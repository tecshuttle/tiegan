var store = Ext.create('Ext.data.TreeStore', {
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/admin/articles_tree'
    }
});

Ext.define('MyApp.view.main.Articletree', {
    extend: 'Ext.tree.Panel',
    xtype: 'articletree',
    requires: [],
    id: 'type_tree',
    rootVisible: false,
    useArrows: true,
    store: store,
    COMPONENTS: {},
    tbar: [
        {
            text: '添加同级',
            name: 'sibling',
            id: 'type_tree_add_sibling_type'
        },
        {
            text: '添加下级',
            name: 'children',
            id: 'type_tree_add_children_type'
        },
        {
            text: '删除',
            name: 'delete',
            id: 'type_tree_delete_type'
        }
    ],
    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Ext.apply(this.COMPONENTS, {
            typeTree: Ext.getCmp('type_tree'),
            typeInfoForm: Ext.getCmp('type_info_form'),
            grid: Ext.getCmp('article_grid'),
            addSiblingType: Ext.getCmp('type_tree_add_sibling_type'),
            addChildrenType: Ext.getCmp('type_tree_add_children_type'),
            deleteType: Ext.getCmp('type_tree_delete_type'),
        });

        me.on('itemclick', me._treeItemClick, me);
        $c.addSiblingType.on('click', me._addType, me);
        $c.addChildrenType.on('click', me._addType, me);
        $c.deleteType.on('click', me._deleteType, me);
    },

    _treeItemClick: function (tree, record, item, index, e, eOpts) {
        var me = this;

        //me._returnGrid();

        //加载分类信息
        Ext.Ajax.request({
            url: '/admin/getTypeInfo',
            params: {
                id: record.raw.id
            },
            success: function (res) {
                var result = Ext.decode(res.responseText);
                me._setValueTypeInfo(result);
            }
        });


        //加载产品列表
        var store = me.COMPONENTS.grid.getStore();
        var proxy = store.getProxy();
        Ext.apply(proxy.extraParams, {
            type_id: record.raw.id
        });

        store.reload();
    },

    _showProductForm: function () {
        console.log('ok');
    },

    _deleteType: function (btn) {
        var me = this;
        var culTypeID = this.COMPONENTS.typeInfoForm.getForm().getValues().id;

        //加载分类信息
        Ext.Ajax.request({
            url: '/admin/deleteType',
            params: {
                id: culTypeID
            },
            success: function (res) {
                var result = Ext.decode(res.responseText);
                me.COMPONENTS.typeTree.getStore().reload();
            }
        });
    },

    _addType: function (btn) {
        var me = this;
        var type = btn.name;
        var culTypeID = this.COMPONENTS.typeInfoForm.getForm().getValues().id;

        if (culTypeID == 0) {
            Ext.Msg.alert('提示', '请先选择一个分类!');
            return false;
        }

        var name = prompt("新分类名：", "");
        name = name.trim();

        if (name == '') {
            Ext.Msg.alert('提示', '分类名不能为空!');
            return false;
        }


        //加载分类信息
        Ext.Ajax.request({
            url: '/admin/addType',
            params: {
                module: 'articles',
                type: type,
                name: name,
                id: culTypeID
            },
            success: function (res) {
                var result = Ext.decode(res.responseText);
                me.COMPONENTS.typeTree.getStore().reload();
            }
        });
    },

    _setValueTypeInfo: function (values) {
        var $c = this.COMPONENTS;
        $c.typeInfoForm.getForm().setValues(values);
    }

});


/*
 Ext.define('MyApp.view.main.ArticletreeAction',  {
 extend: 'MyApp.view.main.ArticletreeUI',

 constructor: function (config) {
 MyApp.view.main.ArticletreeAction.superclass.constructor.call(this, config);
 },

 initComponent: function () {
 MyApp.view.main.ArticletreeAction.superclass.initComponent.call(this);

 Ext.apply(this.COMPONENTS, {
 typeTree: Ext.getCmp(this.id + '_type_tree'),
 addSiblingType: Ext.getCmp(this.id + '_add_sibling_type'),
 addChildrenType: Ext.getCmp(this.id + '_add_children_type'),
 deleteType: Ext.getCmp(this.id + '_delete_type'),

 addBtn: Ext.getCmp(this.id + '_add'),
 saveBtn: Ext.getCmp(this.id + '_save'),
 grid: Ext.getCmp(this.id + '_gridList'),
 typeInfoForm: Ext.getCmp(this.id + '_type_info_form'),
 typeInfoSaveBtn: Ext.getCmp(this.id + '_type_info_save'),
 btnProductForm: Ext.getCmp(this.id + '_btn_product_form'),
 btnGalleryBatchAdd: Ext.getCmp(this.id + '_btn_gallery_batch_add'),

 query: Ext.getCmp(this.id + '_btn_query'),
 reset: Ext.getCmp(this.id + '_btn_reset')
 });
 },

 initEvents: function () {
 var me = this;
 var $c = this.COMPONENTS;

 Tomtalk.IdcAction.superclass.initEvents.call(me);

 $c.typeTree.on('itemclick', me._treeItemClick, me);
 $c.addSiblingType.on('click', me._addType, me);
 $c.addChildrenType.on('click', me._addType, me);
 $c.deleteType.on('click', me._deleteType, me);

 $c.btnProductForm.on('click', me._showProductForm, me);
 $c.btnGalleryBatchAdd.on('click', me._showGalleryBatchPanel, me);
 $c.typeInfoSaveBtn.on('click', me._saveTypeInfo, me);
 },

 _afterrender: function () {
 var $c = this.COMPONENTS;
 },





 _treeItemClick: function (tree, record, item, index, e, eOpts) {
 var me = this;

 me._returnGrid();

 //加载分类信息
 Ext.Ajax.request({
 url: '/admin/getTypeInfo',
 params: {
 id: record.raw.id
 },
 success: function (res) {
 var result = Ext.decode(res.responseText);
 me._setValueTypeInfo(result);
 }
 });

 //加载产品列表
 var store = me.COMPONENTS.grid.getStore();
 var proxy = store.getProxy();
 Ext.apply(proxy.extraParams, {
 type_id: record.raw.id
 });

 store.reload();
 },



 _isSelectedType: function () {
 var form = this.COMPONENTS.typeInfoForm;
 var values = form.getForm().getValues();

 if (values.id == 0) {
 Ext.Msg.alert('提示', '请先选择一个分类!');
 return false;
 } else {
 return true;
 }
 },

 _saveTypeInfo: function () {
 var me = this;

 if (!me._isSelectedType()) {
 return false;
 }

 var form = this.COMPONENTS.typeInfoForm;
 var values = form.getForm().getValues();

 form.disable();

 Ext.Ajax.request({
 url: '/admin/saveTypeInfo',
 params: values,
 success: function (res) {
 form.enable();
 me.COMPONENTS.typeTree.getStore().reload();
 }
 });
 },

 _showProductForm: function () {
 var me = this;

 if (!me._isSelectedType()) {
 return false;
 }

 var $c = this.COMPONENTS;

 $c.grid.hide();
 $c.typeInfoForm.hide();
 $c.productForm.show();
 },

 _showGalleryBatchPanel: function () {
 var me = this;

 if (!me._isSelectedType()) {
 return false;
 }

 var form = this.COMPONENTS.typeInfoForm;
 var values = form.getForm().getValues();

 var $c = this.COMPONENTS;

 $c.grid.hide();
 $c.typeInfoForm.hide();
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

 __showAddForm: function () {
 var $c = this.COMPONENTS;

 $c.addBtn.hide();
 $c.grid.hide();
 $c.typeInfoForm.hide();

 $c.addForm.show();
 },

 _returnGrid: function () {
 var $c = this.COMPONENTS;

 $c.grid.show();
 $c.typeInfoForm.show();
 $c.productForm.hide();
 if ($c.galleryBatch) {
 $c.galleryBatch.hide();
 }
 },

 _returnFrom: function () {
 var $c = this.COMPONENTS;


 $c.productForm.hide();

 $c.grid.show();
 $c.grid.getStore().reload();
 $c.typeInfoForm.show();

 },

 _query: function () {
 var params = {
 id: this.COMPONENTS.id.getValue(),
 name: this.COMPONENTS.name.getValue()
 };

 var store = this.COMPONENTS.grid.getStore();
 var proxy = store.getProxy();

 Ext.apply(proxy.extraParams, params);

 store.load();
 },

 _reset: function () {
 this.COMPONENTS.addForm.getForm().reset();
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
 },

 _clone: function (id) {
 var me = this;

 Ext.Ajax.request({
 url: '/' + me.module + '/clone_from_id',
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

 MyApp.view.main.Articletree = MyApp.view.main.ArticletreeAction;

 */
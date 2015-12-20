Ext.define('MyApp.view.main.Typeinfo', {
    extend: 'Ext.form.Panel',
    id: 'type_info_form',
    title: '分类信息',
    xtype: 'typeinfo',
    bodyStyle: 'padding: 10px;',
    style: 'margin-bottom: 10px;',
    collapsible: true,
    frame: true,
    KE: false,
    COMPONENTS: {},
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
                    id: 'type_info_save',
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
                    id: 'add_article_btn',
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
    ],
    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Ext.apply(this.COMPONENTS, {
            panelWest: Ext.getCmp('panel_west'),
            typeTree: Ext.getCmp('type_tree'),
            typeInfoForm: Ext.getCmp('type_info_form'),
            articleForm: Ext.getCmp('article_form'),
            grid: Ext.getCmp('article_grid'),
            saveBtn: Ext.getCmp('type_info_save'),
            addBtn: Ext.getCmp('add_article_btn')
        });

        $c.saveBtn.on('click', me._saveTypeInfo, me);
        $c.addBtn.on('click', me._showArticleForm, me);
    },

    _saveTypeInfo: function () {
        var me = this;

        //if (!me._isSelectedType()) {
        //    return false;
        //}

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
    _showArticleForm: function () {
        var me = this;

        //if (!me._isSelectedType()) {
        //    return false;
        //}

        var $c = this.COMPONENTS;

        $c.panelWest.hide();
        $c.grid.hide();
        $c.typeInfoForm.hide();
        $c.articleForm.show();

        var KE = $c.typeInfoForm.KE;

        if (KE) {
            KE.data("kendoEditor").value('');
        } else {
            $c.typeInfoForm.KE = $("#kendoeditor-inputEl").kendoEditor({
                value: '',
                resizable: {
                    content: true
                    //toolbar: true
                },
                encoded: false,
                tools: [
                    "bold", "italic", "underline", "strikethrough", "justifyLeft", "justifyCenter", "justifyRight",
                    "justifyFull", "insertUnorderedList", "insertOrderedList", "indent", "outdent", "createLink",
                    "unlink", "insertImage", "subscript", "superscript", "createTable", "addRowAbove", "addRowBelow",
                    "addColumnLeft", "addColumnRight", "deleteRow", "deleteColumn", "viewHtml", "formatting",
                    "cleanFormatting", "fontSize", "foreColor", "backColor", "print",
                    {
                        name: "fontName",
                        items: [
                            { text: "Times New Roman", value: "Times New Roman" },
                            { text: "Arial", value: "Arial" },
                            { text: "Arial Bold Italic", value: "Arial Bold Italic" },
                            { text: "Arial Black", value: "Arial Black" },
                            { text: "Arial Narrow", value: "Arial Narrow" },
                            { text: "宋体", value: "SimSun" },
                            { text: "黑体", value: "SimHei" },
                            { text: "微软雅黑", value: "Microsoft YaHei" },
                            { text: "微软正黑体", value: "Microsoft JhengHei" },
                            { text: "新宋体", value: "NSimSun" },
                            { text: "新细明体", value: "PMingLiU" },
                            { text: "细明体", value: "MingLiU" },
                            { text: "标楷体", value: "DFKai-SB" },
                            { text: "仿宋", value: "FangSong" },
                            { text: "楷体", value: "KaiTi" },
                            { text: "仿宋_GB2312", value: "FangSong_GB2312" },
                            { text: "楷体_GB2312", value: "KaiTi_GB2312" }

                        ]
                    }
                ],
                imageBrowser: {
                    messages: {
                        dropFilesHere: "Drop files here"
                    },
                    transport: {
                        read: "/editor.php?type=1",
                        destroy: {
                            url: "/editor.php?type=2",
                            type: "POST"
                        },
                        create: {
                            url: "/editor.php?type=3",
                            type: "POST"
                        },
                        thumbnailUrl: "/ImageBrowser/Thumbnail",
                        uploadUrl: "editor.php?type=4",
                        imageUrl: "/ImageBrowser/Image/{0}"
                    }
                }
            });
        }

    }

});

//end file
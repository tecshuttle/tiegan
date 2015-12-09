Ext.ns('Ext.ijobs.index');
Ext.Loader.setPath('Ext.ux', './js/extjs4/ux');
/**
 * 不显示控制台提示信息
 */
/*Ext.Compat.ignoreInfo = true;
 Ext.Compat.showErrors = true;
 Ext.Compat.silent = true;*/
Ext.define('Ext.ijobs.index.TreeMenu', {
    extend: 'Ext.Panel',
    constructor: function (config) {
        config = Ext.apply({
            region: 'west',
//            split:true,
            header: false,
            width: 208,
            layout: 'fit',
            border: false,
            //minSize: 170,
            maxSize: 500,
            collapsible: true,
            autoScroll: true,
            animCollapse: false,
            animate: false,
            style: 'padding: 6px 14px;background-color: #f6f6f6;',
            bodyStyle: 'background-color: #f6f6f6;',
            id: 'leftmenu_div',
            collapseMode: 'mini',
            cls: 'left-wrapper'
        }, config);
        Ext.ijobs.index.TreeMenu.superclass.constructor.call(this, config);
    },
    initComponent: function () {
        Ext.ijobs.index.TreeMenu.superclass.initComponent.call(this);

    },
    onRender: function (ct, position) {
        Ext.ijobs.index.TreeMenu.superclass.onRender.call(this, ct, position);
        this._createTreeView();
    },

    _createTreeView: function () {
        var tpl = new Ext.XTemplate(
                //'<div class="left-wrapper">主导航</div>',
                '<dl class="leftnav">',
                '<dl class="x-item">',
                '<tpl for=".">',
                '<dt class="active"><span class="ico_desk"></span>{menu}</dt>',
                '<tpl for="subMenu">',
                '<dd class="x-item"><span class="nav_arrow"></span><a id="{id}" href="javascript:void(0);" to="{url}" tabTitle="{menu}">{menu}</a></dd>',
                '</tpl>',
                '</tpl>',
                '</dl>',
                '</dl>'
            ),
            updateIndexes = function (startIndex, endIndex) {
                var ns = this.all.elements,
                    records = this.store.getRange(),
                    i, j;

                startIndex = startIndex || 0;
                endIndex = endIndex || ((endIndex === 0) ? 0 : (ns.length - 1));
                for (i = startIndex, j = startIndex - 1; i <= endIndex; i++) {
                    if (Ext.fly(ns[i]).is('dl')) {
                        j++;
                    }

                    ns[i].viewIndex = i;

                    ns[i].viewRecordId = records[j].internalId;
                    if (!ns[i].boundView) {
                        ns[i].boundView = this.id;
                    }
                }
            };

        var store = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'memory'
            },
            fields: ['menu', 'subMenu', 'url', 'id']
        });
        var view = Ext.create('Ext.view.View', {
            store: store,
            tpl: tpl,
            itemSelector: '.x-item',
            listeners: {
                itemclick: function () {
                    //console.log(arguments);
                }
            },
            listeners: this.dvListeners,
            renderTo: this.body,
            updateIndexes: updateIndexes
        });
        this.dataView = view;
    },
    loadMenuData: function (menuData) {
        var view = this.dataView,
            store = view.getStore();
        store.loadData(menuData);

    }
});
Ext.define('Ext.ijobs.index.MainPanel', {
    extend: 'Ext.Panel',
    constructor: function (config) {
        config = Ext.apply({
            region: 'center',
            border: false,
            layout: 'border',
            cls: 'right-wrapper'
        }, config);
        Ext.ijobs.index.MainPanel.superclass.constructor.call(this, config);
    },
    requires: ['Ext.ux.IFrame'],
    initComponent: function () {
        //this.COMPONENT.masPanel = new Ext.ijobs.index.MessagePanel();
        this.items = [
            this._createTabPanel()
            //this.COMPONENT.masPanel    //隐藏底部消息栏，不显示
        ];
        Ext.ijobs.index.MainPanel.superclass.initComponent.call(this);

        Ext.apply(
            this.COMPONENT, {
                contentTab: Ext.getCmp('contentTab'),
                msgDialogIds: []
            });
    },
    COMPONENT: {},
    _createTabPanel: function () {
        var tab = Ext.create('Ext.tab.Panel', {
            id: 'contentTab',
            region: 'center',
            style: 'background-color:#f6faff;',
            bodyStyle: 'border: none;',
            resizeTabs: true,
            minTabWidth: 115,     //最小tab宽度
            maxTabWidth: 260,
            tabBar: {
                height: 48,
                padding: '16 12 0 12',  //tabbar左右间距
                defaults: {
                    margin: '0 3',
                    height: 32
                }
            },
            plain: true,
            border: false,
            plugins: new Ext.ux.TabCloseMenu({
                closeTabText: '关闭标签页（Ctrl+`）',
                closeOthersTabsText: '关闭其它标签页',
                closeAllTabsText: '关闭所有标签页'
            }),
            enableTabScroll: true,

            initEvents: function () {
                this.on('tabchange', this._tabchange, this);
                this.on('remove', this._remove, this);
            },

            _tabchange: function () {
                this.el.dom.style.backgroundColor = '#fcfcfc';
                Ext.query('.x-tab-bar-strip-default-top')[0].style.display = '';
            },

            _remove: function () {
                if (this.items.length === 0) {
                    this.el.dom.style.backgroundColor = 'white';
                    Ext.query('.x-tab-bar-strip-default-top')[0].style.display = 'none';
                }
            },

            createNewTab: function () {
                var id = "tab-" + arguments[1];
                var tab = this.getComponent(arguments[1]) || this.getComponent(id);
                var p = null,
                    visitLog = function (moduleName, moduleURL) {
                        var modules = [
                            {
                                key: /^编辑作业/,
                                getName: function () {
                                    return '编辑作业';
                                }
                            },
                            {
                                key: /(^作业[\s\S]*主页$|^查看模版)/,
                                getName: function () {
                                    return '作业模版主页';
                                }
                            },
                            {
                                key: /^查看实例/,
                                getName: function () {
                                    return '查看作业实例';
                                }
                            },
                            {
                                key: /^执行作业/,
                                getName: function () {
                                    return '执行作业';
                                }
                            },
                            {
                                key: /^账户/,
                                getName: function () {
                                    return '编辑执行账户';
                                }
                            },
                            {
                                key: /^新建执行态/,
                                getName: function () {
                                    return '新建执行态';
                                }
                            },
                            {
                                key: /^编辑执行态/,
                                getName: function () {
                                    return '编辑执行态';
                                }
                            },
                            {
                                key: /^脚本【.*】主页$/,
                                getName: function () {
                                    return '查看脚本';
                                }
                            },
                            {
                                key: /^查看脚本/,
                                getName: function () {
                                    return '查看脚本';
                                }
                            },
                            {
                                key: /^编辑脚本/,
                                getName: function () {
                                    return '编辑脚本';
                                }
                            },
                            {
                                key: /^查看.*CC脚本$/,
                                getName: function () {
                                    return '查看CC脚本';
                                }
                            },
                            {
                                key: /^编辑.*CC脚本$/,
                                getName: function () {
                                    return '编辑CC脚本';
                                }
                            },
                            {
                                key: /^开发商集/,
                                getName: function () {
                                    return '编辑开发商集';
                                }
                            },
                            {
                                key: /^脚本【.*】主页$/,
                                getName: function () {
                                    return '作业脚本主页';
                                }
                            },
                            {
                                key: /^调试【.*】脚本主页$/,
                                getName: function () {
                                    return '调试脚本主页';
                                }
                            },
                            {
                                key: /^灰度授权脚本【.*】$/,
                                getName: function () {
                                    return '灰度授权脚本';
                                }
                            },
                            {
                                key: /^同步【.*】脚本主页$/,
                                getName: function () {
                                    return '同步作业脚本';
                                }
                            },
                            {
                                key: /^标准脚本【.*】主页$/,
                                getName: function () {
                                    return '标准作业脚本主页';
                                }
                            }
                        ];
                        Ext.each(modules, function (module) {
                            if (module.key.test(moduleName)) {
                                moduleName = module.getName();
                                return false;
                            }
                        });
                        moduleURL = /[\s\S]action\?|[\s\S]jsp\?/.test(moduleURL) ? moduleURL.substring(0, moduleURL.indexOf('?')) : moduleURL;
                        Ext.Ajax.request({
                            url: './admin/userClickLog.action',
                            params: {
                                label: moduleName,
                                link: moduleURL,
                                department: department,
                                user: uploadUserName
                            },
                            success: function (response, opts) {

                            }
                        });
                    };
                if (tab) {
                    this.setActiveTab(tab);
                    return;
                }
                if (typeof(arguments[0]) === 'object') {
                    p = this.add(
                        new Ext.Panel({
                            id: id,
                            title: arguments[2],
                            tabTip: arguments[2],
                            closable: true,
                            border: false,
                            layout: 'fit',
                            items: arguments[0]
                        })
                    );
                } else {
                    var href = arguments[0];

                    p = this.add(Ext.create('Ext.ux.IFrame', {
                        id: id,
                        title: arguments[2],
                        border: false,
                        src: href,
                        tooltip: arguments[2],
                        width: this.getWidth() == 0 ? (document.body.clientWidth - 208) : 'auto',
                        height: this.getHeight() == 0 ? (document.body.clientHeight - 201) : 'auto',
                        closable: true,
                        afterRender: function (comp) {
                            this.getEl().mask('加载中……', 'x-mask-loading');
                            this.on('load', function (tab) {
                                tab.iframeEl.unmask();
                            });
                        },
                        setTitle: function (title, iconCls) {
                            this.title = title;
                            if (this.header && this.headerAsText) {
                                this.header.child('span').update(title);
                            }
                            if (iconCls) {
                                this.setIconClass(iconCls);
                            }
                            this.fireEvent('titlechange', this, title);
                            return this;
                        }
                    }));
                    //visitLog(arguments[2],arguments[0]);屏蔽点击统计
                }
                this.setActiveTab(p);

            }
        });
        return tab;
    },
    createNewTab: function (url, id, title) {
        var tab = this.COMPONENT.contentTab;
        tab.createNewTab(url, id, title);
    },
    clearMsg: function () {
        Ext.getDom("msgDiv").innerHTML = "";
    },
    insertMsg: function (msg, type) {
        var myDate = new Date(),
            msgPanel = this.COMPONENT.masPanel,
            msgDiv = Ext.getDom("msgDiv"),
            msgID = Ext.id(),
            msgTmp = '<span id="{0}" class="{1} x-text-nowrap">[{2}]：&nbsp;{3}</span>';

        if (msgPanel.isCollapse) {
            var me = this,
                body = Ext.getBody(),
                msgDialogIds = me.COMPONENT.msgDialogIds;

            var dialog_msg = Ext.String.format(msgTmp, 'dialog_' + msgID, (2 === type ? "ch_message_error" : "ch_message_ok"), Ext.Date.format(myDate, 'Y年m月d日 H:i:s'), msg);
            if (msgDialogIds.length >= 4) {//最大消息数量
                var tmpId = msgDialogIds.shift(),
                    tmpItem = Ext.get(tmpId);

                if (tmpItem != null) {
                    tmpItem.remove();
                }
            }

            var newItem = new Ext.Component({
                autoEl: {
                    tag: 'div',
                    style: 'padding:10px 0; text-align: right;z-index: 1;position:absolute'
                },
                renderTo: body,
                html: dialog_msg
            });

            newItemId = newItem.getId();
            newItemEl = newItem.getEl();

            x = body.getWidth() - newItem.getWidth() - 20;
            y = body.getHeight() - newItem.getHeight() - 10;

            newItem.setPosition(x, y);
            //循环设置旧消息的位置
            if (msgDialogIds.length > 0) {
                Ext.each(msgDialogIds, function (id) {
                    var cmp = Ext.getCmp(id);
                    if (!Ext.isDefined(cmp)) {
                        return;
                    }
                    var tmpEl = cmp.getEl();
                    var x2 = tmpEl.getX();
                    var y2 = tmpEl.getY() - tmpEl.getHeight();
                    tmpEl.moveTo(x2, y2);
                });
            }

            newItemEl.setOpacity(0.0, {
                duration: 3.0,//3秒内消失
                easing: 'easeIn',
                callback: function (item) {
                    Ext.removeNode(item.dom);
                    Ext.each(me.COMPONENT.msgDialogIds, function (id, index) {
                        if (id === item.id) {
                            me.COMPONENT.msgDialogIds.remove(index);
                        }
                    });
                }
            });

            msgDialogIds.push(newItemId);
            me.COMPONENT.msgDialogIds = msgDialogIds;

        }
        msg = Ext.String.format(msgTmp, msgID, (2 === type ? "ch_message_error" : "ch_message_ok"), Ext.Date.format(myDate, 'Y年m月d日 H:i:s'), msg);
        msgDiv.innerHTML = "<div style='padding:10px 0; text-align: left;'>" + msg + "</div>" + msgDiv.innerHTML;
        Ext.ijobs.common.Kit.shake(Ext.get(msgID), 'ch_message_shake', 5);
    }
});

Ext.define('Ext.ijobs.index.MessagePanel', {
    extend: 'Ext.Panel',
    constructor: function (config) {
        config = Ext.apply({
            stateId: 'ijobs-viewport-msgPanel',
            region: "south",
            margins: "1px 1px 0px 1px",
            border: false,
            header: false,
            split: true,
            collapsed: false,
            collapsible: true, //false,
            collapseFirst: false,
            enableTabScroll: true,
            animCollapse: false,
            animate: false,
            collapseMode: "mini",
            closable: true,
            height: 60,
            layout: 'border',
            isCollapse: false
        }, config);
        Ext.ijobs.index.MessagePanel.superclass.constructor.call(this, config);
    },
    initComponent: function () {
        this.items = [
            this._createTipPanel(),
            this._createHelpPanel()
        ];

        Ext.ijobs.index.MessagePanel.superclass.initComponent.call(this);
    },

    initEvents: function () {
        Ext.ijobs.index.MessagePanel.superclass.initEvents.call(this);

        this.on('collapse', this._collapse, this);
        this.on('expand', this._expand, this);
    },

    _collapse: function (p, eOpts) {
        this.isCollapse = true;
    },

    _expand: function (p, eOpts) {
        this.isCollapse = false;
    },

    _createTipPanel: function () {
        var panel = new Ext.Panel({
            height: 45,
            border: false,
            region: "center",
            xtype: 'panel',
            autoScroll: true,
            html: "<div id='msgDiv' style='float:left'></div><div style='float:right'><input type='button' style='width:80px;'  onclick='Frame.cleanInfos()' value='清空'/></div>"
        });
        return panel;
    },
    _createHelpPanel: function () {

        var panel = new Ext.Panel({
            stateId: 'ijobs-viewport-helpPanel',
            region: "south",
            split: true,
            collapsible: true,
            header: false,
            collapseMode: "mini",
            border: false,
            animCollapse: false,
            height: 15,
            boxMaxHeight: 15,
            boxMinHeight: 15,
            items: [
                {
                    id: 'help',
                    xtype: 'container',
                    listeners: {
                        afterrender: function (p) {
                            p.getEl().dom.innerHTML = '';
                            var store = new Ext.data.JsonStore({
                                root: '',
                                //autoLoad : true,
                                fields: [
                                    {name: 'title', mapping: 'Post.title'},
                                    {name: 'url', mapping: 'Post.url'},
                                    {name: 'category', mapping: 'Post.category'}
                                ],
                                /*proxy: {
                                 type: 'jsonp',
                                 url: 'http://km.oa.com/api/group/16028/articles?limit=9999'//跑马灯数据地址
                                 },*/
                                listeners: {
                                    load: function (ds, records, opts) {
                                        if (records.length !== 0) {
                                            new Marquee().run(records, 50);
                                        }
                                    }
                                }
                            });

                            var Marquee = function () {
                                var dh = Ext.DomHelper;
                                var ul = dh.append('help', {tag: 'ul'});
                                var tpl = dh.createTemplate({
                                    tag: 'li',
                                    html: '<a href="{href}" onclick="{click}">{text}</a>'
                                });
                                var id = '';            //计时器ID
                                var el = null;          //ul标记
                                var left = 0;           //列表的left
                                var aniLeft = left;     //记录当前运动时的left
                                var width = 0;          //列表的宽度


                                //初始化跑马灯数据
                                var init = function (list) {

                                    for (var i = 0, len = list.length; i < len; i++) {
                                        var topic = list[i].data;
                                        if (topic.category === 'ijobs使用说明' && /^【iJobs】/.test(topic.title)) {
                                            tpl.append(ul, {
                                                href: 'javascript:void(0)',
                                                click: 'window.open(\'' + topic.url + '\')',
                                                text: topic.title
                                            });
                                        }
                                    }
                                    el = Ext.select('ul', false, p.getEl().dom).first();
                                    left = el.getLeft();         //列表的left
                                    aniLeft = left;             //记录当前运动时的left
                                    width = p.getWidth();       //列表的宽度

                                };
                                //鼠标悬停
                                var hover = function (id, speed) {
                                    el.on('mouseover', function () {
                                        clearInterval(id);
                                    });
                                    el.on('mouseleave', function () {
                                        id = setInterval(marquee, speed);
                                    });
                                };
                                //跑马灯效果
                                var marquee = function () {
                                    var li = Ext.select('li', false, p.getEl().dom);
                                    var fw = li.first().getWidth();
                                    aniLeft--;
                                    if (aniLeft === -fw) {
                                        if (li.elements.length !== 1) {
                                            var first = li.first();
                                            first = Ext.apply({}, {
                                                tag: 'li',
                                                html: first.dom.innerHTML
                                            });
                                            li.first().remove();
                                            dh.insertAfter(li.last(), first);
                                            aniLeft = 0;
                                        } else {
                                            aniLeft = width;
                                        }

                                    }
                                    el.setLeft(aniLeft);
                                };
                                return {
                                    run: function (list, speed) {
                                        init(list);
                                        id = setInterval(marquee, speed);
                                        hover(id, speed);
                                    }
                                };
                            };

                        }
                    }
                }
            ]
        });
        return panel;
    }
});


Ext.onReady(function () {
    Ext.QuickTips.init();
    Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
    var mainPanel = new Ext.ijobs.index.MainPanel({
        boxMinWidth: 1130,
        listeners: {
            afterrender: function () {//如果有默认首页就打开设置的页面
                var homepage = Ext.util.Cookies.get('__homepage');
                if (!Ext.isEmpty(homepage)) {
                    var pages = Ext.decode(homepage);
                    if (!Ext.isEmpty(pages.herf)) {
                        mainPanel.createNewTab(pages.herf, Math.random(), pages.text);
                    }

                } else {//默认为作业执行历史
                    mainPanel.createNewTab('/admin/articles', Math.random(), '文章管理');
                }
            },
            /**
             * 帮助信息
             */
            boxready: function () {
                /* 隐藏帮助信息
                 * var btn = Ext.get('nav');
                 var submenu = Ext.select('.submenu').hide();
                 var hideEventId;
                 var hide = function(){
                 submenu.hide();
                 };
                 var show = function(){
                 submenu.show();
                 };
                 btn.on('mouseenter',function(){
                 show();
                 clearTimeout(hideEventId);
                 });
                 btn.on('mouseleave',function(){
                 hideEventId = Ext.Function.defer(function(){
                 hide();
                 }, 500);
                 });*/

            }
        }
    });
    var treeMenu = new Ext.ijobs.index.TreeMenu({
        dvListeners: {
            "itemclick": function (view, record, item, index, e) {

                var node = e.target,
                    title = node.getAttribute('tabTitle'),
                    href = node.getAttribute('to'),
                    id = node.id;
                if (!title)return;
                Ext.each(Ext.query('dd'), function (dd) {
                    Ext.get(dd).removeCls('active');
                });
                Ext.fly(node.parentNode).addCls('active');
                mainPanel.createNewTab(href, id, title);
            }
        }
    });
    /**
     * 全局方法
     */
    window.Frame = {
        /**
         * 防止session过期
         */
        keepSessionAlive: function () {
            Ext.TaskManager.stop(window.Frame.taskInvokeSessionAlive);
            if (!window.sessionWin) {
                var url = window.encodeURIComponent(basePath + 'common/refresh.jsp');
                window.sessionWin = new Ext.Window({
                    title: '会话过期，请重新登录',
                    height: 400,
                    width: 600,
                    modal: true,
                    listeners: {
                        close: function () {
                            window.sessionWin = null;
                            //Ext.TaskManager.start(window.Frame.taskInvokeSessionAlive);
                        }
                    },
                    html: '<iframe src="http://passport.oa.com/modules/passport/signout.ashx?url=' + url + '" style="width:100%; height:100%;"></iframe>'//'<iframe src="./index.jsp" style="width:100%; height:100%;"></iframe>',
                }).show();
            }

        },
        /**
         * 定时任务：600s请求一次session状态，当http的status为999或者为0时才触发登录
         */
        taskInvokeSessionAlive: {
            run: function () {
                Ext.Ajax.request({
                    url: './personal/isSessionAlive.action',
                    success: function (response, opts) {
                        var status = response.status;
                        if (999 === status || 0 === status) {
                            window.Frame.keepSessionAlive();
                        }
                    }
                });
            },
            interval: 1000
        },
        getBody: function () {
            return Ext.getBody();
        },
        insertMsg: function (msg, type) {
            mainPanel.insertMsg(msg, type);
        },
        getCurUser: function () {
            return uploadUserName;
        },
        createNewTab: function () {
            arguments.length !== 1 ?
                mainPanel.createNewTab(arguments[0], arguments[1], arguments[2]) : mainPanel.createNewTab(arguments[0]);
        },

        getActiveTab: function () {
            return mainPanel.COMPONENT.contentTab.getActiveTab();
        },

        closeTab: function (id) {
            mainPanel.COMPONENT.contentTab.remove(id);
        },

        setTabTitle: function (id, title) {
            mainPanel.COMPONENT.contentTab.getItem(id).setTitle(title);
        },
        cleanInfos: function () {
            mainPanel.clearMsg();
        },
        getTabTitle: function (id) {
            return mainPanel.COMPONENT.contentTab.getItem(id).title;
        }};


    /**
     * 构造主页布局
     */
    Ext.create('Ext.Viewport', {
        layout: 'border',
        autoScroll: true,
        boxMinWidth: 1300,
        items: [
            {
                region: 'north',
                xtype: 'box',
                el: 'header',
                boxMinWidth: 1300
            },
            treeMenu,
            mainPanel
        ]
    });

    /**
     * 构造主页菜单及点击事件
     */
    (function () {
        var v3_topmenu = {
            user: {cls: 'user-center', name: '内容管理'},
            job: {cls: 'job-manage', name: '日志'},
            data: {cls: 'data', name: '订单管理'},
            admin: {cls: 'admin-entrance', name: '微信设置'},
            step: {cls: 'step-component', name: '步骤'},
            set: {cls: 'set', name: '组件'}
        };

        var mainMenu = [];
        /**
         * 构造主页顶部菜单
         */
        var buildTopMenu = function () {
            var lis = [];
            var dh = Ext.DomHelper;
            if (isAdmin) {
                if (isGeneralVersion) {
                    mainMenu = Docs_general.Menu;
                } else {
                    mainMenu = Docs.Menu;
                }
            } else {
                if (isGeneralVersion) {
                    mainMenu = Docs_user_general.Menu;
                } else {
                    mainMenu = Docs_user.Menu;
                }
            }

            Ext.each(mainMenu, function (menu) {
                lis.push({
                    tag: 'li',
                    cls: v3_topmenu[menu.id].cls,
                    html: '<h4>' + v3_topmenu[menu.id].name + '</h4>'
                });
            });

            dh.append('topmenu', lis);

        };

        /**
         * 构造主页左面的菜单
         */
        var buildLeftMenu = function (menus) {
            var _menus = [];
            var _subMenus = [];
            if (menus.isMutilLevel) {
                var secLevelMenu = menus.children;
                Ext.each(secLevelMenu, function (secMenu, secIndex) {
                    Ext.each(secMenu.children, function (thridMenu, thridIndex) {
                        _subMenus.push({
                            id: menus.id + "_" + secIndex + "_" + thridIndex,
                            menu: thridMenu.text,
                            url: thridMenu.href
                        });
                    });
                    _menus.push({
                        menu: secMenu.text,
                        subMenu: _subMenus
                    });
                    _subMenus = [];
                });
            } else {
                Ext.each(menus.children, function (menu, index) {
                    _subMenus.push({
                        id: menus.id + "_" + index,
                        menu: menu.text,
                        url: menu.href
                    });
                });
                _menus.push({
                    menu: menus.text,
                    subMenu: _subMenus
                });
            }
            treeMenu.loadMenuData(_menus);
            bindLeftNav();
        };

        var bindLeftNav = function () {
            //主导航图标上的点击菜单
            //return;
            //var treeMenuEl = treeMenu.getEl();
            var navs = [];
            Ext.each(mainMenu, function (menu) {
                navs.push({
                    text: menu.text,
                    handler: function () {
                        var navDom = Ext.query('#header>ul[id="topmenu"]>li[class*="' + menu.id + '"]')[0],
                            navEl = Ext.get(navDom),
                            className = navEl.getAttribute('class'),
                            hoverClass = className;// + '_hover';
                        navEl.addCls(hoverClass);
                        navEl.removeCls(className);
                        navDom.click();
                    }
                });
            });

            var navMenu = new Ext.menu.Menu({
                items: navs
            });

            /*var navdiv = Ext.query('div[class="leftmenu_head"]')[0];
             var navDivEl = Ext.get(navdiv);
             navDivEl.on('click',function(e){
             navMenu.showAt(e.getXY());
             });*/
        };

        /**
         * 绑定主页上方菜单点击事件及样式变化
         */
        var applyTopMenuHover = function () {
            var menus = Ext.query('#header>ul[id="topmenu"]>li');
            Ext.each(menus, function (menu, index) {
                menu = Ext.get(menu);
                var className = menu.getAttribute('class');
                var hoverClass = className;// + '_hover';
                var selectClass = "active";
                menu.hover(function () {
                    if (!menu.hasCls(selectClass)) {
                        menu.addCls(hoverClass);
                        //menu.removeCls(className);
                    }
                }, function () {
                    if (!menu.hasCls(selectClass)) {
                        menu.addCls(className);
                        //menu.removeCls(hoverClass);
                    }
                });
                menu.on('click', function () {
                    var selectedMenus = Ext.query('#header>ul[id="topmenu"]>li[class*="active"]');
                    Ext.each(selectedMenus, function (selectedMenu) {
                        selectedMenu = Ext.get(selectedMenu);
                        if (menu === selectedMenu) {
                            return false;
                        }
                        selectedMenu.removeCls(selectClass);

                        //var hoverClass = selectedMenu.getAttribute('class');
                        //var normalClass = hoverClass.replace('_hover','');
                        //selectedMenu.removeCls(hoverClass);
                        //selectedMenu.addCls(normalClass);
                        buildLeftMenu(mainMenu[index]);
                        menu.addCls(selectClass);
                    });
                });
            });
        };

        /**
         * 解析外链
         * **/
        var autoGoDirectlink = function () {
            var url = window.location.href;
            if (url.indexOf("directlink") != -1) {
                var arr = url.split("/");
                var action = "./jobs/" + arr[arr.length - 1];
                window.Frame.createNewTab(action, Math.random(), "查看执行作业");
            }
        };

        var autoGoStatDirectlink = function () {
            var url = window.location.href;
            if (url.indexOf("statdirectlink") != -1) {
                var arr = url.split("/");
                var action = "./statistics/" + arr[arr.length - 1];
                window.Frame.createNewTab(action, Math.random(), "统计数据查看");
            }
        };

        /**
         * 初始化菜单选中样式及左边菜单
         */
        var initApp = function () {
            autoGoDirectlink();
            autoGoStatDirectlink();
            buildTopMenu();

            applyTopMenuHover();
            //Ext.TaskManager.start(window.Frame.taskInvokeSessionAlive);
            var index = 0;//默认选中内容管理
            var menu = Ext.get(Ext.query('#header>ul[id="topmenu"]>li')[index]);

            var normalCls = menu.getAttribute('class');
            var overCls = normalCls;// + '_hover';
            menu.set({'class': overCls + ' active'});
            Ext.defer(function () {
                buildLeftMenu(mainMenu[index]);
            }, 30);
            roleInfo = '';//Ext.isObject(roleInfo) ? roleInfo : {};
            /*Ext.get('lblAppNames').update('您当前的权限角色为：' + roleInfo.roleName);
            Ext.QuickTips.register({
                target: 'lblAppNames',
                text: roleInfo.appsName,
                trackMouse: true,
                dismissDelay: 60 * 1000
            });*/
            /*Ext.get('lnkAgentMgr').addListener('click',function(e){
             window.Frame.createNewTab('./jobs/agentMgr.jsp','AgentMgr','Agent monitor');
             });*/
            /*Ext.get('TSCStatusMgr').addListener('click',function(e){//tsc系统运行状态
             window.Frame.createNewTab('./admin/tscMgr.jsp','TSCMgr','TSC系统运行状态');
             });*/
            Ext.get('lnkLogout').addListener('click', function (e) {
                window.location.href = "http://passport.oa.com/modules/passport/signout.ashx?url=" + window.encodeURIComponent(basePath);
            });
        }();

        /**
         * 当角色为访客时，显示提示框申请权限
         */
        if (isAdmin === false) {
            if (Ext.isEmpty(userRole) && roleInfo.roleName === '访客') {
                var tipTask = '';
                closeTopTip = function () {
                    if (tipTask) {
                        Ext.TaskManager.stop(tipTask);
                    }
                    Ext.getCmp('_topTip').close();
                };
                var w = new Ext.Window({
                    id: '_topTip',
                    modal: true,//遮罩
                    width: 400,
                    height: 200,
                    closable: false,
                    closeAction: 'close',
                    //draggable : false,//拖动
                    resizable: false,//改变窗口大小
                    title: '提示',
                    items: [
                        {
                            xtype: 'box',
                            style: 'width:380px;padding:40px 5px;font-size:14px;',
                            html: '您当前在iJobs系统的权限角色为：<span style="color:red;">访客</span>，只能使用部分查询功能，如需要执行作业等权限请点击跳转至“<a style="text-decoration:underline;color:red" target="_blank" href="http://sec.cm.com/RightApplyPersonal/?sys_id=510" onclick="closeTopTip()">敏感权限系统</a>”申请权限'
                        }
                    ],
                    buttonAlign: 'center',
                    buttons: [
                        {
                            itemId: 'btnClose',
                            disabled: true,
                            text: '关闭 (5)'
                        }
                    ],
                    listeners: {
                        show: function (win) {
                            var btn = win.down('button[itemId="btnClose"]');
                            var _tipTask = {
                                run: function () {
                                    if (this.number === 0) {
                                        btn.setText('关闭');
                                        btn.setDisabled(false);
                                        btn.on('click', function () {
                                            win.close();
                                        });
                                        return false;//返回false停止定时器
                                    }
                                    text = '关闭 (' + this.number + ')';
                                    this.number = this.number - 1;
                                    btn.setText(text);
                                },
                                number: 5,
                                interval: 1000
                            };
                            tipTask = Ext.TaskManager.start(_tipTask);
                        }
                    }

                });
                w.show();
            }
        }

    }());
});

//end file

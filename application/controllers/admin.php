<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class admin extends MY_Controller
{
    public function index()
    {
        $admin = false;
        if (isset($_SESSION['admin'])) {
            $admin = $_SESSION['admin'];
        } else if (isset($_COOKIE['admin'])) {
            $admin = $_COOKIE['admin'];
        }

        if (!$admin) {
            header('Location: /admin/login');
        }

        $data = array(
            'user' => $admin,
            'msg' => 'admin',
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/css/ext-all.css',
                '/css/admin/themes/css/index.css',
                '/css/admin/themes/css/common.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/extjs4/locale/ext-lang-zh_CN.js',
                '/js/extjs4/ux/TabCloseMenu.js',
                '/js/admin/main/menuConfig.js',
                '/js/admin/main/main.js'
            )
        );

        $this->load->view('admin/home_header', $data);
        $this->load->view('admin/script', $data);
    }

    //显示登入页面
    public function login()
    {
        $data = array(
            'msg' => '后台登入',
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/css/ext-all.css',
                '/css/admin/themes/ijobs-v3/css/index.css',
                '/css/admin/themes/ijobs-v3/css/ijobs.css'

            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/admin/login_form.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    //登入验证
    public function login2()
    {
        $name = $_POST['name'];
        $password = $_POST['password'];

        $users = array(
            'admin' => 'admin',
            'user' => 'user',
            'system' => 'system',
            'dba' => 'dba',
            'guest' => 'guest'
        );

        if (isset($users[$name])) {
            if ($users[$name] == $password) {
                echo json_encode(array(
                    'success' => true
                ));
                $_SESSION['admin'] = $name;

                $expire = time() + 30 * 86400; // 30 day
                setcookie('admin', $name, $expire, '/');
            } else {
                echo json_encode(array(
                    'success' => false,
                    'msg' => 'password incorrect'
                ));
            }
        } else {
            echo json_encode(array(
                'success' => false,
                'msg' => 'no user'
            ));
        }
    }

    public function logout()
    {
        unset($_SESSION['admin']);

        $expire = -1;
        setcookie('admin', '', $expire, '/');

        $this->login();
    }

    public function jobs_userFavorites()
    {
        $data = array(
            'msg' => 'admin-articles',
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/css/ext-all.css',
                '/css/admin/themes/ijobs-v3/css/ijobs.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/extjs4/locale/ext-lang-zh_CN.js',
                '/js/admin/common/common.js',
                '/js/admin/common/utils.js',
                '/js/admin/common/ux/ZeroClipboard/ZeroClipboard.min.js',
                '/js/admin/jobs/userFavorites.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function articles()
    {
        $data = array(
            'msg' => 'admin-products',
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs6/build/MyApp-all.css'
            ),
            'js' => array(
                '/js/extjs6/ext-all.js',
                '/js/moment.js',
                '/js/admin/Articleform.js',
                '/js/admin/Articlegrid.js',
                '/js/admin/Articletypeinfo.js',
                '/js/admin/Articletree.js',
                '/js/admin/Articlepanel.js',
                '/js/admin/articles.js',
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function gallery()
    {
        $data = array(
            'msg' => 'Admin-Gallery',
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/css/ext-all.css',
                '/css/admin/themes/ijobs-v3/css/index.css',
                '/css/admin/themes/ijobs-v3/css/ijobs.css'

            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/admin/common/common.js',
                '/js/admin/common/utils.js',
                '/js/admin/common/ux/LinkColumn.js',
                '/js/jquery.min.js',
                '/js/jQuery-File-Upload/jquery.ui.widget.js',
                '/js/jQuery-File-Upload/jquery.fileupload.js',
                '/js/admin/gallery_batch_panel.js',
                '/js/admin/gallery_form.js',
                '/js/admin/gallery_grid.js',
                '/js/admin/cms.js',
                '/js/admin/gallery.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function products()
    {
        $data = array(
            'msg' => 'admin-products',
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/css/ext-all.css',
                '/css/admin/themes/ijobs-v3/css/index.css',
                '/css/admin/themes/ijobs-v3/css/ijobs.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/admin/common/common.js',
                '/js/admin/common/utils.js',
                '/js/admin/common/ux/LinkColumn.js',
                '/js/admin/cms_add_form.js',
                '/js/admin/cms.js',
                '/js/admin/products.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function equipments()
    {
        $data = array(
            'msg' => 'admin-products',
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs6/build/MyApp-all.css',
                '/css/admin.css'
            ),
            'js' => array(
                '/js/extjs6/ext-all.js',
                '/js/moment.js',
                '/js/admin/equipments.js',
                '/js/admin/equipments_size.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function mvvm()
    {
        $data = array(
            'msg' => 'admin-products',
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs6/build/MyApp-all.css'
            ),
            'js' => array(
                '/js/extjs6/ext-all.js',
                '/js/mvvm.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function faqs()
    {
        $data = array(
            'msg' => 'admin-' . __FUNCTION__,
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/css/ext-all.css',
                '/css/admin/themes/ijobs-v3/css/index.css',
                '/css/admin/themes/ijobs-v3/css/ijobs.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/admin/common/common.js',
                '/js/admin/common/utils.js',
                '/js/admin/common/ux/LinkColumn.js',
                '/js/admin/grid.js',
                '/js/admin/faqs.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function users()
    {
        $data = array(
            'msg' => 'admin-' . __FUNCTION__,
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/css/ext-all.css',
                '/css/admin/themes/ijobs-v3/css/index.css',
                '/css/admin/themes/ijobs-v3/css/ijobs.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/admin/common/common.js',
                '/js/admin/common/utils.js',
                '/js/admin/common/ux/LinkColumn.js',
                '/js/admin/grid.js',
                '/js/admin/users.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function enquiries()
    {
        $data = array(
            'msg' => 'admin-' . __FUNCTION__,
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/css/ext-all.css',
                '/css/admin/themes/ijobs-v3/css/index.css',
                '/css/admin/themes/ijobs-v3/css/ijobs.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/admin/common/common.js',
                '/js/admin/common/utils.js',
                '/js/admin/common/ux/LinkColumn.js',
                '/js/admin/grid.js',
                '/js/admin/enquiries.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function settings()
    {
        $data = array(
            'msg' => 'admin-' . __FUNCTION__,
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/css/ext-all.css',
                '/css/admin/themes/ijobs-v3/css/index.css',
                '/css/admin/themes/ijobs-v3/css/ijobs.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/admin/common/common.js',
                '/js/admin/common/utils.js',
                '/js/admin/common/ux/LinkColumn.js',
                '/js/admin/grid.js',
                '/js/admin/grid_form.js',
                '/js/admin/settings.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function accounts()
    {
        $data = array(
            'msg' => 'admin-' . __FUNCTION__,
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/css/ext-all.css',
                '/css/admin/themes/ijobs-v3/css/index.css',
                '/css/admin/themes/ijobs-v3/css/ijobs.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/admin/common/common.js',
                '/js/admin/common/utils.js',
                '/js/admin/common/ux/LinkColumn.js',
                '/js/admin/grid.js',
                '/js/admin/grid_account_form.js',
                '/js/admin/accounts.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function subscriptions()
    {
        $data = array(
            'msg' => 'admin-' . __FUNCTION__,
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/css/ext-all.css',
                '/css/admin/themes/ijobs-v3/css/index.css',
                '/css/admin/themes/ijobs-v3/css/ijobs.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/admin/common/common.js',
                '/js/admin/common/utils.js',
                '/js/admin/common/ux/LinkColumn.js',
                '/js/admin/grid.js',
                '/js/admin/subscriptions.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function sample_request()
    {
        $data = array(
            'msg' => 'admin-' . __FUNCTION__,
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/css/ext-all.css',
                '/css/admin/themes/ijobs-v3/css/index.css',
                '/css/admin/themes/ijobs-v3/css/ijobs.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/admin/common/common.js',
                '/js/admin/common/utils.js',
                '/js/admin/common/ux/LinkColumn.js',
                '/js/admin/grid.js',
                '/js/admin/sample_request.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function po_request()
    {
        $data = array(
            'msg' => 'admin-' . __FUNCTION__,
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/css/ext-all.css',
                '/css/admin/themes/ijobs-v3/css/index.css',
                '/css/admin/themes/ijobs-v3/css/ijobs.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/admin/common/common.js',
                '/js/admin/common/utils.js',
                '/js/admin/common/ux/LinkColumn.js',
                '/js/admin/grid.js',
                '/js/admin/po_request.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function rfq_requirement()
    {
        $data = array(
            'msg' => 'admin-' . __FUNCTION__,
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/css/ext-all.css',
                '/css/admin/themes/ijobs-v3/css/index.css',
                '/css/admin/themes/ijobs-v3/css/ijobs.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/admin/common/common.js',
                '/js/admin/common/utils.js',
                '/js/admin/common/ux/LinkColumn.js',
                '/js/admin/grid.js',
                '/js/admin/rfq_requirement.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    //根据module，返回相应grid数据
    public function getList()
    {
        $option = $_POST;
        $model = $option['module'] . '_model';

        $this->load->model($model);
        $data = $this->$model->getList($option);

        echo json_encode($data);
    }

    public function gridDelete()
    {
        $id = $_POST['id'];
        $option = $_POST;
        $model = $option['module'] . '_model';

        $this->load->model($model);
        $this->$model->deleteByID($id);

        echo json_encode(array(
            'success' => true
        ));
    }

    public function products_tree()
    {
        $tree = $this->get_tree('products');
        echo json_encode($tree);
    }

    public function articles_tree()
    {
        $tree = $this->get_tree('articles');
        echo json_encode($tree);
    }

    public function gallery_tree()
    {
        $tree = $this->get_tree('gallery');
        echo json_encode($tree);
    }

    private function get_tree($type_name)
    {
        $this->load->model('types_model');

        $data = $this->types_model->get_menu($type_name);

        //数据为空，自动建一个“初始条目”。
        if (count($data) === 0) {
            $this->types_model->init_menu_root($type_name);
            $data = $this->types_model->get_menu($type_name);
        }

        $menu = array();

        //取根分类
        foreach ($data as $key => $row) {
            if ($row->belong == 0) {
                $id = $row->id;
                array_push($menu, array(
                    'text' => $row->name,
                    'id' => $id
                ));
            }
        }

        foreach ($menu as $i => $item) {
            $menu[$i] = $this->get_submenu($item, $data);
        }

        return $menu;
    }

    //递归查询子分类
    public function get_submenu($item, $data)
    {
        $sub = array();
        foreach ($data as $j => $row) {
            if ($row->belong == $item['id']) {
                array_push($sub, array(
                    'text' => $row->name,
                    'id' => $row->id
                ));
            }
        }


        if (count($sub) == 0) {
            $item['leaf'] = true;
        } else {
            foreach ($sub as $j => $ob) {
                $sub[$j] = $this->get_submenu($ob, $data);
            }
            $item['children'] = $sub;
        }

        return $item;
    }


    public function getTypeInfo()
    {
        $this->load->model('types_model');

        $data = $this->types_model->getByID($_POST['id']);
        echo json_encode($data);
    }

    public function saveTypeInfo()
    {
        $this->load->model('types_model');
        $data = $this->types_model->saveTypeInfo($_POST);
    }

    public function addType()
    {
        $this->load->model('types_model');
        $this->types_model->addType($_POST);

        echo json_encode(array(
            'success' => true
        ));
    }

    public function deleteType()
    {
        $this->load->model('types_model');

        $this->types_model->deleteByID($_POST['id']);

        echo json_encode(array(
            'success' => true
        ));
    }

    public function weixin()
    {
        $data = array(
            'msg' => '微信设置',
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/ext-theme-neptune/ext-theme-neptune-all.css',
                '/css/admin.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/extjs4/locale/ext-lang-zh_CN.js',
                '/js/admin/common/ux/LinkColumn.js',
                '/js/admin/weixin.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function func_log()
    {
        $data = array(
            'msg' => '日志',
            //'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/ext-theme-neptune/ext-theme-neptune-all.css',
                '/css/admin.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/moment.js',
                '/js/func.js',
                '/js/extjs4/locale/ext-lang-zh_CN.js',
                '/js/admin/common/ux/LinkColumn.js',
                '/js/admin/func_log.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function getWeixinList()
    {
        $this->load->model('cfg_wx_settings_model');

        $option = $_GET;
        $data = $this->cfg_wx_settings_model->getList($option);
        echo json_encode($data);
    }

    public function getWeixinAutoReplyList()
    {
        $this->load->model('cfg_wx_settings_model');

        $option = $_GET;
        $data = $this->cfg_wx_settings_model->getWeiXinAutoReplyList($option);
        echo json_encode($data);
    }


    public function weixin_save()
    {
        $this->load->model('cfg_wx_settings_model');

        $option = $_POST;

        if (isset($option['ID'])) {
            $this->cfg_wx_settings_model->update($option);
        } else {
            $this->cfg_wx_settings_model->insert($option);
        }

        echo json_encode(array(
            'success' => true
        ));
    }


    public function weixin_remove()
    {
        $this->load->model('cfg_wx_settings_model');

        $option = $_POST;

        $this->cfg_wx_settings_model->deleteByID($option['ID']);

        echo json_encode(array(
            'success' => true
        ));
    }

    public function weixin_auto_reply()
    {
        $data = array(
            'msg' => '自动消息回复',
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/ext-theme-neptune/ext-theme-neptune-all.css',
                '/css/admin.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/extjs4/locale/ext-lang-zh_CN.js',
                '/js/admin/common/ux/LinkColumn.js',
                '/js/admin/weixin_auto_reply.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function weixin_menu()
    {
        $data = array(
            'msg' => '自定义菜单',
            'css' => array(
                '/js/extjs4/resources/ext-theme-neptune/ext-theme-neptune-all.css',
                '/css/admin.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/extjs4/locale/ext-lang-zh_CN.js',
                '/js/admin/weixin_menu.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function getMenuData()
    {
        $this->load->model('cfg_wx_settings_model');
        $name = 'custom_menu';
        $tree = $this->cfg_wx_settings_model->getByName($name);

        $menu = '[{"name":"Home","id":"1","type":"view","value":"www.tomtalk.net","leaf":true},'
            . '{"name":"优惠活动","id":"2","type":"click","value":"xxx","leaf":true},'
            . '{"name":"News","id":"3","type":"click","value":"xxx","expanded": "true","children":[{"name":"Products Releases","id":"42","type":"click","value":"xxx","leaf":true}]}'
            . ']';

        echo $tree;
    }

    public function weixin_menu_save()
    {
        $this->load->model('cfg_wx_settings_model');

        $menu = $this->input->post('menu', true);

        $name = 'custom_menu';

        $option = array(
            'NAME' => $name,
            'VALUE' => $menu,
            'DESC' => '自定义菜单'
        );

        $row = $this->cfg_wx_settings_model->getRowByName($name);

        if ($row) {
            $option['ID'] = $row->ID;
            $this->cfg_wx_settings_model->update($option);
        } else {
            $this->cfg_wx_settings_model->insert($option);
        }

        echo json_encode(array(
            'success' => true
        ));
    }
}

/* End of file */
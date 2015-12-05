<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class equipments extends MY_Controller
{
    var $productBelongLinks = array(); //产品的所属分类链，用于展开相应菜单

    function __construct()
    {
        parent::__construct(); // Call the Model constructor
        $this->load->model('equipments_model');
    }

    public function index()
    {
        //取默认产品分类
        $default = $this->types_model->get_default_product();

        $_GET['id'] = $default->id; //进入产品页后，显示默认分类列表

        $this->category_desc();
    }

    public function category()
    {
        if (isset($_GET['id'])) {
            $type_id = $_GET['id'];
            $type_info = $this->types_model->getByID($type_id);
            header('Location:/products/category?code=' . $type_info->code);
        } else if (isset($_GET['code']) and !empty($_GET['code'])) {
            $type_info = $this->types_model->getByCode($_GET['code']);
            $type_id = $type_info->id;
        } else {
            header('Location:/products');
        }

        $page = $this->input->get('page', TRUE);
        $page = ($page ? $page : 1);
        $per_page = 10 * 1;

        $option = array(
            'limit' => $per_page,
            'offset' => ($page - 1) * $per_page
        );

        /**
         * 1、该类别下有子分类，返回子分类
         * 2、没有子分类，再查询产品，
         */
        $t_option = $option;
        $t_option['belong'] = $type_id;
        $type_list = $this->types_model->select($t_option);

        if ($type_list['total'] == 0) {
            $p_option = $option;
            $p_option['type_id'] = $type_id;
            $product_list = $this->products_model->select($p_option);
        }

        $isType = ($type_list['total'] > 0 ? true : false);

        if ($isType) {
            $pager = build_pagebar($type_list['total'], $per_page, $page, '/products/category?id=' . $type_id . '&page=__page__', $type_id);
        } else {
            $pager = build_pagebar($product_list['total'], $per_page, $page, '/products/category?id=' . $type_id . '&page=__page__', $type_id);
        }

        $data = array(
            'title' => $this->lang->line('products') . ' - ' . $type_info->name,
            'menu' => 'products',
            'banner' => $this->site_settings_model->getByName('PRODUCTS_BANNER')->value,
            'type_id' => $type_info->id,
            'type_info' => $type_info,
            'bread_crumb' => $this->getBreadCrumb('category', $type_id),
            'left_menu' => $this->get_menu($type_id),
            'isType' => $isType,
            'types_or_products_list' => ($isType ? $type_list['data'] : $product_list['data']),
            'pager' => $pager,
            'new_products' => $this->products_model->getHotProducts(),
            'css' => array(),
            'js' => array(
                '/assets/js/jquery.cookie.js',
                '/assets/js/scrollImg.js',
                '/assets/js/submeun.js',
                '/assets/js/image.js',
                '/assets/js/products.js'
            )
        ); //print_r($data); exit;

        $this->load->view('header', $data);
        $this->load->view('products/index', $data);
        $this->load->view('footer', $data);
    }

    //显示分类介绍及滚动图
    public function category_desc()
    {
        if (isset($_GET['id'])) {
            $type_info = $this->types_model->getByID($_GET['id']);
            header('Location:/products/category_desc?code=' . $type_info->code);
        } else if (isset($_GET['code'])) {
            $type_info = $this->types_model->getByCode($_GET['code']);
        } else {
            header('Location:/products');
        }

        if ($type_info === false) {
            header('Location:/products');
        }

        $data = array(
            'title' => $this->lang->line('products'),
            'menu' => 'products',
            'banner' => $this->site_settings_model->getByName('PRODUCTS_BANNER')->value,
            'type_id' => $type_info->id,
            'type_info' => $type_info,
            'bread_crumb' => $this->getBreadCrumb('category', $type_info->id),
            'rolls' => $this->getRolls($type_info->roll_pic),
            'left_menu' => $this->get_menu($type_info->id),
            'new_products' => $this->products_model->getHotProducts(),
            'css' => array(),
            'js' => array(
                '/assets/js/scrollImg.js',
                '/assets/js/submeun.js',
                '/assets/js/image.js',
                '/assets/js/products.js'
            )
        ); //print_a($data['rolls']); exit;

        $this->load->view('header', $data);
        $this->load->view('products/category_desc', $data);
        $this->load->view('footer', $data);
    }

    private function getRolls($roll_pic)
    {
        if (empty($roll_pic)) {
            return array();
        }

        $rolls = explode("\n", $roll_pic);

        foreach ($rolls as &$item) {
            $item = explode(':', $item);
        } //print_r($rolls);

        return $rolls;
    }

    //产品页
    public function detail()
    {
        if (isset($_GET['id'])) {
            $product = $this->products_model->getByID($_GET['id']);
            header('Location:/products/detail?code=' . $product->code);
        } else if (isset($_GET['code'])) {
            $product = $this->products_model->getByCode($_GET['code']);
        } else {
            header('Location:/products');
        }

        if ($product === false) {
            header('Location:/products');
        }

        $ids = explode(',', $product->relative_products);
        $relative_products = ((count($ids) == 1 and $ids[0] == '') ? array() : $this->products_model->getByIDs($ids));

        //相关产品凑足5个，否则显示会有问题。
        $count_p = count($relative_products);
        if ($count_p < 5) {
            for ($i = 0; $i < (5 - $count_p); $i++) {
                $relative_products[] = (object)array(
                    'id' => 0,
                    'cover' => '',
                    'name' => ''
                );
            }
        }

        $data = array(
            'title' => $this->lang->line('products') . ' - ' . $product->name,
            'menu' => 'products',
            'banner' => $this->site_settings_model->getByName('PRODUCTS_BANNER')->value,
            'keywords' => $product->keywords,
            'product' => $product,
            'user' => $this->getUser(),
            'relative_products' => $relative_products,
            'bread_crumb' => $this->getBreadCrumb('detail', $product->id),
            'left_menu' => $this->get_menu($product->id),
            'new_products' => $this->products_model->getHotProducts(),
            'css' => array(),
            'js' => array(
                '/assets/js/jquery.cookie.js',
                '/assets/js/scrollImg.js',
                '/assets/js/submeun.js',
                '/assets/js/products.js',
                '/assets/js/image.js'
            )
        );

        $this->load->view('header', $data);
        $this->load->view('products/detail', $data);
        $this->load->view('footer', $data);
    }

    public function getUser()
    {
        if (isset($_SESSION['uid'])) {
            $this->load->model('users_model');
            $user = $this->users_model->getByID($_SESSION['uid']);
            return $user;
        } else if (isset($_COOKIE['uid'])) {
            $this->load->model('users_model');
            $user = $this->users_model->getByID($_COOKIE['uid']);
            return $user;
        } else {
            return false;
        }
    }

    //在内容区加载产品
    public function getBreadCrumb($kind, $id)
    {
        $crumb = '<a href="/">' . $this->lang->line('home') . ' </a> &gt; '
            . '<a href="/products"> ' . $this->lang->line('products') . ' </a>';
        if ($kind == 'detail') {
            //取产品信息：名称、id、分类
            $pinfo = $this->products_model->getByID($id);
            $tail = ' &gt; <span>' . $pinfo->name . '</span>';

            //取分类信息：名称、id、是否还有上级（递归搜索）。
            $category = $this->getTypeLinks($pinfo->type_id);
            $crumb .= $category . $tail;
        } else {
            $category = $this->getTypeLinks($id);
            $crumb .= $category;
        }

        return $crumb;
    }

    public function getTypeLinks($id)
    {
        array_push($this->productBelongLinks, $id);

        $type = $this->types_model->getByID($id);

        $category = ' &gt; <a href="/products/category?code=' . $type->code . '"> ' . $type->name . ' </a>';

        if ($type->belong != 0) {
            $category = $this->getTypeLinks($type->belong) . $category;
        }

        return $category;
    }

    public function shopping_cart()
    {
        if (isset($_COOKIE['collect']) AND strlen($_COOKIE['collect']) > 2) {
            $product_ids = json_decode($_COOKIE['collect']);

            $data = array(
                'products' => (count($product_ids) === 0 ? array() : $this->products_model->getByIDs($product_ids))
            );

            echo $this->load->view('products/shopping-cart', $data, true);
        } else {
            echo $this->load->view('products/shopping-cart-empty', true);
        }
    }

    public function shopping_cart_submit()
    {
        $email = $_POST['email'];
        $enquiry = $_POST['enquiry'];

        //清空cookie
        setcookie('collect');

        //保存enquiry
        $this->load->model('enquiries_model');
        $this->enquiries_model->insert(array(
            'email' => $email,
            'enquiry' => $enquiry
        ));

        //发送询盘提醒邮件
        $this->send_warn_mail($email, json_decode($enquiry));

        echo json_encode(array(
            'success' => true,
            'email' => $email
        ));
    }

    public function send_mail_test()
    {
        $enquiry = '[{"id":"1276","name":"M12 Male,Straight,S-coding","pins":"1","coding":"2","cable":"3","other":"4"},{"id":"286","name":"M12 Male,Panel,Crimp,S-coding","pins":"a","coding":"b","cable":"c","other":"d"}]';
        $this->send_warn_mail('abc@123.com', json_decode($enquiry));
    }

    private function send_warn_mail($userEmail, $enquiry)
    {
        $text = "<p>客户 {$userEmail} ，发出如下产品的询盘请求： ";

        $host = $_SERVER['HTTP_HOST'];

        foreach ($enquiry as $p) {
            $text .= "<h2><a href=\"//{$host}/products/detail?id={$p->id}\">{$p->name}</a></h2>";
            $text .= '<p>芯数：' . $p->pins;
            $text .= '<p>接口防护类型：' . $p->coding;
            $text .= '<p>线材外被、长度：' . $p->cable;
            $text .= '<p>其他要求：' . $p->other;
            $text .= '<br/><br/>';
        }

        $text .= '<p>RFQ from Finecables Website';

        $this->load->model('site_settings_model');
        $mail_receiver = $this->site_settings_model->getByName('RFQ_MAIL_RECEIVER')->value;
        $this->send_mail($mail_receiver, '询盘提醒', $text);
    }


    private function send_mail($to, $subject, $body)
    {
        try {
            require_once APPPATH . 'libraries/phpmailer/class.phpmailer.php';
            $mail = new PHPMailer(true);

            $mail->IsSMTP(); // tell the class to use SMTP
            $mail->SMTPAuth = true; // enable SMTP authentication
            $mail->Port = 25; // set the SMTP server port
            $mail->CharSet = 'utf-8'; //设置字符集

            $smtp_account = explode(',', $mail_receiver = $this->site_settings_model->getByName('MAIL_SMTP')->value);
            $mail->Host = trim($smtp_account[0]); // SMTP server
            $mail->Username = trim($smtp_account[1]); // SMTP server username
            $mail->From = trim($smtp_account[1]);
            $mail->Password = trim($smtp_account[2]); // SMTP server password
            $mail->FromName = '=?UTF-8?B?' . base64_encode('协顺官网') . '?=';

            $addresses = explode(',', $to);

            foreach ($addresses as $key => $address) {
                if ($key === 0) {
                    $mail->AddAddress(trim($address));
                } else {
                    $mail->AddCC(trim($address));
                }
            }

            $mail->Subject = $subject;
            $mail->Body = $body;
            $mail->IsHTML(true);

            $return = $mail->send();
        } catch (phpmailerException $e) {
            //echo $e->errorMessage();
            return false;
        }

        return $return;
    }


    public function compare_table()
    {
        if (!isset($_COOKIE['compare']) or empty($_COOKIE['compare'])) {
            echo $this->load->view('products/compare-table-empty', true);
            return false;
        }

        $product_ids = json_decode($_COOKIE['compare']);

        if (count($product_ids) === 0) {
            echo $this->load->view('products/compare-table-empty', true);
            return false;
        }

        $products = $this->products_model->getByIDs($product_ids);
        $columns = array();

        //取所有参数
        foreach ($products as $i => $product) {
            //把参数转换成数组
            $lines = explode("\n", $product->params);

            $params = array();
            foreach ($lines as $line) {
                $L = explode(":", $line);
                if (count($L) > 1) {
                    $params[$L[0]] = $L[1];
                }
            }


            //有多少个参数，循环多少次
            foreach ($params as $param => $value) {
                if (!isset($columns[$param])) {
                    $columns[$param] = array();
                }
            }

        } //print_r($columns);

        //有多少个产品，循环多少次
        foreach ($products as $i => $product) {
            //把参数转换成数组
            $lines = explode("\n", $product->params);

            $params = array();
            foreach ($lines as $line) {
                $L = explode(":", $line);
                if (count($L) > 1) {
                    $params[$L[0]] = $L[1];
                }
            }

            //参数空缺置空字符串
            foreach ($columns as $key => $value) {
                if (isset($params[$key])) {
                    $columns[$key][$i] = $params[$key];
                } else {
                    $columns[$key][$i] = '';
                }
            }

        } //print_r($columns);

        $data = array(
            'products' => $products,
            'columns' => $columns
        );

        echo $this->load->view('products/compare-table', $data, true);
    }

    //在内容区加载产品
    public function load_product()
    {
        $article = $_POST['product'];
        echo $this->load->view('products/' . $article, true);
    }

    //从菜单项，加载产品
    public function load_article()
    {
        $article = $_POST['article'];
        echo $this->load->view('products/' . $article, true);
    }

    public function save()
    {
        $cover = $this->upload_product_cover();

        if ($cover != '') {
            $_POST['cover'] = '/uploads/' . $cover;
        }

        if ($_POST['id'] == 0) {
            $_POST['ctime'] = time();
            $_POST['mtime'] = time();
            $this->equipments_model->insert($_POST);
        } else {
            $_POST['mtime'] = time();
            $this->equipments_model->update($_POST);
        }

        echo json_encode(array('success' => true));
    }


    private function upload_product_cover()
    {
        $config['upload_path'] = './uploads/';
        $config['allowed_types'] = 'gif|jpg|png';
        $config['max_size'] = '9000000'; //9MB
        $config['max_width'] = '1024';
        $config['max_height'] = '1024';

        $this->load->library('upload', $config);

        $file_name = '';
        if (!$this->upload->do_upload('product_cover')) {
            $error = array('error' => $this->upload->display_errors());
        } else {
            $data = array('upload_data' => $this->upload->data());
            $file_name = $data['upload_data']['file_name'];
        }

        return $file_name;
    }


    public function getList()
    {
        $option = (empty($_POST) ? $_GET : $_POST);
        $data = $this->equipments_model->get($option);
        echo json_encode($data);
    }


    /**
     * 取左边栏菜单步骤：
     * 1、取所有分类
     * 2、把根分类取出来
     * 3、从要分类开始，2重循环把二级分类归入所属菜单
     */
    public function getMenuData()
    {
        $data = $this->types_model->get_menu('products');

        //print_r($data);

        $menu = array();

        //取根分类
        foreach ($data as $key => $row) {
            if ($row->belong == 0) {
                $id = $row->id;
                $menu[$id] = array('menu' => $row, 'submenu' => array());
            }
        }

        //双重循环，把二级分类归入所属菜单
        foreach ($menu as $type_key => $type_row) {
            foreach ($data as $sub_key => $sub_row) {
                if ($sub_row->belong == $type_key) {
                    array_push($menu[$type_key]['submenu'], $sub_row);
                }
            }
        }

        return $menu;
    }

    public function get_menu($type_id)
    {

        //取产品分类信息
        $menu_data = $this->getMenuData();
        //print_r($menu_data);

        $menu = '';
        foreach ($menu_data as $idx => $item) {
            //先看看是否有子菜单
            $isCurrentMenu = false;
            $submenu = '';
            foreach ($item['submenu'] as $i => $subitem) {

                $isCurrentSub = false;
                //当前分类id，是否在分类链中
                if (in_array($subitem->id, $this->productBelongLinks)) {
                    $isCurrentMenu = true;
                    $isCurrentSub = true;
                }

                $submenu .= '<li>';
                $submenu .= '<a ' . ($isCurrentSub ? 'class="hover"' : '') . 'href="/products/category?code=' . $subitem->code . '"> '
                    . $subitem->name
                    . ' </a>';
                $submenu .= '</li>';
            }

            //展开子菜单
            if ($submenu != '') {
                $submenu = '<ul ' . ($isCurrentMenu ? '' : 'class="subnav"') . '> ' . $submenu . '</ul>';
            }

            //echo (($isCurrentMenu or ($type_id == $item['menu']->id)) ? 'class="cur"' : '');

            //拼合菜单项，高亮选中菜单项。
            $menu .= '<li ' . (($isCurrentMenu or ($type_id == $item['menu']->id)) ? 'class="cur"' : '') . '> <a href="/products/category_desc?code=' . $item['menu']->code . '"> <span>' . $item['menu']->name . '</span> </a> ';
            $menu .= $submenu;
            $menu .= '</li>';
        }

        return $menu;
    }

    public function search()
    {
        $keyword = $_POST['keyword'];

        $list = $this->products_model->search($keyword);

        $data = array(
            'list' => $list['data'],
            'keyword' => $keyword,
            'pager' => ''
        );

        echo $this->load->view('products/search_list', $data, true);
    }

    public function delete()
    {
        $id = $_POST['id'];

        $this->equipments_model->deleteByID($id);

        echo json_encode(array(
            'success' => true
        ));
    }

    public function clone_from_id()
    {
        $id = $_POST['id'];

        $this->products_model->clone_from_id($id);

        echo json_encode(array(
            'success' => true
        ));
    }
}

/* End of file */
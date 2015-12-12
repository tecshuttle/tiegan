<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class articles extends MY_Controller
{
    function __construct()
    {
        parent::__construct(); // Call the Model constructor
        $this->load->model('articles_model');
    }

    public function index()
    {
        $data = array(
            'title' => 'Article',
            'menu' => '',
            'css' => array(),
            'js' => array()
        );

        $this->load->view('header', $data);
        $this->load->view('building');
        $this->load->view('footer', $data);
    }

    public function load_article()
    {
        $article = $_POST['article'];
        echo $this->load->view('about_us/' . $article, true);
    }


    public function loadByID()
    {
        $id = $_POST['id'];
        $article = $this->articles_model->loadByID($id);

        $gallery = '';
        if (trim($article->picture_gallery) != '') {
            $pictures = explode("\n", trim($article->picture_gallery));
            $gallery = $this->load->view('news/gallery', array('pictures' => $pictures), true);
        }

        echo $article->content . $gallery;
    }

    public function save()
    {
        $cover = $this->upload_file('product_cover');
        $download = $this->upload_file('userfile');

        $_POST['cover'] = ($cover == '' ? '' : '/uploads/' . $cover);
        $_POST['download'] = ($download == '' ? '' : $download);

        foreach ($_POST as $key => $item) {
            if ($key === 'is_hot' || $key === 'desc' || $key === 'keywords') continue; //指定允许空值的字段

            if (empty($_POST[$key])) {
                unset($_POST[$key]);
            }
        }

        if (isset($_POST['id'])) {
            //$_POST['ctime'] = strtotime($_POST['ctime']);
            $_POST['mtime'] = time();
            $this->articles_model->update($_POST);
        } else {
            $_POST['ctime'] = time();
            $_POST['mtime'] = time();
            $this->articles_model->insert($_POST);
        }

        echo json_encode(array('success' => true));
    }

    private function upload_file($name)
    {
        $config['upload_path'] = './uploads/';
        $config['allowed_types'] = 'gif|jpg|png|txt|doc|pdf';
        $config['max_size'] = '9000000'; //9MB
        $config['max_width'] = '4096';
        $config['max_height'] = '4096';

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload($name)) {
            $error = array('error' => $this->upload->display_errors());
            return '';
        }

        $data = array('upload_data' => $this->upload->data());

        return $this->time_file_name($data['upload_data']['full_path']);
    }

    private function time_file_name($file_path)
    {
        $info = pathinfo($file_path);

        $new_file_name = (strval((int)round(microtime(true) * 10000))) . '.' . $info['extension'];

        $new_file_path = $info['dirname'] . '/' . $new_file_name;

        rename($file_path, $new_file_path);

        return $new_file_name;
    }

    public function getList()
    {
        $option = $_GET;

        if (isset($option['type_id'])) {
            $data = $this->articles_model->get($option);
            echo json_encode($data);
        }
    }

    public function cat($cat_id)
    {
        $articles = $this->articles_model->getCatList(array(
            'type_id' => $cat_id
        ));

        //取铁杆文章分类
        $this->load->model('types_model');
        $nav_menu = $this->types_model->get_nav_menu(234);

        $data = array(
            'title' => '文章列表',
            'css' => array(),
            'js' => array(),
            'nav_menu' => $nav_menu,
            'articles' => $articles
        );

        if (ENVIRONMENT === 'production') {
            $this->load->view('article_list', $data);
        } else {
            $this->load->view('header', $data);
            $this->load->view('pages/cat', $data);
            $this->load->view('copy_right', $data);
            $this->load->view('footer', $data);
        }
    }

    public function getDownloadList()
    {
        $type_id = $_GET['type_id'];
        $page = $_GET['page'];

        $list = $this->articles_model->getDownloadList($_GET);

        $data = array(
            'list' => $list['data'],
            'pager' => $this->build_pagebar($list['total'], 10, $page, '/adf/__page__', $type_id)
        );

        echo $this->load->view('supports_services/download-center', $data, true);
    }

    public function getDownloadListSearch()
    {
        $keyword = $_POST['keyword'];

        $list = $this->articles_model->getDownloadListSearch($keyword);

        $data = array(
            'list' => $list['data'],
            'pager' => ''
        );

        echo $this->load->view('supports_services/download-center', $data, true);
    }

    public function getListByType()
    {
        $type_id = $_POST['type_id'];

        $data = $this->articles_model->getListByType($type_id);

        echo json_encode($data);
    }

    public function loadNewsList()
    {
        $type_id = $_POST['type_id'];
        //$page = $_GET['page'];

        $list = $this->articles_model->getListByType($type_id);

        $this->load->model('types_model');

        $data = array(
            'type_info' => $this->types_model->getByID($type_id),
            'list' => $list,
            'pager' => '' //$this->build_pagebar($list['total'], 20, $page, '/adf/__page__', $type_id)
        );

        echo $this->load->view('news/news-list', $data, true);
    }

    public function loadSupportsServicesList()
    {
        $type_id = $_POST['type_id'];

        $list = $this->articles_model->getListByType($type_id);

        $this->load->model('types_model');

        $data = array(
            'type_info' => $this->types_model->getByID($type_id),
            'list' => $list,
            'pager' => ''
        );

        echo $this->load->view('supports_services/category-list', $data, true);
    }

    /**
     * 生成分页条
     *
     * @param integer $total 总记录数
     * @param integer $perpage 每页显示记录数
     * @param integer $page 当前页码
     * @param string $url 链接,其中的__page__将用页码替换
     *
     * @return string
     */
    function build_pagebar($total, $perpage, $page, $url, $type_id = 0)
    {
        $pages = ceil($total / $perpage);
        $page = $page <= 0 ? 1 : $page;

        $total = $total <= 0 ? 1 : $total;

        /*
        if (false === strpos($url, ".") && substr($url, -1) != '/')
        {
            $url .= '/';
        }
        */

        $html = '<div class="pagination"><ul class="clearfix">';

        if ($pages <= 11) {
            $start = 1;
            $end = $pages;
        } else if ($page > 6 && $page + 5 <= $pages) {
            $start = $page - 5;
            $end = $page + 5;
        } else if ($page + 5 > $pages) {
            $start = $pages - 10;
            $end = $pages;
        } else if ($page <= 6) {
            $start = 1;
            $end = 11;
        }

        //
        if ($page == 1) {
            $html .= "<li><a>Prev</a></li>";
        } else {
            //$html .= "<li><a href=\"" . str_replace("__page__", $page - 1, $url) . "\">Prev</a></li>";
            $html .= "<li><a href=\"javascript: getDownloadList(" . $type_id . ", " . ($page - 1) . ");\">Prev</a></li>";
        }

        if ($start > 1) {
            $html .= "<li><a href=\"" . str_replace("__page__", 1, $url) . "\">1</a></li>";
        }

        if ($start > 2) {
            $html .= "<li><a href=\"" . str_replace("__page__", 2, $url) . "\">2</a></li>";
        }

        if ($start > 3) {
            $html .= "<li><a>...</a></li>";
        }

        for ($i = $start; $i <= $end; $i++) {
            if ($page == $i) {
                $html .= "<li class=\"active\"><a href=\"javascript: void(0)\">$i</li>";
            } else {
                $html .= "<li><a href=\"javascript: getDownloadList(" . $type_id . ", " . $i . ");\">$i</a></li>";
            }
        }

        if ($end < $pages - 1) {
            $html .= "<li><a>...</a></li>";
        }

        if ($end < $pages) {
            $html .= "<li><a href=\"" . str_replace("__page__", $pages, $url) . "\">$pages</a></li>";
        }

        if ($page >= $pages) {
            $html .= "<li><a>Next</a></li>";
        } else {
            //$html .= "<li><a href=\"" . str_replace("__page__", $page + 1, $url) . "\">Next</a></li>";
            $html .= "<li><a href=\"javascript: getDownloadList(" . $type_id . ", " . ($page + 1) . ");\">Next</a></li>";
        }

        $html .= "</ul></div>";

        return $html;
    }


    public function delete()
    {
        $id = $_POST['id'];

        $this->articles_model->deleteByID($id);

        echo json_encode(array(
            'success' => true
        ));
    }
}

/* End of file */
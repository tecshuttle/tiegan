<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class equipments extends MY_Controller
{
    var $productBelongLinks = array(); //产品的所属分类链，用于展开相应菜单

    function __construct()
    {
        parent::__construct(); // Call the Model constructor
        $this->load->model('equipments_model');
        $this->load->model('equipments_size_model');
    }

    public function index($tag_id, $page)
    {
        //取产品列表
        $this->load->model('equipments_model');

        $per_page = 10;

        $option = array(
            'limit' => $per_page,
            'offset' => ($page - 1) * $per_page
        );

        if ($tag_id != 0) {
            $option['tag_id'] = $tag_id;
        }

        $matchs = $this->equipments_model->select($option);

        //取产品分类
        $sql = 'select * from equipments_tag';
        $rows = $this->db->query($sql);

        $data = array(
            'title' => '比赛',
            'css' => array(),
            'js' => array(),
            'menu' => 'product',
            'tags' => $rows->result(),
            'tag_id' => $tag_id,
            'matchs' => $matchs,
            'pager' => build_pagebar($matchs['total'], $per_page, $page, '/equipments/' . $tag_id . '/__page__')
        );

        if (ENVIRONMENT === 'production') {
            $this->load->view('product_list', $data);
        } else {
            $this->load->view('header', $data);
            $this->load->view('product/list', $data);
            $this->load->view('copy_right', $data);
            $this->load->view('footer', $data);
        }
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

    public function match($id)
    {
        //取产品
        $this->load->model('equipments_model');
        $match = $this->equipments_model->select(array(
            'id' => $id
        ));

        //取产品分类
        if (!empty($match->tag_id)) {
            $this->load->model('tag_model');
            $tag = $this->tag_model->getByID($match->tag_id);
            $match->tag_name = $tag->name;
        }

        //取相关产品
        $match->relative_product = $this->equipments_model->getRelative($match->relative);

        $match->seat_desc = '<p>' . preg_replace('/\n/', '<p>', $match->seat_desc);

        $data = array(
            'title' => '比赛',
            'css' => array(),
            'js' => array(),
            'menu' => 'product',
            'match' => $match
        );

        if (ENVIRONMENT === 'production') {
            $this->load->view('product_detail', $data);
        } else {
            $this->load->view('header', $data);
            $this->load->view('product/match', $data);
            $this->load->view('copy_right', $data);
            $this->load->view('footer', $data);
        }
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

    public function size_save()
    {
        if ($_POST['id'] == 0) {
            $_POST['ctime'] = time();
            $_POST['mtime'] = time();
            $this->equipments_size_model->insert($_POST);
        } else {
            $_POST['mtime'] = time();
            $this->equipments_size_model->update($_POST);
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
        $data = $this->equipments_model->getProduct($option);
        echo json_encode($data);
    }

    public function getTagList()
    {
        $data = $this->equipments_model->getTagList();
        echo json_encode($data);
    }

    public function getSizeList()
    {
        $option = (empty($_POST) ? $_GET : $_POST);
        $data = $this->equipments_size_model->select($option);
        echo json_encode($data);
    }

    public function delete()
    {
        $id = $_POST['id'];

        $this->equipments_model->deleteByID($id);

        echo json_encode(array(
            'success' => true
        ));
    }

    public function size_delete()
    {
        $id = $_POST['id'];

        $this->equipments_size_model->deleteByID($id);

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
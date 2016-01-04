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
            'sortBy' => 'order',
            'sortDirection' => 'ASC',
            'limit' => $per_page,
            'offset' => ($page - 1) * $per_page
        );

        if ($tag_id != 0) {
            $this->load->model('equipments_tagged_model');
            $ids = $this->equipments_tagged_model->getTeamIDByTagID($tag_id);
            $option['ids'] = $ids;
        }

        $matchs = $this->equipments_model->select($option);

        //取产品分类
        $sql = 'select * from equipments_tag order by `order` asc';
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
        //标签数组转换为字符串
        if (isset($_POST['tag_id'])) {
            $_POST['tag_id'] = implode(',', $_POST['tag_id']);
        } else {
            $_POST['tag_id'] = '';
        }

        $cover = $this->upload_product_cover('file_cover');
        $_POST['cover'] = ($cover == '' ? '' : '/uploads/' . $cover);

        $cover1 = $this->upload_product_cover('file_cover1');
        $_POST['cover1'] = ($cover1 == '' ? '' : '/uploads/' . $cover1);

        $cover2 = $this->upload_product_cover('file_cover2');
        $_POST['cover2'] = ($cover2 == '' ? '' : '/uploads/' . $cover2);

        $cover3 = $this->upload_product_cover('file_cover3');
        $_POST['cover3'] = ($cover3 == '' ? '' : '/uploads/' . $cover3);

        if ($cover != '') {
            $_POST['cover'] = '/uploads/' . $cover;
        }

        foreach ($_POST as $key => $item) {
            if ($key === 'tag_id' || $key === 'is_hot' || $key === 'desc' || $key === 'keywords') continue; //指定允许空值的字段

            if (empty($_POST[$key])) {
                unset($_POST[$key]);
            }
        }

        if ($_POST['id'] == 0) {
            $_POST['ctime'] = time();
            $_POST['mtime'] = time();
            $this->equipments_model->insert($_POST);
            $pid = $this->db->insert_id();
        } else {
            $pid = $_POST['id'];
            $_POST['mtime'] = time();
            $this->equipments_model->update($_POST);
        }

        //增加标签记录
        $this->update_tagging($pid, $_POST['tag_id']);

        echo json_encode(array('success' => true));
    }

    private function update_tagging($id, $tag_id_str)
    {
        $this->load->model('equipments_tagged_model');
        $this->equipments_tagged_model->deleteByPID($id);

        if ($tag_id_str === '') return;

        $tagging = explode(',', $tag_id_str);

        foreach ($tagging as $tag_id) {

            $this->equipments_tagged_model->insert(array(
                'team_id' => $id,
                'tag_id' => $tag_id
            ));
        }
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


    private function upload_product_cover($name)
    {
        $config['upload_path'] = './uploads/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        $config['max_size'] = '9000000'; //9MB
        $config['max_width'] = '5024';
        $config['max_height'] = '5024';

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload($name)) {
            $error = array('error' => $this->upload->display_errors());
            //print_r($error);
            return '';
        }

        $data = array('upload_data' => $this->upload->data());

        return $this->time_file_name($data['upload_data']['full_path'], $name);
    }

    private function time_file_name($file_path, $name = '')
    {
        $info = pathinfo($file_path);

        $new_file_name = guid() . '.' . $info['extension'];

        $new_file_path = $info['dirname'] . '/' . $new_file_name;

        //resize image
        if ($name === 'file_cover' or $name === 'file_cover1' or $name === 'file_cover2' or $name === 'file_cover3') {
            include_once dirname(dirname(dirname(__FILE__))) . '/resizeImage.php';

            $src_img = $file_path;
            $dst_img = $new_file_path;

            if ($name === 'file_cover') {
                new resizeImage($src_img, "370", "224", "0", $dst_img);
            }

            if ($name === 'file_cover1' or $name === 'file_cover2' or $name === 'file_cover3') {
                new resizeImage($src_img, "484", "272", "0", $dst_img);
            }

            unlink($file_path);
        }

        return $new_file_name;
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
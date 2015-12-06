<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class pages extends MY_Controller
{
    public function index()
    {
        echo 'access deny';
    }

    public function single($code)
    {
        $this->load->model('articles_model');

        if (is_numeric($code)) {
            $article = $this->articles_model->select(array(
                'id' => $code
            ));
        } else {
            $article = $this->articles_model->select(array(
                'code' => $code
            ));
        }

        //取铁杆文章分类
        $this->load->model('types_model');
        $nav_menu = $this->types_model->get_nav_menu(234);

        $data = array(
            'title' => $article->name,
            'css' => array(),
            'js' => array(),
            'nav_menu' => $nav_menu,
            'article' => $article
        );

        $this->load->view('header', $data);
        $this->load->view('pages/single', $data);
        $this->load->view('copy_right', $data);
        $this->load->view('footer', $data);
    }
}

/* End of file */
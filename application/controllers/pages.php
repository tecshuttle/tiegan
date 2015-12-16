<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class pages extends MY_Controller
{
    function __construct()
    {
        parent::__construct(); // Call the Model constructor

        $this->menu = array(
            225 => 'back',
            223 => 'travel',
            227 => 'news',
            233 => 'fan',
        );
    }

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

        //markdown文章转义
        if ($article->editor === 'markdown') {
            $parse_down = new Parsedown();
            $article->content = $parse_down->text($article->content);
        }

        //文章PV
        $this->articles_model->pv_inc($article->id);

        //取铁杆文章分类
        $this->load->model('types_model');
        $nav_menu = $this->types_model->get_nav_menu(234);

        $data = array(
            'title' => $article->name,
            'css' => array(),
            'js' => array(),
            'menu' => (isset($this->menu[$article->type_id]) ? $this->menu[$article->type_id] : ''),
            'nav_menu' => $nav_menu,
            'article' => $article
        );

        if (ENVIRONMENT === 'production') {
            $this->load->view('article_detail', $data);
        } else {
            $this->load->view('header', $data);
            $this->load->view('pages/single', $data);
            $this->load->view('copy_right', $data);
            $this->load->view('footer', $data);
        }
    }
}

/* End of file */
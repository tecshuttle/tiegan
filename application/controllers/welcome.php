<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends MY_Controller
{

    /**
     * Index Page for this controller.
     *
     * Maps to the following URL
     *        http://example.com/index.php/welcome
     *    - or -
     *        http://example.com/index.php/welcome/index
     *    - or -
     * Since this controller is set as the default controller in
     * config/routes.php, it's displayed at http://example.com/
     *
     * So any other public methods not prefixed with an underscore will
     * map to /index.php/welcome/<method_name>
     * @see http://codeigniter.com/user_guide/general/urls.html
     */
    public function index()
    {
        //取官方文档
        $this->load->model('articles_model');
        $doc = $this->articles_model->getDoc(226);

        //取铁杆文章分类
        $this->load->model('types_model');
        $nav_menu = $this->types_model->get_nav_menu(234);

        //铁杆文章每分类取8篇

        foreach ($nav_menu as &$menu) {
            $articles = $this->articles_model->select(array(
                'type_id' => $menu->id,
                'limit' => 8
            ));

            $menu->articles = $articles['data'];
        }

        //print_r($nav_menu);

        //取产品
        $this->load->model('equipments_model');

        $products = $this->equipments_model->select(array(
            'limit' => 8
        ));

        $data = array(
            'css' => array(),
            'js' => array(),
            'nav_menu' => $nav_menu,
            'products' => $products['data'],
            'doc' => $doc
        );

        if (ENVIRONMENT === 'production') {
            $this->load->view('home', $data);
        } else {
            $this->load->view('header', $data);
            $this->load->view('home', $data);
            $this->load->view('help_center', $data);
            $this->load->view('copy_right', $data);
            $this->load->view('partner_links', $data);
            $this->load->view('footer', $data);
        }
    }
}

//end file
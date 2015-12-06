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
        $nav_menu = $this->types_model->get_menu(234);

        //铁杆文章每分类取8篇

        $data = array(
            'css' => array(),
            'js' => array(),
            'nav_menu' => $nav_menu,
            'doc' => $doc
        );

        if (ENVIRONMENT === 'development') {
            $this->load->view('header', $data);
            $this->load->view('home', $data);
            $this->load->view('help_center', $data);
            $this->load->view('copy_right', $data);
            $this->load->view('partner_links', $data);
            $this->load->view('footer', $data);
        } else {
            $this->load->view('qyer', $data);
        }
    }
}

//end file
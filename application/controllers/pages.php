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

        $article = $this->articles_model->select(array(
            'code' => $code
        ));

        $data = array(
            'css' => array(),
            'js' => array(),
            'article' => $article
        );

        $this->load->view('header', $data);
        $this->load->view('pages/single', $data);
        $this->load->view('copy_right', $data);
        $this->load->view('footer', $data);
    }
}

/* End of file */
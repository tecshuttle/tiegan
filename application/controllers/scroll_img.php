<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class scroll_img extends CI_Controller
{
    function __construct()
    {
        parent::__construct(); // Call the Model constructor
        $this->load->model('scroll_img_model');
    }

    public function save()
    {
        $_POST['mtime'] = time();

        if ($_POST['id'] == 0) {
            $this->scroll_img_model->insert($_POST);
        } else {
            $this->scroll_img_model->update($_POST);
        }

        echo json_encode(array('success' => true));
    }

}

/* End of file */
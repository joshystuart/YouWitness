<?php

/**
 * You Witness (http://youwitness.com.au/)
 *
 * @link      http://github.com/crimsonronin/YouWitness for the canonical source repository
 */

namespace YouWitness\Controller;

use YouWitness\Controller\AbstractAdminController;
use Zend\View\Model\ViewModel;

class AdminController extends AbstractAdminController {

    public function indexAction() {
        $username = $this->getRequest()->getPost('username');
        if (!empty($username)) {
            $password = $this->getRequest()->getPost('password');

            $this->logIn($username, $password);
        }

        if ($this->isLoggedIn() === false) {
            $view = new ViewModel();
            $view->setTemplate('you-witness/admin/login.phtml'); // path to phtml file under view folder
            return $view;
        } else {
            return ['app_script' => '/js/admin.js'];
        }
    }

}
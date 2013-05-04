<?php

/**
 * You Witness (http://youwitness.com.au/)
 *
 * @link      http://github.com/crimsonronin/YouWitness for the canonical source repository
 */

namespace YouWitness\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\Session\Container as SessionContainer;

abstract class AbstractAdminController extends AbstractActionController {

    protected $session;

    protected function isLoggedIn() {

        if ($this->getSession()->offsetGet('loggedIn') === true) {
            return true;
        }
        return false;
    }

    protected function getSession() {
        if (empty($this->session)) {
            $this->session = new SessionContainer('admin');
        }
        return $this->session;
    }

    protected function logIn($user, $pass) {
        if ($user == 'alyssa' && $pass == 'morgan89') {
            $this->getSession()->offsetSet('loggedIn', true);
        } else {
            $this->getSession()->offsetSet('loggedIn', false);
        }
    }

}
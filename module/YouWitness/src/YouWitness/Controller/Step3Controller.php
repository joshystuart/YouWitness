<?php

/**
 * You Witness (http://youwitness.com.au/)
 *
 * @link      http://github.com/crimsonronin/YouWitness for the canonical source repository
 */

namespace YouWitness\Controller;

use YouWitness\Controller\AbstractController;
use Zend\View\Model\JsonModel;
use Zend\Session\Container as SessionContainer;

class Step3Controller extends AbstractController {

    public function create($data) {
        $session = new SessionContainer('base');
        if ($session->offsetExists('id') == true) {
            $em = $this->getEntityManager();

            $participant = $em->find('YouWitness\Entity\Participant', $session->offsetExists('id'));
            if ($participant) {
                //set current step
                $this->setStep($participant, 'Step 3');
                return new JsonModel(['error' => false]);
            } else {
                return new JsonModel(['error' => true]);
            }
        } else {
            return new JsonModel(['error' => true, 'message' => 'You have not started the experiment']);
        }
    }

}
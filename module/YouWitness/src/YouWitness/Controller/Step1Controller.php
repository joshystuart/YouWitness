<?php

/**
 * You Witness (http://youwitness.com.au/)
 *
 * @link      http://github.com/crimsonronin/YouWitness for the canonical source repository
 */

namespace YouWitness\Controller;

use YouWitness\Controller\AbstractController;
use Zend\View\Model\JsonModel;
use YouWitness\Entity\Participant;
use Zend\Session\Container as SessionContainer;

class Step1Controller extends AbstractController {

    public function create($data) {
        $session = new SessionContainer('base');
        if ($session->offsetExists('id') == false) {
            //save participant
            $participant = new Participant();
            $participant->date = new \DateTime("now");

            //save to db
            $em = $this->getEntityManager();
            $em->persist($participant);
            $em->flush();
            
            //set current step
            $this->setStep($participant, 'Step 1');
            
            $session->offsetSet('id', $participant->id);

            return new JsonModel(['error' => false]);
        } else {
            return new JsonModel(['error' => true, 'message' => 'You have already started or completd the experiment.']);
        }
    }

}
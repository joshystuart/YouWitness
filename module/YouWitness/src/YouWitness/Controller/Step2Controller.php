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

class Step2Controller extends AbstractController {

    public function create($data) {
        $session = new SessionContainer('base');
        if ($session->offsetExists('id') == true && $session->offsetExists('gender') === false) {
            $em = $this->getEntityManager();

            $participant = $em->find('YouWitness\Entity\Participant', $session->offsetExists('id'));
            if ($participant) {
                $participant->gender = $data['gender'];

                //save to db
                $em->persist($participant);
                $em->flush();

                //set current step
                $this->setStep($participant, 'Step 2');
                $session->offsetSet('gender', $participant->gender);

                return new JsonModel(['error' => false]);
            } else {
                return new JsonModel(['error' => true]);
            }
        } else {
            return new JsonModel(['error' => true, 'message' => 'You have already started or completd the experiment.']);
        }
    }

}
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

class EmailController extends AbstractController {

    private $session;

    public function create($data) {
        $this->session = new SessionContainer('base');
        if ($this->session->offsetExists('id') == false) {
            $participant = $this->createParticipant();
        } else {
            $participant = $this->getParticipant($this->session->offsetGet('id'));
        }
        $this->updateParticipant($participant, $data);
        return new JsonModel([]);
    }

    private function getParticipant($id) {
        $em = $this->getEntityManager();
        return $em->find('YouWitness\Entity\Participant', $id);
    }

    private function updateParticipant($participant, $data) {
        $em = $this->getEntityManager();
        if (isset($data['gender'])) {
            $participant->gender = $data['gender'];
        }if (isset($data['email'])) {
            $participant->email = $data['email'];
        }
        $em->persist($participant);
        $em->flush();
    }

    private function createParticipant() {
        $participant = new Participant();

        //save to db
        $em = $this->getEntityManager();
        $em->persist($participant);
        $em->flush();

        $this->session->offsetSet('id', $participant->id);
        return $participant;
    }

}
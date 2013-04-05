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
use YouWitness\Entity\Step;
use YouWitness\Entity\Lineup;
use Zend\Session\Container as SessionContainer;

class ExperimentController extends AbstractController {

    private $session;

    public function create($data) {
        $this->session = new SessionContainer('base');
        $oldSection = $this->session->offsetGet('section');

        if (isset($data['section']) && $data['section'] < $oldSection) {
            return new JsonModel(['error' => true, 'message' => 'You cannot complete the experiment more than once']);
        }

        if ($this->session->offsetExists('id') == false) {
            $participant = $this->createParticipant();
        } else {
            $participant = $this->getParticipant($this->session->offsetGet('id'));
        }
        if ($participant) {
            switch ($data['section']) {
                case '1':
                case '3':
                case '4':
                    break;
                case '2':
                    $this->updateParticipant($participant, $data);
                    break;
                case '5':
                    $r = $this->getLineUp();
                    break;
            }

            $this->setStep($participant, $data['section']);
            return new JsonModel(['error' => false, 'newSection' => $data['section'], 'oldSection' => $oldSection]);
        } else {
            return new JsonModel(['error' => true, 'message' => 'Cannot create participant']);
        }
    }

    private function getLineUp() {
        $em = $this->getEntityManager();
        $em->find('YouWitness\Entity\Lineup', $id);
        return ['lineup' => 'Sequential'];
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
        $participant->date = new \DateTime("now");

        //save to db
        $em = $this->getEntityManager();
        $em->persist($participant);
        $em->flush();

        $this->session->offsetSet('id', $participant->id);
        return $participant;
    }

    protected function setStep(Participant $participant, $section) {
        if (!empty($section)) {
            $step = new Step();
            $step->participant = $participant;
            $step->section = 'Step ' . $section;

            $this->session->offsetSet('section', $section);

            $em = $this->getEntityManager();
            $em->persist($step);
            $em->flush();
        }
    }

}
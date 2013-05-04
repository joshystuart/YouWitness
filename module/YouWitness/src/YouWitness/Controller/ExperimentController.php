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
use YouWitness\Entity\ParticipantLineup;
use Zend\Session\Container as SessionContainer;
use Zend\Session\SessionManager;

class ExperimentController extends AbstractController {

    private $session;

    public function create($data) {
        $r = [];
        $this->session = new SessionContainer('base');
        $oldSection = $this->session->offsetGet('section');

        if (isset($data['section']) && $data['section'] < $oldSection) {
            $this->session->offsetUnset('section');
            $this->session->offsetUnset('id');
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
                    $r = $this->getLineUp($participant);
                    break;
                case '6':
                    $r = $this->setFinished($participant);
                    break;
            }

            $this->setStep($participant, $data['section']);
            return new JsonModel(['error' => false, 'newSection' => $data['section'], 'oldSection' => $oldSection, 'data' => $r]);
        } else {
            return new JsonModel(['error' => true, 'message' => 'Cannot create participant', 'data' => $r]);
        }
    }

    private function setFinished($participant) {
        $em = $this->getEntityManager();
        $pls = $this->getParticipantLineup($participant);
        foreach ($pls as $pl) {
            if (empty($pl->date_end)) {
                $pl->date_end = new \DateTime("now");
                $em->persist($pl);
            }
        }
        $em->flush();
    }

    private function getLineUp($participant) {
        $em = $this->getEntityManager();
        $dql = "SELECT l FROM YouWitness\Entity\Lineup l
                ORDER BY l.num ASC";
        $query = $em->createQuery($dql)
                ->setMaxResults(1);
        $lineup = $query->getSingleResult();

        //set participant lineup
        $this->createParticipantLineup($participant, $lineup);

        $lineup->num = $lineup->num + 1;
        $em->persist($lineup);
        $em->flush();
        $this->session->offsetSet('lineupId', $lineup->id);
        return [
            'lineup' => $lineup->method,
            'lineupId' => $lineup->id,
            'suspects' => $lineup->getSuspects(),
        ];
    }

    private function createParticipantLineup($participant, $lineup) {
        $em = $this->getEntityManager();

        $pl = new ParticipantLineup();
        $pl->participant = $participant;
        $pl->lineup = $lineup;

        $em->persist($pl);
        $em->flush();
    }

    private function getParticipant($id) {
        $em = $this->getEntityManager();
        return $em->find('YouWitness\Entity\Participant', $id);
    }

    private function getParticipantLineup($participant) {
        $em = $this->getEntityManager();
        return $em->getRepository('YouWitness\Entity\ParticipantLineup')
                        ->findBy([
                            'participant' => $participant
        ]);
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
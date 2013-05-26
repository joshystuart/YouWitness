<?php

/**
 * You Witness (http://youwitness.com.au/)
 *
 * @link      http://github.com/crimsonronin/YouWitness for the canonical source repository
 */

namespace YouWitness\Controller;

use YouWitness\Controller\AbstractController;
use Zend\View\Model\JsonModel;
use YouWitness\Entity\Lineup;
use YouWitness\Entity\ParticipantLineup;
use YouWitness\Entity\ParticipantLineupSuspect;
use Zend\Session\Container as SessionContainer;

class ExperimentLineupController extends AbstractController {

    private $session;

    public function create($data) {
        $this->session = new SessionContainer('base');
        $id = $this->session->offsetGet('id');
        $lineupId = $this->session->offsetGet('lineupId');

        if (isset($data['lineup']) && $data['lineup'] == Lineup::SEQUENTIAL) {
            $participant = $this->getParticipant($id);
            $lineup = $this->getLineUp($lineupId);
            $suspect = $this->getSuspect($data['suspectId']);

            $this->createSelection($lineup, $participant, $suspect, $data['isPerpetrator']);
            if ($data['isPerpetrator'] == 'true') {
                //add the remainder of the suspects as "no"
                $this->createRemainderOfSuspects($lineup, $participant, 'false');
            }
        } else if (isset($data['lineup']) && $data['lineup'] == Lineup::SIMULTANEOUS) {
            $participant = $this->getParticipant($id);
            $lineup = $this->getLineUp($lineupId);

            if ($data['isPerpetrator'] == 'true') {
                $suspect = $this->getSuspect($data['suspectId']);
                $this->createSelection($lineup, $participant, $suspect, $data['isPerpetrator']);
            }
            $this->createRemainderOfSuspects($lineup, $participant, 'false');
        } else if (isset($data['confidence'])) {
            $em = $this->getEntityManager();
            $participant = $this->getParticipant($id);
            $lineup = $this->getLineUp($lineupId);

            $pls = $this->getParticipantLineUp($lineup, $participant);
            foreach ($pls as $pl) {
                $pl->confidence = intval($data['confidence']);
                $em->persist($pl);
                break;
            }
            $em->flush();
        }
        return new JsonModel([]);
    }

    private function createRemainderOfSuspects($lineup, $participant, $isPerp) {
        $suspects = $this->getParticipantLineUpSuspects($lineup, $participant);
        $allSuspects = $this->getAllLineUpSuspects($lineup);

        foreach ($allSuspects as $lineupSuspects) {
            if ($this->inSuspects($suspects, $lineupSuspects->suspect) === false) {
                $this->createSelection($lineup, $participant, $lineupSuspects->suspect, $isPerp);
            }
        }
    }

    private function inSuspects($suspects, $isSuspect) {
        foreach ($suspects as $suspect) {
            if ($isSuspect->id == $suspect->suspect->id) {
                return true;
            }
        }
        return false;
    }

    private function createSelection($lineup, $participant, $suspect, $isPerp) {
        $em = $this->getEntityManager();

        $pls = new ParticipantLineupSuspect();
        $pls->participant = $participant;
        $pls->lineup = $lineup;
        $pls->suspect = $suspect;
        $pls->setIsPerpetrator($isPerp);

        $em->persist($pls);
        $em->flush();
    }

    private function getSuspect($id) {
        $em = $this->getEntityManager();
        return $em->find('YouWitness\Entity\Suspect', $id);
    }

    private function getLineup($id) {
        $em = $this->getEntityManager();
        return $em->find('YouWitness\Entity\Lineup', $id);
    }

    private function getParticipantLineUp($lineup, $participant) {
        $em = $this->getEntityManager();
        return $em->getRepository('YouWitness\Entity\ParticipantLineup')
                        ->findBy([
                            'lineup' => $lineup,
                            'participant' => $participant
        ]);
    }

    private function getAllLineUpSuspects($lineup) {
        $em = $this->getEntityManager();
        return $em->getRepository('YouWitness\Entity\LineupSuspect')
                        ->findBy([
                            'lineup' => $lineup
        ]);
    }

    private function getParticipantLineUpSuspects($lineup, $participant) {
        $em = $this->getEntityManager();
        return $em->getRepository('YouWitness\Entity\ParticipantLineupSuspect')
                        ->findBy([
                            'lineup' => $lineup,
                            'participant' => $participant
        ]);
    }

    private function getParticipant($id) {
        $em = $this->getEntityManager();
        return $em->find('YouWitness\Entity\Participant', $id);
    }

}
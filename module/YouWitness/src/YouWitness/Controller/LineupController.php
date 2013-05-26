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
use YouWitness\Entity\LineupSuspect;
use YouWitness\Entity\Suspect;

class LineupController extends AbstractController {

    private $session;

    public function getList() {
        $lineups = $this->getLineups();
        return new JsonModel(['data' => $lineups]);
    }

    public function create($data) {
        $em = $this->getEntityManager();
        $lineup = new Lineup();
        $lineup->setMethod($data['lineupMethod']);
        $lineup->comments = $data['lineupComments'];
        $em->persist($lineup);
        $em->flush();

        if (count($data['lineupSuspects']) > 0) {
            foreach ($data['lineupSuspects'] as $suss) {
                $suspect = $this->getSuspect($suss['suspectId']);
                $this->createLineupSuspect($lineup, $suspect, $suss['isPerpetrator']);
            }
            $em->persist($lineup);
            $em->flush();
        } else {
            //remove
        }

        return new JsonModel(['data' => [
                'lineupId' => $lineup->id,
                'lineupMethod' => $lineup->method,
                'lineupComments' => $lineup->comments,
                'lineupNum' => $lineup->num,
                'lineupSuspects' => $lineup->getSuspects()
            ]
        ]);
    }

    public function update($id, $data) {
        $em = $this->getEntityManager();
        $lineup = $this->getLineup($id);
        $lineup->comments = $data['lineupComments'];
        $lineup->setMethod($data['lineupMethod']);
        $allLineupSuspects = clone($lineup->suspects);
        $lineup->suspects->clear();

        if (count($data['lineupSuspects']) > 0) {
            foreach ($data['lineupSuspects'] as $suss) {
                $suspect = $this->getSuspect($suss['suspectId']);
                $this->createLineupSuspect($lineup, $suspect, $suss['isPerpetrator']);
            }
        }

        $this->removeLineupSuspects($allLineupSuspects, $lineup->suspects);

        $em->persist($lineup);
        $em->flush();
        return new JsonModel([]);
    }

    private function removeLineupSuspects($allLineupSuspects, $activeLineupSuspects) {
        $em = $this->getEntityManager();
        foreach ($allLineupSuspects->toArray() as $ls) {
            if ($activeLineupSuspects->contains($ls) === false) {
                $em->remove($ls);
            }
        }
        $em->flush();
    }

    private function createLineupSuspect($lineup, $suspect, $isPerpertrator) {
        $em = $this->getEntityManager();
        $ls = $this->getLineupSuspect($lineup, $suspect);

        if ($ls) {
            $ls->setIsPerpetrator($isPerpertrator);
            $em->persist($ls);
            $em->flush();
        } else {
            $ls = new LineupSuspect();
            $ls->lineup = $lineup;
            $ls->suspect = $suspect;
            $ls->setIsPerpetrator($isPerpertrator);
            $ls->order = $this->getMaxSuspectOrder($lineup);
            $em->persist($ls);
            $em->flush();
        }
        $lineup->addSuspect($ls);
        return $ls;
    }

    private function getMaxSuspectOrder($lineup) {
        $em = $this->getEntityManager();
        $q = $em->createQuery("
            SELECT MAX(ls.order)
            FROM YouWitness\Entity\LineupSuspect ls
            WHERE ls.lineup = '" . $lineup->id . "'
            GROUP BY ls.lineup");

        $result = $q->getResult();
        if (empty($result)) {
            $order = 1;
        } else {
            $order = $q->getSingleScalarResult() + 1;
        }
        return $order;
    }

    private function getLineupSuspect($lineup, $suspect) {
        $em = $this->getEntityManager();
        return $em->find('YouWitness\Entity\LineupSuspect', ['suspect' => $suspect->id, 'lineup' => $lineup->id]);
    }

    public function delete($id) {
        $em = $this->getEntityManager();
        $lineup = $this->getLineup($id);
        $em->remove($lineup);
        $em->flush();
        return new JsonModel([]);
    }

    private function getLineup($id) {
        $em = $this->getEntityManager();
        return $em->find('YouWitness\Entity\Lineup', $id);
    }

    private function getLineups() {
        $l = [];
        $em = $this->getEntityManager();
        $lineups = $em->createQuery('SELECT l FROM YouWitness\Entity\Lineup l')
                ->getResult();
        foreach ($lineups as $line) {
            $l[] = [
                'lineupId' => $line->id,
                'lineupMethod' => $line->method,
                'lineupSuspects' => $line->getSuspects(),
                'lineupComments' => $line->comments,
                'lineupNum' => $line->num
            ];
        }
        return $l;
    }

    private function getSuspect($id) {
        $em = $this->getEntityManager();
        return $em->find('YouWitness\Entity\Suspect', $id);
    }

//    private function getLinesups() {
//        SELECT l.method, l.comments, ls.is_perpetrator, s.expression
//        FROM `Lineup` l
//        JOIN `LineupSuspect` ls ON l.id = ls.lineup
//        JOIN `Suspect` s ON s.id = ls.suspect
//    }
}
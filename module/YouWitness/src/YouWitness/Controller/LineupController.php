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

class LineupController extends AbstractController {

    private $session;

    public function getList() {
        $lineups = $this->getLineups();
        return new JsonModel(['data' => $lineups]);
    }

    public function update($id, $data) {
        $em = $this->getEntityManager();
        $lineup = $this->getLineup($id);
        $lineup->comments = $data['lineupComments'];
        $lineup->setMethod($data['lineupMethod']);

        $em->persist($lineup);
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

}
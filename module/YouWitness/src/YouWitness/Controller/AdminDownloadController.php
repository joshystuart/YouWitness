<?php

/**
 * You Witness (http://youwitness.com.au/)
 *
 * @link      http://github.com/crimsonronin/YouWitness for the canonical source repository
 */

namespace YouWitness\Controller;

use YouWitness\Controller\AbstractAdminController;

class AdminDownloadController extends AbstractAdminController {

    public function indexAction() {
        if ($this->isLoggedIn() === true) {
            $data = $this->createCsv();

            $response = $this->getEvent()->getResponse();
            $response->getHeaders()
                    ->addHeaderLine('Content-Disposition', 'attachment; filename="results.csv"')
                    ->addHeaderLine('Content-Type', 'application/octet-stream')
                    ->addHeaderLine('Content-Length', mb_strlen($data));
            $response->setContent($data);

            return $response;
        }
    }

    private function createCsv() {
        $results = $this->getResults();

        ob_start();
        $df = fopen("php://output", 'w');
        fputcsv($df, array_keys(reset($results)));
        foreach ($results as $row) {
            fputcsv($df, $row);
        }
        fclose($df);
        return ob_get_clean();
    }

    private function getResults() {
        $results = [];
        $em = $this->getEntityManager();
        $res = $em->createQuery('
            SELECT pl
            FROM YouWitness\Entity\ParticipantLineup pl
            WHERE pl.date_end IS NOT NULL
            ')->getResult();
        foreach ($res as $r) {
            $suspects = $r->lineup->getSuspects();

            $selectedSuspect = $this->getSelectedSuspect($r->lineup, $r->participant);

            $results[] = [
                'Sex' => $r->participant->gender,
                'Lineup Method' => $r->lineup->method,
                'Lineup Comments' => $r->lineup->comments,
                'Target Status' => ($this->isTargetPresent($suspects) === true) ? 'Target Present' : 'Target Absent',
                'Lineup Variation' => $this->calculateVariation($suspects),
                'Lineup Selection' => ($this->isSelectionCorrect($suspects, $r->lineup, $r->participant) === true) ? 'Correct' : 'Incorrect',
                'Selected Suspect' => ($selectedSuspect !== false) ? $selectedSuspect->id : 'None',
                'Selected Suspect Facial Expression' => ($selectedSuspect !== false) ? $selectedSuspect->expression : 'None',
                'Confidence' => $r->confidence,
            ];
        }
        return $results;
    }

    private function getSelectedSuspectValue($lineup, $participant) {
        $value = 'None';
        $selected = $this->getSelectedSuspect($lineup, $participant);
        if ($selected !== false) {
            $value = $selected->expression;
        }
        return $value;
    }

    private function getSelectedSuspect($lineup, $participant) {
        $em = $this->getEntityManager();
        $res = $em->createQuery('
            SELECT pls
            FROM YouWitness\Entity\ParticipantLineupSuspect pls
            WHERE pls.lineup = ?1
            AND pls.participant = ?2
            ')
                ->setParameter(1, $lineup)
                ->setParameter(2, $participant)
                ->getResult();
        foreach ($res as $r) {
            if ($r->is_perpetrator === true) {
                return $r->suspect;
            }
        }
        return false;
    }

    private function getCorrectSuspect($suspects) {
        foreach ($suspects as $suspect) {
            if ($suspect['isPerpetrator'] === true) {
                return $suspect;
            }
        }
        return false;
    }

    private function isSelectionCorrect($suspects, $lineup, $participant) {
        $selected = $this->getSelectedSuspect($lineup, $participant);
        $correct = $this->getCorrectSuspect($suspects);

        if ($correct === false && $selected !== false) {
            return false;
        } elseif ($correct !== false && $selected === false) {
            return false;
        } elseif ($correct === false && $selected === false) {
            return true;
        } elseif ($correct['suspectId'] == $selected->id) {
            return true;
        } else {
            return false;
        }
    }

    private function isTargetPresent($suspects) {
        $hasTarget = false;
        foreach ($suspects as $suspect) {
            if ($suspect['isPerpetrator'] === true) {
                $hasTarget = true;
            }
        }
        return $hasTarget;
    }

    private function calculateVariation($suspects, $toString = true) {
        $variations = [
            'Neutral' => 0,
            'Angry' => 0
        ];
        foreach ($suspects as $suspect) {
            $variations[$suspect['suspectExpression']]++;
        }

        if ($toString === true) {
            $str = [];
            foreach ($variations as $variation => $num) {
                $str[] = $num . ' ' . $variation;
            }
            $variations = implode(', ', $str);
        }

        return $variations;
    }

    protected function getEntityManager() {
        if (null === $this->em) {
            $this->em = $this->getServiceLocator()
                    ->get('Doctrine\ORM\EntityManager');
        }
        return $this->em;
    }

}
<?php

/**
 * You Witness (http://youwitness.com.au/)
 *
 * @link      http://github.com/crimsonronin/YouWitness for the canonical source repository
 */

namespace YouWitness\Controller;

use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;
use YouWitness\Entity\Participant;
use YouWitness\Entity\Step;

abstract class AbstractController extends AbstractRestfulController {

    protected $em;

    public function create($data) {
        return new JsonModel([]);
    }

    public function update($id, $data) {
        return new JsonModel([]);
    }

    public function delete($id) {
        return new JsonModel([]);
    }

    public function get($id) {
        return new JsonModel([]);
    }

    public function getList() {
        return new JsonModel([]);
    }

    protected function getEntityManager() {
        if (null === $this->em) {
            $this->em = $this->getServiceLocator()
                    ->get('Doctrine\ORM\EntityManager');
        }
        return $this->em;
    }

    protected function setStep(Participant $participant, $section) {
        $step = new Step();
        $step->participant = $participant;
        $step->section = $section;
        $em = $this->getEntityManager();

        $em->persist($step);
        $em->flush();
    }

}
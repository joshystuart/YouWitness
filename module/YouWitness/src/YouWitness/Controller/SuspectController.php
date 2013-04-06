<?php

/**
 * You Witness (http://youwitness.com.au/)
 *
 * @link      http://github.com/crimsonronin/YouWitness for the canonical source repository
 */

namespace YouWitness\Controller;

use YouWitness\Controller\AbstractController;
use Zend\View\Model\JsonModel;
use YouWitness\Entity\Suspect;

class SuspectController extends AbstractController {

    public function getList() {
        $suspects = $this->getSuspects();
        return new JsonModel(['data' => $suspects]);
    }

    public function create($data) {
        $suspect = new Suspect();
        $suspect->expression = $data['suspectExpression'];
        $suspect->image = $data['suspectImage'];

        $em = $this->getEntityManager();
        $em->persist($suspect);
        $em->flush();

        return new JsonModel(['data' => [
                'suspectId' => $suspect->id,
                'suspectImage' => $suspect->image,
                'suspectExpression' => $suspect->expression
            ]
        ]);
    }

    public function update($id, $data) {
        $em = $this->getEntityManager();

        $suspect = $this->getSuspect($id);
        $suspect->expression = $data['suspectExpression'];
        $suspect->image = $data['suspectImage'];

        $em->persist($suspect);
        $em->flush();
        return new JsonModel([]);
    }

    public function delete($id) {
        $em = $this->getEntityManager();
        $suspect = $this->getSuspect($id);
        $em->remove($suspect);
        $em->flush();
        return new JsonModel([]);
    }

    private function getSuspects() {
        $s = [];
        $em = $this->getEntityManager();
        $suspects = $em->createQuery('SELECT s FROM YouWitness\Entity\Suspect s')
                ->getResult();
        foreach ($suspects as $suspect) {
            $s[] = [
                'suspectId' => $suspect->id,
                'suspectImage' => $suspect->image,
                'suspectExpression' => $suspect->expression
            ];
        }
        return $s;
    }

    private function getSuspect($id) {
        $em = $this->getEntityManager();
        return $em->find('YouWitness\Entity\Suspect', $id);
    }

}
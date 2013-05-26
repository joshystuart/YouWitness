<?php

namespace YouWitness\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use YouWitness\Entity\LineupSuspect;
use YouWitness\Entity\Suspect;

/** @ORM\Entity */
class Lineup {

    /**
     * @ORM\Id 
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue 
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=20) 
     */
    private $method;

    /**
     * @ORM\Column(type="text") 
     */
    private $comments;

    /**
     * @ORM\Column(type="integer") 
     */
    private $num = 0;

    /**
     * @ORM\OneToMany(targetEntity="LineupSuspect", mappedBy="lineup", cascade={"all"})
     */
    private $suspects;

    const SEQUENTIAL = 'Sequential';
    const SIMULTANEOUS = 'Simultaneous';

    public function __construct() {
        $this->suspects = new ArrayCollection();
    }

    public function setMethod($method) {
        if ($method == self::SEQUENTIAL) {
            $this->method = self::SEQUENTIAL;
        } else {
            $this->method = self::SIMULTANEOUS;
        }
    }

    public function getSuspects() {
        $suspects = [];
        foreach ($this->suspects->toArray() as $suspect) {
            $suspects[] = [
                'suspectId' => $suspect->suspect->id,
                'suspectImage' => $suspect->suspect->image,
                'suspectExpression' => $suspect->suspect->expression,
                'isPerpetrator' => $suspect->is_perpetrator,
            ];
        }
        return $suspects;
    }

    public function inSuspects($suspectId) {
        foreach ($this->suspects->toArray() as $ls) {
            if ($ls->suspect->id == $suspectId) {
                return $ls->id;
            }
        }
        return false;
    }

    public function __get($key) {
        return $this->$key;
    }

    public function __set($key, $value) {
        $this->$key = $value;
    }

    public function addSuspect(LineupSuspect $suspect) {
        $this->suspects->add($suspect);
    }

    public function removeSuspect($suspect) {
        $this->suspects->remove($suspect);
    }

}

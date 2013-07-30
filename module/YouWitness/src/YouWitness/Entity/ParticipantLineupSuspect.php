<?php

namespace YouWitness\Entity;

use Doctrine\ORM\Mapping as ORM;
use YouWitness\Entity\Participant;
use YouWitness\Entity\Lineup;
use YouWitness\Entity\Suspect;

/** @ORM\Entity */
class ParticipantLineupSuspect {

    /**
     * @ORM\Id
     * @ORM\OneToOne(targetEntity="YouWitness\Entity\Participant")
     * @ORM\JoinColumn(name="participant", referencedColumnName="id", onDelete="CASCADE")
     * */
    private $participant;

    /**
     * @ORM\Id
     * @ORM\OneToOne(targetEntity="YouWitness\Entity\LineUp")
     * @ORM\JoinColumn(name="lineup", referencedColumnName="id", onDelete="CASCADE")
     * */
    private $lineup;

    /**
     * @ORM\Id
     * @ORM\OneToOne(targetEntity="YouWitness\Entity\Suspect")
     * @ORM\JoinColumn(name="suspect", referencedColumnName="id", onDelete="CASCADE")
     * */
    private $suspect;

    /**
     * @ORM\Column(type="boolean") 
     */
    private $is_perpetrator;

    public function setIsPerpetrator($is) {
        if ($is == 'true') {
            $is = 1;
        } else {
            $is = 0;
        }
        $this->is_perpetrator = $is;
    }

    public function __get($key) {
        return $this->$key;
    }

    public function __set($key, $value) {
        $this->$key = $value;
    }

}
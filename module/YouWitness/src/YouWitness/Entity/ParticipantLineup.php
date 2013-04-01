<?php

namespace YouWitness\Entity;

use Doctrine\ORM\Mapping as ORM;

/** @ORM\Entity */
class ParticipantLineup {

    /**
     * @ORM\Id
     * @ORM\OneToOne(targetEntity="Participant")
     * @ORM\JoinColumn(name="participant", referencedColumnName="id")
     * */
    private $participant;

    /**
     * @ORM\Id
     * @ORM\OneToOne(targetEntity="LineUp")
     * @ORM\JoinColumn(name="lineup", referencedColumnName="id")
     * */
    private $lineup;

    /**
     * @ORM\Column(type="date") 
     */
    private $date_start;

    /**
     * @ORM\Column(type="date") 
     */
    private $date_end;

    public function __get($key) {
        return $this->$key;
    }

    public function __set($key, $value) {
        $this->$key = $value;
    }

}
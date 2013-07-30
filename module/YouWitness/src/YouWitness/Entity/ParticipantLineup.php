<?php

namespace YouWitness\Entity;

use Doctrine\ORM\Mapping as ORM;
use YouWitness\Entity\Participant;
use YouWitness\Entity\Lineup;

/** @ORM\Entity */
class ParticipantLineup {

    /**
     * @ORM\Id
     * @ORM\OneToOne(targetEntity="YouWitness\Entity\Participant")
     * @ORM\JoinColumn(name="participant", referencedColumnName="id", onDelete="CASCADE")
     * */
    private $participant;

    /**
     * @ORM\Id
     * @ORM\OneToOne(targetEntity="YouWitness\Entity\Lineup")
     * @ORM\JoinColumn(name="lineup", referencedColumnName="id", onDelete="CASCADE")
     * */
    private $lineup;

    /**
     * @ORM\Column(type="datetime") 
     */
    private $date_start;

    /**
     * @ORM\Column(type="datetime", nullable=true) 
     */
    private $date_end;

    /**
     * @ORM\Column(type="integer", length=1, nullable=true) 
     */
    private $confidence;

    public function __construct() {
        $this->date_start = new \DateTime("now");
    }

    public function __get($key) {
        return $this->$key;
    }

    public function __set($key, $value) {
        $this->$key = $value;
    }

}
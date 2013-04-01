<?php

namespace YouWitness\Entity;

use Doctrine\ORM\Mapping as ORM;

/** @ORM\Entity */
class LineupSuspect {

    /**
     * @ORM\Id
     * @ORM\OneToOne(targetEntity="LineUp")
     * @ORM\JoinColumn(name="lineup", referencedColumnName="id")
     **/
    private $lineup;

    /**
     * @ORM\Id
     * @ORM\OneToOne(targetEntity="Suspect")
     * @ORM\JoinColumn(name="suspect", referencedColumnName="id")
     **/
    private $suspect;
    
    /** 
     * @ORM\Column(type="boolean") 
     */
    private $is_perpetrator;

    public function __get($key) {
        return $this->$key;
    }

    public function __set($key, $value) {
        $this->$key = $value;
    }

}
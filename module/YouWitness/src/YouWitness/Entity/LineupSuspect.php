<?php

namespace YouWitness\Entity;

use Doctrine\ORM\Mapping as ORM;
use YouWitness\Entity\Lineup;
use YouWitness\Entity\Suspect;

/** @ORM\Entity */
class LineupSuspect {

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="LineUp")
     * @ORM\JoinColumn(name="lineup", referencedColumnName="id", onDelete="CASCADE")
     * */
    private $lineup;

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="Suspect")
     * @ORM\JoinColumn(name="suspect", referencedColumnName="id", onDelete="CASCADE")
     * @ORM\OrderBy({"suspectOrder" = "ASC"})
     * */
    private $suspect;

    /**
     * @ORM\Column(type="boolean") 
     */
    private $is_perpetrator;

    /**
     * @ORM\Column(name="suspectOrder", type="integer") 
     */
    private $order;

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
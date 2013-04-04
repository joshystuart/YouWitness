<?php

namespace YouWitness\Entity;

use Doctrine\ORM\Mapping as ORM;

/** @ORM\Entity */
class Step {

    /**
     * @ORM\Id 
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue 
     */
    private $id;
    
   /**
     * @ORM\ManyToOne(targetEntity="Participant")
     * @ORM\JoinColumn(name="participant", referencedColumnName="id")
     * */
    private $participant;

    /**
     * @ORM\Column(type="string") 
     */
    private $section;

    public function __get($key) {
        return $this->$key;
    }

    public function __set($key, $value) {
        $this->$key = $value;
    }

}

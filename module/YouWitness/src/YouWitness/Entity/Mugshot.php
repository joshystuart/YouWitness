<?php

namespace YouWitness\Entity;

use Doctrine\ORM\Mapping as ORM;

/** @ORM\Entity */
class Mugshot {

    /** 
     * @ORM\Id 
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue 
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="Suspect")
     * @ORM\JoinColumn(name="suspect", referencedColumnName="id")
     **/
    private $suspect;
    
    /** 
     * @ORM\Column(type="string") 
     */
    private $expression;

    public function __get($key) {
        return $this->$key;
    }

    public function __set($key, $value) {
        $this->$key = $value;
    }

}
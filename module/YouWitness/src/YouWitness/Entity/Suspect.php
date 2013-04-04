<?php

namespace YouWitness\Entity;

use Doctrine\ORM\Mapping as ORM;

/** @ORM\Entity */
class Suspect {

    /**
     * @ORM\Id 
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue 
     */
    private $id;

    /**
     * @ORM\Column(type="string") 
     */
    private $image;

    public function __get($key) {
        return $this->$key;
    }

    public function __set($key, $value) {
        $this->$key = $value;
    }

}
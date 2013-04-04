<?php

namespace YouWitness\Entity;

use Doctrine\ORM\Mapping as ORM;

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

    const SEQUENTIAL = 'Sequential';
    const SIMULTANEOUS = 'Simultaneous';

    public function setMethod($method) {
        if ($method == self::SEQUENTIAL) {
            $this->method = self::SEQUENTIAL;
        } else {
            $this->method = self::SIMULTANEOUS;
        }
    }

    public function __get($key) {
        return $this->$key;
    }

    public function __set($key, $value) {
        $this->$key = $value;
    }

}

<?php

namespace YouWitness;

use Zend\Mvc\MvcEvent;

class Module {

    public function onBootstrap(MvcEvent $event) {
        $server = @$_SERVER['SERVER_TYPE'];
        if (empty($server)) {
            $server = getenv('SERVER_TYPE');
        }
        if (empty($server)) {
            die('no server type set');
        }
        define('SERVER_TYPE', $server);
    }

    public function getAutoloaderConfig() {
        return array(
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                ),
            ),
        );
    }

    public function getConfig() {
        return include __DIR__ . '/config/module.config.php';
    }

}
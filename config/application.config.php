<?php

$server = @$_SERVER['SERVER_TYPE'];
if (empty($server)) {
    $server = getenv('SERVER_TYPE');
}
if (empty($server)) {
    die('no server type set');
}
define('SERVER_TYPE', $server);

if (SERVER_TYPE == 'development') {
    return [
        'modules' => [
            'Application',
            'DoctrineModule',
            'DoctrineORMModule',
            'YouWitness'
        ],
        'module_listener_options' => [
            'module_paths' => [
                './module',
                './vendor',
            ],
            'config_glob_paths' => [
                'config/autoload/{,*.}{global,local}.php',
            ],
        ],
    ];
} else {
    return [
        'modules' => [
            'Application',
            'DoctrineModule',
            'DoctrineORMModule',
            'YouWitness'
        ],
        'module_listener_options' => [
            'module_paths' => [
                './module',
                './vendor',
            ],
            'config_glob_paths' => [
                'config/autoload/{,*.}{global,production}.php',
            ],
        ],
    ];
}
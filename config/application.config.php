<?php

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
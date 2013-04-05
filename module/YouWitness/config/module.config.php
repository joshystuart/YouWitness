<?php

return [
    'controllers' => [
        'invokables' => [
            'youwitness' => 'YouWitness\Controller\IndexController',
            'experiment' => 'YouWitness\Controller\ExperimentController',
            'admin' => 'YouWitness\Controller\AdminController',
            'admin-lineup' => 'YouWitness\Controller\LineupController',
            'admin-suspect' => 'YouWitness\Controller\SuspectController',
            'admin-upload' => 'YouWitness\Controller\UploadController',
        ],
    ],
    'router' => array(
        'routes' => array(
            'home' => array(
                'type' => 'Literal',
                'options' => array(
                    'route' => '/',
                    'defaults' => array(
                        'controller' => 'youwitness',
                        'action' => 'index',
                    ),
                ),
            ),
            'experiment' => array(
                'type' => 'Literal',
                'options' => array(
                    'route' => '/experiment',
                    'defaults' => array(
                        'controller' => 'experiment',
                    ),
                ),
            ),
            'admin' => array(
                'type' => 'Literal',
                'options' => array(
                    'route' => '/admin',
                    'defaults' => array(
                        'controller' => 'admin',
                        'action' => 'index',
                    ),
                ),
            ),
            'admin-lineup' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/admin/lineup[/:id]',
                    'constraints' => array(
                        'id' => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'admin-lineup',
                    ),
                ),
            ),
            'admin-suspect' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/admin/suspect[/:id]',
                    'constraints' => array(
                        'id' => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'admin-suspect',
                    ),
                ),
            ),
            'admin-upload' => array(
                'type' => 'Literal',
                'options' => array(
                    'route' => '/admin/upload',
                    'defaults' => array(
                        'controller' => 'admin-upload',
                    ),
                ),
            ),
        ),
    ),
    'view_manager' => [
        'strategies' => [
            'ViewJsonStrategy',
        ],
        'template_map' => [
            'layout/layout' => __DIR__ . '/../view/you-witness/layout/layout.phtml',
            'you-witness/index/index' => __DIR__ . '/../view/you-witness/index/index.phtml',
        ],
        'template_path_stack' => [
            __DIR__ . '/../view',
        ],
    ],
    'doctrine' => [
        'driver' => [
            'YouWitness_driver' => [
                'class' => 'Doctrine\ORM\Mapping\Driver\AnnotationDriver',
                'cache' => 'array',
                'paths' => [__DIR__ . '/../src/YouWitness/Entity']
            ],
            'orm_default' => [
                'drivers' => [
                    'YouWitness\Entity' => 'YouWitness_driver',
                ]
            ]
        ]
    ],
    'aws' => [
        'key' => 'AKIAJVX6YBZKAAUF6G2Q',
        'secret' => '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',
        'bucket' => 'youwitness',
    ]
];
<?php

return [
    'controllers' => [
        'invokables' => [
            'youwitness' => 'YouWitness\Controller\IndexController',
            'experiment' => 'YouWitness\Controller\ExperimentController',
            'admin' => 'YouWitness\Controller\AdminController',
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
    ]
];
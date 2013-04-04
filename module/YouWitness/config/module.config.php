<?php

return [
    'controllers' => [
        'invokables' => [
            'youwitness' => 'YouWitness\Controller\IndexController',
            'step1' => 'YouWitness\Controller\Step1Controller',
            'step2' => 'YouWitness\Controller\Step2Controller',
            'step3' => 'YouWitness\Controller\Step3Controller',
            'step4' => 'YouWitness\Controller\Step4Controller',
            'step5' => 'YouWitness\Controller\Step5Controller',
            'step6' => 'YouWitness\Controller\Step6Controller',
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
            'step-1' => array(
                'type' => 'Literal',
                'options' => array(
                    'route' => '/step-1',
                    'defaults' => array(
                        'controller' => 'step1',
                    ),
                ),
            ),
            'step-2' => array(
                'type' => 'Literal',
                'options' => array(
                    'route' => '/step-2',
                    'defaults' => array(
                        'controller' => 'step2',
                    ),
                ),
            ),
            'step-3' => array(
                'type' => 'Literal',
                'options' => array(
                    'route' => '/step-3',
                    'defaults' => array(
                        'controller' => 'step3',
                    ),
                ),
            ),
            'step-4' => array(
                'type' => 'Literal',
                'options' => array(
                    'route' => '/step-4',
                    'defaults' => array(
                        'controller' => 'step4',
                    ),
                ),
            ),
            'step-5' => array(
                'type' => 'Literal',
                'options' => array(
                    'route' => '/step-5',
                    'defaults' => array(
                        'controller' => 'step5',
                    ),
                ),
            ),
            'step-6' => array(
                'type' => 'Literal',
                'options' => array(
                    'route' => '/step-6',
                    'defaults' => array(
                        'controller' => 'step6',
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
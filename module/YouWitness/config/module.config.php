<?php

return [
    'controllers' => [
        'invokables' => [
            'YouWitness\Controller\YouWitness' => 'YouWitness\Controller\IndexController',
        ],
    ],
    'view_manager' => [
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
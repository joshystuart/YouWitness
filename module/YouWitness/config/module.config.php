<?php

return [
    'controllers' => [
        'invokables' => [
            'YouWitness\Controller\YouWitness' => 'YouWitness\Controller\IndexController',
        ],
    ],
    'view_manager' => [
        'template_path_stack' => [
            __DIR__ . '/../view',
        ],
    ],
    'doctrine' => [
        'driver' => [
            'application_entities' => [
                'class' => 'Doctrine\ORM\Mapping\Driver\AnnotationDriver',
                'cache' => 'array',
                'paths' => [__DIR__ . '/../src/YouWitness/Entity']
            ],
            'orm_default' => [
                'drivers' => [
                    'YouWitness\Entity' => 'application_entities',
                ]
            ]
        ]
    ]
];
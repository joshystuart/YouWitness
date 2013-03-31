<?php

return array(
    'controllers' => array(
        'invokables' => array(
            'YouWitness\Controller\YouWitness' => 'YouWitness\Controller\IndexController',
        ),
    ),
    'view_manager' => [
        'template_path_stack' => [
            __DIR__ . '/../view',
        ],        
    ], 
);
<?php
return array(
    'controllers' => array(
        'invokables' => array(
            'EyeWitnessTest\Controller\EyeWitnessTest' => 'EyeWitnessTest\Controller\IndexController',
        ),
    ),
    'view_manager' => array(
        'template_path_stack' => array(
            'eyewitnesstest' => __DIR__ . '/../view',
        ),
    ),
);
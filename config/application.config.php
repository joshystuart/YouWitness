<?php

return array(
    'modules' => array(
        'Application',
        'DoctrineModule',
        'DoctrineORMModule',
        'YouWitness',
    ),
    'module_listener_options' => array(
        'module_paths' => array(
            './module',
            './vendor',
        ),
        'config_glob_paths' => array(
            'config/autoload/{,*.}{global,local}.php',
        ),
    //'config_cache_enabled' => $booleanValue,
    //'config_cache_key' => $stringKey,
    //'module_map_cache_enabled' => $booleanValue,
    //'module_map_cache_key' => $stringKey,
    //'cache_dir' => $stringPath,
    // 'check_dependencies' => true,
    ),
);
<?php
    var_dump($_REQUEST);
    // $_GET['query']
    $schema = [
        '@context' => 'http://schema.org/',
        '@type' => 'Product',
        'image' => '',
        'name' => $offersDetails[$offer_id]['Offer']['name'],
        'aggregateRating' => [
            '@type' => 'AggregateRating',
            'ratingValue' => $offers[$offer_id]['rate'],
            'reviewCount' => $offers[$offer_id]['stars-votes'],
            'worstRating' => '1',
            'bestRating' => '5',
        ]
    ];
    return "<script type=\'application/ld+json\'>" . Zend_Json::encode($schema) . "<\/script>";
?>
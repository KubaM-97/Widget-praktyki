<?php
    $offer = $_REQUEST;
    // exit();
    // $_GET['query']
    $schema = [
        '@context' => 'http://schema.org/',
        '@type' => 'Product',
        'image' => '',
        'name' => $offer['offer']['name'],
        'aggregateRating' => [
            '@type' => 'AggregateRating',
            'ratingValue' => $offer['offer']['rate'],
            'reviewCount' => $offer['offer']['votes_count'],
            'worstRating' => '1',
            'bestRating' => '5',
        ]
    ];
    // echo "<b> Tekst z PHP </b>";
    echo "<script type=\'application/ld+json\'>" . json_encode($schema) . "<\/script>";
?>
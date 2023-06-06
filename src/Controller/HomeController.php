<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/auth', name: 'app_home')]
    public function index(): Response
    {
        return $this->render('base.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
#[Route('/', name: 'app_acceuil')]
    public function pageacceuil(): Response
    {
        return $this->render('pageacceuil.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
}

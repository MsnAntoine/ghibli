<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class HomeController extends AbstractController
{

    #[IsGranted("ROLE_USER")]
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

    #[Route('/jeux', name: 'app_dino')]
    public function dino(): Response
    {
        return $this->render('Jeux/dino.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
    #[Route('/rock', name: 'app_rock')]
    public function rock(): Response
    {
        return $this->render('rock/rock.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
}
